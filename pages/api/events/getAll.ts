import { NextApiRequest, NextApiResponse } from "next";
import { mockData } from "@/utils/mockdata";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Return all events without the rules (to keep response lighter)
    const events = mockData.map((event) => ({
      id: event.id,
      eventname: event.eventname,
      category: event.category,
      description: event.description,
      image: event.image,
    }));

    return res.status(200).json({
      success: true,
      count: events.length,
      events: events,
    });
  } catch (error) {
    console.error("Error fetching all events:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
