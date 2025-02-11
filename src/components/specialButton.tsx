import { Button } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import useSound from "use-sound";

interface SpecialButtonProps {
  width: string[] | string;
  maxWidth: string[] | string;
  text: string;
  size: (string | null)[];
  leftIcon: ReactElement;
  isLoading: boolean;
  onClick: () => void;
}

const SpecialButton: React.FC<SpecialButtonProps> = ({
  width,
  maxWidth,
  text,
  size,
  leftIcon,
  isLoading,
  onClick,
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
    >
      {text}
    </Button>
  );
};

export default SpecialButton;
