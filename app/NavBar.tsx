'use client';
import { Button } from '@radix-ui/themes'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import classNames from "classnames";
import Auth from '@/components/Auth';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import LogoutPopup from '@/components/LogoutPopup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';
import logo from "./_Images/logo.png"

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authModel, setAuthModel] = useState(false);

  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    setAuthModel(true);
  };
  
  const handleLogOut = async () => {
    await auth.signOut();
    Cookies.remove('firebaseToken'); 
    setUser(null);
    router.push('/');
    toast.success('User Successfully Signed out', { position: 'bottom-right' });
  };

  return (
    <nav className="border-b px-6 lg:px-10 py-3 bg-white shadow-sm">
  <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
    
    {/* Left: Logo + Nav Links */}
    <div className="flex items-center gap-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
        <Image
          src={logo}
          alt="Logo"
          width={108}
          height={28}
          className="object-contain"
          priority
              />
              </Link>
      </div>
      <NavLinks user={user} openAuthModal={() => setAuthModel(true)} />
    </div>

    {/* Right: Auth Button or Logout */}
    <div>
      {user ? (
        <LogoutPopup handleLogOut={handleLogOut} />
      ) : (
        <Button
          variant="soft"
          onClick={handleSignIn}
          className="cursor-pointer"
        >
          Sign In
        </Button>
      )}
    </div>
  </div>

      {authModel && <Auth open={authModel} onClose={() => setAuthModel(false)} />}
    </nav>
  );
};

const NavLinks = ({ user, openAuthModal }: { user: User | null, openAuthModal: () => void }) => {
  const currentPath = usePathname();

  const links = [
    { href: "/PeakTimeAnalysis", label: "Peak Time Analysis" },
    { href: "/BehaviouralAnalysis", label: "Behavioural Analysis" },
    { href: "/NetworkPacketAnalysis", label: "Network Packet Analysis" },
    { href: "/PatientHealthAnalysis", label: "Patient Health Analysis" },
    { href: "/RiskAssesment", label: "Risk Assessment" }
  ];

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, _href: string) => {
    if (!user) {
      e.preventDefault();
      openAuthModal();
    }
  };


  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link text-gray-600 hover:underline": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            onClick={(e) => handleNavigation(e, link.href)}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
