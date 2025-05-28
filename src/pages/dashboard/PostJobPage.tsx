import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowRight, AlertCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { tradeOptions, stateOptions, companySizeOptions } from '../../data/mockData';

const PostJobPage: React.FC = () => {
  const navigate = useNavigate();
  const { addJob, addDraftJob } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    city: '',
    state: '',
    zip: '',
    companySize: '',
    email: '',
    phone: '',
    trade: '',
    jobTitle: '',
    jobDescription: '',
    requiredSkills: '',
    benefits: '',
    payMin: '',
    payMax: '',
    startDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Process form data
    const newJob = {
      companyName: formData.companyName,
      title: formData.jobTitle,
      trade: formData.trade,
      description: formData.jobDescription,
      location: `${formData.city}, ${formData.state}`,
      payRange: {
        min: parseInt(formData.payMin) || 0,
        max: parseInt(formData.payMax) || 0,
      },
    };
    
    // Add job to context
    addJob(newJob);
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form and states after delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(false);
      navigate('/dashboard/candidates');
    }, 2000);
  };

  const handleSaveDraft = () => {
    // Calculate completion percentage based on filled fields
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value !== '').length;
    const completionPercentage = Math.floor((filledFields / totalFields) * 100);
    
    // Determine missing fields
    const missingFields = [];
    if (!formData.jobTitle) missingFields.push('Job title');
    if (!formData.jobDescription) missingFields.push('Job description');
    if (!formData.requiredSkills) missingFields.push('Required skills');
    if (!formData.benefits) missingFields.push('Benefits package');
    
    // Add draft job to context
    addDraftJob({
      companyName: formData.companyName || 'Your Company',
      title: formData.jobTitle || 'Draft Job',
      trade: formData.trade,
      description: formData.jobDescription,
      location: formData.city ? `${formData.city}, ${formData.state}` : '',
      payRange: {
        min: parseInt(formData.payMin) || 0,
        max: parseInt(formData.payMax) || 0,
      },
      completionPercentage,
      missingFields,
    });
    
    // Navigate to staging page
    navigate('/dashboard/staging');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display mb-2">Post New Job</h1>
        <p className="text-neutral-600">
          Fill out the form below to create a new job posting.
        </p>
      </div>

      {showSuccess && (
        <div className="bg-success-500 text-white p-4 rounded-md mb-6 flex items-center gap-2 slide-in">
          <Check size={20} />
          <span>Job posted successfully! Redirecting to candidates...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information Section */}
        <section className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Company Information</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="companyName" className="label">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                className="input-field"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="companySize" className="label">Company Size</label>
              <select
                id="companySize"
                name="companySize"
                className="input-field"
                value={formData.companySize}
                onChange={handleChange}
                required
              >
                <option value="">Select company size</option>
                {companySizeOptions.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="companyAddress" className="label">Company Address</label>
            <input
              type="text"
              id="companyAddress"
              name="companyAddress"
              className="input-field"
              value={formData.companyAddress}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="col-span-2">
              <label htmlFor="city" className="label">City</label>
              <input
                type="text"
                id="city"
                name="city"
                className="input-field"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="state" className="label">State</label>
              <select
                id="state"
                name="state"
                className="input-field"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">State</option>
                {stateOptions.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="zip" className="label">ZIP</label>
              <input
                type="text"
                id="zip"
                name="zip"
                className="input-field"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="input-field"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="label">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="input-field"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        {/* Job Details Section */}
        <section className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Job Details</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="trade" className="label">Trade Required</label>
              <select
                id="trade"
                name="trade"
                className="input-field"
                value={formData.trade}
                onChange={handleChange}
                required
              >
                <option value="">Select trade</option>
                {tradeOptions.map(trade => (
                  <option key={trade} value={trade}>{trade}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="jobTitle" className="label">Job Title</label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                className="input-field"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="jobDescription" className="label">Job Description</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              rows={5}
              className="input-field"
              value={formData.jobDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label htmlFor="requiredSkills" className="label">Required Skills/Certifications</label>
            <textarea
              id="requiredSkills"
              name="requiredSkills"
              rows={3}
              className="input-field"
              value={formData.requiredSkills}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label htmlFor="benefits" className="label">Benefits Package</label>
            <textarea
              id="benefits"
              name="benefits"
              rows={3}
              className="input-field"
              value={formData.benefits}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="payMin" className="label">Pay Range (Minimum)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">$</span>
                  <input
                    type="number"
                    id="payMin"
                    name="payMin"
                    className="input-field pl-8"
                    value={formData.payMin}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="payMax" className="label">Pay Range (Maximum)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">$</span>
                  <input
                    type="number"
                    id="payMax"
                    name="payMax"
                    className="input-field pl-8"
                    value={formData.payMax}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="startDate" className="label">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="input-field"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="btn-outline"
          >
            <Save size={18} />
            Save as Draft
          </button>
          
          <button
            type="submit"
            className={`btn-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                  <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting Job...
              </>
            ) : (
              <>
                Post Job
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobPage;