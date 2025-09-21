"use client";
export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[5000]"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      }}
    >
      <div
        style={{
          border: "4px solid rgba(0, 0, 0, 0.1)",
          borderTop: "4px solid #3498db",
          borderRadius: "50%",
          width: "40px", // Spinner width
          height: "40px", // Spinner height
          animation: "spin 1s linear infinite", // Infinite spinning animation
        }}
      ></div>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
