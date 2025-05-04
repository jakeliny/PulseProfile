"use client";
import { useState } from "react";
import { getOpenAIResponse } from "@/api/openai";
import { CompanyCard } from "@/components/company-card";
import { Button } from "@/components/ui/button";
import { CompanyCardSkeleton } from "@/components/skeleton/company-card-skeleton";
import { CompanyProfile } from "@/interfaces/company";
import { Input } from "@/components/ui/input";
export default function Home() {
	const [response, setResponse] = useState<CompanyProfile | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const url = (e.target as HTMLFormElement).url.value;
		const response = await getOpenAIResponse(url);
		setResponse(response);
	};
	return (
		<div className="flex w-[80%] flex-col">
			<div className="flex flex-col w-full justify-center gap-2 h-50 items-center">
				<h1 className="text-2xl text-center text-gold font-bold mb-4">
					Pulse Profile
				</h1>
				<form
					onSubmit={handleSubmit}
					className="flex w-full gap-2 flex-col sm:flex-row"
				>
					<Input
						type="text"
						name="url"
						placeholder="Enter a URL"
						className="w-full h-10 rounded-md border-2 border-gold-dark  p-2 text-gold-dark outline-none"
					/>
					<Button type="submit" variant="gold">
						Submit
					</Button>
				</form>
			</div>
			{response ? <CompanyCard company={response} /> : <CompanyCardSkeleton />}
		</div>
	);
}
