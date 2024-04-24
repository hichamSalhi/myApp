import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import * as echarts from 'echarts';
import { SensorwebsocketService } from '../services/sensorwebsocket.service';


enum ValidChartTypes {
  Bar = 'bar',
  Line = 'line',
  Pie = 'pie',
  Radar = 'radar',
  Bubble = 'bubble'
  // Add more chart types as needed
}

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss']
})
export class SensorComponent implements OnInit {
  // shared value between sensors :
  TodayDate!: any;

  // Define data arrays for temperature
  dataTemperature: number[] = [];
  timeLabelsTemperature : any[] = [];

  // Define data arrays for humidity
  dataHumidity: number[] = [];
  
  
  
  constructor(private sensorWebSocket: SensorwebsocketService) {}

  ngOnInit(): void {

    // Subscribe to real-time data from WebSocket service
    this.sensorWebSocket.getRealTimeData().subscribe((data: any) => {
      console.log("Data received:", data);
    // Iterate over each object in the array
    data.forEach((item: any) => {
        // Access the properties of each object
        console.log(item.SensorID)
        console.log(item.Value)
        // Update data arrays for all charts
        if(item.SensorID == 'Type-2'){
          this.dataTemperature.push(item.Value);
          this.timeLabelsTemperature.push(new Date(item.Date_n_Time).toLocaleTimeString());
          this.TodayDate = new Date(item.Date_n_Time).toLocaleDateString();
        }else if(item.SensorID == 'Type-1'){
          this.dataHumidity.push(item.Value);
        }
    });

      this.createOrUpdateChart('chart2', ValidChartTypes.Line, this.timeLabelsTemperature, this.dataTemperature);
      this.renderChart(this.dataTemperature,this.timeLabelsTemperature,this.dataHumidity);
      this.renderChartComparHumidity();
    });
  }

  createOrUpdateChart(elementId: string, type: ValidChartTypes, labels: string[], dataTemperature: number[]): void {
    const canvas = document.getElementById(elementId);

    // Check if canvas is an HTMLCanvasElement
    if (!(canvas instanceof HTMLCanvasElement)) {
      console.error(`Element with ID '${elementId}' is not a canvas.`);
      return;
    }

    const ctx = canvas.getContext('2d');

    // Perform a null check on ctx
    if (!ctx) {
      console.error(`Context not available for canvas with ID '${elementId}'.`);
      return;
    }

    // Check if chart already exists
    let chart = Chart.getChart(ctx);
    if (chart) {
      // If chart exists, update its data
      chart.data.labels = labels.slice(-5).reverse(); // Get the labels corresponding to the latest five data points
      chart.data.datasets[0].data = dataTemperature.slice(-5).reverse();
      chart.update();
    } else {
      // If chart doesn't exist, create a new chart
      new Chart(ctx, {
        type: type,
        data: {
          labels: labels.slice(-5).reverse(), // Get the labels corresponding to the latest five data points,
          datasets: [{
            label: 'Temperature',
            data: dataTemperature.slice(-5).reverse(),
            borderColor: 'rgb(255, 0, 0)',
            backgroundColor: 'rgb(255, 0, 0)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            x : {
              grid : {
                drawOnChartArea : false
              },
            },
            y: {
              grid : {
                drawOnChartArea : false
              },
              beginAtZero: true
            }
          },
        },
      });
    }
  }


  // this chart is for echarts :
  renderChart(dataTemperature: number[],labels: string[],dataHumidity: number[]): void {
    const chartElement = document.getElementById('chart');
    const myChart = echarts.init(chartElement);
  
    const option = {
      // ECharts configuration options
      legend: {
        data: ['Temperature', 'Humidity']
      },
      xAxis: {
        type: 'category',
        data: labels.slice(-5).reverse(),
        axisLabel: {
          interval: 0, // Display all labels
          rotate: 45, // Rotate labels if needed for better readability
        }
      },
      yAxis: [
        {
          type: 'value',
          name: 'Temperature (C)',
          position: 'left',
          axisLabel: {
            formatter: '{value} C'
          }
        },
        {
          type: 'value',
          name: 'Humidity',
          position: 'right',
          offset: 0,
          axisLabel: {
            formatter: '{value} L/min'
          }
        }
      ],
      series: [
        {
          name: 'Temperature',
          type: 'line',
          yAxisIndex: 0,
          data: dataTemperature.slice(-5).reverse() // Sample humidity data
        },
        {
          name: 'Humidity',
          type: 'bar',
          yAxisIndex: 1,
          data: dataHumidity.slice(-5).reverse() // Sample flow rate data
        }
      ]
    };
  
    myChart.setOption(option);
  }

  // this chart is for echarts :
renderChartComparHumidity(): void {
  const chartElement = document.getElementById('chartCompareHumidity');
  const myChart = echarts.init(chartElement);

  const option = {
    // ECharts configuration options
    legend: {
      data: ['Month 1', 'Month 2']
    },
    xAxis: [
      {
        type: 'category',
        data: ['a','b','c'],
        axisLine: { onZero: true }
      },
      {
        type: 'category',
        data: ['a','b','c'],
        axisLine: { onZero: true }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Humidity (Month 1)',
        position: 'left',
        axisLabel: {
          formatter: '{value} %'
        }
      },
      {
        type: 'value',
        name: 'Humidity (Month 2)',
        position: 'right',
        axisLabel: {
          formatter: '{value} %'
        }
      }
    ],
    series: [
      {
        name: 'Month 1',
        type: 'line',
        data: [1,2,3,4],
        xAxisIndex: 0,
        yAxisIndex: 0
      },
      {
        name: 'Month 2',
        type: 'line',
        data: [5,4,3,4],
        xAxisIndex: 1,
        yAxisIndex: 1
      }
    ]
  };

  myChart.setOption(option);
}

}


