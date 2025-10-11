"use client";
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";

interface CarouselSlide {
	id: number;
	title: string;
	subtitle?: string;
	description?: string;
	primaryCTA?: string;
	secondaryCTA?: string;
	image: string;
	imageAlt: string;
}

const slides: CarouselSlide[] = [
	{
		id: 1,
		title: "Premium Real Estate at Your Fingertips",
		primaryCTA: "Join Today",
		secondaryCTA: "Login",
		image: "/image/p3.png",
		imageAlt: "Luxury apartment interior",
	},
	{
		id: 2,
		title: "Manage with Confidence",
		image: "/image/p2.png",
		imageAlt: "Real estate analytics dashboard",
	},
	{
		id: 3,
		title: "24/7 Support Team",
		primaryCTA: "Start Your Journey",
		secondaryCTA: "Contact Us",
		image: "/image/p1.png",
		imageAlt: "Modern house exterior",
	},
	{
		id: 4,
		title: "Join Our Community",
		primaryCTA: "Sign Up Free",
		secondaryCTA: "Resume",
		image: "/image/p4.png",
		imageAlt: "Real estate professionals",
	},
];

export function PremiumCarousel() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const [isTransitioning, setIsTransitioning] = useState(false);

	// No direction state needed anymore, CSS handles it
	// const [direction, setDirection] = useState<"left" | "right">("right")

	const nextSlide = useCallback(() => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentSlide((prev) => (prev + 1) % slides.length);
		setTimeout(() => setIsTransitioning(false), 1000); // Match CSS transition duration
	}, [isTransitioning]);

	const prevSlide = useCallback(() => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
		setTimeout(() => setIsTransitioning(false), 1000); // Match CSS transition duration
	}, [isTransitioning]);

	const goToSlide = useCallback(
		(index: number) => {
			if (isTransitioning || index === currentSlide) return;
			setIsTransitioning(true);
			setCurrentSlide(index);
			setTimeout(() => setIsTransitioning(false), 2000); // Match CSS transition duration
		},
		[currentSlide, isTransitioning]
	);

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	useEffect(() => {
		if (!isPlaying) return;

		const interval = setInterval(() => {
			nextSlide();
		}, 5000);

		return () => clearInterval(interval);
	}, [isPlaying, nextSlide]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") prevSlide();
			if (e.key === "ArrowRight") nextSlide();
			if (e.key === " ") {
				e.preventDefault();
				togglePlayPause();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [nextSlide, prevSlide]);

	// CHANGED: Helper function to determine the position of each slide
	const getPosition = (index: number) => {
		const totalSlides = slides.length;
		if (index === currentSlide) {
			return "current";
		}
		if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
			return "prev";
		}
		if (index === (currentSlide + 1) % totalSlides) {
			return "next";
		}
		return "hidden";
	};

	// CHANGED: The renderCard function is now simpler
	const renderCard = (slide: CarouselSlide, index: number) => {
		const position = getPosition(index);
		const isCenter = position === "current";

		// CHANGED: Simplified getCardStyle logic, relying only on position
		const getCardStyle = (): React.CSSProperties => {
			const baseStyle: React.CSSProperties = {
				position: "absolute",
				top: "50%",
				width: "85%",
				height: "85%",
				transformStyle: "preserve-3d",
				backfaceVisibility: "hidden",
				transition: "all 3000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
				cursor: !isCenter ? "pointer" : "default",
				willChange: "transform, opacity, filter",
			};

			switch (position) {
				case "prev":
					return {
						...baseStyle,
						right: "0",
						transform:
							"translateX(20%) translateY(-50%) scale(0.78) rotateY(-12deg)",
						opacity: 0.35,
						zIndex: 10,
						filter: "blur(1px) brightness(0.7)",
					};
				case "next":
					return {
						...baseStyle,
						left: "0",
						transform:
							"translateX(-20%) translateY(-50%) scale(0.78) rotateY(12deg)",
						opacity: 0.35,
						zIndex: 10,
						filter: "blur(1px) brightness(0.7)",
					};
				case "current":
					return {
						...baseStyle,
						left: "50%",
						transform:
							"translateX(-50%) translateY(-50%) scale(1) rotateY(0deg)",
						opacity: 1,
						zIndex: 30,
						filter: "blur(0px) brightness(1)",
					};
				default: // hidden
					return {
						...baseStyle,
						left: "50%",
						transform: "translateX(-50%) translateY(-50%) scale(0.5)",
						opacity: 0,
						zIndex: 0,
						filter: "blur(5px)",
					};
			}
		};

		const cardHoverStyle: React.CSSProperties = !isCenter
			? {
					transform:
						position === "prev"
							? "translateX(20%) translateY(-50%) scale(0.82) rotateY(-12deg)"
							: "translateX(-20%) translateY(-50%) scale(0.82) rotateY(12deg)",
					opacity: 0.55,
					filter: "blur(0.5px) brightness(0.8)",
			  }
			: {};

		return (
			<div
				style={getCardStyle()}
				onMouseEnter={(e) => {
					if (!isCenter && !isTransitioning) {
						Object.assign(e.currentTarget.style, cardHoverStyle);
					}
				}}
				onMouseLeave={(e) => {
					if (!isCenter) {
						Object.assign(e.currentTarget.style, getCardStyle());
					}
				}}
				onClick={() => {
					if (position === "prev") prevSlide();
					if (position === "next") nextSlide();
				}}
			>
				<div
					style={{
						position: "relative",
						width: "100%",
						height: "100%",
						borderRadius: "16px",
						overflow: "hidden",
						boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
					}}
				>
					<Image
						src={slide.image || "/placeholder.svg"}
						alt={slide.imageAlt}
						fill
						style={{
							objectFit: "cover",
							transition:
								"transform 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
							transform: isCenter ? "scale(1)" : "scale(1.1)",
						}}
						priority={isCenter}
					/>

					<div
						style={{
							position: "absolute",
							inset: 0,
							background:
								"linear-gradient(to right, rgba(23, 23, 23, 0.95), rgba(23, 23, 23, 0.8), rgba(23, 23, 23, 0.4))",
							transition: "all 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
							filter: !isCenter
								? "brightness(0.5) saturate(0.5)"
								: "brightness(1) saturate(1)",
						}}
					/>

					{isCenter && (
						<div
							style={{
								position: "relative",
								height: "100%",
								display: "flex",
								alignItems: "center",
								padding: "0 4rem",
							}}
						>
							<div
								style={{
									maxWidth: "42rem",
									display: "flex",
									flexDirection: "column",
									gap: "1.5rem",
								}}
							>
								{slide.subtitle && (
									<div
										style={{
											transition: "all 900ms cubic-bezier(0.16, 1, 0.3, 1)",
											transitionDelay: isTransitioning ? "0ms" : "200ms",
											opacity: isTransitioning ? 0 : 1,
											transform: isTransitioning
												? "translateY(1.5rem) scale(0.96)"
												: "translateY(0) scale(1)",
										}}
									>
										<p
											style={{
												color: "rgba(255, 255, 255, 0.8)",
												fontWeight: 600,
												fontSize: "0.875rem",
												letterSpacing: "0.1em",
												textTransform: "uppercase",
											}}
										>
											{slide.subtitle}
										</p>
									</div>
								)}

								{slide.title && (
									<div
										style={{
											transition: "all 900ms cubic-bezier(0.16, 1, 0.3, 1)",
											transitionDelay: isTransitioning ? "0ms" : "300ms",
											opacity: isTransitioning ? 0 : 1,
											transform: isTransitioning
												? "translateY(2rem) scale(0.96)"
												: "translateY(0) scale(1)",
											filter: isTransitioning ? "blur(3px)" : "blur(0)",
										}}
									>
										<h1
											style={{
												fontSize: "clamp(2rem, 5vw, 3.75rem)",
												fontWeight: 700,
												color: "white",
												lineHeight: 1.2,
												textWrap: "balance",
											}}
										>
											{slide.title}
										</h1>
									</div>
								)}

								{slide.description && (
									<div
										style={{
											transition: "all 900ms cubic-bezier(0.16, 1, 0.3, 1)",
											transitionDelay: isTransitioning ? "0ms" : "400ms",
											opacity: isTransitioning ? 0 : 1,
											transform: isTransitioning
												? "translateY(1.5rem) scale(0.96)"
												: "translateY(0) scale(1)",
										}}
									>
										<p
											style={{
												fontSize: "clamp(1rem, 2vw, 1.125rem)",
												color: "rgba(255, 255, 255, 0.9)",
												fontWeight: 500,
												lineHeight: 1.6,
												maxWidth: "40rem",
												textWrap: "pretty",
											}}
										>
											{slide.description}
										</p>
									</div>
								)}

								{(slide.primaryCTA || slide.secondaryCTA) && (
									<div
										style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
									>
										{slide.primaryCTA && (
											<div
												style={{
													transition: "all 900ms cubic-bezier(0.16, 1, 0.3, 1)",
													transitionDelay: isTransitioning ? "0ms" : "500ms",
													opacity: isTransitioning ? 0 : 1,
													transform: isTransitioning
														? "translateY(1.5rem) translateX(-1rem) scale(0.92)"
														: "translateY(0) translateX(0) scale(1)",
												}}
											>
												<Button
													size="lg"
													style={{
														backgroundColor: "white",
														color: "black",
														fontWeight: 600,
														padding: "1.5rem 2rem",
														borderRadius: "0.5rem",
														boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
														transition: "all 300ms",
													}}
													onMouseEnter={(e) => {
														e.currentTarget.style.transform = "scale(1.05)";
														e.currentTarget.style.boxShadow =
															"0 20px 25px -5px rgba(0, 0, 0, 0.4)";
													}}
													onMouseLeave={(e) => {
														e.currentTarget.style.transform = "scale(1)";
														e.currentTarget.style.boxShadow =
															"0 10px 15px -3px rgba(0, 0, 0, 0.3)";
													}}
												>
													{slide.primaryCTA}
												</Button>
											</div>
										)}
										{slide.secondaryCTA && (
											<div
												style={{
													transition: "all 900ms cubic-bezier(0.16, 1, 0.3, 1)",
													transitionDelay: isTransitioning ? "0ms" : "600ms",
													opacity: isTransitioning ? 0 : 1,
													transform: isTransitioning
														? "translateY(1.5rem) translateX(1rem) scale(0.92)"
														: "translateY(0) translateX(0) scale(1)",
												}}
											>
												<Button
													size="lg"
													variant="outline"
													style={{
														border: "2px solid rgba(255, 255, 255, 0.3)",
														color: "white",
														backgroundColor: "transparent",
														backdropFilter: "blur(8px)",
														fontWeight: 600,
														padding: "1.5rem 2rem",
														borderRadius: "0.5rem",
														transition: "all 300ms",
													}}
													onMouseEnter={(e) => {
														e.currentTarget.style.backgroundColor =
															"rgba(255, 255, 255, 0.1)";
														e.currentTarget.style.transform = "scale(1.05)";
													}}
													onMouseLeave={(e) => {
														e.currentTarget.style.backgroundColor =
															"transparent";
														e.currentTarget.style.transform = "scale(1)";
													}}
												>
													{slide.secondaryCTA}
												</Button>
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					)}

					{!isCenter && (
						<div
							style={{
								position: "absolute",
								bottom: "2rem",
								left: "2rem",
								right: "2rem",
								transition: "all 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
								opacity: isTransitioning ? 0 : 1,
								transform: isTransitioning
									? "translateY(1rem)"
									: "translateY(0)",
							}}
						>
							<h3
								style={{
									fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
									fontWeight: 700,
									color: "rgba(255, 255, 255, 0.7)",
									textWrap: "balance",
								}}
							>
								{slide.title}
							</h3>
						</div>
					)}
				</div>
			</div>
		);
	};

	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "clamp(500px, 90vh, 700px)",
				overflow: "hidden",
				backgroundColor: "#c28840", // Changed to white for better visibility of overflow
			}}
		>
			<div
				style={{
					position: "relative",
					width: "100%",
					height: "100%",
					perspective: "2500px",
					perspectiveOrigin: "50% 50%",
				}}
			>
				{/* CHANGED: Map over all slides and render them */}
				{slides.map((slide, index) => (
					// The key is crucial for React to track which element is which
					<React.Fragment key={slide.id}>
						{renderCard(slide, index)}
					</React.Fragment>
				))}
			</div>

			{/* Navigation Controls (No changes needed here) */}
			<div
				style={{
					position: "absolute",
					bottom: "2rem",
					left: 0,
					right: 0,
					padding: "0 3rem",
					zIndex: 40,
				}}
			>
				<div
					style={{
						maxWidth: "80rem",
						margin: "0 auto",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: "0.75rem",
							backgroundColor: "rgba(0, 0, 0, 0.2)",
							backdropFilter: "blur(12px)",
							padding: "0.75rem 1rem",
							borderRadius: "9999px",
							boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
						}}
					>
						{slides.map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								style={{
									width: index === currentSlide ? "3rem" : "0.5rem",
									height: "0.5rem",
									backgroundColor:
										index === currentSlide
											? "white"
											: "rgba(255, 255, 255, 0.4)",
									borderRadius: "9999px",
									border: "none",
									cursor: "pointer",
									transition: "all 600ms cubic-bezier(0.34, 1.56, 0.64, 1)",
									boxShadow:
										index === currentSlide
											? "0 0 10px rgba(255, 255, 255, 0.5)"
											: "none",
								}}
								onMouseEnter={(e) => {
									if (index !== currentSlide) {
										e.currentTarget.style.backgroundColor =
											"rgba(255, 255, 255, 0.6)";
										e.currentTarget.style.transform = "scale(1.25)";
									}
								}}
								onMouseLeave={(e) => {
									if (index !== currentSlide) {
										e.currentTarget.style.backgroundColor =
											"rgba(255, 255, 255, 0.4)";
										e.currentTarget.style.transform = "scale(1)";
									}
								}}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>
			</div>
			<div
				style={{
					position: "absolute",
					top: "2rem",
					left: 0,
					right: 0,
					padding: "0 3rem",
					zIndex: 40,
				}}
			>
        	<div
					style={{
						maxWidth: "80rem",
						margin: "0 auto",
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
					}}
				>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						gap: "0.5rem",
						backgroundColor: "rgba(0, 0, 0, 0.2)",
						backdropFilter: "blur(12px)",
						padding: "0.5rem",
						borderRadius: "9999px",
						boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
					}}
				>
					<Button
						variant="ghost"
						size="icon"
						onClick={prevSlide}
						disabled={isTransitioning}
						style={{
							color: "white",
							borderRadius: "9999px",
							width: "3rem",
							height: "3rem",
							transition: "all 300ms",
							opacity: isTransitioning ? 0.5 : 1,
							cursor: isTransitioning ? "not-allowed" : "pointer",
						}}
						onMouseEnter={(e) => {
							if (!isTransitioning) {
								e.currentTarget.style.backgroundColor =
									"rgba(255, 255, 255, 0.1)";
								e.currentTarget.style.transform = "scale(1.1)";
							}
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "transparent";
							e.currentTarget.style.transform = "scale(1)";
						}}
						aria-label="Previous slide"
					>
						<ChevronLeft style={{ width: "1.5rem", height: "1.5rem" }} />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={togglePlayPause}
						style={{
							color: "white",
							borderRadius: "9999px",
							width: "3rem",
							height: "3rem",
							transition: "all 300ms",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor =
								"rgba(255, 255, 255, 0.1)";
							e.currentTarget.style.transform = "scale(1.1)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "transparent";
							e.currentTarget.style.transform = "scale(1)";
						}}
						aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
					>
						{isPlaying ? (
							<Pause style={{ width: "1.25rem", height: "1.25rem" }} />
						) : (
							<Play style={{ width: "1.25rem", height: "1.25rem" }} />
						)}
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={nextSlide}
						disabled={isTransitioning}
						style={{
							color: "white",
							borderRadius: "9999px",
							width: "3rem",
							height: "3rem",
							transition: "all 300ms",
							opacity: isTransitioning ? 0.5 : 1,
							cursor: isTransitioning ? "not-allowed" : "pointer",
						}}
						onMouseEnter={(e) => {
							if (!isTransitioning) {
								e.currentTarget.style.backgroundColor =
									"rgba(255, 255, 255, 0.1)";
								e.currentTarget.style.transform = "scale(1.1)";
							}
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "transparent";
							e.currentTarget.style.transform = "scale(1)";
						}}
						aria-label="Next slide"
					>
						<ChevronRight style={{ width: "1.5rem", height: "1.5rem" }} />
					</Button>
				</div>
        </div>
			</div>
		</div>
	);
}
