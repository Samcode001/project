import { useNavigate } from "react-router-dom";

const HomePagePage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background video */}
      <video
        src="/avatars/home-bg.webm"
        autoPlay
        muted
        loop
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Black overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.1)", // darker overlay
          pointerEvents: "none",
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Welcome to Nexus World</h1>

        <button
          style={{
            background: "#d6ff00",
            border: "4px solid #6a00ff",
            padding: "12px 32px",
            // fontFamily: "monospace",
            fontWeight: 700,
            fontSize: "20px",
            color: "#423376ff",
            textTransform: "uppercase",
            cursor: "pointer",
            borderRadius: 0,
            imageRendering: "pixelated",
            boxShadow: "4px 4px 0 #4b00b3, 6px 6px 0 #250059",
            transition: "0.1s ease",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.transform = "translate(-2px, -2px)";
            btn.style.boxShadow = "6px 6px 0 #4b00b3, 8px 8px 0 #250059";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.transform = "translate(0, 0)";
            btn.style.boxShadow = "4px 4px 0 #4b00b3, 6px 6px 0 #250059";
          }}
          onMouseDown={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.transform = "translate(2px, 2px)";
            btn.style.boxShadow = "2px 2px 0 #4b00b3, 4px 4px 0 #250059";
          }}
          onMouseUp={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.transform = "translate(-2px, -2px)";
            btn.style.boxShadow = "6px 6px 0 #4b00b3, 8px 8px 0 #250059";
          }}
          onClick={() => navigate("/arena")}
        >
          ENTER THE WORLD
        </button>
      </div>
    </div>
  );
};

export default HomePagePage;
