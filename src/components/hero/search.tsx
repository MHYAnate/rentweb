"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import SearchSvg from "./searchSvg";
import XSvg from "./xSvg";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./styles.module.css";
import SearchFilters from "../Properties/SearchFilters";

interface EstateProps {
	id: number;
	name: string;
	src: string;
	link: string;
}

interface SearchComponentProps {
	estateList: EstateProps[];
}
interface SearchCTOProps {
  filters: any;
  setFilters: (filters: any) => void;
  handleSearch: (query: any) => void;
}



export default function SearchCTO({ filters, setFilters, handleSearch }: SearchCTOProps) {
	const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

  useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);


	return (
		<div className={styles.card}>
			<div className="w-full">
				<div className="flex flex-col sm:flex-row gap-3">
					<div className="relative flex-1">				
						<SearchFilters filters={filters} onFiltersChange={setFilters} onSearch={handleSearch}/>
					</div>
				</div>
			</div>
		</div>
	);
}