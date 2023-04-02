import React from "react";
import {Doughnut} from "react-chartjs-2"
import {Chart} from "chart.js/auto"
import { height } from "@mui/system";

export default function DoughnutChart({chartData}){
    console.log(chartData)
    return (
        <Doughnut data={chartData}
            
        />
    )
}