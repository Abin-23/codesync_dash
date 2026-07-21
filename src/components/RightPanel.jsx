import React, { useState, useEffect } from 'react';
import { useLiveData } from '../context/LiveDataContext';
import { motion } from 'framer-motion';
import {
  Clock,
  Server,
  Users,
  CheckCircle2,
  FileCode,
  Activity,
  Cpu,
  Wifi,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export default function RightPanel() {
  const { kpis } = useLiveData();
  const [collapsed, setCollapsed] = useState(false);
  const [eventTimeRemaining, setEventTimeRemaining] = useState(4820);

  useEffect(() => {
    const timer = setInterval(() => {
      setEventTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const hours = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <aside
      className={`hidden xl:block shrink-0 transition-all duration-300 ${
        collapsed ? 'w-12' : 'w-72'
      } relative`}
    >
      <div className="sticky top-20 matte-card p-5 space-y-5 shadow-2xl">
        {/* Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-[#111111] text-[#C3F53B] flex items-center justify-center shadow-lg border border-[#1A1A1A] hover:bg-[#1A1A1A] transition-colors z-10"
        >
          {collapsed ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </button>

        {collapsed ? (
          <div className="flex flex-col items-center gap-6 py-4 text-slate-400">
            <Server className="w-5 h-5 text-[#C3F53B] animate-pulse" />
            <Activity className="w-5 h-5 text-white" />
            <Users className="w-5 h-5 text-[#FF8C00]" />
          </div>
        ) : (
          <>
            {/* Header / Event Clock */}
            <div className="border-b border-[#222226] pb-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                <span className="flex items-center gap-1.5 text-[#C3F53B]">
                  <Clock className="w-3.5 h-3.5" /> Event Countdown
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#C3F53B]/20 text-[#C3F53B] text-[10px] font-bold">
                  Live
                </span>
              </div>
              <div className="text-2xl font-black font-mono tracking-tight text-white flex items-center gap-2">
                {formatTime(eventTimeRemaining)}
              </div>
            </div>

            {/* Quick Metrics Stack */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider font-mono">Live Metrics</h4>
              
              <div className="p-3 rounded-2xl bg-[#111111] border border-[#1A1A1A] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#C3F53B]/10 text-[#C3F53B]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Students Online</p>
                    <p className="text-sm font-bold text-white font-mono">{kpis.loginActiveCount} / {kpis.totalStudents}</p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#C3F53B] animate-ping" />
              </div>

              <div className="p-3 rounded-2xl bg-[#111111] border border-[#1A1A1A] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-white/10 text-white">
                    <FileCode className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Tasks Remaining</p>
                    <p className="text-sm font-bold text-white font-mono">{kpis.totalStudents - kpis.completedCount}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#111111] border border-[#1A1A1A] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#FF8C00]/10 text-[#FF8C00]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400">Submissions</p>
                    <p className="text-sm font-bold text-white font-mono">{kpis.submissionsCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Progress Gauge */}
            <div className="p-3.5 rounded-2xl bg-[#111111] border border-[#1A1A1A] space-y-2">
              <div className="flex justify-between text-xs font-bold font-mono">
                <span className="text-slate-300">Overall Completion</span>
                <span className="text-[#C3F53B]">{kpis.overallCompletionPercentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black overflow-hidden">
                <motion.div
                  className="h-full bg-[#C3F53B] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${kpis.overallCompletionPercentage}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            {/* Server Status Section with Green Blinking Signal */}
            <div className="pt-2 border-t border-[#222226] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-medium flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-[#C3F53B]" /> Cluster Health
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C3F53B] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C3F53B]"></span>
                  </span>
                  <span className="text-[#C3F53B] font-bold text-[11px]">100% Operational</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                <div className="p-2 rounded-xl bg-[#0A0A0C] border border-[#222226] flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-[#C3F53B]" />
                  <span>CPU: 34%</span>
                </div>
                <div className="p-2 rounded-xl bg-[#0A0A0C] border border-[#222226] flex items-center gap-1.5">
                  <Wifi className="w-3 h-3 text-[#FF8C00]" />
                  <span>14ms Latency</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
