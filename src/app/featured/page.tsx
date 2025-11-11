"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useProperties } from "@/hooks/useProperties";
import { PropertyCard } from "@/components/Properties/proCard";
import { SearchFilters } from "@/components/Properties/searchFilter";

interface SearchParams {
	page?: string;
	search?: string;
	listingType?: string;
	propertyType?: string;
	city?: string;
	state?: string;
	minPrice?: string;
	maxPrice?: string;
	bedrooms?: string;
	bathrooms?: string;
	sortBy?: string;
	sortOrder?: string;
	isFeatured?: string;
}

export default function PropertiesPage({
	searchParams,
}: {
	searchParams: Promise<SearchParams>;
}) {
	// Unwrap the Promise using React.use()
	const resolvedSearchParams = use(searchParams);

	const [filters, setFilters] = useState({
		search: resolvedSearchParams.search || "",
		listingType: resolvedSearchParams.listingType || "",
		propertyType: resolvedSearchParams.propertyType || "",
		city: resolvedSearchParams.city || "",
		state: resolvedSearchParams.state || "",
		minPrice: resolvedSearchParams.minPrice || "",
		maxPrice: resolvedSearchParams.maxPrice || "",
		bedrooms: resolvedSearchParams.bedrooms || "",
		bathrooms: resolvedSearchParams.bathrooms || "",
		sortBy: resolvedSearchParams.sortBy || "createdAt",
		sortOrder: resolvedSearchParams.sortOrder || "desc",
		isFeatured: resolvedSearchParams.isFeatured || "",
	});

	const currentPage = parseInt(resolvedSearchParams.page || "1");

	const { data, isLoading, error } = useProperties({
		...filters,
		page: currentPage,
		limit: 12,
	});

	const updateFilters = (newFilters: Partial<typeof filters>) => {
		setFilters((prev) => ({ ...prev, ...newFilters }));
	};

	const updateURL = (newParams: Record<string, string>) => {
		const url = new URL(window.location.href);
		Object.entries(newParams).forEach(([key, value]) => {
			if (value) {
				url.searchParams.set(key, value);
			} else {
				url.searchParams.delete(key);
			}
		});
		url.searchParams.set("page", "1");
		window.history.pushState({}, "", url.toString());
	};

	// Function to clear featured filter and show all properties
	const showAllProperties = () => {
		const newFilters = { ...filters, isFeatured: "" };
		setFilters(newFilters);

		const url = new URL(window.location.href);
		url.searchParams.delete("isFeatured");
		url.searchParams.set("page", "1");
		window.history.pushState({}, "", url.toString());
	};

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Error loading properties
					</h2>
					<p className="text-gray-600">
						Please try refreshing the page or check your connection.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between">
						<div className="flex-1">
							<h1 className="text-3xl font-bold text-gray-900">
								Find Your Perfect Property
							</h1>
							<p className="text-gray-600 mt-2">
								Discover amazing properties for rent and sale
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex flex-col lg:flex-row gap-8">
					{/* Filters Sidebar */}
					<div className="lg:w-1/4">
						<SearchFilters
							filters={filters}
							onFiltersChange={updateFilters}
							onApplyFilters={updateURL}
						/>
					</div>

					{/* Properties Grid */}
					<div className="lg:w-3/4">
						{/* Results Header */}
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
							<div>
								<h2 className="text-xl font-semibold text-gray-900">
									{isLoading
										? "Loading..."
										: `${data?.pagination?.total || 0} Properties Found`}
								</h2>
								{filters.search && (
									<p className="text-gray-600 text-sm mt-1">
										Search results for {filters.search}
									</p>
								)}
								<div className="flex items-center gap-2 mt-1">
									<p className="text-indigo-600 text-sm font-medium">
										Showing featured properties
									</p>
								</div>
							</div>

							{/* Sort Options */}
							<select
								value={`${filters.sortBy}-${filters.sortOrder}`}
								onChange={(e) => {
									const [sortBy, sortOrder] = e.target.value.split("-");
									updateFilters({ sortBy, sortOrder });
									updateURL({ sortBy, sortOrder });
								}}
								className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							>
								<option value="createdAt-desc">Newest First</option>
								<option value="createdAt-asc">Oldest First</option>
								<option value="price-asc">Price: Low to High</option>
								<option value="price-desc">Price: High to Low</option>
								<option value="title-asc">Name: A to Z</option>
								<option value="title-desc">Name: Z to A</option>
							</select>
						</div>

						{/* Loading State */}
						{isLoading ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{Array.from({ length: 6 }).map((_, i) => (
									<div
										key={i}
										className="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse"
									>
										<div className="h-48 bg-gray-300 rounded-t-lg"></div>
										<div className="p-4 space-y-3">
											<div className="h-4 bg-gray-300 rounded w-3/4"></div>
											<div className="h-3 bg-gray-300 rounded w-1/2"></div>
											<div className="h-3 bg-gray-300 rounded w-1/4"></div>
										</div>
									</div>
								))}
							</div>
						) : data?.data && data.data.length > 0 ? (
							<>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{data.data.map((property: any) => (
										<PropertyCard key={property.id} property={property} />
									))}
								</div>
							</>
						) : (
							<div className="text-center py-12">
								<div className="text-gray-400 text-6xl mb-4">🏠</div>
								<h3 className="text-xl font-semibold text-gray-900 mb-2">
									No properties found
								</h3>
								<p className="text-gray-600 mb-6">
									{filters.isFeatured
										? "No featured properties available at the moment."
										: "Try adjusting your search filters or search terms."}
								</p>
								<button
									onClick={() => {
										const newFilters = {
											search: "",
											listingType: "",
											propertyType: "",
											city: "",
											state: "",
											minPrice: "",
											maxPrice: "",
											bedrooms: "",
											bathrooms: "",
											sortBy: "createdAt",
											sortOrder: "desc",
											isFeatured: "",
										};
										setFilters(newFilters);
										updateURL(newFilters);
									}}
									className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
								>
									Clear All Filters
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
