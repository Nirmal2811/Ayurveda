import React from 'react'
import { FaLeaf, FaFacebookF, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaChevronRight } from 'react-icons/fa'

export default function Footer() {
	return (
		<footer
			className="border-t border-gray-200 bg-center bg-cover bg-no-repeat"
			style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('/images/footer2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
		>
			<div className="max-w-7xl mx-auto px-4 py-12 text-white min-h-[220px]">
				{/* Four footer cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					{/* Card 1: Logo + Ayurveda + para + socials */}
					<div className="p-6 rounded-lg">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-emerald-600">
								<FaLeaf className="w-6 h-6" />
							</div>
							<div>
								<div className="text-lg font-semibold text-white">Ayurveda</div>
							</div>
						</div>
						<p className="mt-3 text-white text-sm">Traditional healing and natural therapies to restore balance and vitality. Personalized plans for lasting wellbeing.</p>
						<div className="mt-4 flex space-x-3">
							<a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-emerald-100 hover:text-emerald-600 transition">
								<FaFacebookF className="w-4 h-4" />
							</a>
							<a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-emerald-100 hover:text-emerald-600 transition">
								<FaTwitter className="w-4 h-4" />
							</a>
							<a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 hover:bg-emerald-100 hover:text-emerald-600 transition">
								<FaInstagram className="w-4 h-4" />
							</a>
						</div>
					</div>

					{/* Card 2: Quick Links */}
					<div className="p-6 rounded-lg md:pl-15">
						<h4 className="text-white font-semibold mb-3 underline decoration-emerald-300 decoration-2 underline-offset-6">Quick Links</h4>
						<ul className="space-y-2 text-white text-sm">
							<li>
								<a href="#" className="text-white hover:text-emerald-300 flex items-center">
									<FaChevronRight className="w-3 h-3 mr-2" />
									<span>Home</span>
								</a>
							</li>
							<li>
								<a href="#treatments" className="text-white hover:text-emerald-300 flex items-center">
									<FaChevronRight className="w-3 h-3 mr-2" />
									<span>Treatments</span>
								</a>
							</li>
							<li>
								<a href="#how-it-works" className="text-white hover:text-emerald-300 flex items-center">
									<FaChevronRight className="w-3 h-3 mr-2" />
									<span>How It Works</span>
								</a>
							</li>
							<li>
								<a href="#contact" className="text-white hover:text-emerald-300 flex items-center">
									<FaChevronRight className="w-3 h-3 mr-2" />
									<span>Contact</span>
								</a>
							</li>
						</ul>
					</div>

					{/* Card 3: Opening Hours + Book Appointment */}
					<div className="p-6 rounded-lg">
						<h4 className="text-white font-semibold mb-3 underline decoration-emerald-300 decoration-2 underline-offset-6">Opening Hours</h4>
						<div className="text-sm text-white space-y-1 mb-4">
							<div className="flex justify-between"><span>Mon - Fri</span><span>9:00 AM - 6:00 PM</span></div>
							<div className="flex justify-between"><span>Saturday</span><span>10:00 AM - 4:00 PM</span></div>
							<div className="flex justify-between"><span>Sunday</span><span>Closed</span></div>
						</div>
						<a href="#book" className="inline-block bg-emerald-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-emerald-700">Book Appointment</a>
					</div>

					{/* Card 4: Get in touch */}
					<div className="p-6 rounded-lg md:ml-6 lg:ml-15">
						<h4 className="text-white font-semibold mb-3 underline decoration-emerald-300 decoration-2 underline-offset-6">Get in touch</h4>
						<div className="text-sm text-white space-y-3">
							<div className="flex items-start gap-2">
								<div className="text-emerald-600 mt-1"><FaMapMarkerAlt /></div>
								<div>123 Wellness Ave, Suite 4<br />Bangalore, IN</div>
							</div>
							<div className="flex items-center gap-2">
								<div className="text-emerald-600"><FaPhoneAlt /></div>
								<a href="tel:8882003234" className="text-white hover:text-emerald-300">888-2003-234</a>
							</div>
							<div className="flex items-center gap-2">
								<div className="text-emerald-600"><FaEnvelope /></div>
								<a href="mailto:info@ayurveda.example" className="text-white hover:text-emerald-300">info@ayurveda.example</a>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-8 border-t border-gray-100 pt-6">
					<div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-center justify-between text-sm text-white gap-2">
						<div className="text-left">© {new Date().getFullYear()} Ayurveda. All rights reserved.</div>
						<div className="flex items-center gap-2 mt-2 md:mt-0 text-xs md:text-sm">
							<a href="/terms" className="text-white hover:text-emerald-300 font-semibold md:font-normal">Terms of Use</a>
							<span aria-hidden="true" className="text-white opacity-60 px-2">•</span>
							<a href="/privacy" className="text-white hover:text-emerald-300 font-semibold md:font-normal">Privacy Policy</a>
							<span aria-hidden="true" className="text-white opacity-60 px-2">•</span>
							<a href="/cookies" className="text-white hover:text-emerald-300 font-semibold md:font-normal">Cookie Policy</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
