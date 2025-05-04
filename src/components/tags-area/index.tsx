export function TagsArea({ tags }: { tags: string }) {
	return (
		<div className="flex flex-row gap-2 border-2 border-gold-dark/50 rounded-md p-3 flex-wrap">
			{tags.split(",").map((tag) => (
				<div
					key={tag}
					className="p-2 rounded-md bg-zinc-300 flex flex-row items-center gap-2 justify-between"
				>
					<span className="text-gold-dark  font-bold text-sm">{tag}</span>
					<span className="text-gold-dark font-bold text-sm">X</span>
				</div>
			))}
		</div>
	);
}
