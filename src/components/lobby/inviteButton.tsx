import {
  Button,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { MdSend } from "react-icons/md";
import useSound from "use-sound";

interface InviteButtonProps {
  text: string;
  copiedText: string;
}

const InviteButton: React.FC<InviteButtonProps> = ({
  text,
  copiedText,
}: InviteButtonProps) => {
  const { locale, roomCode } = useParams();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const [playSound] = useSound("/sounds/invite.mp3");

  const handleInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.host}/${locale}/room/${roomCode}/join/`
      );
      playSound();
      onOpen();
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error("Fail copying text:", error);
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      closeOnBlur={false}
      placement="top-end"
    >
      <PopoverAnchor>
        <Button
          textTransform={"uppercase"}
          leftIcon={<MdSend />}
          size={"lg"}
          variant={"secondary"}
          onClick={handleInviteLink}
        >
          {text}{" "}
        </Button>
      </PopoverAnchor>
      <PopoverContent
        borderWidth={0}
        bg={"blue.base"}
        minW="auto" // Define explicitamente para não ocupar mais espaço que o necessário
        width="fit-content" // Ajusta para que o conteúdo ocupe somente o espaço do texto
      >
        <PopoverBody>
          <Text
            fontSize={["md"]}
            fontWeight={"semibold"}
            textAlign={"center"}
            color={"white"}
            fontFamily={"inter"}
          >
            {copiedText}
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default InviteButton;
