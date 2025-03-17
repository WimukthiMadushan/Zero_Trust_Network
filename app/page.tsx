import { Box, Button, Container, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Header_image from "./_Images/Header.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <Container className="vh-100 flex items-center justify-center bg-gray-50">
      <Flex
        direction="row"
        justify="start"
        align="center"
        className="space-x-6 w-full"
      >
        <Box className="text-left flex-1">
          <Text as="p" className="text-[3rem] font-bold mb-4 text-[#3D63DD] leading-tight">
            Start Your Journey To <br /> Zero Trust Security.
          </Text>
          <Flex direction="column">
            <Text className="text-md text-gray-600 mb-6">
              Provide seamless access control for all your <br />applications with our zero trust secure access
            </Text>
            <Link href="/PeakTimeAnalysis">
              <Button radius="large" variant="soft" className="w-1/2">Get Started</Button>
            </Link>
          </Flex> 
        </Box>
        <Box className="flex justify-center flex-1">
          <Image
            src={Header_image}
            alt="header"
            width={500}
            height={250}
          />
        </Box>
      </Flex>
    </Container>
  );
}
