
import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-festival-darker pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Festival Info */}
          <div className="col-span-1">
            <h3 className="text-white text-xl font-display font-bold mb-4">OnScreen '25</h3>
            <p className="text-white/70 mb-4">
              Sri Lanka's Premier Short Film Festival celebrating excellence in filmmaking and showcasing emerging talent.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/timeline" className="text-white/70 hover:text-white transition-colors">Timeline</Link>
              </li>
              <li>
                <Link to="/workshops" className="text-white/70 hover:text-white transition-colors">Workshops</Link>
              </li>
              <li>
                <Link to="/submit" className="text-white/70 hover:text-white transition-colors">Submit Your Film</Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-white font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-festival-red mr-2 mt-0.5" />
                <span className="text-white/70">Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-festival-red mr-2" />
                <a href="mailto:info@onscreen25.com" className="text-white/70 hover:text-white transition-colors">
                  info@onscreen25.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-festival-red mr-2" />
                <a href="tel:+94123456789" className="text-white/70 hover:text-white transition-colors">
                  +94 123 456 789
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="text-white font-bold mb-4">Newsletter</h3>
            <p className="text-white/70 mb-4">
              Subscribe to our newsletter for updates and announcements.
            </p>
            <div className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/10 border-white/20 text-white"
              />
              <Button className="bg-festival-red hover:bg-red-700 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © 2025 OnScreen Film Festival. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
