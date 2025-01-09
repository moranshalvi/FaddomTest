import { Router } from "express";
import { Request, Response } from "express";
import Controller from "../../utils/Interfaces/Controller";
import dotenv from "dotenv";
const AWS = require("aws-sdk");
const ip = require("ip");

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ec2 = new AWS.EC2();
const cloudwatch = new AWS.CloudWatch();

class AwsController implements Controller {
  public router: Router = Router();
  public path: string = "/aws";

  constructor() {
    this.initRouters();
  }

  private initRouters = () => {
    this.router.post(`${this.path}/getAwsCloudWatch`, this.getAwsCloudWatch);
  };

  public getAwsCloudWatch = async (req: Request, res: Response) => {
    try {
      const { startTime, endTime, period, ipAddress, statistics } = req.body;
  
      console.log("Received request:", {
        startTime,
        endTime,
        period,
        ipAddress,
        statistics,
      });
  
      const instanceId = await this.getInstanceIdFromIp(ipAddress);
  
      const timeInMilliseconds =
        new Date(endTime).getTime() - new Date(startTime).getTime();
      const dataPoints = Math.ceil(timeInMilliseconds / (period * 1000));
  
      console.log("Calculated values:", { timeInMilliseconds, dataPoints });
  
      const oneRequest = async (start: Date, end: Date) => {
        const params = {
          Namespace: "AWS/EC2",
          MetricName: "CPUUtilization",
          StartTime: start,
          EndTime: end,
          Period: period,
          Statistics: statistics,
          Dimensions: [
            {
              Name: "InstanceId",
              Value: instanceId,
            },
          ],
        };
        return await cloudwatch.getMetricStatistics(params).promise();
      };
  
      if (dataPoints > 1440) {
        const numRequests = Math.ceil(dataPoints / 1440);
        const requestSize = Math.floor(timeInMilliseconds / numRequests);
  
        let combinedData: any[] = [];
  
        for (let i = 0; i < numRequests; i++) {
          const requestStartTime = new Date(
            new Date(startTime).getTime() + i * requestSize
          );
          const requestEndTime = new Date(
            Math.min(
              requestStartTime.getTime() + requestSize,
              new Date(endTime).getTime()
            )
          );
  
          const requestData = await oneRequest(requestStartTime, requestEndTime);
          combinedData = [...combinedData, ...requestData.Datapoints];
        }
  
        res.send({ Datapoints: combinedData });
      } else {
        const data = await oneRequest(new Date(startTime), new Date(endTime));
        res.send(data);
      }
    } catch (error: any) {
      console.error("Error in getAwsCloudWatch:", error.message);
  
      if (error.status === 404) {
        return res.status(404).send({ error: error.message });
      }
  
      res.status(500).send({ error: `Internal server error: ${error.message}` });
    }
  };
  

  private getInstanceIdFromIp = async (ipAddress: string): Promise<string> => {
    const isPrivate = ip.isPrivate(ipAddress);
    const params = {
      Filters: [
        {
          Name: isPrivate ? "private-ip-address" : "ip-address",
          Values: [ipAddress],
        },
      ],
    };
  
    try {
      const data = await ec2.describeInstances(params).promise();
      const instance = data.Reservations[0]?.Instances[0];
      if (!instance) {
        throw {
          status: 404,
          message: `No instance found for IP: ${ipAddress}`,
        };
      }
      return instance.InstanceId;
    } catch (err: any) {
      if (err.status === 404) {
        throw err;
      }
      throw new Error(`Failed to retrieve instance for IP ${ipAddress}: ${err.message}`);
    }
  };
  
}

export default AwsController;
