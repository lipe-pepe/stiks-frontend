"use client";

import AvatarSelector from "@/components/avatarSelector";
import { Button, Center, Flex, GridItem, Input, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import { useForm } from "react-hook-form";
import { MdMeetingRoom } from "react-icons/md";

interface JoinForm {
  avatar: string;
  name: string;
}

export default function JoinPage() {
  const t = useTranslations("JoinPage");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JoinForm>();

  const onSubmit = (data: JoinForm) => {
    console.log(data);
  };

  return (
    <>
      <GridItem
        colSpan={[4, 6, 8, 8, 6]}
        colStart={[null, null, 3, 3, 4]}
        // bgColor={"turquoise"} // Used for debug
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            flexDir={"column"}
            bgColor={"rgba(0, 0, 0, 0.2)"}
            borderColor={"base.transparent"}
            borderWidth={"4px"}
            borderRadius={"1rem"}
            pt={["2rem", "3rem"]}
            pb={["2rem", "3rem", "3rem", "4rem"]}
            px={["1rem"]}
            textColor={"white"}
            gap={["2rem", "2rem", "3rem"]}
          >
            <Text textAlign={"center"} fontWeight={700} fontSize={"lg"}>
              {t("form_title")}
            </Text>
            <Flex
              flexDir={["column", "column", "column", "row"]}
              gap={["2rem", "2rem", "2rem", "4rem"]}
              justifyContent={"center"}
            >
              <Center>
                <AvatarSelector
                  onSelect={(avatar) => setValue("avatar", avatar)}
                />
              </Center>
              <Flex flexDir={"column"} gap={2}>
                <Text>{t("input_label")}</Text>
                <Input
                  {...register("name", {
                    required: t("error_required_name"),
                    maxLength: {
                      value: 20,
                      message: t("error_name_length"),
                    },
                  })}
                  py={6}
                  size={["md", "md", "md", "md", "lg"]}
                  bgColor={"white"}
                  borderRadius={"12px"}
                  borderColor={errors.name ? "red.base" : "white"}
                  borderWidth={errors.name ? 3 : 0}
                  placeholder={t("input_placeholder")}
                ></Input>
                {errors.name && (
                  <Flex color={"red.base"} alignItems={"center"} gap={2}>
                    <Flex
                      rounded="full"
                      borderColor="red.dark"
                      borderWidth={1}
                      bgColor="red.base"
                      justifyContent="center"
                      alignItems="center"
                      textColor="white"
                      minW={"1.25rem"}
                      maxH={"1.25rem"}
                    >
                      !
                    </Flex>
                    <Text
                      color="white"
                      fontSize={["sm", "sm", "sm", "md"]}
                      mt={1}
                    >
                      {errors.name.message}
                    </Text>
                  </Flex>
                )}
                <Button
                  mt={"1.8rem"}
                  size={"lg"}
                  leftIcon={<MdMeetingRoom />}
                  variant={"primary"}
                  type="submit"
                >
                  {t("join_button")}
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </form>
      </GridItem>
    </>
  );
}
