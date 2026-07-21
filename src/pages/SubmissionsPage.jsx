import React from 'react';
import SubmissionAnalytics from '../components/SubmissionAnalytics';
import BuildDeployment from '../components/BuildDeployment';
import { FileCheck } from 'lucide-react';

export default function SubmissionsPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
          <FileCheck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Submissions & Code Evaluation</h1>
          <p className="text-xs text-slate-400">Pushed repositories, submission timelines, and deployment previews</p>
        </div>
      </div>

      <SubmissionAnalytics />
      <BuildDeployment />
    </div>
  );
}
