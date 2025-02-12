import {
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  isOpen,
  onClose,
}: HowToPlayModalProps) => {
  const t = useTranslations("HowToPlayModal");
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        h={"75vh"}
        minW={["90vw", "75vw", "50vw"]}
        p={[5]}
        gap={"1rem"}
      >
        <ModalCloseButton />
        <ModalHeader p={0} fontWeight={"bold"} fontFamily="quicksand">
          {t("title")}
        </ModalHeader>
        <ModalBody
          borderColor={"gray.1"}
          borderWidth={2}
          borderRadius={[6]}
          textColor={"black"}
          overflowY={"auto"}
          fontSize={["sm", null, "md"]}
        >
          <VStack alignItems={"start"} my={[4]} gap={["2rem"]}>
            <Text fontWeight={"bold"} fontFamily="quicksand" fontSize={["xl"]}>
              {t("about")}
            </Text>
            <Text fontFamily={"inter"}>{t("about_1")}</Text>
            <Text fontSize={["xl"]} fontFamily="quicksand" fontWeight={"bold"}>
              {t("how_to_play")}
            </Text>
            <UnorderedList spacing={[8]}>
              <ListItem>{t("how_to_2_1")}</ListItem>
              <ListItem>{t("how_to_2_2")}</ListItem>
              <ListItem>{t("how_to_2_3")}</ListItem>
              <ListItem>{t("how_to_2_4")}</ListItem>
              <ListItem>{t("how_to_2_5")}</ListItem>
              <ListItem>{t("how_to_2_6")}</ListItem>
              <ListItem>{t("how_to_2_7")}</ListItem>
              <ListItem>{t("how_to_2_8")}</ListItem>
              <ListItem>{t("how_to_2_9")}</ListItem>
            </UnorderedList>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HowToPlayModal;
