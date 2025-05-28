import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HardHat, Menu, X } from 'lucide-react';

const Header: React.FC<{ transparent?: boolean }> = ({ transparent = false }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');

  return (
    <header className={`${
      transparent && !isDashboard 
        ? 'bg-transparent text-white' 
        : 'bg-white text-neutral-800 shadow-sm'
    } fixed w-full z-50 transition-all duration-300`}>
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <HardHat size={32} className={transparent && !isDashboard ? 'text-secondary-500' : 'text-primary-600'} />
            <span className="text-xl font-bold font-display tracking-tight">
              GroundupCareers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {!isDashboard && (
              <>
                <Link to="/#how-it-works\" className="font-medium hover:text-primary-600 transition-colors">
                  How it Works
                </Link>
                <Link to="/#pricing" className="font-medium hover:text-primary-600 transition-colors">
                  Pricing
                </Link>
                <Link to="/dashboard" className="btn-primary">
                  Post a Job
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-neutral-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && !isDashboard && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container-custom py-4 flex flex-col gap-4">
            <Link 
              to="/#how-it-works" 
              className="py-2 font-medium text-neutral-800 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link 
              to="/#pricing" 
              className="py-2 font-medium text-neutral-800 hover:text-primary-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/dashboard" 
              className="btn-primary w-full justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Post a Job
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;