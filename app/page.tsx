"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

import { SignInButton, SignOutButton, SignedIn, SignedOut, useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	const files = useQuery(api.files.getFiles);
	const createFile = useMutation(api.files.createFile);

	return (
		<main className="bg-gray-500 p-5">
			<h1>hello</h1>
			<SignedIn>
				<SignOutButton>
					<Button>Sign Out</Button>
				</SignOutButton>
			</SignedIn>
			<SignedOut>
				<SignInButton mode="modal">
					<Button>Sign In</Button>
				</SignInButton>
			</SignedOut>

			<div>
				{files?.map((file) => (
					<div key={file.name}>{file.name}</div>
				))}
			</div>

			<Button
				onClick={() => {
					createFile({
						name: "hi",
					});
				}}>
				click me
			</Button>
		</main>
	);
}
