import React from 'react'
import { Line } from 'react-chartjs-2';
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement, 
    Title ,
    Tooltip,
    Legend
    } from 'chart.js';

    ChartJS.register(
        CategoryScale,
        LinearScale,
        LineElement,
        PointElement,
        Title,
        Tooltip,
        Legend
        );
const Graph = ({graphData}) => {
  return (
    <div>
        <Line data ={{
            labels :graphData.map(i=>i[0]+1),
            datasets:[{data:graphData.map(i=>i[1]),
            label: 'just random values',
            borderColor:'gold'}]
        }}>

        </Line>
    </div>
  )
}

export default Graph;