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

export function CompanyCard({
	company,
	onRemoveCompany,
	onUpdateCompany,
}: {
	company: CompanyProfile;
	onRemoveCompany: (companyUrl: string) => void;
	onUpdateCompany: (
		companyUrl: string,
		updates: Partial<CompanyProfile>
	) => void;
}) {
	const [email, setEmail] = useState(company.email || "");
	const [poc, setPoc] = useState(company.poc || "");
	const [companyName, setCompanyName] = useState(company.company_name || "");
	const [companyDescription, setCompanyDescription] = useState(
		company.company_description || ""
	);
	const [serviceLine, setServiceLine] = useState(company.service_line || "");
	const [tier1Keywords, setTier1Keywords] = useState(
		company.tier1_keywords.join(", ") || ""
	);
	const [tier2Keywords, setTier2Keywords] = useState(
		company.tier2_keywords.join(", ") || ""
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-gold text-2xl font-bold flex justify-between">
					<TextEditable
						text={companyName}
						setText={(text) => {
							setCompanyName(text);
							onUpdateCompany(company.url, { company_name: text });
						}}
						type="text"
					/>
					<span
						className="text-red-500 cursor-pointer text-sm"
						onClick={() => onRemoveCompany(company.url)}
					>
						Remove
					</span>
				</CardTitle>
				<CardDescription>
					<TextEditable
						text={companyDescription}
						type="textarea"
						setText={(text) => {
							setCompanyDescription(text);
							onUpdateCompany(company.url, { company_description: text });
						}}
					/>
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<div className="flex flex-col gap-2">
					<TextEditable
						label="Email"
						text={email}
						setText={(text) => {
							setEmail(text);
							onUpdateCompany(company.url, { email: text });
						}}
						type="email"
					/>
					<TextEditable
						label="POC"
						text={poc}
						setText={(text) => {
							setPoc(text);
							onUpdateCompany(company.url, { poc: text });
						}}
						type="text"
					/>
				</div>
			</CardContent>
			<Separator className="my-4" />
			<CardContent className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<p className="text-gold font-bold text-sm">Services:</p>
					<TagsArea
						tags={serviceLine}
						setTags={(text) => {
							setServiceLine(text);
							onUpdateCompany(company.url, { service_line: text });
						}}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<p className="text-gold font-bold text-sm">Tier 1 Keywords:</p>
					<TagsArea
						tags={tier1Keywords}
						setTags={(text) => {
							setTier1Keywords(text);
							onUpdateCompany(company.url, {
								tier1_keywords: text.split(", "),
							});
						}}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<p className="text-gold font-bold text-sm">Tier 2 Keywords:</p>
					<TagsArea
						tags={tier2Keywords}
						setTags={(text) => {
							setTier2Keywords(text);
							onUpdateCompany(company.url, {
								tier2_keywords: text.split(", "),
							});
						}}
					/>
				</div>
			</CardContent>
		</Card>
	);
}
