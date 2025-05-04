import { CompanyProfile } from "@/interfaces/company";
export function CompaniesList({ companies }: { companies: CompanyProfile[] }) {
	return (
		<div className="flex gap-2">
			{companies.map((company, index) => (
				<div key={company.url} className="flex gap-2 items-center">
					<a
						href={`#${company.url}`}
						className="text-gold font-bold text-sm underline"
					>
						{company.company_name}
					</a>
					{index < companies.length - 1 && <span className="text-gold">|</span>}
				</div>
			))}
		</div>
	);
}
