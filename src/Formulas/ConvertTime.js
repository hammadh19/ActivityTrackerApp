export default function convertTime(time, units){
    if(units === "minutes"){
        const newTime = time / 60;
        return newTime;
    }else {
        return time;
    }

}