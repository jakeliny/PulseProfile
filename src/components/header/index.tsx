import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getOpenAIResponse } from "@/api/openai";
import { CompanyProfile } from "@/interfaces/company";

const LOCAL_STORAGE_KEY = "company_profiles";

export function Header({
	response,
	setResponse,
}: {
	response: CompanyProfile[];
	setResponse: (
		response: CompanyProfile[] | ((old: CompanyProfile[]) => CompanyProfile[])
	) => void;
}) {
	const [error, setError] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const url = (e.target as HTMLFormElement).url.value;

		const urlExists = response.some((company) => company.url === url);
		if (urlExists) {
			setError("This company has already been added");
			return;
		}

		setError("");
		const newResponse = await getOpenAIResponse(url);

		setResponse((old) => {
			const updatedProfiles = [newResponse, ...old];
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProfiles));
			return updatedProfiles;
		});
	};

	return (
		<header className="flex flex-col w-full justify-center gap-2 h-50 items-center">
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
					className={`w-full h-10 rounded-md border-2 p-2 outline-none ${
						error ? "border-red-500" : "border-gold-dark"
					} ${error ? "text-red-500" : "text-gold-dark"}`}
				/>
				<Button type="submit" variant="gold">
					Submit
				</Button>
			</form>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</header>
	);
}
