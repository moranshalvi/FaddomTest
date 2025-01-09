import CPUInputs from "../../components/CPUInputs/CPUInputs";
import classes from "./Home.module.scss";

const Home = () => {
  return (
    <div className={classes.Container}>
      <h1>Aws Instance CPU usage</h1>
      <CPUInputs />
    </div>
  );
};

export default Home;
