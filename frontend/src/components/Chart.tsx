import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const debitData = {
  labels: [
    "May 1",
    "May 2",
    "May 3",
    "May 4",
    "May 5",
    "May 6",
    "May 7",
    "May 8",
    "May 9",
    "May 10",
    "May 11",
    "May 12",
    "May 13",
    "May 14",
    "May 15",
    "May 16",
    "May 17",
    "May 18",
    "May 19",
    "May 20",
    "May 21",
    "May 22",
    "May 23",
    "May 24",
    "May 25",
    "May 26",
    "May 27",
    "May 28",
    "May 29",
    "May 30",
  ],
  datasets: [
    {
      label: "Daily Debit (€)",
      data: [
        12, 45, 30, 5, 90, 20, 60, 10, 25, 15, 100, 40, 22, 33, 18, 75, 10, 55,
        12, 95, 30, 15, 28, 60, 42, 11, 70, 33, 20, 50,
      ],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Daily Debit Spending (1 Month)",
    },
  },
};

export default function DebitChart() {
  return <Bar data={debitData} options={options} />;
}
