
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-festival-dark text-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">Contact Us</h1>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Contact Info */}
              <div className="bg-festival-card p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-festival-red mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-white/80">123 Film Street, Colombo 07, Sri Lanka</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-festival-red mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:info@onscreen25.com" className="text-white/80 hover:text-white transition-colors">
                        info@onscreen25.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-festival-red mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a href="tel:+94123456789" className="text-white/80 hover:text-white transition-colors">
                        +94 123 456 789
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-festival-card p-8 rounded-lg border border-white/10">
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                    <Input
                      id="name"
                      required
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                    <Input
                      id="subject"
                      required
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                    <Textarea
                      id="message"
                      required
                      className="bg-white/10 border-white/20 text-white min-h-32"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-festival-red hover:bg-red-700 text-white"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
