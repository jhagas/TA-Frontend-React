import { useState } from "react";
import Indicator from "../components/indicator";
import interpolatingPolynomial from "interpolating-polynomial";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export default function Home() {
  const [isLeak, setIsLeak] = useState(true);
  const [data, setData] = useState([30, 30, 20]);
  const [isTestRunning, setIsTestRunning] = useState(false);

  function testStart() {
    setIsTestRunning(true);
    // code goes here
    setIsTestRunning(false);
  }

  const f = interpolatingPolynomial([
    [0, data[0]],
    [20, data[1]],
    [40, data[2]],
  ]);

  const labels = [];
  const dataY = [];

  for (let x = 0; x <= 40; x += 0.01) {
    labels.push(x);
    dataY.push(f(x));
  }

  const indexOfLargestValue = dataY.reduce(
    (maxIndex, currentValue, currentIndex, array) =>
      currentValue > array[maxIndex] ? currentIndex : maxIndex,
    0
  );

  const dataGraph = {
    labels,
    datasets: [
      {
        label: "Decibels Interpolation",
        data: dataY,
        borderColor: "#F97316",
        backgroundColor: "rgba(255, 99, 132, 0)",
      },
    ],
  };

  return (
    <main className="flex flex-col items-center">
      {isTestRunning && <p className="mb-5">EVENT LOG:</p>}
      <div
        onClick={testStart}
        className="p-3 bg-zinc-800 rounded-lg border border-zinc-600 max-w-fit mb-7 cursor-pointer hover:bg-zinc-500 text-white transition-colors"
      >
        TEST!
      </div>
      <Indicator leak={isLeak} />
      <div className="mx-auto mt-10 flex flex-col gap-14 items-center w-full font-semibold text-3xl">
        <img src="/pipe.svg" width={800} alt="Measuring Devices" />
        {isLeak ? (
          <div className="w-full flex flex-col gap-5 items-center">
            <div className="flex gap-2">
              <p>
                Leak <i>approximately</i> at
              </p>
              <p className="text-orange-600 font-black">
                {labels[indexOfLargestValue].toFixed(1)} cm from left
              </p>
            </div>
            <div className="w-[680px] h-1 bg-white/30 flex items-center transition-all">
              <div
                style={{
                  transform: `translate(${
                    (labels[indexOfLargestValue] / 40) * 680 - 8
                  }px)`,
                }}
                className="w-4 h-4 bg-orange-600 rounded-full relative"
              ></div>
            </div>
            <div className="w-[740px] h-[200px] -translate-x-5">
              <Line
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {},
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: "Jarak dari kiri alat pengukuran (cm)",
                        color: "#fff",
                      },
                      type: "linear",
                      ticks: {
                        stepSize: 10,
                        color: "#fff",
                      },
                      border: { color: "#fff" },
                      grid: { color: "#ffffff10" },
                    },
                    y: {
                      border: { color: "#fff" },
                      title: {
                        display: true,
                        text: "Intensitas Suara (dB)",
                        color: "#fff",
                      },
                      ticks: {
                        color: "#fff",
                      },
                    },
                  },
                }}
                data={dataGraph}
              />
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <p>Your piping system</p>
            <p className="text-orange-600 font-black">WORKS GREAT!</p>
          </div>
        )}
      </div>
    </main>
  );
}
