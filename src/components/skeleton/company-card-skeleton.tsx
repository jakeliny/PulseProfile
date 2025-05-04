import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function CompanyCardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Skeleton className="w-1/2 h-8 rounded-md" />
				</CardTitle>
				<Skeleton className="w-full h-4 rounded-md mt-2" />
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<div className="flex flex-col gap-2">
					<Skeleton className="w-1/3 h-4 rounded-md" />
					<Skeleton className="w-1/2 h-8 rounded-md" />
					<Skeleton className="w-1/3 h-4 rounded-md mt-2" />
					<Skeleton className="w-1/2 h-8 rounded-md" />
				</div>
			</CardContent>
			<Separator className="my-4" />
			<CardContent className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<Skeleton className="w-1/4 h-4 rounded-md" />
					<Skeleton className="w-full h-12 rounded-md" />
				</div>
				<div className="flex flex-col gap-2">
					<Skeleton className="w-1/4 h-4 rounded-md" />
					<Skeleton className="w-full h-12 rounded-md" />
				</div>
				<div className="flex flex-col gap-2">
					<Skeleton className="w-1/4 h-4 rounded-md" />
					<Skeleton className="w-full h-12 rounded-md" />
				</div>
			</CardContent>
		</Card>
	);
}
