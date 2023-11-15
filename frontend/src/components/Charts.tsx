'use client'
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';


const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const BarChart = () => {
    useEffect(() => {
        Chart.register(CategoryScale);
    }, []);

    return (
        <div>
            <Bar
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    scales: {
                        x: {
                            type: 'category'
                        }
                    }
                }}
            />
        </div>)
}

export default BarChart;