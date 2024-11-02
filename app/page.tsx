"use client";
import { DataForm } from "@/components/DataForm";
import { useState } from "react";

interface Event {
  title: string;
  description: string;
}

interface HistoryData {
  date: string;
  location: string;
  events: Event[];
}

export default function Home() {
  const [historyData, setHistoryData] = useState<HistoryData | null>(null);

  return (
    <div className="flex flex-col md:px-0 px-4 items-center justify-start min-h-screen bg-primary py-24">
      <h1 className="md:text-5xl text-3xl font-bold pb-12 text-white">
        What Happened Here
      </h1>

      <DataForm setHistoryData={setHistoryData} />
      {historyData && (
        <div className="mt-8 p-4 w-full max-w-lg flex flex-col justify-center items-start gap-2 rounded-lg bg-neutral-900 text-white">
          <h3 className="text-lg font-semibold">Historical Data</h3>
          <div className="w-full h-[1px] bg-neutral-800"></div>
          <h4 className="bg-blue-600/10 select-none p-1 rounded-sm px-2 border border-blue-600/20">
            {historyData.date}
          </h4>
          <p className="text-neutral-500">{historyData.location}</p>
          <ul>
            {Array.isArray(historyData.events) &&
            historyData.events.length > 0 ? (
              historyData.events.map((event, index) => (
                <li key={index}>
                  <div className="text-neutral-300 font-[500]">
                    {event.title || "No Title"}:
                  </div>
                  <p className="text-neutral-400">
                    {event.description || "No Description"}
                  </p>
                </li>
              ))
            ) : (
              <li>No events found for this date.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
