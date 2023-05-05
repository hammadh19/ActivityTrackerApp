import React from "react";
import {Line} from "react-chartjs-2"
import {Chart} from "chart.js/auto"
import { height } from "@mui/system";

export default function LineChart({chartData}){
    return (
        <Line data={chartData}/>
    )
}