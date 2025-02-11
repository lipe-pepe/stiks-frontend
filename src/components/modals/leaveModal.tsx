import { useRouter } from "@/i18n/routing";
import deletePlayer from "@/services/players/deletePlayer";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import {
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import SpecialButton from "../specialButton";

interface LeaveProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeaveModal: React.FC<LeaveProps> = ({ isOpen, onClose }: LeaveProps) => {
  const t = useTranslations("LeaveModal");
  const router = useRouter();

  const handleLeaveRoom = async () => {
    const id = getSavedPlayerId();

    // Se tiver um id salvo, o player tem que ser excluído
    if (id) {
      try {
        const res = await deletePlayer(id);
        if (res.status === 200) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      router.push("/");
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        textAlign={"center"}
        mx={"1rem"}
        borderRadius={[8, 10, 12, 14, 16]}
        p={[8, null, 12]}
      >
        <VStack gap={[4]} width={"100%"}>
          <Text fontWeight={"bold"} fontSize={["lg", null, "xl"]}>
            {t("title")}
          </Text>
          <Text fontSize={["md", null, "lg"]}>{t("body")}</Text>
          <HStack mt={[4]} gap={[4]}>
            <SpecialButton
              text={t("button_cancel")}
              size={["md", null, "lg"]}
              onClick={onClose}
            />
            <SpecialButton
              text={t("button_leave")}
              size={["md", null, "lg"]}
              variant={"danger"}
              onClick={() => {
                handleLeaveRoom();
                onClose();
              }}
            />
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default LeaveModal;
