import React from 'react';
import { Eye, Edit, X, Clock, CheckCircle2, ClipboardCopy } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const ManageJobsPage: React.FC = () => {
  const { jobs } = useAppContext();

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit'
    }).format(date);
  };

  // Function to calculate days ago
  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display mb-2">Manage Jobs</h1>
        <p className="text-neutral-600">
          Track the status of your job postings and manage candidates.
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-neutral-600 mb-4">You haven't posted any jobs yet.</p>
          <Link to="/dashboard/post-job" className="btn-primary">
            Post Your First Job
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {jobs.map(job => (
            <div key={job.id} className="card p-0 overflow-hidden">
              <div className={`p-6 ${
                job.status === 'active' ? 'bg-primary-700 text-white' : 
                job.status === 'filled' ? 'bg-success-600 text-white' : 'bg-neutral-700 text-white'
              }`}>
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <div className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    {job.companyName}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Status</h3>
                      {job.status === 'active' && (
                        <div className="flex items-center gap-2 text-primary-600">
                          <Clock size={18} />
                          <span>
                            Reviewing Candidates ({job.candidatesReviewed} of {job.totalCandidates} reviewed)
                          </span>
                        </div>
                      )}
                      {job.status === 'filled' && (
                        <div className="flex items-center gap-2 text-success-600">
                          <CheckCircle2 size={18} />
                          <span>
                            Position Filled
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Details</h3>
                      <div className="space-y-2 text-neutral-700">
                        <p><span className="font-medium">Trade:</span> {job.trade}</p>
                        <p><span className="font-medium">Location:</span> {job.location}</p>
                        <p><span className="font-medium">Pay Range:</span> ${job.payRange.min} - ${job.payRange.max}/hr</p>
                        {job.status === 'active' && (
                          <p><span className="font-medium">Posted:</span> {getDaysAgo(job.postedDate)} days ago</p>
                        )}
                        {job.status === 'filled' && job.hiredCandidate && (
                          <p><span className="font-medium">Hired:</span> {job.hiredCandidate} on {formatDate(job.hireDate || '')}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Actions</h3>
                    <div className="flex flex-wrap gap-3">
                      {job.status === 'active' && (
                        <>
                          <Link to="/dashboard/candidates\" className="btn-primary">
                            <Eye size={18} />
                            View Candidates
                          </Link>
                          <button className="btn-outline">
                            <Edit size={18} />
                            Edit Job
                          </button>
                          <button className="btn bg-error-500 hover:bg-error-600 text-white">
                            <X size={18} />
                            Close Position
                          </button>
                        </>
                      )}
                      {job.status === 'filled' && (
                        <>
                          <button className="btn-outline">
                            <Eye size={18} />
                            View Details
                          </button>
                          <button className="btn-primary">
                            <ClipboardCopy size={18} />
                            Post Similar Job
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageJobsPage;