import { FC, useEffect, useState } from "react";
import axios from "axios";
import CreatingGraph from "../CreatingGraph/CreatingGraph";

interface LoadBtnProps {
  data: {
    startTime: Date;
    endTime: Date;
    period: number;
    ipAddress: string;
    statistics: string[];
  };
  statistics: string[];
  onIpReset: () => void;
}

interface DataPoint {
  Timestamp: string;
  Average: number;
  Unit: string;
}

interface GraphData {
  Datapoints: DataPoint[];
}

const LoadBtn: FC<LoadBtnProps> = ({ data, statistics, onIpReset }) => {
  const [graphData, setGraphData] = useState<GraphData>();
  const [chartData, setChartData] = useState<any>(null);

  const fetchDataInChunks = async () => {
    try {
      console.log("Data sent to server:", data);
      const response = await axios.post(
        "http://localhost:8000/aws/getAwsCloudWatch",
        data
      );
      setGraphData(response.data);
      console.log("Response from server:", response.data);
    } catch (error: any) {
      console.error("Error submitting data to server:", error);

      if (error.response && error.response.status === 404) {
        alert(
          `No server found for the provided IP address: ${data.ipAddress}. Please enter a valid IP address.`
        );
        onIpReset();
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchDataInChunks();
  }, [data]);

  useEffect(() => {
    if (graphData) {
      const labels =
        graphData.Datapoints.map((point) =>
          new Date(point.Timestamp).toLocaleString()
        ) || [];
      const values = graphData.Datapoints.map((point) => {
        const statisticKey = statistics[0];
        if (statisticKey in point) {
          return point[statisticKey as keyof DataPoint];
        }
        console.error(`Key ${statisticKey} not found in DataPoint`);
        return null;
      });

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: `${statistics[0]} (%)`,
            data: values,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
          },
        ],
      };

      setChartData(chartData);
    }
  }, [graphData, statistics]);

  return (
    <div>
      {chartData ? (
        <CreatingGraph chartData={chartData} />
      ) : (
        <p>Loading data... Please wait</p>
      )}
    </div>
  );
};

export default LoadBtn;
