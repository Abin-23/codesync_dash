import React, { useState } from 'react';
import { useLiveData } from '../context/LiveDataContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Eye,
  SlidersHorizontal,
  Clock,
  ExternalLink,
  ChevronDown,
  Terminal,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export default function StudentTable({ limit }) {
  const {
    students,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    taskFilter,
    setTaskFilter,
    submissionFilter,
    setSubmissionFilter,
    sortBy,
    setSortBy,
    setSelectedStudentModal,
    setSelectedLogsModal
  } = useLiveData();

  const [page, setPage] = useState(1);
  const pageSize = limit || 10;

  // Filter logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.assignedTask.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    const matchesTask = taskFilter === 'All' || student.assignedTask.includes(taskFilter);
    const matchesSubmission = submissionFilter === 'All' || student.submissionStatus === submissionFilter;

    return matchesSearch && matchesStatus && matchesTask && matchesSubmission;
  });

  // Sort logic
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'progress') return b.progress - a.progress;
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'timer') return a.timerRemaining - b.timerRemaining;
    return 0;
  });

  const paginatedStudents = limit ? sortedStudents.slice(0, limit) : sortedStudents.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(sortedStudents.length / pageSize);

  const getStatusChip = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Submitted':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Testing':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Coding':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Logged In':
        return 'bg-slate-700/40 text-slate-300 border-slate-600/40';
      default:
        return 'bg-slate-900 text-slate-400 border-slate-800';
    }
  };

  const formatTimer = (secs) => {
    if (secs <= 0) return <span className="text-red-400 font-bold">Expired</span>;
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s.toString().padStart(2, '0')}s`;
  };

  return (
    <div className="space-y-4">
      {/* Filters & Control Bar */}
      {!limit && (
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 glass-panel flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 flex-1">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Offline">Offline</option>
                <option value="Logged In">Logged In</option>
                <option value="Coding">Coding</option>
                <option value="Testing">Testing</option>
                <option value="Submitted">Submitted</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Submission Filter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <span className="text-slate-400 font-medium">Submission:</span>
              <select
                value={submissionFilter}
                onChange={(e) => setSubmissionFilter(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="All">All Submissions</option>
                <option value="Submitted">Submitted</option>
                <option value="Pending">Pending</option>
                <option value="Late">Late</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="name">Name</option>
                <option value="progress">Highest Progress</option>
                <option value="score">Highest Score</option>
                <option value="timer">Remaining Time</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Showing <span className="text-slate-100 font-bold">{sortedStudents.length}</span> students
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Login Time</th>
                <th className="py-3.5 px-4">Assigned Task</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Timer</th>
                <th className="py-3.5 px-4">Submission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-500">
                    No students match your filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    {/* Student Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-700"
                        />
                        <div>
                          <p className="font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                            {student.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">{student.id} • {student.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Login Time */}
                    <td className="py-3 px-4 font-mono text-slate-300">
                      {student.loginTime}
                    </td>

                    {/* Task */}
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-200 block truncate max-w-[180px]">
                        {student.assignedTask}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getStatusChip(student.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {student.status}
                      </span>
                    </td>

                    {/* Remaining Time */}
                    <td className="py-3 px-4 font-mono">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {formatTimer(student.timerRemaining)}
                      </div>
                    </td>

                    {/* Submission */}
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${student.submissionStatus === 'Submitted' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-800 text-slate-400'
                        }`}>
                        {student.submissionStatus}
                      </span>
                    </td>

                    
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!limit && totalPages > 1 && (
          <div className="p-3 border-t border-slate-800/80 bg-slate-900/40 flex items-center justify-between text-xs text-slate-400">
            <span>Page {page} of {totalPages}</span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200"
              >
                Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
