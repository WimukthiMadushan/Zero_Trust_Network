import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t mt-10 px-10 py-6 bg-gray-50 text-sm text-gray-600">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo and Copyright */}
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-green-600" />
          <span>
            &copy; {new Date().getFullYear()} Zero Trust Network. All rights
            reserved.
          </span>
        </div>

        {/* Right: Footer Links */}
        <div className="flex space-x-6">
          <Link
            href="/terms"
            className="hover:text-zinc-900 transition-colors duration-200"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="hover:text-zinc-900 transition-colors duration-200"
          >
            Privacy
          </Link>
          <Link
            href="/contact"
            className="hover:text-zinc-900 transition-colors duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
