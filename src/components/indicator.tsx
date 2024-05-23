export default function Indicator({ leak }: { leak: boolean }) {
  return (
    <div
      className={`p-10 text-white max-w-fit rounded-2xl font-black text-3xl shadow-xl-indicator ${
        leak
          ? "bg-red-600 shadow-red-600/40"
          : "bg-green-700 shadow-green-700/40"
      }`}
    >
      {leak ? "LEAK" : "NO LEAK"}
    </div>
  );
}
