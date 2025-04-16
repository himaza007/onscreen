import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/ui/pagetransition';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Send } from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();
  const formRef = useRef(null);
  const mapRef = useRef(null);
  const isFormInView = useInView(formRef, { once: false, amount: 0.3 });
  const isMapInView = useInView(mapRef, { once: false, amount: 0.3 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
      variant: "default",
    });
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
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
          <motion.div 
            className="container mx-auto px-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Contact Us
            </motion.h1>
            
            <motion.div 
              className="w-20 h-1 bg-festival-red mx-auto mb-6"
              initial={{ width: 0 }}
              animate={{ width: "5rem" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
            
            <motion.p 
              className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Have questions about the festival? Reach out to our team.
            </motion.p>
          </motion.div>
        </section>
        
        {/* Contact info and form section */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <motion.div 
                ref={mapRef}
                variants={fadeInVariants}
                initial="hidden"
                animate={isMapInView ? "visible" : "hidden"}
                className="order-2 md:order-1"
              >
                <div className="bg-[#0a0a0a] border border-white/10 p-8 h-full">
                  <h2 className="text-2xl font-display font-medium mb-6 pb-4 border-b border-white/10">
                    Get In Touch
                  </h2>
                  
                  <div className="space-y-8">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-festival-red/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-festival-red" />
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-medium mb-2">Visit Us</h3>
                        <p className="text-white/70 leading-relaxed">
                          123 Film Street<br />
                          Colombo 07<br />
                          Sri Lanka
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-festival-red/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-festival-red" />
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-medium mb-2">Email Us</h3>
                        <a 
                          href="mailto:info@onscreen25.com" 
                          className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                        >
                          info@onscreen25.com
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-0 transition-all duration-300 group-hover:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-festival-red/10 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-festival-red" />
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-medium mb-2">Call Us</h3>
                        <a 
                          href="tel:+94123456789" 
                          className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                        >
                          +94 123 456 789
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-0 transition-all duration-300 group-hover:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-festival-red/10 flex items-center justify-center">
                          <Globe className="w-5 h-5 text-festival-red" />
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-medium mb-2">Connect</h3>
                        <div className="flex space-x-4">
                          {['facebook', 'twitter', 'instagram', 'youtube'].map((platform) => (
                            <a 
                              key={platform} 
                              href={`https://${platform}.com/onscreen25`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-white/70 hover:text-white transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Contact Form */}
              <motion.div 
                ref={formRef}
                variants={fadeInVariants}
                initial="hidden"
                animate={isFormInView ? "visible" : "hidden"}
                className="order-1 md:order-2"
              >
                <div className="bg-[#0a0a0a] border border-white/10 p-8">
                  <h2 className="text-2xl font-display font-medium mb-6 pb-4 border-b border-white/10">
                    Send a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-white/80">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        required
                        className="bg-black/50 border-white/20 text-white h-12 focus-visible:ring-festival-red transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-white/80">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="bg-black/50 border-white/20 text-white h-12 focus-visible:ring-festival-red transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block mb-2 text-sm font-medium text-white/80">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        required
                        className="bg-black/50 border-white/20 text-white h-12 focus-visible:ring-festival-red transition-colors"
                        placeholder="What is your message about?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block mb-2 text-sm font-medium text-white/80">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        required
                        className="bg-black/50 border-white/20 text-white min-h-32 focus-visible:ring-festival-red transition-colors"
                        placeholder="Type your message here..."
                      />
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-festival-red hover:bg-festival-red/90 text-white py-6 group"
                      >
                        <span>Send Message</span>
                        <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Map section (placeholder) */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <div className="bg-[#0a0a0a] border border-white/10 p-2">
                {/* This would be replaced with an actual map component */}
                <div className="h-[400px] bg-[#090909] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-festival-red mx-auto mb-4" />
                    <p className="text-white/60">Interactive map would be displayed here</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* FAQ section */}
        <section className="py-12 px-6 bg-gradient-to-t from-[#050505] to-transparent">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  question: "What is the submission deadline?",
                  answer: "The final deadline for submissions is June 1, 2025. We encourage early submissions for reduced fees."
                },
                {
                  question: "Can I submit multiple films?",
                  answer: "Yes, you can submit multiple films. Each submission requires a separate entry and fee."
                },
                {
                  question: "Are international submissions accepted?",
                  answer: "Yes, we welcome submissions from filmmakers around the world. Films in languages other than English must include English subtitles."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  className="bg-white/5 border border-white/10 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                  <p className="text-white/70">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default ContactPage;