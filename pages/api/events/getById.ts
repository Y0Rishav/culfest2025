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
    const { id } = req.query;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Event ID parameter is required" });
    }

    // Find event by id (case-insensitive)
    const event = mockData.find(
      (event) => event.id.toLowerCase() === (id as string).toLowerCase(),
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
        id: id,
      });
    }

    // Return event without JSX rules component
    return res.status(200).json({
      success: true,
      event: {
        id: event.id,
        eventname: event.eventname,
        category: event.category,
        description: event.description,
        image: event.image,
      },
    });
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
 
