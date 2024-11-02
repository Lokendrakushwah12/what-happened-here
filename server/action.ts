"use server";

export async function getHistory(date: Date, latitude: number, longitude: number) {
  const prompt = `
    Imagine you are describing a significant historical moment or notable events that occurred around the world or near a location with coordinates (latitude: ${latitude}, longitude: ${longitude}) on ${date.toDateString()}.
    Describe the events as if telling a story, highlighting any notable figures, conflicts, discoveries, or global trends relevant to that location and date.
  `;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
      process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  
  console.log("Full response from Gemini API:", data);
  console.log("Content object:", data?.candidates?.[0]?.content);

  const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No historical data available for this query.";

  // For now, we can just return the generated text as a single event
  return {
    date: date.toDateString(),
    location: `Latitude ${latitude}, Longitude ${longitude}`,
    events: [{ title: "Historical Narrative", description: generatedText }]
  };
}