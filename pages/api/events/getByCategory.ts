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
    const { category } = req.query;

    if (!category) {
      return res
        .status(400)
        .json({ message: "Category parameter is required" });
    }

    // Filter events by category (case-insensitive)
    const filteredEvents = mockData
      .filter(
        (event) =>
          event.category.toLowerCase() === (category as string).toLowerCase(),
      )
      .map((event) => ({
        id: event.id,
        eventname: event.eventname,
        category: event.category,
        description: event.description,
        image: event.image,
      }));

    if (filteredEvents.length === 0) {
      return res.status(404).json({
        message: "No events found for this category",
        category: category,
      });
    }

    return res.status(200).json({
      success: true,
      category: category,
      count: filteredEvents.length,
      events: filteredEvents,
    });
  } catch (error) {
    console.error("Error fetching events by category:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
