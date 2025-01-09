import { FC } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CreatingGraphProps {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      borderWidth: number;
    }[];
  } | null;
}

const CreatingGraph: FC<CreatingGraphProps> = ({ chartData }) => {
  if (!chartData) {
    return <p>Loading graph data... Please wait.</p>;
  }

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Metric Data",
              font: {
                size: 16,
                weight: "bold",
              },
            },
            legend: {
              display: true,
              labels: {
                usePointStyle: true,
              },
            },
          },
          scales: {
            y: {
              title: {
                display: true,
                text: "Percentage",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
            x: {
              title: {
                display: true,
                text: "Time",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default CreatingGraph;
