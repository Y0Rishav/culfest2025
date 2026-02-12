
import mongoose from "mongoose";
import EventPart from "../pages/api/models/EventPart.model";

// Hardcoded from .env for simplicity in standalone script
const MONGODB_URL = "mongodb://localhost:27017/Culfest26";

const eventParts = [
    // Flagship Events
    { event: "battle of bands", minParticipants: 3, maxParticipants: 10 },
    { event: "battle of dance", minParticipants: 2, maxParticipants: 10 },

    // Dance
    { event: "move mayhem", minParticipants: 1, maxParticipants: 1 },
    { event: "style shuffle", minParticipants: 1, maxParticipants: 10 },
    { event: "choreo nights", minParticipants: 8, maxParticipants: 40 },
    { event: "foot loose", minParticipants: 1, maxParticipants: 1 },

    // Dramatics
    { event: "rangmanch", minParticipants: 5, maxParticipants: 15 },
    { event: "jagruti", minParticipants: 10, maxParticipants: 18 },
    { event: "panch parmeshwar", minParticipants: 4, maxParticipants: 6 },

    // Fine Arts / Fashion
    { event: "poshak", minParticipants: 4, maxParticipants: 4 },
    { event: "panache", minParticipants: 10, maxParticipants: 18 },
    { event: "mr and miss culfest", minParticipants: 1, maxParticipants: 1 },
    { event: "3d scapes", minParticipants: 2, maxParticipants: 2 },

    // Photography / Videography
    { event: "frame by frame", minParticipants: 3, maxParticipants: 5 },
    { event: "echoes of emotion", minParticipants: 1, maxParticipants: 1 },
    { event: "adventure", minParticipants: 1, maxParticipants: 3 },

    // Quizzing
    { event: "unsung wonders of the world", minParticipants: 2, maxParticipants: 2 },
    { event: "india quiz - a journey through the nation", minParticipants: 2, maxParticipants: 2 },

    // Literary
    { event: "mun", minParticipants: 1, maxParticipants: 1 },
    { event: "petty debate", minParticipants: 1, maxParticipants: 1 },
    { event: "plot paradox", minParticipants: 1, maxParticipants: 1 },

    // Music
    { event: "culfest idol", minParticipants: 1, maxParticipants: 1 },
    { event: "symphonic arena", minParticipants: 1, maxParticipants: 3 },

    // Informals
    { event: "the infinity quest", minParticipants: 3, maxParticipants: 5 },
    { event: "multiverse mayhem", minParticipants: 2, maxParticipants: 4 },
    { event: "heroes on trial: a knives out mystery", minParticipants: 4, maxParticipants: 4 },
    { event: "blind and dumb: the couple challenge", minParticipants: 2, maxParticipants: 2 },
    { event: "mindlock: the multiverse code", minParticipants: 4, maxParticipants: 4 },
];

async function seed() {
    try {
        console.log("Connecting to MongoDB at " + MONGODB_URL);
        await mongoose.connect(MONGODB_URL);
        console.log("Connected.");

        // Check connection state
        if (mongoose.connection.readyState !== 1) {
            console.error("Connection failed.");
            process.exit(1);
        }

        console.log("Clearing EventPart collection...");
        await EventPart.deleteMany({});
        console.log("Cleared.");

        console.log("Seeding EventPart data...");
        const result = await EventPart.insertMany(eventParts);
        console.log(`Seeding complete! Inserted ${result.length} records.`);

        await mongoose.disconnect();
        console.log("Disconnected.");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
}

seed();
