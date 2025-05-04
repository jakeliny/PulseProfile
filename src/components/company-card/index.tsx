import { CompanyProfile } from "@/interfaces/company";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TagsArea } from "@/components/tags-area";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { TextEditable } from "../text-editable";

export function CompanyCard({ company }: { company: CompanyProfile }) {
	const [email, setEmail] = useState(company.email || "");
	const [poc, setPoc] = useState(company.poc || "");

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-gold text-2xl font-bold">
					{company.company_name}
				</CardTitle>
				<CardDescription>{company.company_description}</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<div className="flex flex-col gap-2">
					<TextEditable
						label="Email"
						text={email}
						setText={setEmail}
						type="email"
					/>
					<TextEditable label="POC" text={poc} setText={setPoc} type="text" />
				</div>
			</CardContent>
			<Separator className="my-4" />
			<CardContent className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<p className="text-gold font-bold text-sm">Services:</p>
					<TagsArea tags={company.service_line} />
				</div>
				<div className="flex flex-col gap-2">
					<p className="text-gold font-bold text-sm">Tier 1 Keywords:</p>
					<TagsArea tags={company.tier1_keywords.join(", ")} />
				</div>
				<div className="flex flex-col gap-2">
					<p className="text-gold font-bold text-sm">Tier 2 Keywords:</p>
					<TagsArea tags={company.tier2_keywords.join(", ")} />
				</div>
			</CardContent>
		</Card>
	);
}
