import { useState } from "react";
import { FiPhone, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
	const [open, setOpen] = useState(false);

	return (
	<header className="fixed top-0 inset-x-0 z-50 h-16 md:h-20 transform-gpu bg-white sm:bg-white/60 backdrop-blur-none sm:backdrop-blur-md border-b border-gray-200/70">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
					<div className="flex items-center justify-between h-16 md:h-20">

					{/* Left: logo + text */}
					<div className="flex items-center flex-1 md:flex-none">
						<a href="/" className="flex items-center space-x-3">
							<div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-400 flex items-center justify-center shadow-md">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 2C8 6 5 9 5 13c0 4.418 3.582 8 8 8s8-3.582 8-8c0-4-3-7-9-11z" />
								</svg>
							</div>
							<span className="text-lg font-semibold text-gray-800">Ayurveda</span>
						</a>
					</div>

					{/* Center: nav (hidden on small screens) */}
					<nav className="hidden md:flex md:items-center md:justify-center md:flex-1">
						<ul className="flex space-x-8">
							<li>
								<a href="#" aria-current="page" className="text-gray-600 hover:text-emerald-600 px-2 py-1 transition underline decoration-emerald-600 underline-offset-4">Home</a>
							</li>
							<li>
								<a href="#about" className="text-gray-600 hover:text-emerald-600 hover:underline hover:decoration-emerald-600 hover:underline-offset-4 px-2 py-1 transition">About us</a>
							</li>
							<li>
								<a href="#services" className="text-gray-600 hover:text-emerald-600 hover:underline hover:decoration-emerald-600 hover:underline-offset-4 px-2 py-1 transition">Services</a>
							</li>
						</ul>
					</nav>

					{/* Right: CTA - hidden on small screens */}
					<div className="hidden md:flex items-center md:flex-none">
						<a href="tel:+1234567890" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition">
							<FiPhone className="w-5 h-5" />
							<span className="font-medium">Call us now</span>
						</a>
					</div>

					{/* Mobile: centered menu button (absolute) */}
					<div className="md:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
						{/* static gray box */}
						<button
							onClick={() => setOpen(!open)}
							aria-expanded={open}
							aria-label="Toggle menu"
							className="inline-flex items-center justify-center p-2 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
							{open ? (
								<motion.span key="close" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.14 }}>
									<FiX className="w-6 h-6" aria-hidden="true" />
								</motion.span>
							) : (
								<motion.span key="menu" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.14 }}>
									<FiMenu className="w-6 h-6" aria-hidden="true" />
								</motion.span>
							)}
						</button>
					</div>

					{/* Mobile: call button on the right (keeps flow for justify-between) */}
					<div className="md:hidden flex items-center">
						<a href="tel:+1234567890" aria-label="Call us now" className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
							<FiPhone className="w-5 h-5" aria-hidden="true" />
							<span>Call us now</span>
						</a>
					</div>
				</div>
			</div>

			{/* Mobile panel */}
					<AnimatePresence>
						{open && (
							<motion.div
								initial={{ opacity: 0, y: -8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -8 }}
								transition={{ duration: 0.18 }}
								className="md:hidden border-t border-gray-100 bg-white shadow-sm"
							>
								<div className="px-4 pt-4 pb-6 space-y-3">
								<a href="#" aria-current="page" className="block text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 underline decoration-emerald-600 underline-offset-4">Home</a>
								<a href="#about" className="block text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 hover:underline hover:decoration-emerald-600 hover:underline-offset-4">About us</a>
								<a href="#services" className="block text-gray-700 px-3 py-2 rounded-md hover:bg-gray-50 hover:underline hover:decoration-emerald-600 hover:underline-offset-4">Services</a>
							
								</div>
							</motion.div>
						)}
					</AnimatePresence>
		</header>
	);
}

