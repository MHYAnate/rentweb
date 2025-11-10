"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import SearchCTO from "./search";
import { PremiumCarousel } from "../carousel/carousel";

interface SearchCTOProps {
	filters: any;
	setFilters: (filters: any) => void;
	handleSearch: (query: any) => void;
}

export default function Hero({
	filters,
	setFilters,
	handleSearch,
}: SearchCTOProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
    <section className="relative">
  {/* Background carousel */}
  <div className="absolute inset-0 z-0">
    <PremiumCarousel />
  </div>

  {/* Foreground content */}
  <div className="relative z-10 container mx-auto min-h-[600px] px-4">

    <div className="absolute bottom-0 left-0 w-full sm:bottom-0 sm:px-0 lg:w-2/3 mx-auto space-y-6 flex flex-col px-4 pb-10">
  <SearchCTO
    filters={filters}
    setFilters={setFilters}
    handleSearch={handleSearch}
  />


</div>
  </div>

  {/* Animations */}
  <style jsx>{`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .feature-card {
      opacity: 0;
    }
    .feature-visible {
      animation: fadeInUp 0.5s ease-out forwards;
    }
  `}</style>
</section>
	);
}
