"use server";

import OpenAI from "openai";

const OpenAIClient = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const mockResponse = {
	company_name: "Suzano S.A.",
	service_line: "Pulp, Paper, and Bioproducts Manufacturing",
	company_description:
		"Suzano S.A. is a global leader in the production of eucalyptus pulp and one of the largest paper producers in Latin America. The company specializes in renewable, sustainable forestry solutions, offering a wide range of products including pulp, printing and writing paper, tissue, packaging, and innovative bioproducts as alternatives to fossil-based materials. Suzano is recognized for its commitment to environmental responsibility and technological innovation, aiming to create sustainable growth and contribute to a bioeconomy.",
	tier1_keywords: [
		"pulp",
		"paper",
		"eucalyptus pulp",
		"renewables",
		"bioproducts",
		"sustainability",
	],
	tier2_keywords: [
		"tissue paper",
		"packaging",
		"bioeconomy",
		"forestry",
		"reforestation",
		"environmental responsibility",
		"packaging solutions",
		"innovation",
	],
};

export async function getOpenAIResponseReal(url: string) {
	const prompt = `
    Based on the content of this website ${url}, return a JSON with the following structure:
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
		// tools: [{  type: "web_search_preview" }],
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

	return JSON.parse(response.choices[0].message.content || "");
}

export async function getOpenAIResponse(url: string) {
	return mockResponse;
}
