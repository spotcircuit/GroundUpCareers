import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockJobs, mockCandidates, mockDraftJobs } from '../data/mockData';

interface JobPosting {
  id: string;
  companyName: string;
  title: string;
  trade: string;
  description: string;
  location: string;
  payRange: {
    min: number;
    max: number;
  };
  status: 'active' | 'filled' | 'draft';
  postedDate: string;
  candidatesReviewed?: number;
  totalCandidates?: number;
  hiredCandidate?: string;
  hireDate?: string;
  completionPercentage?: number;
  missingFields?: string[];
}

interface Candidate {
  id: string;
  name: string;
  trade: string;
  experience: number;
  certifications: string[];
  availability: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  resumeUrl: string;
  availableTimes?: {
    day: string;
    date: string;
    time: string;
  }[];
}

interface AppContextType {
  jobs: JobPosting[];
  draftJobs: JobPosting[];
  candidates: Candidate[];
  currentCandidate: Candidate | null;
  addJob: (job: Partial<JobPosting>) => void;
  addDraftJob: (job: Partial<JobPosting>) => void;
  updateJob: (id: string, updates: Partial<JobPosting>) => void;
  moveToNextCandidate: () => void;
  scheduleInterview: () => void;
  passOnCandidate: () => void;
  hireCandidate: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<JobPosting[]>(mockJobs);
  const [draftJobs, setDraftJobs] = useState<JobPosting[]>(mockDraftJobs);
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);

  const addJob = (job: Partial<JobPosting>) => {
    const newJob: JobPosting = {
      id: Date.now().toString(),
      companyName: job.companyName || 'Company Name',
      title: job.title || 'Job Title',
      trade: job.trade || 'General Labor',
      description: job.description || '',
      location: job.location || 'City, State',
      payRange: job.payRange || { min: 15, max: 25 },
      status: 'active',
      postedDate: new Date().toISOString(),
      candidatesReviewed: 0,
      totalCandidates: 5,
    };
    
    setJobs([newJob, ...jobs]);
  };

  const addDraftJob = (job: Partial<JobPosting>) => {
    const newDraftJob: JobPosting = {
      id: Date.now().toString(),
      companyName: job.companyName || 'Company Name',
      title: job.title || 'Draft Job',
      trade: job.trade || '',
      description: job.description || '',
      location: job.location || '',
      payRange: job.payRange || { min: 0, max: 0 },
      status: 'draft',
      postedDate: new Date().toISOString(),
      completionPercentage: job.completionPercentage || 30,
      missingFields: job.missingFields || ['Job description', 'Required skills', 'Benefits package'],
    };
    
    setDraftJobs([newDraftJob, ...draftJobs]);
  };

  const updateJob = (id: string, updates: Partial<JobPosting>) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, ...updates } : job));
  };

  const moveToNextCandidate = () => {
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex(currentCandidateIndex + 1);
    } else {
      setCurrentCandidateIndex(0);
    }
  };

  const scheduleInterview = () => {
    // Simulate scheduling an interview with the current candidate
    // In a real app, this would involve more complex logic
    moveToNextCandidate();
  };

  const passOnCandidate = () => {
    // Simulate passing on the current candidate
    moveToNextCandidate();
  };

  const hireCandidate = () => {
    // Simulate hiring the current candidate
    if (jobs.length > 0 && currentCandidate) {
      const updatedJobs = [...jobs];
      updatedJobs[0] = {
        ...updatedJobs[0],
        status: 'filled',
        hiredCandidate: currentCandidate.name,
        hireDate: new Date().toISOString(),
      };
      setJobs(updatedJobs);
    }
    moveToNextCandidate();
  };

  const currentCandidate = candidates[currentCandidateIndex] || null;

  return (
    <AppContext.Provider value={{
      jobs,
      draftJobs,
      candidates,
      currentCandidate,
      addJob,
      addDraftJob,
      updateJob,
      moveToNextCandidate,
      scheduleInterview,
      passOnCandidate,
      hireCandidate,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};