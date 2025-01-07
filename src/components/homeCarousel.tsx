import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface CarouselItemProps {
  text: string;
  image: string;
  text2: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  text,
  image,
  text2,
}: CarouselItemProps) => {
  return (
    <Flex
      flexDir={"column"}
      gap={["1rem"]}
      textAlign={"center"}
      textColor={"white"}
    >
      <Text textTransform={"uppercase"} fontWeight={700} fontSize={"lg"}>
        {text}
      </Text>
      <Image height={"12rem"} src={image} alt="Carousel item image" />
      <Text fontSize={"md"}>{text2}</Text>
    </Flex>
  );
};

const PrevArrow = (
  clickHandler: () => void,
  hasNext: boolean,
  label: string
) => {
  return (
    <Flex
      position="absolute"
      top="50%"
      left={0}
      transform="translate(0%, -50%)"
      onClick={clickHandler}
      rounded="full"
      aria-label={label}
      bgColor="white"
      opacity={hasNext ? 1 : 0.2}
      justifyContent="center"
      alignItems="center"
      textColor="base.dark"
    >
      <MdChevronLeft size={"2.5rem"} />
    </Flex>
  );
};

const NextArrow = (
  clickHandler: () => void,
  hasNext: boolean,
  label: string
) => {
  return (
    <Flex
      position="absolute"
      top="50%"
      right={0}
      transform="translate(0%, -50%)"
      onClick={clickHandler}
      rounded="full"
      aria-label={label}
      bgColor="white"
      opacity={hasNext ? 1 : 0.2}
      justifyContent="center"
      alignItems="center"
      textColor="base.dark"
    >
      <MdChevronRight size={"2.5rem"} />
    </Flex>
  );
};

const HomeCarousel = () => {
  return (
    <Carousel
      ariaLabel="Stiks presentation carousel"
      autoPlay={true}
      emulateTouch={true}
      infiniteLoop={true}
      interval={5000}
      showArrows={true}
      showStatus={false}
      showIndicators={false}
      renderArrowPrev={PrevArrow}
      renderArrowNext={NextArrow}
      thumbWidth={100}
    >
      <CarouselItem
        text="Teste"
        image="images/avatars/pepe.svg"
        text2="teste 2 do carrossel muito texto muita coisa que beleza olha só! mermao"
      />
      <CarouselItem
        text="Teste 2"
        image="images/avatars/joe.svg"
        text2="aaaaaaaaaaaaaaaaa teste do carrossel"
      />
      <CarouselItem
        text="Teste 3"
        image="images/avatars/arnaldo.svg"
        text2="Vitoria da fernanda torres"
      />
    </Carousel>
  );
};

export default HomeCarousel;
