import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CompanyCardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Skeleton className="w-full h-10 rounded-md" />
				</CardTitle>
			</CardHeader>
		</Card>
	);
}
