'use client';

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Auth from "@/components/Auth";
import { Button } from "@radix-ui/themes";
import { Shield, Settings } from "lucide-react";
import Image from "next/image";
import Header_image from "./_Images/Header.png";
import { Card } from "@/components/ui/card";
import RA from "./_Images/RA.png";
import BA from "./_Images/BA.png";
import PT from "./_Images/PT.png";
import IDM from "./_Images/IDM.png";
import { TypeAnimation } from 'react-type-animation';

const features = [
  { title: "Peak Time Detection", icon: PT },
  { title: "Risk Assessment", icon: RA },
  { title: "Behavioral Analysis", icon: BA },
  { title: "IoMT Device Monitoring", icon: IDM },
];

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
    <div className="bg-hero-gradient">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-1">
          <div className="grid lg:grid-cols-[2fr_2fr_1fr] gap-8 items-center h-[70vh]">
            {/* Left Column: Heading + Buttons */}
            <div className="space-y-8">
              <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-blue-900 leading-tight">
                  Embrace
                  Zero Trust
      <br />
      <span className="text-blue-600">Security with</span>
      <br />
      <span className="text-blue-800">
        <TypeAnimation
          sequence={['TrustLock.', 1000, '', 500]}
          speed={10}
          repeat={Infinity}
          cursor={true}
        />
      </span>
    </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl font-[500]">
                  Deliver seamless, intelligent access control powered by behavioral analytics and peak-time intelligence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="3"
                  onClick={handleGetStart}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="3"
                  onClick={() => window.open('https://www.youtube.com/watch?v=Tw6D2YrVoFU', '_blank')}
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 cursor-pointer"
                >
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Middle Column: VPN Image and animation */}
            <div className="relative w-full h-full flex items-center justify-center space-x-0">
  <div className="relative z-10 ml-[4rem]">
    <div className="w-32 h-40 bg-gradient-to-b from-emerald-400 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
      <Shield className="w-16 h-16 text-white" />
      <div className="absolute inset-0 bg-white/20 rounded-3xl"></div>
    </div>
  </div>

  <Image
  src={Header_image}
  alt="VPN"
  width={600}
  height={400}
  className="rounded-lg"
/>


  {/* The rest of your absolute positioned divs */}
  <div className="absolute top-8 right-4 bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg animate-pulse">
    VPN
  </div>

  <div className="absolute top-12 left-12 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center animate-bounce">
    <Settings className="w-6 h-6 text-blue-600" />
  </div>

  <div className="absolute bottom-32 right-16 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
  <div className="absolute top-32 left-8 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>

  <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-cyan-200/30 rounded-full transform scale-150 opacity-50"></div>
</div>

            <div className="flex flex-col gap-4 items-start w-[15rem]">
  {features.map((feature) => (
    <Card
      key={feature.title}
      className={`
        bg-white bg-opacity-70 
        border border-gray-200 shadow 
        transition-all duration-300 transform 
        hover:scale-105 hover:-translate-y-1 
        hover:shadow-lg 
        hover:bg-white/30 
        hover:backdrop-blur-md 
        hover:ring-1 hover:ring-white/50 
        group cursor-pointer rounded-xl 
        w-[18rem] max-w-xs
        flex flex-row items-center px-4 py-3 
      `}
    >
      <div className={`
        w-10 h-12 rounded-xl flex items-center justify-center 
        group-hover:scale-110 transition-transform duration-300 
        shadow bg-gradient-to-br from-[#e0f1ff] to-[#d1ecff]
        mr-3  /* margin-right to separate icon and title */
      `}>
        <Image
          src={feature.icon}
          alt={feature.title}
          className="w-10 h-10"
          width={40}
          height={40}
        />
      </div>
      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-black transition-colors whitespace-nowrap">
        {feature.title}
      </h3>
    </Card>
  ))}
</div>


          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-cyan-200 rounded-full opacity-30 animate-bounce"></div>
      </section>

      <Auth open={authModel} onClose={() => setAuthModel(false)} />
    

    </div>
  );
}
