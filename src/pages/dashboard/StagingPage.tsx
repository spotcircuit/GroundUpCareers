import React from 'react';
import { Edit, Trash2, Plus, ClipboardList, ClipboardCheck } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const StagingPage: React.FC = () => {
  const { draftJobs } = useAppContext();

  // Template data
  const templates = [
    { name: 'Carpenter Job', icon: <ClipboardList size={18} /> },
    { name: 'HVAC Tech', icon: <ClipboardList size={18} /> },
    { name: 'General Labor', icon: <ClipboardList size={18} /> },
    { name: '+ Custom', icon: <Plus size={18} /> },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display mb-2">Job Staging</h1>
        <p className="text-neutral-600">
          Manage your draft jobs and use templates to quickly create new postings.
        </p>
      </div>

      {/* Draft Jobs Section */}
      <section className="card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Saved Drafts ({draftJobs.length})</h2>
        
        {draftJobs.length === 0 ? (
          <div className="text-center py-6 border border-dashed border-neutral-300 rounded-md">
            <p className="text-neutral-500 mb-4">No draft jobs yet.</p>
            <Link to="/dashboard/post-job" className="btn-primary">
              <Plus size={18} />
              Create New Job
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {draftJobs.map(job => (
              <div key={job.id} className="border border-neutral-200 rounded-lg p-4">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-3">
                  <h3 className="font-semibold">{job.title}</h3>
                  <span className="text-sm text-neutral-600">{job.companyName}</span>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-neutral-600 mb-1">
                    <span>Progress: {job.completionPercentage}% Complete</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary-600 h-2.5 rounded-full" 
                      style={{ width: `${job.completionPercentage}%` }}
                    ></div>
                  </div>
                </div>
                
                {job.missingFields && job.missingFields.length > 0 && (
                  <div className="mb-4">
                    <span className="text-sm text-neutral-600">Missing: {job.missingFields.join(', ')}</span>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  <button className="btn-primary">
                    <Edit size={16} />
                    Continue Editing
                  </button>
                  <button className="btn-outline text-neutral-700">
                    <Trash2 size={16} />
                    Delete Draft
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Templates Section */}
      <section className="card p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Templates</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map((template, index) => (
            <button 
              key={index} 
              className="border border-neutral-300 rounded-lg p-4 hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
            >
              <div className="flex justify-center mb-2">
                {template.icon}
              </div>
              <span>{template.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Ready to Post Queue */}
      <section className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Ready to Post Queue</h2>
        
        <div className="text-center py-10 border border-dashed border-neutral-300 rounded-md">
          <p className="text-neutral-500 mb-4">No jobs ready to post</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="btn-outline">
              <Plus size={18} />
              Add from Drafts
            </button>
            <Link to="/dashboard/post-job" className="btn-primary">
              <ClipboardCheck size={18} />
              Create New
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StagingPage;