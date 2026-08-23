"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <main
          style={{
            minHeight: "100vh",
            background: "#0b1220",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div style={{ maxWidth: "480px", width: "100%", textAlign: "center" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(239,68,68,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "700",
                color: "#ffffff",
                marginBottom: "16px",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "40px",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              An unexpected error occurred. Please try again.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => reset()}
                style={{
                  padding: "12px 32px",
                  borderRadius: "9999px",
                  background: "#0e6b70",
                  color: "#ffffff",
                  border: "none",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Try Again
              </button>
              <a
                href="/"
                style={{
                  padding: "12px 32px",
                  borderRadius: "9999px",
                  background: "transparent",
                  color: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.25)",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  textDecoration: "none",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Back to Home
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
