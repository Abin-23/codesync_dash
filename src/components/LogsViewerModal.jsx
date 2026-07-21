import React from 'react';
import { useLiveData } from '../context/LiveDataContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, Copy, Download } from 'lucide-react';

export default function LogsViewerModal() {
  const { selectedLogsModal, setSelectedLogsModal } = useLiveData();

  if (!selectedLogsModal) return null;
  const s = selectedLogsModal;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl rounded-2xl bg-[#090D16] border border-slate-800 shadow-2xl overflow-hidden p-5 space-y-4 text-slate-200 font-mono"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 font-sans">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-100">Terminal Build & Test Output</h3>
                <p className="text-xs text-slate-400">{s.name} ({s.id})</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedLogsModal(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Log Window */}
          <div className="bg-[#030712] rounded-xl border border-slate-800 p-4 max-h-96 overflow-y-auto space-y-1.5 text-xs text-slate-300 scrollbar-thin">
            {s.logs.map((log, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-slate-600 select-none">{idx + 1}</span>
                <span className={
                  log.includes('[ERR]') ? 'text-red-400 font-bold' :
                  log.includes('[WARN]') ? 'text-amber-400' :
                  log.includes('[SUBMIT]') ? 'text-emerald-400 font-bold' :
                  'text-slate-300'
                }>
                  {log}
                </span>
              </div>
            ))}
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 font-sans">
            <span className="text-xs text-slate-500">Log stream active • Target: evaluation-runner-01</span>
            <button
              onClick={() => setSelectedLogsModal(null)}
              className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200"
            >
              Close Console
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
