"use client";
import { DataForm } from "@/components/DataForm";
import { useState } from "react";

export default function Home() {
  const [historyData, setHistoryData] = useState<any | null>(null);

  return (
    <div className="flex flex-col md:px-0 px-4 items-center justify-start min-h-screen bg-primary py-24">
      <h1 className="md:text-5xl text-3xl font-bold pb-12 text-white">
        What Happened Here
      </h1>

      <DataForm setHistoryData={setHistoryData} />
      {historyData && (
        <div className="mt-8 p-4 w-full max-w-lg rounded-lg bg-neutral-900 text-white">
          <h3 className="text-lg font-semibold mb-2">Historical Data</h3>
          <h4>{historyData.date}</h4>
          <p>{historyData.location}</p>
          <ul>
            {Array.isArray(historyData.events) &&
            historyData.events.length > 0 ? (
              historyData.events.map((event: any, index: number) => (
                <li key={index}>
                  <strong>{event.title || "No Title"}</strong>:{" "}
                  {event.description || "No Description"}
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
