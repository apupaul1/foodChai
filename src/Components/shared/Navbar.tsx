"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { Button, Avatar } from "@heroui/react";
import Link from "next/link";

const Navbar = () => {
  const { data, isPending } = useSession();

  const user = data?.user;

  return (
    <div>
      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
        <header className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            {/* <Logo /> */}
            <p className="font-bold">FoodChai</p>
          </div>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/food-client">Foods CC</Link>
            </li>
            <li>
              <Link href="/food-server">Foods SC</Link>
            </li>
            {user && (
              <li>
                <Link href="/my-profile">My Profile</Link>
              </li>
            )}
          </ul>
          <div className="space-x-2 flex items-center gap-2">
            {isPending ? (
              <h1>Loading...</h1>
            ) : user ? (
              <>
                <Avatar>
                  <Avatar.Image
                    alt="John Doe"
                    src={
                      user?.image ||
                      "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                    }
                  />
                  <Avatar.Fallback>JD</Avatar.Fallback>
                </Avatar>
                <p>Hello! {user.name}</p>
                <Button onClick={() => signOut()}>Logout</Button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button>Sign in</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </header>
      </nav>
    </div>
  );
};

export default Navbar;
