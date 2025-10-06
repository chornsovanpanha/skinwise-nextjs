export const handleCopyLink = async (textToCopy: string) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
