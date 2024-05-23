import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="flex justify-between text-3xl py-8 px-20">
      <a href="/" className="flex gap-2 font-black">
        <h1 className="text-orange-600">AI</h1>
        <h1>Leak Detector</h1>
      </a>
      <a href="/source">
        <FaGithub />
      </a>
    </div>
  );
}
