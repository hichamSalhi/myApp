import { AfterViewInit, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

enum ValidChartTypes {
  Bar = 'bar',
  Line = 'line',
  Pie = 'pie',
  Radar = 'radar',
  // Add more chart types as needed
}

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.scss'
})
export class MachineComponent implements OnInit {
   ngOnInit(): void {
    this.createChart('chart1', ValidChartTypes.Bar, ['Red', 'Blue', 'Yellow'], [12, 19, 3]);
    this.createChart('chart2', ValidChartTypes.Line, ['January', 'February', 'March'], [65, 59, 80]);
    this.createChart('chart3', ValidChartTypes.Pie, ['Red', 'Blue', 'Yellow', 'Green'], [300, 50, 100, 150]);
    this.createChart('chart4', ValidChartTypes.Radar, ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'], [65, 59, 90, 81, 56, 55, 40]);
  }

  createChart(elementId: string, type: ValidChartTypes, labels: string[], data: number[]): void {
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
    
    new Chart(ctx, {
      type: type,
      data: {
        labels: labels,
        datasets: [{
          label: '# of Votes',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
}
