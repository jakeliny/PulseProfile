"use client";
import { useState, useEffect } from "react";
import { CompanyCard } from "@/components/company-card";
import { CompanyProfile } from "@/interfaces/company";
import { Header } from "@/components/header";
import { CompanyCardSkeleton } from "@/components/skeleton/company-card-skeleton";

const LOCAL_STORAGE_KEY = "company_profiles";

export default function Home() {
	const [companies, setCompanies] = useState<CompanyProfile[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const savedProfiles = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (savedProfiles) {
			setCompanies(JSON.parse(savedProfiles));
		}
	}, []);

	const handleRemoveCompany = (companyUrl: string) => {
		setCompanies((old) => {
			const filteredProfiles = old.filter(
				(company) => company.url !== companyUrl
			);
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredProfiles));
			return filteredProfiles;
		});
	};

	const handleUpdateCompany = (
		companyUrl: string,
		updates: Partial<CompanyProfile>
	) => {
		setCompanies((old) => {
			const updatedProfiles = old.map((company) => {
				if (company.url === companyUrl) {
					return { ...company, ...updates };
				}
				return company;
			});
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProfiles));
			return updatedProfiles;
		});
	};

	return (
		<div className="flex w-[80%] flex-col gap-8">
			<Header
				setCompanies={setCompanies}
				companies={companies}
				setIsLoading={setIsLoading}
				isLoading={isLoading}
			/>
			{isLoading && <CompanyCardSkeleton />}
			{companies.length > 0 &&
				companies.map((company) => (
					<CompanyCard
						key={company.url}
						company={company}
						onRemoveCompany={handleRemoveCompany}
						onUpdateCompany={handleUpdateCompany}
					/>
				))}
		</div>
	);
}
