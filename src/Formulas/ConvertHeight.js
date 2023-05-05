export default function convertHeight(height, units){
    if(units === "m"){
        const newHeight = height * 100;
        return newHeight;
    } else {
        return height;
    }

}