import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getOpenAIResponse } from "@/api/openai";
import { CompanyProfile } from "@/interfaces/company";
import Image from "next/image";
import { CompaniesList } from "../companies-list";
const LOCAL_STORAGE_KEY = "company_profiles";

export function Header({
	companies,
	setCompanies,
	setIsLoading,
	isLoading,
}: {
	companies: CompanyProfile[];
	setCompanies: (
		companies: CompanyProfile[] | ((old: CompanyProfile[]) => CompanyProfile[])
	) => void;
	setIsLoading: (isLoading: boolean) => void;
	isLoading: boolean;
}) {
	const [error, setError] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const url = (e.target as HTMLFormElement).url.value;

		if (!url) {
			setError("Please enter a valid URL");
			return;
		}

		const urlExists = companies.some((company) => company.url === url);
		if (urlExists) {
			setError("This company has already been added");
			return;
		}

		setError("");
		setIsLoading(true);

		try {
			const newResponse = await getOpenAIResponse(url);
			setCompanies((old) => {
				const updatedProfiles = [newResponse, ...old];
				localStorage.setItem(
					LOCAL_STORAGE_KEY,
					JSON.stringify(updatedProfiles)
				);
				return updatedProfiles;
			});
		} catch {
			setError("Failed to fetch company data. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<header className="flex flex-col w-full justify-center gap-2 items-center py-20">
			<Image
				src="/logo.svg"
				alt="Pulse Profile"
				width={100}
				height={100}
				className="w-full mb-8 md:w-2/3 lg:w-1/2"
				priority
			/>
			<form
				onSubmit={handleSubmit}
				className="flex w-full gap-2 flex-col sm:flex-row"
			>
				<Input
					type="text"
					name="url"
					placeholder="Enter a URL"
					className={`w-full h-10 rounded-md border-2 p-2 outline-none text-gold ${
						error ? "border-red-500" : "border-gold-dark"
					}`}
					disabled={isLoading}
				/>
				<Button type="submit" variant="gold" disabled={isLoading}>
					{isLoading ? "Loading..." : "Submit"}
				</Button>
			</form>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}

			<CompaniesList companies={companies} />
		</header>
	);
}
