import App from "./server";
import AwsController from "./controllers/Aws.controller";

const PORT = process.env.PORT || 4001;

const app = new App(
  [
    new AwsController()
  ],

  Number(PORT)
);

app.startServer();
