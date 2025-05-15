"use client";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import HSLogo from "@/../public/HSlogo.svg"

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isSignIn = pathname === "/sign-in";
	return (
		<main className="bg-neutral-100 min-h-screen">
			<div className="mx-auto max-w-screen-2xl p-4">
				<nav className="flex justify-between items-center">
					<Image className="bg-transparent" priority src={HSLogo} alt="logo" width={85} height={85} />
					<Button asChild variant="secondary">
						<Link href={isSignIn ? "/sign-up" : "/sign-in" }>
							{isSignIn ? "Sign Up" : "Login"}
						</Link>
					</Button>
				</nav>
				<div className="flex flex-col items-center justify-center pt-4 md:pt-14">
					{children}
				</div>
			</div>
		</main>
	);
}
