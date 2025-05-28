import React, { useState } from 'react';
import { FileText, Calendar, Check, X, Briefcase, Clock, Phone, Mail, Linkedin } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const CandidatesPage: React.FC = () => {
  const { 
    currentCandidate, 
    scheduleInterview,
    passOnCandidate,
    hireCandidate
  } = useAppContext();
  
  const [selectedTime, setSelectedTime] = useState('');
  const [showInterviewSuccess, setShowInterviewSuccess] = useState(false);
  const [showPassMessage, setShowPassMessage] = useState(false);
  const [showHireSuccess, setShowHireSuccess] = useState(false);

  const handleScheduleInterview = () => {
    if (!selectedTime) return;
    
    setShowInterviewSuccess(true);
    
    setTimeout(() => {
      setShowInterviewSuccess(false);
      scheduleInterview();
      setSelectedTime('');
    }, 1500);
  };

  const handlePass = () => {
    setShowPassMessage(true);
    
    setTimeout(() => {
      setShowPassMessage(false);
      passOnCandidate();
    }, 1500);
  };

  const handleHire = () => {
    setShowHireSuccess(true);
    
    setTimeout(() => {
      setShowHireSuccess(false);
      hireCandidate();
    }, 1500);
  };

  if (!currentCandidate) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600">No candidates available at this time.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display mb-2">Review Candidates</h1>
        <p className="text-neutral-600">
          Review qualified candidates and schedule interviews.
        </p>
      </div>

      {showInterviewSuccess && (
        <div className="bg-success-500 text-white p-4 rounded-md mb-6 flex items-center gap-2 slide-in">
          <Check size={20} />
          <span>Interview scheduled! Confirmation sent.</span>
        </div>
      )}

      {showPassMessage && (
        <div className="bg-neutral-700 text-white p-4 rounded-md mb-6 flex items-center gap-2 slide-in">
          <Clock size={20} />
          <span>Next candidate will be available tomorrow.</span>
        </div>
      )}

      {showHireSuccess && (
        <div className="bg-success-500 text-white p-4 rounded-md mb-6 flex items-center gap-2 slide-in">
          <Briefcase size={20} />
          <span>Position filled! Job posting closed.</span>
        </div>
      )}

      <div className="card p-0 overflow-hidden">
        <div className="bg-primary-700 text-white p-6">
          <h2 className="text-xl font-semibold">Current Candidate: {currentCandidate.name}</h2>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Preview */}
            <div>
              <div className="mb-4 flex items-center gap-2 text-primary-600">
                <FileText size={20} />
                <h3 className="font-semibold">Resume Preview</h3>
              </div>
              
              <div className="border border-neutral-300 rounded-lg overflow-hidden h-96 bg-neutral-100 flex items-center justify-center">
                <img 
                  src="/src/assets/sample-resume.jpg"
                  alt="Sample Resume"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
            
            {/* Candidate Info */}
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Candidate Summary</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 font-medium">{currentCandidate.experience} years</span> 
                    <span>{currentCandidate.trade.toLowerCase()} experience</span>
                  </li>
                  {currentCandidate.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check size={18} className="text-success-500 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2">
                    <Clock size={18} className="text-primary-600 mt-0.5" />
                    <span>Available {currentCandidate.availability.toLowerCase()}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 font-medium">Located in</span> 
                    <span>{currentCandidate.location}</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Phone size={18} className="text-primary-600" />
                    <span>{currentCandidate.phone}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail size={18} className="text-primary-600" />
                    <span>{currentCandidate.email}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Linkedin size={18} className="text-primary-600" />
                    <span>{currentCandidate.linkedin}</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Interview Scheduling</h3>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2 text-primary-600">
                    <Calendar size={18} />
                    <span className="font-medium">Available Times:</span>
                  </div>
                  
                  <div className="space-y-2">
                    {currentCandidate.availableTimes?.map((timeSlot, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={`time-${index}`}
                          name="interviewTime"
                          className="mr-3"
                          value={`${timeSlot.day} ${timeSlot.date} at ${timeSlot.time}`}
                          onChange={(e) => setSelectedTime(e.target.value)}
                        />
                        <label htmlFor={`time-${index}`}>
                          {timeSlot.day} {timeSlot.date} at {timeSlot.time}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button 
                  className="btn-primary"
                  onClick={handleScheduleInterview}
                  disabled={!selectedTime}
                >
                  <Calendar size={18} />
                  Schedule Interview
                </button>
                
                <button 
                  className="btn-outline text-neutral-700"
                  onClick={handlePass}
                >
                  <X size={18} />
                  Pass on Candidate
                </button>
                
                <button 
                  className="btn bg-success-500 text-white hover:bg-success-600"
                  onClick={handleHire}
                >
                  <Briefcase size={18} />
                  Hire This Candidate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesPage;