import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

export function TextEditable({
	text,
	setText,
	label,
	type,
}: {
	text: string;
	setText: (text: string) => void;
	label?: string;
	type: "email" | "text" | "textarea";
}) {
	const [isEditing, setIsEditing] = useState(false);
	const [error, setError] = useState("");
	const [inputValue, setInputValue] = useState(text);

	useEffect(() => {
		setInputValue(text);
	}, [text]);

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleTextBlur = () => {
		if (inputValue) {
			if (type === "email" && !validateEmail(inputValue)) {
				setError("This field only accept a valid email");
				return;
			}
			setError("");
			setText(inputValue);
		}
		setIsEditing(false);
	};

	const handleTextClick = () => {
		setIsEditing(true);
		setError("");
	};

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleTextBlur();
		}
	};

	return (
		<div className="flex flex-col gap-2">
			<div className="flex flex-row items-center gap-2">
				{label && <p className="text-gold font-bold text-sm">{label}:</p>}
				{isEditing ? (
					type === "textarea" ? (
						<Textarea
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onBlur={handleTextBlur}
							onKeyDown={handleKeyDown}
							className={cn(
								"w-full outline-none",
								error && "border-red-500 focus-visible:ring-red-500"
							)}
							autoFocus
						/>
					) : (
						<Input
							type={type}
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							onBlur={handleTextBlur}
							onKeyDown={handleKeyDown}
							className={cn(
								"w-full outline-none",
								error && "border-red-500 focus-visible:ring-red-500"
							)}
							autoFocus
						/>
					)
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
