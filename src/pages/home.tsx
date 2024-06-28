import { useState } from "react";
import Indicator from "../components/indicator";

export default function Home() {
  const [data, setData] = useState({ leak: false, distance: 18 });
  const [isTestRunning, setIsTestRunning] = useState(false);

  function testStart() {
    setIsTestRunning(true);
    // Code goes here
    const url = "http://127.0.0.1:8080/data";

    // Function to fetch data
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData({
          leak: JSON.parse(data.leak),
          distance: JSON.parse(data.distance),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    // Call the function to fetch data
    fetchData();

    // End Code
    setIsTestRunning(false);
  }

  return (
    <main className="flex flex-col items-center">
      {isTestRunning && <p className="mb-5">EVENT LOG:</p>}
      <div
        onClick={testStart}
        className="p-3 bg-zinc-800 rounded-lg border border-zinc-600 max-w-fit mb-10 cursor-pointer hover:bg-zinc-500 text-white transition-colors"
      >
        TEST!
      </div>
      <Indicator leak={data.leak} />
      <div className="mx-auto mt-20 flex flex-col gap-14 items-center w-full font-semibold text-3xl">
        <img src="/pipe.svg" width={800} alt="Measuring Devices" />
        {data.leak ? (
          <div className="w-full flex flex-col gap-5 mt-10 items-center">
            <div className="flex gap-2">
              <p>
                Leak <i>approximately</i> at
              </p>
              <p className="text-orange-600 font-black">
                {data.distance.toFixed(1)} cm from left sensor
              </p>
            </div>
            <div className="w-[680px] h-1 bg-white/30 flex items-center transition-all">
              <div
                style={{
                  transform: `translate(${(data.distance / 40) * 680 - 8}px)`,
                }}
                className="w-4 h-4 bg-orange-600 rounded-full relative"
              ></div>
              <div className="flex gap-2 justify-between w-full text-xl translate-y-4">
                <p className="-translate-x-9">0 cm</p>
                <p className="translate-x-10">40 cm</p>
              </div>
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
