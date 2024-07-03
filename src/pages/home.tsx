import { useState } from "react";
import Indicator from "../components/indicator";

export default function Home() {
  const [ip, setIp] = useState("http://172.26.201.201:8000/data");
  const [data, setData] = useState({ leak: true, x: 18, y: 10 });
  const [isTestRunning, setIsTestRunning] = useState(false);

  function testStart() {
    // Function to fetch data
    async function fetchData() {
      setIsTestRunning(true);
      try {
        const response = await fetch(ip);
        const data = await response.json();
        setData({
          leak: JSON.parse(data.leak),
          x: JSON.parse(data.x),
          y: JSON.parse(data.y),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsTestRunning(false);
    }
    // Call the function to fetch data
    fetchData();
  }

  return (
    <main className="flex flex-col items-center">
      <input
        type="text"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
        className="p-3 bg-zinc-800 rounded-lg border border-zinc-600 max-w-fit mb-3 cursor-pointer hover:bg-zinc-500 text-white transition-colors"
      />
      <div
        onClick={testStart}
        className="p-3 bg-zinc-800 rounded-lg border border-zinc-600 max-w-fit mb-5 cursor-pointer hover:bg-zinc-500 text-white transition-colors"
      >
        UJI!
      </div>
      {isTestRunning && <p className="mb-5 text-white">LOADING!</p>}
      <Indicator leak={data.leak} />
      <div className="mx-auto mt-20 flex flex-col gap-14 items-center w-full font-semibold text-3xl">
        <img src="/pipe.svg" width={800} alt="Measuring Devices" />
        {data.leak ? (
          <div className="w-full flex flex-col gap-5 mt-10 items-center text-2xl text-center max-w-screen-sm">
            <div className="w-[680px] h-1 bg-white/30 flex items-center transition-all mb-5">
              <div
                style={{
                  transform: `translate(${(data.x / 40) * 680 - 8}px)`,
                }}
                className="w-4 h-4 bg-orange-600 rounded-full relative"
              ></div>
              <div className="flex gap-2 justify-between w-full text-xl translate-y-4">
                <p className="-translate-x-9">0 cm</p>
                <p className="translate-x-10">40 cm</p>
              </div>
            </div>
            <div className="flex gap-2">
              <p>
                Kebocoran <i>diperkirakan</i> terletak di {data.x.toFixed(1)} cm
                di sebelah kanan mikrofon kiri, dengan kedalaman{" "}
                {data.y.toFixed(1)} cm
              </p>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <p>Sistem perpipaan anda</p>
            <p className="text-orange-600 font-black">berfungsi dengan BAIK</p>
          </div>
        )}
      </div>
    </main>
  );
}
