import { ChartData } from "./ChartData";

export default function getDoughnutChartData(weeklyData) {
  console.log(weeklyData);

  // Reset caloriesBurnt value to 0 for each day
  ChartData.forEach((userDataItem) => {
    userDataItem.number = 0;
  });

  // Update caloriesBurnt value with new data
  weeklyData.forEach((data) => {
    var activity = data.Activity;
    console.log("test: " + data.Activity )

    if (data.Activity === "Running(slow)" || data.Activity === "Running(fast)") {
      var activity = "Running";
      } else if (data.Activity === "Cycling(slow)" || data.Activity === "Cycling(fast)") {
        var activity = "Cycling";
      } else if (data.Activity === "Swimming(slow)" || data.Activity === "Swimming(fast)") {
        var activity = "Swimming";
      } else if (data.Activity === "Walking(slow)" || data.Activity === "Walking(fast)") {
        var activity = "Walking";
      } else if (data.Activity === "Rowing(slow)" || data.Activity === "Rowing(fast)") {
        var activity = "Rowing";
      } 

    const userDataItem = ChartData.find((item) => item.activity === activity);
    if (userDataItem) {
      userDataItem.number += 1;
    }
  });

  const activities = ["Running", "Swimming", "Cycling", "Jogging", "Walking", "Rowing", "Weight Training"];

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