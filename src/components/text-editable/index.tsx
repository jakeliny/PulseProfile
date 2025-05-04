import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useState } from "react";

export function TextEditable({
	text,
	setText,
	label,
	type,
}: {
	text: string;
	setText: (text: string) => void;
	label: string;
	type: "email" | "text";
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState("");

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleTextBlur = () => {
		if (text) {
			if (type === "email" && !validateEmail(text)) {
				setError("This field only accept a valid email");
				return;
			}
			setError("");
		}
		setIsEditing(false);
	};

	const handleTextClick = () => {
		setIsEditing(true);
		setError("");
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleTextBlur();
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-row items-center gap-2">
				<p className="text-gold font-bold text-sm">{label}:</p>
				{isEditing ? (
					<Input
						type={type}
						value={text}
						onChange={(e) => setText(e.target.value)}
						onBlur={handleTextBlur}
						onKeyDown={handleKeyDown}
						className={cn(
							"w-1/2 outline-none",
							error && "border-red-500 focus-visible:ring-red-500"
						)}
						autoFocus
					/>
				) : (
					<p
						onClick={handleTextClick}
						className={cn(
							"text-md cursor-pointer py-1.5",
							!text && "italic text-muted-foreground"
						)}
					>
						{text || `insert ${label}`}
					</p>
				)}
			</div>
			{error && <p className="text-sm text-red-500">{error}</p>}
		</div>
	);
}
