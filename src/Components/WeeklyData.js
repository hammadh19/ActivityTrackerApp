import { UserData } from "./Data";

export default function getWeeklyData(weeklyData) {
  console.log(UserData)
  const weekday = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  weeklyData.forEach((data) => {
    const day = data.Day;
    const calories = data.CaloriesBurnt;
    
    const userDataItem = UserData.find((item) => item.day === day);
    if (userDataItem) {
        userDataItem.caloriesBurnt = 0;
        userDataItem.caloriesBurnt += calories;
    }
  });
  

  const userData = {
    labels: weekday.map((data) => data),
    datasets: [
      {
        label: "Calories Burned",
        data: UserData.map((data) => data.caloriesBurnt),
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  }
  console.log(userData)
  return userData;
}