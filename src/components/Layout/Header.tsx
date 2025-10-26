"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { Home, User, Heart, PlusCircle, LogOut, Menu, Plus, X } from "lucide-react";
import Image from "next/image";

const Header: React.FC = () => {
	const { user, isAuthenticated, logout } = useAuth();
	const router = useRouter();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const handleLogout = () => {
		logout();
		router.push("/");
		setIsMobileMenuOpen(false);
	};
	// // name: 'Properties',
	// // href: '/dashboard/admin-properties',
	// // icon: Building,
	// // roles: [ 'ADMIN', 'SUPER_ADMIN']

	// const navItems = [
	// 	{ label: "Properties", href: "/dashboard/propertiess", icon: Home },
	// 	...(isAuthenticated
	// 		? [
	// 				{ label: "Favorites", href: "/dashboard/favorites", icon: Heart },
	// 				{ label: "Dashboard", href: "/dashboard", icon: Plus },
	// 				...(user?.role !== "CLIENT"
	// 					? [
	// 							{
	// 								label: "Add Property",
	// 								href: "/dashboard/propertiess/create",
	// 								icon: PlusCircle,
	// 							},
	// 					  ]
	// 					: []),
	// 				{ label: "Profile", href: "/dashboard/profile", icon: User },
	// 		  ]
	// 		: []),
	// ];

	const navItems = [
		// Show different "Properties" depending on role
		...(user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
			? [
					{
						label: "Properties",
						href: "/dashboard/admin-properties",
						icon: Home,
					},
				]
			: [
					{
						label: "Properties",
						href: "/dashboard/propertiess",
						icon: Home,
					},
				]),
	
		...(isAuthenticated
			? [
					{ label: "Favorites", href: "/dashboard/favorites", icon: Heart },
					{ label: "Dashboard", href: "/dashboard", icon: Plus },
	
					...(user?.role !== "CLIENT"
						? [
								{
									label: "Add Property",
									href: "/dashboard/propertiess/create",
									icon: PlusCircle,
								},
							]
						: []),
	
					{ label: "Profile", href: "/dashboard/profile", icon: User },
				]
			: []),
	];
	return (
		<header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link href="/" className="flex items-center h-full">
  <Image
    src="/image/plogo.png"
    alt="imageLogo"
    width={100}
    height={20}
    className="h-full object-contain rounded-md"
  />
</Link>


					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8 bg-[#FFD700] bg-gradient-to-br from-[#FFD700] via-[#FFD700] to-[#C28840] shadow-[inset_0_0_60px_rgba(255,255,255,0.2)]text-white px-4 py-2 rounded-lg hover:bg-[#FFD700] transition-colors text-center"
									>
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className="flex items-center space-x-1 text-gray-700 hover:text-white transition-colors px-2 rounded-md"
								onMouseEnter={(e) => {
									
									e.currentTarget.style.boxShadow =
										"0 20px 25px -5px rgba(0, 0, 0, 0.4)";
								}}
								onMouseLeave={(e) => {
									
									e.currentTarget.style.boxShadow =
										"0 0px 0px 0px rgba(0, 0, 0, 0)";
								}}
							>
								<item.icon className="w-4 h-4" />
								<span>{item.label}</span>
							</Link>
						))}
					</nav>

					{/* Auth Section */}
					<div className="hidden md:flex items-center space-x-4">
						{isAuthenticated ? (
							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									<div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
										<span className="text-sm font-medium text-indigo-600">
											{user?.firstName?.[0]}
											{user?.lastName?.[0]}
										</span>
									</div>
									<span className="text-sm text-gray-700">
										{user?.firstName} {user?.lastName}
									</span>
								</div>
								<button
									onClick={handleLogout}
									className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
								>
									<LogOut className="w-4 h-4" />
									<span>Logout</span>
								</button>
							</div>
						) : (
							<div className="flex items-center space-x-4">
								<Link
									href="/login"
								className="text-black hover:text-[#FFD700] transition-colors"
								>
									Login
								</Link>
								<Link
									href="/register"
								className="bg-[#C28840] bg-gradient-to-br from-[#C28840] via-[#FFD700] to-[#C28840] shadow-[inset_0_0_60px_rgba(255,255,255,0.2)]text-white px-4 py-2 rounded-lg hover:bg-[#FFD700] transition-colors text-center"
								onMouseEnter={(e) => {
							
									e.currentTarget.style.boxShadow =
										"0 20px 25px -5px rgba(0, 0, 0, 0.4)";
								}}
								onMouseLeave={(e) => {
								
									e.currentTarget.style.boxShadow =
										"0 10px 15px -3px rgba(0, 0, 0, 0.3)";
								}}
								>
									Sign Up
								</Link>
							</div>
						)}
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
					>
						{isMobileMenuOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden py-4 border-t border-gray-200">
						<div className="flex flex-col space-y-4">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsMobileMenuOpen(false)}
									className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
								>
									<item.icon className="w-4 h-4" />
									<span>{item.label}</span>
								</Link>
							))}

							{isAuthenticated ? (
								<button
									onClick={handleLogout}
									className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
									onMouseEnter={(e) => {
								
										e.currentTarget.style.boxShadow =
											"0 20px 25px -5px rgba(0, 0, 0, 0.4)";
									}}
									onMouseLeave={(e) => {
							
										e.currentTarget.style.boxShadow =
											"0 10px 15px -3px rgba(0, 0, 0, 0.3)";
									}}
								>
									<LogOut className="w-4 h-4" />
									<span>Logout</span>
								</button>
							) : (
								<div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
									<Link
										href="/login"
										onClick={() => setIsMobileMenuOpen(false)}
										className="text-orange-500 hover:text-black transition-colors"
									>
										Login
									</Link>
									<Link
										href="/register"
										onClick={() => setIsMobileMenuOpen(false)}
										className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-center"
										onMouseEnter={(e) => {
								
											e.currentTarget.style.boxShadow =
												"0 20px 25px -5px rgba(0, 0, 0, 0.4)";
										}}
										onMouseLeave={(e) => {
										
											e.currentTarget.style.boxShadow =
												"0 10px 15px -3px rgba(0, 0, 0, 0.3)";
										}}
									>
										Sign Up
									</Link>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
