import { Line } from "react-chartjs-2";

const TimeSeriesChart = (props) => {
  const data = {
    labels: props.time,
    datasets: [
      {
        label: "Time Series Data",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.value, // Replace with your actual time series data
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "day", // adjust based on the granularity of your data
            displayFormats: {
              day: "MMM D",
            },
            tooltipFormat: "MMM D, YYYY",
          },
          scaleLabel: {
            display: true,
            labelString: "Date",
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Number of Requests",
          },
        },
      ],
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "40%",
        width: "80%",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Donations Requests vs Time</h3>
      <Line data={data} options={options} style={{ height: "40%" }} />
    </div>
  );
};

export default TimeSeriesChart;
