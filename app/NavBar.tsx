'use client';
import { CodeIcon } from '@radix-ui/react-icons';
import { Container, Flex } from '@radix-ui/themes'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import classNames from "classnames";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-10 py-3">
          <Container>
                <div className='flex items-center gap-5'>
                    <Link href="/">
                        <CodeIcon className="w-10 h-10" />
                    </Link>
                    <NavLinks />
                </div>
          </Container>
    </nav>
  )
}

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { href: "/", label: "Peak Time Analysis" },
    { href: "/BehaviouralAnalysis", label:"Behavioural Analysis" },
    { href: "/DeviceMonitoring", label: 'Device Monitoring'},
    { href: "/RiskAssesment", label: "Risk Assesment" }
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classNames({
              "nav-link text-gray-600 hover:line-clamp-3": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
            
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar