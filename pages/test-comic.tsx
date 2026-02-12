import ComicBackground from "@/components/ComicBackground";

export default function TestComic() {
    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <ComicBackground />
            <div style={{ position: "absolute", zIndex: 10, color: "white", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <h1>Test Comic Background</h1>
            </div>
        </div>
    );
}
