import React from "react";
import { Typography } from "./Typography";
import { ArrowLeft } from "lucide-react";

const NavigationBar = ({
  title,
  showBack,
  onPress,
}: {
  title: string;
  showBack?: boolean;
  onPress?: () => void;
}) => {
  return (
    <header className="flex flex-row gap-2 items-center">
      {showBack && (
        <ArrowLeft className="hover:bg-gray-1 rounded-full" onClick={onPress} />
      )}

      <Typography variant="h6">{title}</Typography>
    </header>
  );
};

export default NavigationBar;
