import { useRouter } from "@/i18n/routing";
import deletePlayer from "@/services/players/deletePlayer";
import getSavedPlayerId from "@/utils/getSavedPlayerId";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

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
      <ModalContent mx={"1rem"} borderColor={"red.dark"} borderWidth={[2]}>
        <ModalHeader>{t("title")}</ModalHeader>
        <ModalBody>{t("body")}</ModalBody>
        <ModalFooter gap={"1rem"}>
          <Button onClick={onClose}>{t("button_cancel")}</Button>
          <Button
            bgColor={"red.base"}
            onClick={() => {
              handleLeaveRoom();
              onClose();
            }}
          >
            {t("button_leave")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LeaveModal;
