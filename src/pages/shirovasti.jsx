import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { FaLeaf, FaClock, FaCheckCircle, FaCalendarAlt, FaChevronRight } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Shirovasti() {
  return (
    <>
      <Header />

      <main className="bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 -mt-5 md:mt-0">
            <ol className="flex items-center justify-center text-sm text-gray-500 space-x-2">
                <li>
                  <a href="/" className="hover:text-emerald-600">Home</a>
                </li>
                <li className="text-gray-400"><FaChevronRight className="inline w-3 h-3 mx-1" /></li>
                <li>
                  <a href="/#treatments" className="hover:text-emerald-600">Treatments</a>
                </li>
                <li className="text-gray-400"><FaChevronRight className="inline w-3 h-3 mx-1" /></li>
                <li className="text-gray-700">Shirovasti</li>
              </ol>
          </nav>

          {/* Page header */}
          <header className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="text-emerald-600">Shirovasti</span>
              <span className="text-black font-semibold"> — Head Oil Treatment</span>
            </h1>
          </header>

          {/* Duration badge */}
          <div className="mb-6 flex justify-center md:justify-end">
            <div className="inline-flex items-center text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
              <FaCalendarAlt className="w-4 h-4 mr-2 text-emerald-500" />
              <span className="font-medium">Duration:</span>
              <span className="ml-1">60 mins</span>
            </div>
          </div>

          {/* Two-column: image left, content right */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="w-full">
              <img
                src="/images/shirovasti.jpg"
                alt="Shirovasti treatment - oil therapy"
                className="w-full h-auto shadow-lg object-cover"
              />
            </div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }}>
              <p className="text-gray-700 mb-4" style={{ fontFamily: "Inter, system-ui, -apple-system, 'Helvetica Neue', Arial" }}>
                Shirovasti is a traditional Ayurvedic treatment that involves the application of warm medicated oil to the head, promoting relaxation and alleviating stress. This therapy is particularly beneficial for individuals suffering from headaches, migraines, or mental fatigue. The warmth of the oil helps to improve circulation, nourish the scalp, and calm the nervous system.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <FaLeaf className="text-emerald-500 mt-1 mr-3" />
                  <span className="text-gray-700">Promotes healthy skin and a radiant complexion.</span>
                </li>
                <li className="flex items-start">
                  <FaClock className="text-emerald-500 mt-1 mr-3" />
                  <span className="text-gray-700">Helps to regulate sleep patterns and reduce insomnia.</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-emerald-500 mt-1 mr-3" />
                  <span className="text-gray-700">Supports rejuvenation and relief from chronic stiffness.</span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <a href="tel:+1234567890" className="inline-block bg-emerald-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-md font-medium shadow-sm hover:bg-emerald-700 w-auto max-w-[11rem] sm:max-w-none">
                  Book Appointment
                </a>
                <a href="#contact" className="mt-3 sm:mt-0 inline-block text-emerald-600 font-medium hover:underline">
                  Need help? Contact us
                </a>
              </div>
            </motion.div>
          </section>

          {/* Benefits section */}
          <section className="mt-12">
            <div className="w-full text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-black">Benefits of</span>
                <span className="text-emerald-600"> Shirovasti</span>
              </h2>
            </div>

            <motion.div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.2 }}>
              <motion.div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 200 }}>
                <FaLeaf className="text-emerald-500 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Relieves Headaches & Migraines</h3>
                  <p className="text-gray-600 text-sm">Soothes tension in the head and reduces the frequency and intensity of headaches and migraines.</p>
                </div>
              </motion.div>

              <motion.div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 200 }}>
                <FaClock className="text-emerald-500 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Calms the Nervous System</h3>
                  <p className="text-gray-600 text-sm">Deeply relaxes the nervous system, reducing stress, anxiety and mental fatigue.</p>
                </div>
              </motion.div>

              <motion.div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 200 }}>
                <FaCheckCircle className="text-emerald-500 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Improves Sleep Quality</h3>
                  <p className="text-gray-600 text-sm">Promotes restful sleep by easing tension and restoring balance to the mind and body.</p>
                </div>
              </motion.div>

              <motion.div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 200 }}>
                <FaLeaf className="text-emerald-500 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Nourishes Scalp & Hair</h3>
                  <p className="text-gray-600 text-sm">Nourishes the scalp, strengthens hair follicles and can reduce hair fall and dryness.</p>
                </div>
              </motion.div>

              <motion.div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 200 }}>
                <FaCalendarAlt className="text-emerald-500 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Enhances Cognitive Clarity</h3>
                  <p className="text-gray-600 text-sm">Supports mental clarity, memory and focus by improving circulation and reducing mental fog.</p>
                </div>
              </motion.div>

              <motion.div className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 200 }}>
                <FaLeaf className="text-emerald-500 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Balances Doshas</h3>
                  <p className="text-gray-600 text-sm">Helps rebalance the body's doshas (Vata, Pitta, Kapha) when performed as part of a tailored Ayurvedic plan.</p>
                </div>
              </motion.div>
            </motion.div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
