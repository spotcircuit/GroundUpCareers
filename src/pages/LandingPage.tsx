import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardCheck, UserCheck, Briefcase, CheckCircle2 } from 'lucide-react';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header transparent={!isScrolled} />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-primary-900 to-primary-700 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 fade-in">
              Find Skilled Construction Workers Fast
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 slide-in">
              Post your job, review qualified candidates, hire the best
            </p>
            <Link 
              to="/payment" 
              className="btn-secondary text-lg px-8 py-3 inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Post Your First Job - $99
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our streamlined process helps you find qualified construction workers in just three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="card card-hover text-center p-8">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ClipboardCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Post Your Job</h3>
              <p className="text-neutral-600">
                Create a detailed job posting with all your requirements and benefits. It only takes a few minutes.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card card-hover text-center p-8">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCheck size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Review Candidates</h3>
              <p className="text-neutral-600">
                Browse pre-screened candidates who match your requirements. Schedule interviews with your top picks.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card card-hover text-center p-8">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Hire & Get Started</h3>
              <p className="text-neutral-600">
                Select the perfect candidate for your position and get your project moving forward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              No monthly subscriptions or hidden fees. Pay only when you need to hire.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="card bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-primary-600 text-white p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Single Job Posting</h3>
                <div className="text-4xl font-bold mb-2">$99</div>
                <p className="text-primary-100">per job posting</p>
              </div>
              
              <div className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-success-500 mt-0.5 flex-shrink-0" />
                    <span>Access to pre-screened construction candidates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-success-500 mt-0.5 flex-shrink-0" />
                    <span>30-day job posting visibility</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-success-500 mt-0.5 flex-shrink-0" />
                    <span>Interview scheduling tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-success-500 mt-0.5 flex-shrink-0" />
                    <span>No monthly fees or subscriptions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-success-500 mt-0.5 flex-shrink-0" />
                    <span>Hire as many candidates as you need</span>
                  </li>
                </ul>

                <Link 
                  to="/payment" 
                  className="btn-secondary w-full justify-center mt-8"
                >
                  Post Job Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Companies across the country are finding skilled workers through GroundupCareers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-bold">AC</span>
                </div>
                <div>
                  <h4 className="font-semibold">Alex Chen</h4>
                  <p className="text-sm text-neutral-500">ABC Construction LLC</p>
                </div>
              </div>
              <p className="text-neutral-700">
                "We hired two carpenters through GroundupCareers and they've been excellent additions to our team. The process was quick and the candidates were exactly what we were looking for."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="card p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-bold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">Jennifer Davis</h4>
                  <p className="text-sm text-neutral-500">Metro HVAC Services</p>
                </div>
              </div>
              <p className="text-neutral-700">
                "Finding qualified HVAC technicians has always been a challenge until we started using GroundupCareers. Worth every penny of the job posting fee."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="card p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-600 font-bold">RJ</span>
                </div>
                <div>
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-sm text-neutral-500">Premier Roofing Solutions</p>
                </div>
              </div>
              <p className="text-neutral-700">
                "We were able to staff up for a major project in just two weeks. The quality of candidates was impressive and the platform was easy to use."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-800 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Ready to Find Your Next Construction Pro?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Post your job today and start reviewing qualified candidates right away.
            </p>
            <Link 
              to="/payment" 
              className="btn-secondary text-lg px-8 py-3 inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Post Your Job Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;