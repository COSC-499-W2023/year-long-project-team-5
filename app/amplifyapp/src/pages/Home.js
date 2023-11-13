// Filename - Home.jsx
import React from "react";
// Importing Link from react-router-dom to 
// navigate to different end points.
import { Link } from "react-router-dom";

export function Home(){
	return (
		<div>
			<h1>Home Page</h1>
			<br />
			<ul>
				<li>
					{/* Endpoint to route to Home component */}
					<Link to="/">Home</Link>
				</li>
			</ul>
		</div>
	);
}