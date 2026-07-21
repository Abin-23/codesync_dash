import React from 'react';
import { useLiveData } from '../context/LiveDataContext';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  Zap,
  CheckSquare,
  FileCheck,
  Trophy,
  Timer,
  TestTube2,
  CheckCircle,
  Layers,
  ShieldCheck,
  Rocket,
  AlertTriangle,
  Percent,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function DashboardCards() {
  const { kpis } = useLiveData();

  const cardsData = [
    {
      title: "Total Students",
      value: kpis.totalStudents,
      desc: "Registered hackathon participants",
      icon: Users,
      trend: "+100%",
      trendUp: true,
      color: "from-blue-500/20 to-blue-600/5",
      border: "border-blue-500/30",
      iconColor: "text-blue-400"
    },
    {
      title: "Login Active Count",
      value: kpis.loginActiveCount,
      desc: "Currently logged into IDE",
      icon: UserCheck,
      trend: "88% Online",
      trendUp: true,
      color: "from-emerald-500/20 to-emerald-600/5",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400"
    },
    {
      title: "Total Active Users",
      value: kpis.totalActiveUsers,
      desc: "Actively writing code & tests",
      icon: Zap,
      trend: "Peak load",
      trendUp: true,
      color: "from-purple-500/20 to-purple-600/5",
      border: "border-purple-500/30",
      iconColor: "text-purple-400"
    },
    
    {
      title: "Submissions",
      value: kpis.submissionsCount,
      desc: "Final code repositories pushed",
      icon: FileCheck,
      trend: "+4 last 10m",
      trendUp: true,
      color: "from-indigo-500/20 to-indigo-600/5",
      border: "border-indigo-500/30",
      iconColor: "text-indigo-400"
    },
    {
      title: "Completed",
      value: kpis.completedCount,
      desc: "Passed all evaluation benchmarks",
      icon: Trophy,
      trend: "High quality",
      trendUp: true,
      color: "from-amber-500/20 to-amber-600/5",
      border: "border-amber-500/30",
      iconColor: "text-amber-400"
    },
    {
      title: "Timer Running",
      value: kpis.timerRunningCount,
      desc: "Active countdown timers",
      icon: Timer,
      trend: "1h session",
      trendUp: true,
      color: "from-cyan-500/20 to-cyan-600/5",
      border: "border-cyan-500/30",
      iconColor: "text-cyan-400"
    },
    {
      title: "Unit Tests Started",
      value: kpis.unitTestsStartedCount,
      desc: "Automated test suites initiated",
      icon: TestTube2,
      trend: "Automated",
      trendUp: true,
      color: "from-violet-500/20 to-violet-600/5",
      border: "border-violet-500/30",
      iconColor: "text-violet-400"
    },
    {
      title: "Unit Tests Passed",
      value: kpis.unitTestsPassedCount,
      desc: "Passed 100% unit assertions",
      icon: CheckCircle,
      trend: "92% Pass Rate",
      trendUp: true,
      color: "from-teal-500/20 to-teal-600/5",
      border: "border-teal-500/30",
      iconColor: "text-teal-400"
    },
    {
      title: "Integration Tests Started",
      value: kpis.integrationStartedCount,
      desc: "End-to-end system runs",
      icon: Layers,
      trend: "In progress",
      trendUp: true,
      color: "from-fuchsia-500/20 to-fuchsia-600/5",
      border: "border-fuchsia-500/30",
      iconColor: "text-fuchsia-400"
    },
    {
      title: "Integration Tests Passed",
      value: kpis.integrationPassedCount,
      desc: "Verified API response suites",
      icon: ShieldCheck,
      trend: "Stable",
      trendUp: true,
      color: "from-emerald-500/20 to-emerald-600/5",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cardsData.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
            className={`relative p-4 rounded-2xl bg-gradient-to-b ${card.color} glass-panel border ${card.border} glass-panel-hover flex flex-col justify-between overflow-hidden group min-h-[140px]`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider leading-snug">
                {card.title}
              </span>
              <div className={`p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 ${card.iconColor} shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Main Value */}
            <div className="my-1">
              <div className="text-2xl font-black text-slate-100 tracking-tight font-mono">
                {card.value}
              </div>
            </div>

            {/* Footer / Trend */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60 mt-2 gap-2">
              <span className="text-slate-400 leading-tight">{card.desc}</span>
              <span className={`inline-flex items-center gap-0.5 font-medium text-[10px] px-1.5 py-0.5 rounded-md shrink-0 ${card.trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                }`}>
                {card.trendUp ? <TrendingUp className="w-2.5 h-2.5 shrink-0" /> : <TrendingDown className="w-2.5 h-2.5 shrink-0" />}
                {card.trend}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
