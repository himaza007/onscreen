import React, { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/ui/pagetransition';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, Facebook, Instagram, MessageSquare, ChevronRight } from 'lucide-react';

const ContactPage = () => {
  const contactRef = useRef(null);
  const mapRef = useRef(null);
  const faqRef = useRef(null);
  const isContactInView = useInView(contactRef, { once: false, amount: 0.3 });
  const isMapInView = useInView(mapRef, { once: false, amount: 0.3 });
  const isFaqInView = useInView(faqRef, { once: false, amount: 0.3 });
  
  // State for FAQ accordion
  const [activeFaq, setActiveFaq] = useState(null);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background texture overlay */}
        <div className="fixed inset-0 bg-[url('/noise-texture.png')] opacity-[0.02] pointer-events-none z-0 mix-blend-overlay"></div>
        
        <Navbar />
        
        {/* Header section */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 tracking-tight">
              Contact Us
            </h1>
            
            <div className="w-20 h-1 bg-festival-red mx-auto mb-6"></div>
            
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              Have questions about the festival? We're here to help.
            </p>
          </div>
        </section>
        
        {/* Contact information */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.div 
              ref={contactRef}
              variants={fadeInVariants}
              initial="hidden"
              animate={isContactInView ? "visible" : "hidden"}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Email */}
                <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col items-center text-center hover:border-festival-red/30 transition-colors duration-300">
                  <div className="w-14 h-14 rounded-full bg-festival-red/10 flex items-center justify-center mb-5">
                    <Mail className="w-6 h-6 text-festival-red" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Email</h3>
                  <a 
                    href="mailto:onscreenfilmfest@gmail.com" 
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    onscreenfilmfest@gmail.com
                  </a>
                </div>
                
                {/* Phone */}
                <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col items-center text-center hover:border-festival-red/30 transition-colors duration-300">
                  <div className="w-14 h-14 rounded-full bg-festival-red/10 flex items-center justify-center mb-5">
                    <Phone className="w-6 h-6 text-festival-red" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Phone</h3>
                  <a 
                    href="tel:+94774838430" 
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    +94 774 838 430
                  </a>
                </div>
                
                {/* Address */}
                <div className="bg-[#0a0a0a] border border-white/10 p-8 flex flex-col items-center text-center hover:border-festival-red/30 transition-colors duration-300">
                  <div className="w-14 h-14 rounded-full bg-festival-red/10 flex items-center justify-center mb-5">
                    <MapPin className="w-6 h-6 text-festival-red" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">Address</h3>
                  <p className="text-white/70">
                    10 Trelawney Place,<br />
                    Colombo 00400<br />
                    Sri Lanka
                  </p>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="mt-16 pt-8 border-t border-white/10 flex flex-col items-center">
                <h3 className="text-lg font-medium mb-8 text-white/80">Connect With Us</h3>
                <div className="flex justify-center space-x-10">
                  <motion.a 
                    href="https://www.facebook.com/share/16P1dNbhNP/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1877F2]/10 to-[#1877F2]/5 hover:from-[#1877F2]/20 hover:to-[#1877F2]/10 border border-[#1877F2]/10 hover:border-[#1877F2]/30 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#1877F2]/10">
                      <Facebook className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-xs text-center mt-3 text-white/60 group-hover:text-white/80">Facebook</div>
                  </motion.a>
                  
                  <motion.a 
                    href="https://www.instagram.com/onscreen_25?igsh=MTJsbW5mMGl5dTFmYQ==" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#E1306C]/10 to-[#E1306C]/5 hover:from-[#E1306C]/20 hover:to-[#E1306C]/10 border border-[#E1306C]/10 hover:border-[#E1306C]/30 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#E1306C]/10">
                      <Instagram className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-xs text-center mt-3 text-white/60 group-hover:text-white/80">Instagram</div>
                  </motion.a>
                  
                  <motion.a 
                    href="https://whatsapp.com/channel/0029VbAfgtrJkK7EA0s5ep2Z" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366]/10 to-[#25D366]/5 hover:from-[#25D366]/20 hover:to-[#25D366]/10 border border-[#25D366]/10 hover:border-[#25D366]/30 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-[#25D366]/10">
                      <MessageSquare className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-xs text-center mt-3 text-white/60 group-hover:text-white/80">WhatsApp</div>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Interactive Map section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-8 text-center">
              Find Us
            </h2>
            
            <motion.div
              ref={mapRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isMapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-sm overflow-hidden shadow-2xl border border-white/10 backdrop-blur-sm"
            >
              <div className="h-[500px] relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.1005046971253!2d79.85520407492354!3d6.876838193127845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bc5b8edc14d%3A0x5c155a982f600a91!2s10%20Trelawney%20Pl%2C%20Colombo%2000400!5e0!3m2!1sen!2slk!4v1715556929069!5m2!1sen!2slk"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="OnScreen '25 Festival Location"
                  className="absolute inset-0"
                ></iframe>
                
                {/* Stylish overlay elements */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent opacity-70 pointer-events-none z-10"></div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent opacity-70 pointer-events-none z-10"></div>
                
                {/* Interactive floating info card */}
                <motion.div 
                  className="absolute top-6 left-6 z-20 max-w-xs bg-black/80 backdrop-blur-md p-5 rounded-sm border border-white/10"
                  initial={{ x: -50, opacity: 0 }}
                  animate={isMapInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <MapPin className="w-5 h-5 text-festival-red mr-2" />
                    Onscreen Committee
                  </h3>
                  <p className="text-white/70 text-sm mb-3">
                    10 Trelawney Place<br />
                    Colombo 00400<br />
                    Sri Lanka
                  </p>
                  <div className="text-xs text-white/50">Open in Google Maps for directions</div>
                </motion.div>
                
                {/* Interactive button */}
                <motion.div 
                  className="absolute bottom-6 right-6 z-20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 50, opacity: 0 }}
                  animate={isMapInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <a 
                    href="https://maps.app.goo.gl/xdzpcbHQUwJjSspX8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-festival-red hover:bg-festival-red/90 text-white px-5 py-3 rounded-sm flex items-center gap-2 shadow-lg transition-all duration-300 group"
                  >
                    <MapPin className="h-5 w-5" />
                    <span>Get Directions</span>
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.div>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* FAQ section with accordion */}
        <section className="py-16 px-6 bg-gradient-to-t from-[#050505] to-transparent">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-12 text-center">
              Frequently Asked Questions
            </h2>
            
            <motion.div 
              ref={faqRef}
              className="grid grid-cols-1 gap-3 max-w-3xl mx-auto"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate={isFaqInView ? "visible" : "hidden"}
            >
              {[
                {
                  id: 1,
                  question: "Is there a registration fee to participate in OnScreen '25?",
                  answer: "No. Participation in OnScreen '25 is completely free for all registered delegates, including access to workshops and the competition."
                },
                {
                  id: 2,
                  question: "Can I join the workshops without submitting a film?",
                  answer: "Yes, delegates are welcome to participate in the workshops and mentorship sessions even if they do not submit a film to the competition."
                },
                {
                  id: 3,
                  question: "What is the deadline for film submissions?",
                  answer: "The final deadline for submitting short films via FilmFreeway is on the 26th of May 2025 at 11:59 PM GMT+5:30."
                },
                {
                  id: 4,
                  question: "What are the eligibility requirements for submissions?",
                  answer: "Films must be under 20 minutes, completed after January 1, 2023, and submitted in MP4 or MOV format with a minimum resolution of 1080p."
                },
                {
                  id: 5,
                  question: "Will I receive a certificate or feedback for my participation?",
                  answer: "All delegates will receive online certificates of participation. Film feedback can be requested and will be provided at the discretion of the jury."
                }
              ].map((faq) => (
                <motion.div 
                  key={faq.id}
                  className="bg-black/30 border border-white/10 rounded-sm overflow-hidden transition-all duration-300 hover:border-festival-red/30"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                >
                  <motion.button 
                    className={`w-full p-5 text-left flex justify-between items-center ${activeFaq === faq.id ? 'bg-[rgba(30,30,30,0.6)]' : 'hover:bg-[rgba(30,30,30,0.4)]'} transition-colors`}
                    onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  >
                    <h3 className={`text-lg font-medium flex items-start ${activeFaq === faq.id ? 'text-festival-red' : 'text-white'} transition-colors`}>
                      <span className="text-festival-red mr-3">Q.</span>
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: activeFaq === faq.id ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/60"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 0V14M0 7H14" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {activeFaq === faq.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-[rgba(10,10,10,0.5)] border-t border-white/5"
                      >
                        <div className="p-5 pt-3">
                          <p className="text-white/70 pl-8">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, amount: 0.5 }}
              className="mt-16 text-center max-w-xl mx-auto"
            >
              <p className="text-white/70 mb-6">
                Still have questions? Our team is ready to assist you with any inquiries about the festival.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <motion.a
                  href="mailto:onscreenfilmfest@gmail.com"
                  className="bg-festival-red hover:bg-festival-red/90 text-white py-3 px-6 rounded-sm flex items-center gap-2 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Us</span>
                </motion.a>
                
                <motion.a
                  href="tel:+94774838430"
                  className="bg-transparent border border-white/20 hover:border-white text-white hover:bg-white/5 py-3 px-6 rounded-sm flex items-center gap-2 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Us</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ContactPage;