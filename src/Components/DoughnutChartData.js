import { ChartData } from "./ChartData";

export default function getDoughnutChartData(weeklyData) {
  console.log(weeklyData);

  // Reset caloriesBurnt value to 0 for each day
  ChartData.forEach((userDataItem) => {
    userDataItem.number = 0;
  });

  // Update caloriesBurnt value with new data
  weeklyData.forEach((data) => {
    const activity = data.Activity;

    const userDataItem = ChartData.find((item) => item.activity === activity);
    if (userDataItem) {
      userDataItem.number += 1;
    }
  });

  const activities = ["Running", "Swimming", "Cycling", "Jogging"];

  const chartData = {
    labels: activities.map((activity) => activity),
    datasets: [
      {
        label: "Number",
        data: ChartData.map((data) => data.number),
        
      },
    ],
  };

  return chartData;
}