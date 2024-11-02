import { DataForm } from "@/components/DataForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-primary py-24">
      <h1 className="text-6xl font-bold text-white">what happened here</h1>
      <DataForm />
    </div>
  );
}
