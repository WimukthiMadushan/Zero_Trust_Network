'use client';
import { Box, Button, Container, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import Header_image from "./_Images/Header.jpg";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Auth from "@/components/Auth";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [authModel, setAuthModel] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleGetStart = () => {
    if (user) {
      router.push('/PeakTimeAnalysis');
    } else {
      setAuthModel(true);
    }
  };

  return (
    <Container className="vh-100 flex items-center justify-center bg-gray-50">
      <Flex direction="row" justify="start" align="center" className="space-x-6 w-full">
        <Box className="text-left flex-1">
          <Text as="p" className="text-[3rem] font-bold mb-4 text-[#3D63DD] leading-tight">
            Start Your Journey To <br /> Zero Trust Security.
          </Text>
          <Flex direction="column">
            <Text className="text-md text-gray-600 mb-6">
              Provide seamless access control for all your <br />applications with our zero trust secure access
            </Text>
            <Button radius="large" variant="soft" className="w-1/2" onClick={handleGetStart}>
              Get Started
            </Button>
          </Flex>
        </Box>
        <Box className="flex justify-center flex-1">
          <Image src={Header_image} alt="header" width={500} height={250} />
        </Box>
      </Flex>

      <Auth open={authModel} onClose={() => setAuthModel(false)} />
    </Container>
  );
}
