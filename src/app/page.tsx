"use client";
import { useState } from "react";
import { getOpenAIResponse, OpenAIResponse } from "@/api/openai";

export default function Home() {
	const [response, setResponse] = useState<OpenAIResponse | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const url = (e.target as HTMLFormElement).url.value;
		const response = await getOpenAIResponse(url);
		setResponse(response);
	};
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" name="url" />
				<button type="submit">Submit</button>
			</form>
			<div>
				<h1>Response</h1>
				{response && (
					<>
						<p>{response.company_name}</p>
						<p>{response.service_line}</p>
						<p>{response.company_description}</p>
						<p>{response.tier1_keywords.join(", ")}</p>
						<p>{response.tier2_keywords.join(", ")}</p>
					</>
				)}
			</div>
		</div>
	);
}
