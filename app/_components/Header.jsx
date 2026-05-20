"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Header = () => {
  const { isSignedIn, isLoaded } = useUser();

  const path = usePathname();

  useEffect(() => {

  }, [])

  return !path.includes("aiForm") && (
    <div className="p-2 border-b-2 border-gray-500">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href={"/"}>
          <Image
            src="/logo.webp"
            width={140}
            height={140}
            alt="logo"
            className="w-40"
            loading="eager"
          />
        </Link>

        {/* Loading state */}
        {!isLoaded ? (
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
        ) : isSignedIn ? (
          <div className="flex items-center gap-5">
            <Link href={"/dashboard"}>
              <Button variant="gradient">Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button variant="gradient">Get started</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};

export default Header;