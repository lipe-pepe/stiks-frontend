import { Button } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { MdSend } from "react-icons/md";

interface InviteButtonProps {
  text: string;
}

const InviteButton: React.FC<InviteButtonProps> = ({
  text,
}: InviteButtonProps) => {
  const { locale, roomCode } = useParams();

  const handleInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.host}/${locale}/room/${roomCode}/join/`
      );
    } catch (error) {
      console.error("Fail copying text:", error);
    }
  };

  return (
    <Button
      textTransform={"uppercase"}
      leftIcon={<MdSend />}
      size={["md", "md", "lg"]}
      variant={"secondary"}
      onClick={handleInviteLink}
    >
      {text}{" "}
    </Button>
  );
};

export default InviteButton;
