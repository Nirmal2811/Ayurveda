import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { FaLeaf, FaUserMd, FaStethoscope, FaSeedling, FaHandsHelping, FaBook, FaPhoneAlt, FaHeadset, FaChevronUp } from 'react-icons/fa'
import { motion } from 'framer-motion'

// Simple counter that animates from 0 to `end` when `start` becomes true
function Counter({ end = 0, duration = 1500, suffix = '', label = '', start = true }) {
	const [value, setValue] = useState(0)

	useEffect(() => {
		if (!start) return
		let raf
		let startTime = null

		const step = (timestamp) => {
			if (!startTime) startTime = timestamp
			const progress = Math.min((timestamp - startTime) / duration, 1)
			const current = Math.floor(progress * end)
			setValue(current)
			if (progress < 1) {
				raf = requestAnimationFrame(step)
			} else {
				setValue(end)
			}
		}

		raf = requestAnimationFrame(step)
		return () => cancelAnimationFrame(raf)
	}, [start, end, duration])

	// Layout: bigger numbers on the left, left-aligned text on the right with gap
	return (
		<div className="flex items-center w-full h-full px-2">
			{/* center the content cluster inside the card */}
			<div className="w-full max-w-[260px] mx-auto flex items-center justify-between gap-6">
				<div className="min-w-[60px] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-emerald-600 flex-shrink-0 flex items-center justify-center leading-none">{value}{suffix}</div>
				{label && (
					<div className="flex items-center justify-start flex-1">
						<div className="text-sm sm:text-base text-gray-700 leading-tight font-medium text-left whitespace-nowrap sm:whitespace-normal">
							{label}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default function Home() {
	const [startCounters, setStartCounters] = useState(false)
	const [showTop, setShowTop] = useState(false)

	// smooth scroll helper: use native behavior when available, otherwise fallback to rAF animation
	function smoothScrollToTop() {
		try {
			// modern browsers (including mobile) support scroll behavior
			if ('scrollBehavior' in document.documentElement.style) {
				window.scrollTo({ top: 0, behavior: 'smooth' })
				return
			}
		} catch (e) {
			// ignore and fall back to JS animation
		}

		const start = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
		if (start <= 0) return
		const duration = 500
		const startTime = performance.now()

		function step(now) {
			const elapsed = now - startTime
			const progress = Math.min(elapsed / duration, 1)
			// easeInOutCubic
			const eased = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2
			const scrollTo = Math.round(start * (1 - eased))
			window.scrollTo(0, scrollTo)
			if (progress < 1) requestAnimationFrame(step)
		}

		requestAnimationFrame(step)
	}

	useEffect(() => {
		const handleScroll = () => {
			setShowTop(window.scrollY > 320)
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll()
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Framer Motion variants for the benefits cards
	const cardsContainer = {
		hidden: { opacity: 1 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.08 }
		}
	}

	const cardItem = {
		hidden: { opacity: 0, y: 12, scale: 0.98 },
		visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } }
	}

	const cardFromRight = {
		hidden: { opacity: 0, x: 60, scale: 0.96 },
		visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
	}

	const cardFromDown = {
		hidden: { opacity: 0, y: 50, scale: 0.96 },
		visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
	}

	return (
		<>
			<Header />

				<main className="min-h-[70vh] flex items-center justify-center bg-green-50 pt-16 md:pt-20">
			<div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
					{/* Left: content */}
					<div className="text-left">
						<motion.h1
							className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900"
							initial={{ x: -120, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true, amount: 0.4 }}
							transition={{ duration: 1.0, ease: 'easeOut' }}
						>
							Welcome to Ayurveda
						</motion.h1>

						<motion.p
							className="mt-4 text-lg text-gray-600 max-w-xl"
							initial={{ x: -80, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true, amount: 0.35 }}
							transition={{ duration: 1.0, ease: 'easeOut', delay: 0.12 }}
						>
							Holistic wellness and natural remedies to support your health. Explore our services and get in touch to start your journey toward balance and wellbeing.
						</motion.p>

						<div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
							<motion.a
								href="#services"
								className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-md shadow hover:bg-emerald-700"
								initial={{ y: 20, opacity: 0 }}
								whileInView={{ y: 0, opacity: 1 }}
								viewport={{ once: true, amount: 0.3 }}
								transition={{ duration: 1.0, ease: 'easeOut', delay: 0.24 }}
							>
								Our Services
							</motion.a>
							
						</div>

							{/* Feature highlights (mobile: 2 on top row, 1 below) */}
							<div role="list" className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3 sm:pt-6 max-w-none sm:max-w-lg mx-0 sm:mx-auto lg:mx-0">
								<div role="listitem" tabIndex={0} className="flex items-center gap-3 justify-center sm:justify-start w-full focus:outline-none focus:ring-2 focus:ring-emerald-300 motion-safe:transition motion-safe:duration-200">
									<div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
									<span className="text-gray-600 text-sm sm:text-base">Natural Healing</span>
								</div>
								<div role="listitem" tabIndex={0} className="flex items-center gap-3 justify-center sm:justify-start w-full focus:outline-none focus:ring-2 focus:ring-emerald-300 motion-safe:transition motion-safe:duration-200">
									<div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
									<span className="text-gray-600 text-sm sm:text-base">Holistic Approach</span>
								</div>
								<div role="listitem" tabIndex={0} className="col-span-2 sm:col-span-1 flex items-center gap-3 justify-center sm:justify-start w-full focus:outline-none focus:ring-2 focus:ring-emerald-300 motion-safe:transition motion-safe:duration-200">
									<div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
									<span className="text-gray-600 text-sm sm:text-base">Ancient Wisdom</span>
								</div>
							</div>
					</div>

					

					{/* Right: banner image */}
					<div className="w-full">
						<img src="/images/banner.png" alt="Ayurveda banner" className="w-full h-64 md:h-96 object-cover rounded-lg" />
					</div>
				</div>
			</div>
		</main>



			{/* Who We Are Section */}
			<section id="who-we-are" className="w-full bg-white py-10 sm:py-14">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row-reverse items-center gap-8">
						<div className="lg:w-1/2">
							<div className="w-full max-w-xl lg:ml-auto lg:pr-8 lg:transform lg:translate-x-7">
								<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">Who We Are</h2>
								<p className="mt-4 text-gray-600 text-base sm:text-lg">
									We are a team of practitioners and researchers dedicated to bringing authentic Ayurvedic
									knowledge to modern lifestyles. Our mission is to empower individuals with natural,
									time-tested solutions for lasting health.
								</p>

								<ul className="mt-6 space-y-3">
									<li className="flex items-start gap-3">
										<span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full font-bold">✓</span>
										<span className="text-gray-700">Personalized wellness plans</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full font-bold">✓</span>
										<span className="text-gray-700">Evidence-informed practices</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full font-bold">✓</span>
										<span className="text-gray-700">Community-focused care</span>
									</li>
								</ul>

								<div className="mt-5 pointer-events-auto">
									<a href="#who-we-are" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-large font-semibold py-1.5 px-3 rounded-md shadow-sm">More About Us</a>
								</div>
							</div>
						</div>

						<div className="lg:w-1/2">
							<div className="relative grid grid-cols-2 gap-4 w-full">
								<div className="absolute left-1/2 top-[100%] lg:top-[54%] transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-70 lg:h-70 bg-white/70 shadow-xl pointer-events-none z-20">
									<div className="absolute inset-2 pointer-events-none" style={{ borderColor: '#b8860b', borderWidth: '1px', borderStyle: 'solid' }}>
										<div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
											{/* leaf icon */}
											<FaLeaf className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" color="#b8860b" aria-hidden="true" />

											{/* bold title */}
											<div className="mt-2 font-bold text-sm text-gray-800">Natural Care</div>

											{/* paragraph */}
											<div className="mt-3 text-sm text-gray-600 text-center mx-auto max-w-[18rem] sm:max-w-xs px-3">Our team combines centuries-old Ayurvedic traditions with contemporary research to deliver personalised care plans.</div>
										</div>
									</div>
								</div>
								<motion.img
									src="/images/treat1.webp"
									alt="Treatment 1"
									className="relative z-0 w-full h-64 sm:h-72 lg:h-110 shadow-md object-cover lg:mt-10"
									initial={{ y: -120, opacity: 0 }}
									whileInView={{ y: 0, opacity: 1 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{ duration: 0.7, ease: 'easeOut' }}
								/>

								<motion.img
									src="/images/treat2.jpg"
									alt="Treatment 2"
									className="relative z-0 w-full h-64 sm:h-72 lg:h-110 shadow-md object-cover lg:mt-10"
									initial={{ y: 120, opacity: 0 }}
									whileInView={{ y: 0, opacity: 1 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
								/>
							</div>
						</div>
					</div>
				</div>
			</section>


			{/* Recent Achievements Section */}
			<section id="recent-achievements" className="w-full bg-white pt-30 pb-10 sm:py-14">
				{/* Achievements: left text, right counters */}
				<motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-0">
						<div className="lg:flex-shrink-0">
							{/* heading with left vertical line */}
							<div className="flex items-start justify-start gap-4">
								{/* use a left border on the heading so the line matches heading height */}
								<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 pl-4 border-l-4 border-emerald-600">
									<span className="inline md:block">Our Recent</span>{' '}
									<span className="inline md:block">Achievements</span>
								</h2>
							</div>
						</div>
						<div className="flex-1 flex justify-center lg:justify-end">
							{/* Counters - perfectly aligned next to heading */}
							<motion.div
								className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 w-full max-w-2xl lg:max-w-4xl"
								initial={{ opacity: 0, y: 12 }}
								whileInView={{ opacity: 1, y: 0 }}
								onViewportEnter={() => setStartCounters(true)}
								viewport={{ once: true, amount: 0.4 }}
							>
								{/* each counter card - perfectly aligned and consistent (with hover effect) */}
								<div className="w-full h-24 lg:h-28 flex items-center justify-center bg-emerald-50 rounded-lg px-3 lg:px-5 py-2 lg:py-4 shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-emerald-100 hover:ring-2 hover:ring-emerald-200 transition duration-200">
									<Counter end={100} suffix="%" label={<><span>Product</span><span className="sm:hidden">&nbsp;</span><br className="hidden sm:inline" /><span>Purity</span></>} start={startCounters} />
								</div>
								<div className="w-full h-24 lg:h-28 flex items-center justify-center bg-emerald-50 rounded-lg px-3 lg:px-5 py-2 lg:py-4 shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-emerald-100 hover:ring-2 hover:ring-emerald-200 transition duration-200">
									<Counter end={458} suffix="+" label={<><span>Happy</span><span className="sm:hidden">&nbsp;</span><br className="hidden sm:inline" /><span>Customers</span></>} start={startCounters} />
								</div>
								<div className="w-full h-24 lg:h-28 flex items-center justify-center bg-emerald-50 rounded-lg px-3 lg:px-5 py-2 lg:py-4 shadow-md hover:shadow-lg transform hover:scale-105 hover:bg-emerald-100 hover:ring-2 hover:ring-emerald-200 transition duration-200">
									<Counter end={35} suffix="+" label={<><span>Years</span><span className="sm:hidden">&nbsp;</span><br className="hidden sm:inline" /><span>Experience</span></>} start={startCounters} />
								</div>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</section>

			{/* Full-width banner section with overlay text */}
			<section className="w-full mt-6 md:mt-10">
				<div className="relative">
					<img src="/images/fullwidth.jpg" alt="Ayurveda banner" className="w-full h-48 md:h-72 lg:h-96 object-cover" />
					{/* overlay text - positioned to avoid awkward overlay on mobile */}
					<div className="absolute inset-0 flex flex-col justify-start md:justify-center items-start px-4 sm:px-6 pt-6 md:pt-0">
						<motion.h2
							className="text-black text-lg sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-left max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl leading-tight"
							initial={{ y: 20, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.8, ease: 'easeOut' }}
						>
							Unlock the secrets to living well with ayurveda
						</motion.h2>
						<motion.p
							className="text-black/80 mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-base lg:text-lg xl:text-xl max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl leading-snug"
							initial={{ y: 16, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.9, ease: 'easeOut', delay: 0.12 }}
						>
							Discover traditional remedies,<br className="sm:hidden" /> personalised care plans, and<br className="sm:hidden" /> simple daily practices to<br className="sm:hidden" /> support your long-term wellbeing.
						</motion.p>
					</div>
				</div>
			</section>


			{/* 6-cards section: 3 on top row, 3 on bottom row */}
			<section id="benefits" className="w-full py-12 sm:py-16 -mt-5 sm:mt-8 md:mt-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					
					<motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch"
						variants={cardsContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.18 }}
					>
						{/* Card 1 */}
						<motion.article variants={cardItem} className="flex flex-col items-start gap-3 p-4 h-full min-h-[200px]">
							
							<h4 className="text-lg sm:text-xl md:text-3xl font-semibold text-gray-800">What we offer</h4>
							<div className="flex flex-col leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
								{/* Two-line typographic treatment: first line solid, second line gradient-highlighted */}
								<span className="text-2xl sm:text-2xl md:text-4xl font-extrabold text-gray-900">A holistic journey</span>
								<span className="text-2xl sm:text-2xl md:text-4xl font-extrabold -mt-1 bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">to harmony</span>
							</div>
							<p className="text-m md:text-base md:font-medium text-gray-600 mt-2">Curated herbal formulations tailored to your needs. The journey begins with a comprehensive assessment of your unique constitution.</p>
						</motion.article>
						{/* Card 2 */}
						<motion.article variants={cardFromRight} className="flex flex-col items-start gap-3 p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition h-full min-h-[200px]">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-emerald-600">
									<FaUserMd className="w-6 h-6 text-white" aria-hidden="true" />
								</div>
							<h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Consultation</h4>
							<p className="text-m text-gray-600">Plans built around your constitution and lifestyle. The journey begins with a comprehensive consultation. And ongoing support is always available. The process is collaborative, ensuring your voice is heard every step of the way.</p>
						</motion.article>
						{/* Card 3 */}
						<motion.article variants={cardFromRight} className="flex flex-col items-start gap-3 p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition h-full min-h-[200px]">
							<div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-emerald-600">
								<FaStethoscope className="w-6 h-6 text-white" aria-hidden="true" />
							</div>
							<h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Clinically Informed</h4>
							<p className="text-m text-gray-600">Evidence-informed practices combined with tradition. Our practitioners integrate modern clinical insights with time-tested Ayurvedic methods to deliver safe, effective care tailored to you.</p>
						</motion.article>
						{/* Card 4 */}
						<motion.article variants={cardFromDown} className="flex flex-col items-start gap-3 p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition h-full min-h-[200px]">
							<div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-emerald-600">
								<FaSeedling className="w-6 h-6 text-white" aria-hidden="true" />
							</div>
							<h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Sustainable Sourcing</h4>
							<p className="text-m text-gray-600">Sustainably sourced botanicals and pure ingredients. We partner with ethical growers and use traceable supply chains to ensure quality and environmental stewardship.</p>
						</motion.article>
						{/* Card 5 */}
						<motion.article variants={cardFromDown} className="flex flex-col items-start gap-3 p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition h-full min-h-[200px]">
							<div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-emerald-600">
								<FaHandsHelping className="w-6 h-6 text-white" aria-hidden="true" />
							</div>
							<h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Community Support</h4>
							<p className="text-m text-gray-600">Workshops, group programs and ongoing guidance. Join our community events for practical workshops, peer support, and regular check-ins to sustain your wellbeing long-term.</p>
						</motion.article>
						{/* Card 6 */}
						<motion.article variants={cardFromDown} className="flex flex-col items-start gap-3 p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition h-full min-h-[200px]">
							<div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-emerald-600">
								<FaBook className="w-6 h-6 text-white" aria-hidden="true" />
							</div>
							<h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">Trusted Resources</h4>
							<p className="text-m text-gray-600">Educational resources to deepen your Ayurvedic knowledge. Access guides, videos, and curated readings created by our practitioners to help you learn and apply Ayurvedic principles at home.</p>
						</motion.article>
					</motion.div>
				</div>
			</section>

			{/* Second full-width banner section with overlay text */}
			<section className="w-full mt-8 md:mt-12">
				<div className="relative">
					<img src="/images/fullwidth4.jpg" alt="Ayurveda Treatments" className="w-full h-100 md:h-100 lg:h-[32rem] xl:h-[36rem] object-cover" />
					{/* overlay content - centered */}
					<div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center px-4 sm:px-6 text-center">
						<motion.h2
							className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4"
							initial={{ y: 20, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.8, ease: 'easeOut' }}
						>
							Ayurveda Treatments
						</motion.h2>
						<motion.h3
							className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 md:mb-6"
							initial={{ y: 16, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
						>
							Get Authentic Ayurvedic Treatment Today!
						</motion.h3>
						<motion.p
							className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl lg:max-w-3xl leading-relaxed mb-6 md:mb-8"
							initial={{ y: 12, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
						>
							Experience the healing power of Ayurveda with our range of authentic treatments designed to restore balance and promote holistic wellness. Book your session today and embark on a journey to better health.
						</motion.p>
						<motion.div
							className="flex flex-col sm:flex-row gap-4 sm:gap-6"
							initial={{ y: 8, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: true, amount: 0.5 }}
							transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
						>
							<a href="#treatments" className="inline-flex items-center justify-center px-8 py-3 bg-emerald-600 text-white font-semibold rounded-md shadow-lg hover:bg-emerald-700 transition duration-300">
								Book Treatment
							</a>
							<a href="#consultation" className="inline-flex items-center justify-center px-8 py-3 bg-white/20 backdrop-blur text-white font-semibold rounded-md border border-white/30 hover:bg-white/30 transition duration-300">
								Learn More
							</a>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Why Choose Us section */}
			<section className="w-full bg-white py-12 sm:py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
						{/* Left column - Content */}
						<div>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
								viewport={{ once: true }}
							>
								<h4 className="text-lg sm:text-xl md:text-3xl font-semibold text-gray-800 mb-4">Why Choose Us</h4>
								<div className="flex flex-col leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
									<span className="text-2xl sm:text-2xl md:text-4xl font-extrabold text-gray-900">Nature's secret</span>
									<span className="text-2xl sm:text-2xl md:text-4xl font-extrabold -mt-1 bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">for your truly health</span>
								</div>

								<motion.p
									className="text-gray-600 mb-8 leading-relaxed"
									initial={{ opacity: 0, y: 12 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
									viewport={{ once: true }}
								>
									Discover the transformative power of Ayurveda with our expert team dedicated to your holistic wellness. We combine ancient wisdom with modern practices to create personalized treatment plans that nurture your body, mind, and spirit.
								</motion.p>
							</motion.div>

							<div className="space-y-6">
								{/* Feature 1 */}
								<motion.div
									className="flex items-start gap-4"
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
									viewport={{ once: true }}
								>
									<div className="w-12 h-12 bg-emerald-600 rounded-md flex items-center justify-center flex-shrink-0">
										<FaLeaf className="w-6 h-6 text-white" />
									</div>
									<div>
										<h4 className="text-lg font-semibold text-gray-900 mb-2">100% Organic Herbal</h4>
										<p className="text-gray-600">Experience the healing power of nature with our 100% organic herbal treatments, carefully crafted to restore balance and promote wellness.</p>
									</div>
								</motion.div>

								{/* Feature 2 */}
								<motion.div
									className="flex items-start gap-4"
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
									viewport={{ once: true }}
								>
									<div className="w-12 h-12 bg-emerald-600 rounded-md flex items-center justify-center flex-shrink-0">
										<FaUserMd className="w-6 h-6 text-white" />
									</div>
									<div>
										<h4 className="text-lg font-semibold text-gray-900 mb-2">Professional Therapist</h4>
										<p className="text-gray-600">Our team of experienced therapists is dedicated to providing personalized care and support throughout your healing journey.</p>
									</div>
								</motion.div>

								{/* Feature 3 */}
								<motion.div
									className="flex items-start gap-4"
									initial={{ opacity: 0, x: -20 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
									viewport={{ once: true }}
								>
									<div className="w-12 h-12 bg-emerald-600 rounded-md flex items-center justify-center flex-shrink-0">
										<FaBook className="w-6 h-6 text-white" />
									</div>
									<div>
										<h4 className="text-lg font-semibold text-gray-900 mb-2">Hereditary Recipe</h4>
										<p className="text-gray-600">Experience the wisdom of generations with our hereditary recipes, passed down through the ages to promote healing and balance.</p>
									</div>
								</motion.div>
							</div>
						</div>

						{/* Right column - Image with quote overlay */}
						<div className="relative">
							<motion.img
								src="/images/treat1.webp"
								alt="Ayurveda Treatment"
								className="w-full h-80 sm:h-96 lg:h-[500px] object-cover shadow-lg"
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
								viewport={{ once: true }}
							/>

							{/* Quote overlay box */}
							<motion.div
								className="absolute right-8 md:right-16 lg:right-20 bottom-0 md:bottom-2 lg:bottom-4 transform translate-y-8 md:translate-y-12 lg:translate-y-16 translate-x-8 md:translate-x-16 lg:translate-x-20 bg-white/90 backdrop-blur-md p-4 md:p-6 shadow-lg max-w-xs md:max-w-sm"
								initial={{ opacity: 0, y: 12 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
								viewport={{ once: true }}
							>
								<p className="text-gray-900 italic text-sm md:text-base">“Rebalance your body, renew your life.”</p>
								<p className="mt-2 text-gray-700 text-xs md:text-sm font-medium">— Dr. Anand, Ayurveda Practitioner</p>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* Ayurveda Treatments */}
					<section id="treatments" className="w-full bg-white py-12 sm:py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-start">
						{/* Left: heading */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7, ease: 'easeOut' }}
							viewport={{ once: true }}
						>
							<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
								<span className="block">Get empowered with</span>
								<span className="block text-emerald-600">ayurvedic programs</span>
							</h2>
						</motion.div>

						{/* Right: paragraph as provided */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
							viewport={{ once: true }}
						>
							<p className="text-gray-700 leading-relaxed mt-3 md:mt-0 pl-0 md:-ml-8 lg:-ml-14">Experience the healing power of Ayurveda with our range of authentic treatments designed to restore balance and promote holistic wellness. Book your session today and embark on a journey to better health.</p>
							{/* small emerald horizontal line (thicker) */}
							<div className="mt-2 w-24 h-1 bg-emerald-600 rounded-full md:-ml-8 lg:-ml-14" aria-hidden="true"></div>
						</motion.div>
					</div>
				</div>
			</section>

					{/* Ayurveda Treatments cards */}
					<section className="w-full bg-white py-14">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								<div className="w-full -mt-15 md:-mt-12 lg:-mt-16">
								{/* Responsive grid: 1 col (sm) -> 2 cols -> 3 cols (lg). First row: 3 cards. Second row: 2 cards. */}
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
									{/* Card 1 - existing Pizhichil (overlay text) */}
									<motion.article className="bg-white overflow-hidden shadow-md relative lg:row-span-2" whileHover="hover">
										<motion.img src="/images/pizhichil.jpg" alt="Pizhichil" className="w-full h-80 sm:h-96 md:h-[28rem] lg:h-[36rem] object-cover" initial={{ scale: 1 }} variants={{ hover: { scale: 1.03, y: -6 } }} transition={{ duration: 0.45 }} />
										{/* overlay: gradient background at bottom with white text */}
										<div className="absolute inset-0 flex items-end">
											<div className="w-full bg-gradient-to-t from-black/60 to-transparent p-6">
												<h3 className="text-xl font-semibold text-white">Pizhichil — Rejuvenating Oil Therapy</h3>
											<p className="mt-2 text-white/90">A classical Ayurvedic oil therapy that nourishes, calms the nervous system and promotes deep relaxation.</p>
											<a href="/pizhichil" aria-label="Read more about Pizhichil" className="inline-block mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-sm">Read more</a>
											</div>
										</div>
									</motion.article>

									{/* Card 2 */}
									<motion.article className="bg-white overflow-hidden shadow-md relative h-64 sm:h-72 md:h-80 lg:h-68" whileHover="hover">
										<motion.img src="/images/abhyanga.jpg" alt="Abhyanga" className="w-full h-full object-cover" initial={{ scale: 1 }} variants={{ hover: { scale: 1.04 } }} transition={{ duration: 0.38 }} />
										<div className="absolute inset-0 flex items-end">
											<div className="w-full bg-gradient-to-t from-black/60 to-transparent p-6">
												<h3 className="text-xl font-semibold text-white">Abhyanga — Therapeutic Oil Massage</h3>
												<p className="mt-2 text-white/90">Traditional full-body oil massage to improve circulation and soothe muscles.</p>
												<a href="/abhyanga" aria-label="Read more about Abhyanga" className="inline-block mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-sm">Read more</a>
											</div>
										</div>
									</motion.article>

									{/* Card 3 */}
									<motion.article className="bg-white overflow-hidden shadow-md relative h-64 sm:h-72 md:h-80 lg:h-68" whileHover="hover">
										<motion.img src="/images/shirodhara.jpg" alt="Shirodhara" className="w-full h-full object-cover" initial={{ scale: 1 }} variants={{ hover: { scale: 1.04 } }} transition={{ duration: 0.38 }} />
										<div className="absolute inset-0 flex items-end">
											<div className="w-full bg-gradient-to-t from-black/60 to-transparent p-6">
												<h3 className="text-xl font-semibold text-white">Shirodhara — Flowing Oil Treatment</h3>
												<p className="mt-2 text-white/90">A calming therapy where warm oil is poured gently over the forehead to reduce stress and improve sleep.</p>
												<a href="/shirodhara" aria-label="Read more about Shirodhara" className="inline-block mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-sm">Read more</a>
											</div>
										</div>
									</motion.article>

									{/* Card 4 */}
									<motion.article className="bg-white overflow-hidden shadow-md relative h-64 sm:h-72 md:h-80 lg:h-68" whileHover="hover">
										<motion.img src="/images/nasyam.jpg" alt="Nasyam" className="w-full h-full object-cover" initial={{ scale: 1 }} variants={{ hover: { scale: 1.04 } }} transition={{ duration: 0.38 }} />
										<div className="absolute inset-0 flex items-end">
											<div className="w-full bg-gradient-to-t from-black/60 to-transparent p-6">
												<h3 className="text-xl font-semibold text-white">Nasyam — Nasal Therapy</h3>
												<p className="mt-2 text-white/90">A therapeutic procedure involving the administration of herbal oils through the nasal passages.</p>
												<a href="/nasyam" aria-label="Read more about Nasyam" className="inline-block mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-sm">Read more</a>
											</div>
										</div>
									</motion.article>

									{/* Card 5 */}
									<motion.article className="bg-white overflow-hidden shadow-md relative h-64 sm:h-72 md:h-80 lg:h-68" whileHover="hover">
										<motion.img src="/images/januvasti2.png" alt="Januvasti" className="w-full h-full object-cover" initial={{ scale: 1 }} variants={{ hover: { scale: 1.04 } }} transition={{ duration: 0.38 }} />
										<div className="absolute inset-0 flex items-end">
											<div className="w-full bg-gradient-to-t from-black/60 to-transparent p-6">
												<h3 className="text-xl font-semibold text-white">Januvasti — Knee Therapy</h3>
												<p className="mt-2 text-white/90">A specialized treatment for knee pain involving the application of warm medicated oil in a reservoir around the knee joint.</p>
												<a href="/januvasti" aria-label="Read more about Januvasti" className="inline-block mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-sm">Read more</a>
											</div>
										</div>
									</motion.article>

									{/* Card 6 - same design as Card 1 */}
									<motion.article className="bg-white overflow-hidden shadow-md relative lg:row-span-2" whileHover="hover">
										<motion.img src="/images/shirovasti2.png" alt="Shirovasti" className="w-full h-80 sm:h-96 md:h-[28rem] lg:h-[36rem] object-cover" initial={{ scale: 1 }} variants={{ hover: { scale: 1.03, y: -6 } }} transition={{ duration: 0.45 }} />
										{/* overlay: gradient background at bottom with white text */}
										<div className="absolute inset-0 flex items-end">
											<div className="w-full bg-gradient-to-t from-black/60 to-transparent p-6">
												<h3 className="text-xl font-semibold text-white">Shirovasti — Head Therapy</h3>
												<p className="mt-2 text-white/90">A specialized treatment for head and neck ailments involving the retention of warm medicated oil on the head.</p>
												<a href="/shirovasti" aria-label="Read more about Shirovasti" className="inline-block mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-sm">Read more</a>
											</div>
										</div>
									</motion.article>

									{/* Card 7 - same design as cards 2-5 */}
									<motion.article className="bg-white overflow-hidden shadow-md relative h-64 sm:h-72 md:h-80 lg:h-68" whileHover="hover">
										<motion.img src="/images/kativasti.webp" alt="Kativasti" className="w-full h-full object-cover" initial={{ scale: 1 }} variants={{ hover: { scale: 1.04 } }} transition={{ duration: 0.38 }} />
										<div className="absolute inset-0 flex items-end">
											<div className="w-full bg-gradient-to-t from-black/60 to-transparent p-6">
												<h3 className="text-xl font-semibold text-white">Kativasti — Lower Back Therapy</h3>
												<p className="mt-2 text-white/90">A specialized treatment for lower back pain involving the retention of warm medicated oil in a reservoir on the lower back.</p>
												<a href="/kativasti" aria-label="Read more about Kativasti" className="inline-block mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-sm">Read more</a>
											</div>
										</div>
									</motion.article>

									{/* Card 8 - same design as cards 2-5 */}
									<motion.article className="bg-white overflow-hidden shadow-md relative h-64 sm:h-72 md:h-80 lg:h-68" whileHover="hover">
										<motion.img src="/images/elakizhi.png" alt="Elakizhi" className="w-full h-full object-cover" initial={{ scale: 1 }} variants={{ hover: { scale: 1.04 } }} transition={{ duration: 0.38 }} />
										<div className="absolute inset-0 flex items-end">
											<div className="w-full bg-gradient-to-t from-black/60 to-transparent p-6">
												<h3 className="text-xl font-semibold text-white">Elakizhi — Herbal Pouch Therapy</h3>
												<p className="mt-2 text-white/90">A therapeutic treatment involving the application of warm herbal pouches to relieve pain and inflammation.</p>
												<a href="/elakizhi" aria-label="Read more about Elakizhi" className="inline-block mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-sm">Read more</a>
											</div>
										</div>
									</motion.article>

									{/* Card 9 - same design as cards 2-5 */}
									<motion.article className="bg-white overflow-hidden shadow-md relative h-64 sm:h-72 md:h-80 lg:h-68" whileHover="hover">
										<motion.img src="/images/njavarakizhi.png" alt="Njavarakizhi" className="w-full h-full object-cover" initial={{ scale: 1 }} variants={{ hover: { scale: 1.04 } }} transition={{ duration: 0.38 }} />
										<div className="absolute inset-0 flex items-end">
											<div className="w-full bg-gradient-to-t from-black/60 to-transparent p-6">
												<h3 className="text-xl font-semibold text-white">Njavarakizhi — Rice Pouch Therapy</h3>
												<p className="mt-2 text-white/90">A unique treatment using medicated rice pouches to nourish and rejuvenate the body.</p>
												<a href="/njavarakizhi" aria-label="Read more about Njavarakizhi" className="inline-block mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-sm">Read more</a>
											</div>
										</div>
									</motion.article>

									{/* Card 10 - same design as cards 2-5 */}
									<motion.article className="bg-white overflow-hidden shadow-md relative h-64 sm:h-72 md:h-80 lg:h-68" whileHover="hover">
										<motion.img src="/images/netratarpana.webp" alt="Netratarpana" className="w-full h-full object-cover" initial={{ scale: 1 }} variants={{ hover: { scale: 1.04 } }} transition={{ duration: 0.38 }} />
										<div className="absolute inset-0 flex items-end">
											<div className="w-full bg-gradient-to-t from-black/60 to-transparent p-6">
												<h3 className="text-xl font-semibold text-white">Netratarpana — Eye Therapy</h3>
												<p className="mt-2 text-white/90">A therapeutic procedure for eye-related issues involving the application of warm medicated oil around the eyes.</p>
												<a href="/netratarpana" aria-label="Read more about Netratarpana" className="inline-block mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md shadow-sm">Read more</a>
										</div>
										</div>
										</motion.article>
								</div>
							</div>
						</div>

						
					</section>

					{/* How it works */}
					<section id="how-it-works" className="w-full bg-white py-8 lg:py-14 -mt-6 lg:mt-0">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
								{/* Left: 3-step process */}
								<motion.div 
									className="order-2 lg:order-1 flex flex-col gap-6"
									initial={{ opacity: 0, x: -30 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{ duration: 0.8, ease: 'easeOut' }}
								>
									<motion.div 
										tabIndex={0} 
										className="bg-emerald-50 p-4 rounded-md shadow focus:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.3 }}
										transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
									>
										<div className="flex items-start gap-4">
											<div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">1</div>
											<div>
												<h4 className="text-lg font-semibold text-gray-800">Consultation with our experts</h4>
												<p className="mt-2 text-gray-600">Get personalized advice and treatment plans tailored to your unique needs.</p>
											</div>
										</div>
									</motion.div>

									<motion.div 
										tabIndex={0} 
										className="bg-white p-4 rounded-md shadow hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.3 }}
										transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
									>
										<div className="flex items-start gap-4">
											<div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">2</div>
											<div>
												<h4 className="text-lg font-semibold text-gray-800">Get an appointment</h4>
												<p className="mt-2 text-gray-600">Schedule your visit at a time that works for you and take the first step towards wellness.</p>
											</div>
										</div>
									</motion.div>

									<motion.div 
										tabIndex={0} 
										className="bg-white p-4 rounded-md shadow hover:bg-emerald-50 focus:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-200 transition"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.3 }}
										transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
									>
										<div className="flex items-start gap-4">
											<div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">3</div>
											<div>
												<h4 className="text-lg font-semibold text-gray-800">Enjoy your service</h4>
												<p className="mt-2 text-gray-600">Relax and experience the benefits of our holistic treatments, designed to rejuvenate your body and mind.</p>
											</div>
										</div>
									</motion.div>
								</motion.div>

								{/* Right: How It Works + CTA */}
								<motion.div
									className="order-1 lg:order-2"
									initial={{ opacity: 0, x: 30 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true, amount: 0.3 }}
									transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
								>
									<motion.h4 
										className="text-lg sm:text-xl md:text-3xl font-semibold text-gray-800 mb-4"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.3 }}
										transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
									>
										How It Works
									</motion.h4>
									<motion.div 
										className="flex flex-col leading-tight mb-6" 
										style={{ fontFamily: "'Playfair Display', serif" }}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.3 }}
										transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
									>
										<span className="text-2xl sm:text-2xl md:text-4xl font-extrabold text-gray-900">Treat your body with</span>
										<span className="text-2xl sm:text-2xl md:text-4xl font-extrabold -mt-1 bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">the care of nature</span>
									</motion.div>
									<motion.p 
										className="text-gray-600 mb-8 leading-relaxed"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true, amount: 0.3 }}
										transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
									>
										Experience the healing power of Ayurveda with our range of authentic treatments designed to restore balance and promote holistic wellness. Book your session today and embark on a journey to better health.
									</motion.p>

									<div className="mt-6 grid grid-cols-2 gap-4 items-center">
										<motion.div 
											className="bg-white p-4 rounded-md shadow flex flex-col sm:flex-row items-center gap-4"
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, amount: 0.3 }}
											transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
											whileHover={{ scale: 1.02, y: -2 }}
										>
											<div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
												<FaPhoneAlt className="w-6 h-6 text-emerald-600" aria-hidden="true" />
											</div>
											<div className="text-center sm:text-left mt-2 sm:mt-0">
												<div className="text-lg font-semibold text-gray-800">Call Us Now !</div>
												<div className="mt-2 text-gray-600">89216 05977</div>
												
											</div>
										</motion.div>
										<motion.div 
											className="bg-white p-4 rounded-md shadow flex flex-col sm:flex-row items-center gap-4"
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											viewport={{ once: true, amount: 0.3 }}
											transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 }}
											whileHover={{ scale: 1.02, y: -2 }}
										>
											<div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
												<FaHeadset className="w-6 h-6 text-emerald-600" aria-hidden="true" />
											</div>
											<div className="text-center sm:text-left mt-2 sm:mt-0">
												<div className="text-lg font-semibold text-gray-800">Need Help?</div>
												<div className="mt-2 text-gray-600">We're Online</div>
											</div>
										</motion.div>
									</div>
								</motion.div>
							</div>
						</div>
					</section>

				{showTop && (
						<button
							aria-label="Scroll to top"
							title="Back to top"
							onClick={smoothScrollToTop}
							className="fixed right-6 bottom-6 md:right-8 md:bottom-8 z-50 w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
						>
							<FaChevronUp className="w-4 h-4" />
						</button>
					)}
				<Footer />
		</>
	)
}
