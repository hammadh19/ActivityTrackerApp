export default function convertWeight(weight, units){
    if(units === "lbs"){
        const newWeight = weight / 2.205;
        return newWeight;
    } if(units === "stones"){
        const newWeight = weight * 6.35;
        return newWeight;
    }else {
        return weight;
    }

}