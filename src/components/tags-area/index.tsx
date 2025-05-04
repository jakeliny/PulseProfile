import { Button } from "../ui/button";
import { useState, useRef, KeyboardEvent } from "react";

export function TagsArea({
	tags,
	setTags,
}: {
	tags: string;
	setTags: (tags: string) => void;
}) {
	const [isInputVisible, setIsInputVisible] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const handleAddTag = () => {
		if (inputValue.trim()) {
			const newTag = inputValue.trim();
			const existingTags = tags.split(",").filter(Boolean);

			if (existingTags.includes(newTag)) {
				setError("This tag already exists");
				return;
			}

			const newTags = tags ? `${tags},${newTag}` : newTag;
			setTags(newTags);
			setError("");
		}
		setInputValue("");
		setIsInputVisible(false);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleAddTag();
		}
	};

	const handleRemoveTag = (tagToRemove: string) => {
		const tagsArray = tags.split(",");
		const filteredTags = tagsArray.filter((tag) => tag !== tagToRemove);
		setTags(filteredTags.join(","));
		setError("");
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-row gap-2 border-2 border-gold-dark/50 rounded-md p-3 flex-wrap">
				{tags.split(",").map(
					(tag) =>
						tag && (
							<div
								key={tag}
								className="p-2 rounded-md bg-zinc-300 flex flex-row items-center gap-2 justify-between"
							>
								<span className="text-gold-dark font-bold text-sm flex break-all whitespace-normal">
									{tag}
								</span>
								<button
									onClick={() => handleRemoveTag(tag)}
									className="text-gold-dark font-bold text-sm hover:text-red-500 cursor-pointer"
								>
									X
								</button>
							</div>
						)
				)}
				{isInputVisible ? (
					<div className="p-2 rounded-md bg-zinc-300 flex flex-row items-center gap-2 justify-between">
						<input
							ref={inputRef}
							type="text"
							value={inputValue}
							onChange={(e) => {
								setInputValue(e.target.value);
								setError("");
							}}
							onKeyDown={handleKeyDown}
							onBlur={handleAddTag}
							className="text-gold-dark font-bold text-sm bg-transparent outline-none w-full"
							autoFocus
						/>
						<button
							onClick={() => {
								setInputValue("");
								setIsInputVisible(false);
								setError("");
							}}
							className="text-gold-dark font-bold text-sm hover:text-red-500 cursor-pointer"
						>
							X
						</button>
					</div>
				) : (
					<Button variant="gold" onClick={() => setIsInputVisible(true)}>
						Add +
					</Button>
				)}
			</div>
			{error && <span className="text-red-500 text-sm">{error}</span>}
		</div>
	);
}
