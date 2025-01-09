import express, { Application } from "express";
import Controller from "../utils/Interfaces/Controller";
import cors from "cors";
import dotenv from 'dotenv'
import bodyParser from "body-parser";

dotenv.config();

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initialiseMiddleware();
    this.initialiseControllers(controllers);
  }
  
  private initialiseMiddleware(): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  private initialiseControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("", controller.router);
    });
  }


  public startServer(): void {
    this.express.listen(this.port, () => {
      console.log(`The start on port ${this.port}`);
    });
  }
}

export default App;
