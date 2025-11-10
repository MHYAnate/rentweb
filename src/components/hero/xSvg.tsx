"use client";
import React, { useState } from "react";

const XSvg: React.FC = () => {

	const [enter, setEnter] = useState(false)
	return (
		
			<svg onMouseEnter={() => {
				setEnter(true);
			}} onMouseLeave={()=>{
				setEnter(false);
			}} className="w-5 h-5 transition-all duration-300 hover:shadow-lg hover:scale-105" fill="currentColor" stroke={enter?"red":"black"} viewBox="0 0 20 20">
				<path d="M18 6 6 18"/><path d="m6 6 12 12"/>
			</svg>
		
	);
};

XSvg.displayName = "XSvg";
export default XSvg;