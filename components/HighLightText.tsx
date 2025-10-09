import React from "react";

type HighlightTextProps = {
  text: string;
  highlight?: string;
};

const HighlightText: React.FC<HighlightTextProps> = ({ text, highlight }) => {
  // if highlight is undefined, null, or empty string → render text as-is
  if (!highlight || highlight.trim() === "") return <>{text}</>;

  // Escape special regex chars
  const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="text-secondary font-semibold bg-primary/90">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export default HighlightText;
