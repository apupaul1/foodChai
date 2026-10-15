"use client";

import { Card, Button } from "@heroui/react";
import Link from "next/link";

export default function MyProfilePage() {
  const profileActions = [
    {
      label: "Update Profile",
      description: "Manage your personal details and photo",
      href: "/update-profile",
    },
    {
      label: "Change Password",
      description: "Update your account security password",
      href: "/change-password",
    },
    {
      label: "Forget Password",
      description: "Send reset instructions to your email",
      href: "/forgot-password",
    },
  ];

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-background/70">
        {/* Profile Header */}
        <Card.Header className="flex flex-col items-center gap-3 pt-8 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            My Profile
          </h1>
        </Card.Header>

        {/* Action Routes */}
        <Card className="gap-3 p-6">
          <div className="flex flex-col gap-2.5">
            {profileActions.map((item) => (
              <Link key={item.label} href={item.href}>
                <Button
                  key={item.label}
                  className="w-full h-auto py-3 px-4 justify-between rounded-xl "
                >
                  <div className="flex items-center gap-3.5 text-left">
                    <div>
                      <p className="text-small font-semibold text-foreground">
                        {item.label}
                      </p>
                      <p className="text-tiny text-default-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </Card>
      </Card>
    </div>
  );
}
