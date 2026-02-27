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
    // Get unique categories
    const categories = [...new Set(mockData.map((event) => event.category))];

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
 
