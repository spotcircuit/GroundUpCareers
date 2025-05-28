import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <HardHat size={32} className="text-secondary-500" />
              <span className="text-xl font-bold font-display tracking-tight">
                GroundupCareers
              </span>
            </Link>
            <p className="text-neutral-300 mb-4">
              Connecting construction companies with skilled workers. 
              Find the right talent for your job, efficiently and reliably.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-neutral-400" />
                <span className="text-neutral-300">1-800-GROUNDUP</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-neutral-400" />
                <span className="text-neutral-300">contact@groundupcareers.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-neutral-400" />
                <span className="text-neutral-300">Portland, OR</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="text-neutral-300 hover:text-white transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-neutral-300 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-neutral-300 hover:text-white transition-colors">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                  Construction Hiring Guide
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                  Salary Trends
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-700 text-neutral-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <p>© 2025 GroundupCareers.com. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;