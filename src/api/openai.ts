"use server";

import { CompanyProfile } from "@/interfaces/company";
import OpenAI from "openai";

const OpenAIClient = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function getOpenAIResponse(url: string): Promise<CompanyProfile> {
	const prompt = `
    Based on the content of this website ${url}, return a JSON with the following structure always in english:
        {
          "company_name": ___,
          "service_line": ___,
          "company_description": ___,
          "tier1_keywords": ___,
          "tier2_keywords": ___
        }. The website content is: {{URL}}`;

	console.log("fazendo request...", new Date().toISOString());
	const response = await OpenAIClient.chat.completions.create({
		model: "gpt-4.1",
		messages: [
			{
				role: "system",
				content:
					"You are a helpful assistant that extracts structured company profiles from website content. ",
			},
			{
				role: "user",
				content: prompt,
			},
		],
	});

	const result = JSON.parse(response.choices[0].message.content || "");

	return {
		...result,
		url: url,
	};
}
