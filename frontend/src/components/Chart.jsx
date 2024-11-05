import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, LineController, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip } from 'chart.js';

ChartJS.register(LineController, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip);

const ChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const customCanvasBackgroundColor = {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    };

    let prev = 0;
    const dataPoints = Array.from({ length: 30 }, () => {
      prev = Math.max(0, prev + Math.floor(Math.random() * 40 - 20));
      return prev;
    });

    const bufferPercentage = 0.2;
    const minY = Math.min(...dataPoints) - Math.min(...dataPoints) * bufferPercentage;
    const maxY = Math.max(...dataPoints) + Math.max(...dataPoints) * bufferPercentage;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new ChartJS(chartRef.current, {
      type: 'line',
      data: {
        labels: dataPoints.map((_, index) => index),
        datasets: [
          {
            data: dataPoints,
            borderWidth: 2,
            pointRadius: 2,
            lineTension: 0.4,
            fill: false,
            segment: {
              borderColor: (ctx) => {
                if (ctx.p0 && ctx.p1) {
                  return ctx.p1.y < ctx.p0.y ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)';
                }
                return 'rgba(75, 192, 192, 1)';
              },
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { display: false } },
          y: { beginAtZero: true, min: minY, max: maxY, grid: { display: false } },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: (tooltipItems) => `Index: ${tooltipItems[0].dataIndex}`,
              label: (tooltipItem) => `Value: ${tooltipItem.raw}`,
            },
          },
        },
      },
      plugins: [customCanvasBackgroundColor],
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;