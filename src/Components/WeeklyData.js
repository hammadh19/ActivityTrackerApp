import { UserData } from "./Data";

export default function getWeeklyData(weeklyData) {
  console.log(UserData);

  // Reset caloriesBurnt value to 0 for each day
  UserData.forEach((userDataItem) => {
    userDataItem.caloriesBurnt = 0;
  });

  // Update caloriesBurnt value with new data
  weeklyData.forEach((data) => {
    const day = data.Day;
    const calories = data.CaloriesBurnt;

    const userDataItem = UserData.find((item) => item.day === day);
    if (userDataItem) {
      userDataItem.caloriesBurnt += calories;
    }
  });

  const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const userData = {
    labels: weekday.map((data) => data),
    datasets: [
      {
        label: "Calories Burned",
        data: UserData.map((data) => data.caloriesBurnt),
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: "#238e8a",
      },
    ],
  };

  return userData;
}