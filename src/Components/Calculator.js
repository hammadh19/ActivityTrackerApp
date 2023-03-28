import RunningMET from "../Formulas/RunningMET";

export default async function Calculator(activity, time) {
    if (activity === "running") {
        const result = await RunningMET(time);
        return result;
    } else {
        return null;
    }
  
}