import { Button } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import useSound from "use-sound";

interface SpecialButtonProps {
  text: string;
  size: (string | null)[] | string;
  leftIcon: ReactElement;
  onClick: () => void;

  // Opcionais
  width?: string[] | string;
  maxWidth?: string[] | string;
  variant?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const SpecialButton: React.FC<SpecialButtonProps> = ({
  width,
  maxWidth,
  text,
  size,
  leftIcon,
  isLoading = false,
  type = "button",
  onClick,
  variant = "primary",
}: SpecialButtonProps) => {
  const [playClick1] = useSound("/sounds/click_1.mp3");
  const [playClick2] = useSound("/sounds/click_2.mp3");

  const playClick = () => {
    const sounds = [playClick1, playClick2];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound();
  };

  const handleClick = () => {
    playClick();
    onClick();
  };

  return (
    <Button
      w={width}
      maxW={maxWidth}
      onClick={handleClick}
      size={size}
      leftIcon={leftIcon}
      isLoading={isLoading}
      type={type}
      variant={variant}
    >
      {text}
    </Button>
  );
};

export default SpecialButton;
