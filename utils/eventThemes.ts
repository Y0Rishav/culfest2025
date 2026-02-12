
export interface EventTheme {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
    headingFont: string; // Tailwind class
    bodyFont: string;    // Tailwind class
    headingFontFamily: string; // CSS value
    bodyFontFamily: string;    // CSS value
    backgroundImage: string;
    overlayGradient: string;
}

const defaultTheme: EventTheme = {
    primaryColor: "#3b82f6",
    secondaryColor: "#1e40af",
    accentColor: "#60a5fa",
    textColor: "#ffffff",
    headingFont: "font-Bangers tracking-widest",
    bodyFont: "font-Bangers tracking-wide",
    headingFontFamily: "Bangers, cursive",
    bodyFontFamily: "Bangers, cursive",
    backgroundImage: "/bg122.jpg",
    overlayGradient: "linear-gradient(to bottom right, rgba(15, 23, 42, 0.9), rgba(30, 58, 138, 0.8))",
};

export const getEventTheme = (eventName: string, category: string): EventTheme => {
    const name = (eventName || "").toLowerCase();
    const cat = (category || "").toLowerCase();

    // 1. Dance
    if (cat.includes("dance") || name.includes("dance") || name.includes("move") || name.includes("choreo")) {
        return {
            primaryColor: "#d946ef",
            secondaryColor: "#701a75",
            accentColor: "#f0abfc",
            textColor: "#ffffff",
            headingFont: "font-Bangers tracking-widest",
            bodyFont: "font-Bangers tracking-wide",
            headingFontFamily: "Bangers, cursive",
            bodyFontFamily: "Bangers, cursive",
            backgroundImage: "/dance1.webp",
            overlayGradient: "linear-gradient(to bottom right, rgba(88, 28, 135, 0.85), rgba(192, 38, 211, 0.7))",
        };
    }

    // 2. Music
    if (cat.includes("music") || name.includes("band") || name.includes("idol") || name.includes("symphon")) {
        return {
            primaryColor: "#ef4444",
            secondaryColor: "#7f1d1d",
            accentColor: "#fca5a5",
            textColor: "#ffffff",
            headingFont: "font-Bangers tracking-widest",
            bodyFont: "font-Bangers tracking-wide",
            headingFontFamily: "Bangers, cursive",
            bodyFontFamily: "Bangers, cursive",
            backgroundImage: "/music1.jpg",
            overlayGradient: "linear-gradient(to bottom right, rgba(69, 10, 10, 0.9), rgba(185, 28, 28, 0.7))",
        };
    }

    // 3. Dramatics
    if (cat.includes("drama") || name.includes("rangmanch") || name.includes("nukkad") || name.includes("mime")) {
        return {
            primaryColor: "#eab308",
            secondaryColor: "#422006",
            accentColor: "#fde047",
            textColor: "#fefce8",
            headingFont: "font-Bangers tracking-widest",
            bodyFont: "font-Bangers tracking-wide",
            headingFontFamily: "Bangers, cursive",
            bodyFontFamily: "Bangers, cursive",
            backgroundImage: "/Event_03-5pCd__fD.jpg",
            overlayGradient: "linear-gradient(to bottom right, rgba(0, 0, 0, 0.85), rgba(161, 98, 7, 0.7))",
        };
    }

    // 4. Flagship
    if (cat.includes("flagship")) {
        return {
            primaryColor: "#fbbf24",
            secondaryColor: "#000000",
            accentColor: "#fffbeb",
            textColor: "#ffffff",
            headingFont: "font-Bangers tracking-widest",
            bodyFont: "font-Bangers tracking-wide",
            headingFontFamily: "Bangers, cursive",
            bodyFontFamily: "Bangers, cursive",
            backgroundImage: "/bg11.jpg",
            overlayGradient: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(180, 83, 9, 0.5) 100%)",
        };
    }

    // 5. Quizzing / Literary
    if (cat.includes("quiz") || cat.includes("literary") || name.includes("debate") || name.includes("mun")) {
        return {
            primaryColor: "#14b8a6",
            secondaryColor: "#0f766e",
            accentColor: "#99f6e4",
            textColor: "#f0fdfa",
            headingFont: "font-Bangers tracking-widest",
            bodyFont: "font-Bangers tracking-wide",
            headingFontFamily: "Bangers, cursive",
            bodyFontFamily: "Bangers, cursive",
            backgroundImage: "/quiz2.avif",
            overlayGradient: "linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(20, 184, 166, 0.6))",
        }
    }

    // 6. Fine Arts / Fashion
    if (cat.includes("art") || cat.includes("fashion") || name.includes("panache") || name.includes("poshak")) {
        return {
            primaryColor: "#6366f1",
            secondaryColor: "#312e81",
            accentColor: "#a5b4fc",
            textColor: "#ffffff",
            headingFont: "font-Bangers tracking-widest",
            bodyFont: "font-Bangers tracking-wide",
            headingFontFamily: "Bangers, cursive",
            bodyFontFamily: "Bangers, cursive",
            backgroundImage: "/bg120.jpg",
            overlayGradient: "linear-gradient(to right, rgba(49, 46, 129, 0.9), rgba(244, 63, 94, 0.6))",
        }
    }

    // 7. Informals
    if (cat.includes("informal") || name.includes("fun") || name.includes("mystery")) {
        return {
            primaryColor: "#f97316",
            secondaryColor: "#c2410c",
            accentColor: "#fdba74",
            textColor: "#fff7ed",
            headingFont: "font-Bangers tracking-widest",
            bodyFont: "font-Bangers tracking-wide",
            headingFontFamily: "Bangers, cursive",
            bodyFontFamily: "Bangers, cursive",
            backgroundImage: "/informal1.jpg",
            overlayGradient: "linear-gradient(to bottom right, rgba(124, 45, 18, 0.9), rgba(249, 115, 22, 0.6))",
        }
    }

    return defaultTheme;
};
