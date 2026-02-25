import { NextApiRequest, NextApiResponse } from "next";
import User from "./models/User.model";
import Payment from "./models/Payment.model";
import connectToDatabase from "./conntectToDatabase";
import Event from "./models/Event.model";
import { v4 as uuidv4 } from "uuid";
import EventPart from "./models/EventPart.model";
import mongoose from "mongoose";
// import Event from "./models/Event.model";

type ResponseData = {
  status: number;
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: 405, message: "Method Not Allowed" });
  }

  try {
    const body = req.body;
    console.log("Received registration request with body:", body);
    const { event, session, userEmails, teamName } = body;
    if (!session?.data || !session?.data?.user?.id) {
      console.log("User not logged in. Session data:", session);
      return res
        .status(401)
        .json({ status: 401, message: "User not logged in" });
    }

    if (!event) {
      return res
        .status(400)
        .json({ status: 400, message: "Event not provided" });
    }
    if (!teamName || typeof teamName !== "string") {
      return res.status(400).json({
        status: 400,
        message: "Invalid or missing team name",
      });
    }
    if (!userEmails || !Array.isArray(userEmails) || userEmails.length === 0) {
      return res.status(400).json({
        status: 400,
        message: "No userEmails provided or invalid format",
      });
    }
    await connectToDatabase();

    const failedUpdates: { email: string; reason: string }[] = [];
    const successfulUpdates: string[] = [];
    const noofParticipants = await EventPart.findOne({
      event: event?.toString().toLowerCase(),
    });
    if (!noofParticipants) {
      console.log("event not found in EventPart collection for event:", event);
      return res.status(409).json({ status: 404, message: "event not found" });
    }
    const minPart = noofParticipants?.minParticipants;
    const maxPart = noofParticipants?.maxParticipants;
    console.log(userEmails.length);
    console.log(minPart);
    console.log(maxPart);
    if (userEmails.length > maxPart || userEmails.length < minPart) {
      return res.status(200).json({
        status: 200,
        message: "no of participants not satisfied",
      });
    }
    let eventDoc = await Event.findOne({
      eventName: event.toString().toLowerCase(),
    });

    if (!eventDoc) {
      eventDoc = new Event({
        eventName: event.toString().toLowerCase(),
        teams: [],
      });
      await eventDoc.save();
    }
    console.log(eventDoc);
    const isTeamNameTaken = eventDoc.teams.some(
      (team: any) =>
        team.teamName.replace(/\s+/g, "").toLowerCase() ===
        teamName.replace(/\s+/g, "").toLowerCase(),
    );
    if (isTeamNameTaken) {
      return res.status(400).json({
        status: 400,
        message: `Team name "${teamName}" is already taken for this event.`,
      });
    }

    const usersForEvent = [];
    let newTeam;
    try {
      // Normalize all team member emails to lowercase
      const normalizedUserEmails = userEmails.map((e: string) => e.toLowerCase());
      // Use case-insensitive regex to match existing mixed-case emails in DB
      const emailRegexes = normalizedUserEmails.map((e: string) => new RegExp(`^${e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i'));
      const users = await User.find({ email: { $in: emailRegexes } });

      if (users.length !== normalizedUserEmails.length) {
        const foundEmails = users.map((user) => user.email.toLowerCase());
        const missingEmails = normalizedUserEmails.filter(
          (email: string) => !foundEmails.includes(email),
        );
        missingEmails.forEach((email: string) =>
          failedUpdates.push({ email, reason: "User not found" }),
        );
        return res.status(400).json({
          status: 400,
          message: "Failed to register",
          data: {
            successfulUpdates,
            failedUpdates,
          },
        });
      }
      const eventNameLower = event.toString().toLowerCase();
      const isCrewEvent = ["battle of bands", "battle of dance"].includes(
        eventNameLower,
      );

      // Check for team override: If it's a Crew Event and ANY member has paid 2850, everyone qualifies.
      let teamHasValidCrewPayment = false;
      if (isCrewEvent) {
        for (const user of users) {
          const p = await Payment.findOne({
            userId: user._id,
            status: "success",
          });
          if (p && Number(p.amount) === 2850) {
            teamHasValidCrewPayment = true;
            break;
          }
        }
      }

      for (const user of users) {
        try {
          if (user.registeredEvents.includes(event)) {
            failedUpdates.push({
              email: user.email,
              reason: "Already registered for this event",
            });
            continue;
          }

          // Team Override: If valid crew payment exists in team for a crew event, skip individual checks
          if (isCrewEvent && teamHasValidCrewPayment) {
            usersForEvent.push({ userId: user._id, name: user.name });
            continue;
          }

          // Check if individual payment exists
          const paymentStatus = await Payment.findOne({ userId: user._id }); // Assuming basic find implies existence check. Better to check status if possible, but keeping consistent with prev code.

          if (!paymentStatus || paymentStatus.status !== "success") {
            failedUpdates.push({
              email: user.email,
              reason: "No successful payment found",
            });
            continue;
          }

          const amount = Number(paymentStatus.amount);

          // Logic for Single Event Plans (200 / 400)
          if (amount === 200 || amount === 400) {
            if (user.registeredEvents.length > 0) {
              failedUpdates.push({
                email: user.email,
                reason:
                  "Single event limit reached. Upgrade to register for more.",
              });
              continue;
            }
            if (isCrewEvent) {
              failedUpdates.push({
                email: user.email,
                reason:
                  "Single event plan covers only standard events, not Battle of Bands/Dance.",
              });
              continue;
            }
          }
          // Logic for Multi Event Plans (450 / 1250)
          else if (amount === 450 || amount === 1250) {
            if (isCrewEvent) {
              failedUpdates.push({
                email: user.email,
                reason:
                  "Standard multi-event plan does not include Battle of Bands/Dance.",
              });
              continue;
            }
          }
          // Logic for Crew Plan (2850)
          else if (amount === 2850) {
            if (!isCrewEvent) {
              failedUpdates.push({
                email: user.email,
                reason: "Crew plan is valid ONLY for Battle of Bands/Dance.",
              });
              continue;
            }
          }
          // Fallback for invalid amounts or unmatched plans
          else {
            failedUpdates.push({
              email: user.email,
              reason: "Invalid payment plan.",
            });
            continue;
          }

          // Add valid user to the event list
          usersForEvent.push({ userId: user._id, name: user.name });
        } catch (err: any) {
          failedUpdates.push({
            email: user.email,
            reason: err.message || "Validation error",
          });
        }
      }

      // If any user failed validation, return failed updates
      if (failedUpdates.length > 0) {
        return res.status(400).json({
          status: 400,
          message: "Failed to register",
          data: {
            successfulUpdates,
            failedUpdates,
          },
        });
      }

      // Update users and event if all checks pass
      try {
        // Update all users
        await Promise.all(
          users.map((user) => {
            user.registeredEvents.push(event);
            return user.save();
          }),
        );

        // Update the event model
        newTeam = {
          teamName,
          teamId: uuidv4(),
          teamMembers: usersForEvent,
        };

        await Event.updateOne(
          { eventName: event.toString().toLowerCase() },
          { $push: { teams: newTeam } },
        );
      } catch (err) {
        console.error("Registration error:", err);
        return res
          .status(500)
          .json({ status: 500, message: "something went wrong" });
      }

      return res.status(200).json({
        status: 200,
        message: "Event registration processed",
        data: {
          successfulUpdates,
          failedUpdates,
          newTeam,
        },
      });
    } catch (err: any) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        data: { error: err.message },
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: { error: error.message },
    });
  }
}
