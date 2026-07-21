import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialStudents, initialActivities } from '../data/students';

const LiveDataContext = createContext();

export const LiveDataProvider = ({ children }) => {
  const [students, setStudents] = useState(initialStudents);
  const [activities, setActivities] = useState(initialActivities);
  const [isLiveUpdating, setIsLiveUpdating] = useState(true);
  const [updateIntervalMs, setUpdateIntervalMs] = useState(3000);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Build Failed", message: "David Kim's build encountered a segfault", time: "2m ago", unread: true, severity: "danger" },
    { id: 2, title: "Submission Received", message: "Alex Rivera submitted Key-Value Store solution", time: "4m ago", unread: true, severity: "success" },
    { id: 3, title: "Timer Expired", message: "3 student coding sessions reaching final 5 mins", time: "10m ago", unread: false, severity: "warning" },
    { id: 4, title: "Testing Completed", message: "Hanna Schmidt passed all 15 unit tests", time: "12m ago", unread: false, severity: "info" },
    { id: 5, title: "Deployment Successful", message: "Aisha Patel web app live at eval-app-006", time: "18m ago", unread: false, severity: "success" },
  ]);

  // Selected student for inspect / evaluate modal
  const [selectedStudentModal, setSelectedStudentModal] = useState(null);
  // Selected student logs modal
  const [selectedLogsModal, setSelectedLogsModal] = useState(null);

  // Global search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [taskFilter, setTaskFilter] = useState('All');
  const [submissionFilter, setSubmissionFilter] = useState('All');
  const [testingFilter, setTestingFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Real-time ticking effect
  useEffect(() => {
    if (!isLiveUpdating) return;

    const interval = setInterval(() => {
      // 1. Decrement timers for active coding/testing students
      setStudents(prevStudents => {
        return prevStudents.map(student => {
          if (student.status === "Coding" || student.status === "Testing") {
            const nextTimer = Math.max(0, student.timerRemaining - 3);
            let nextProgress = student.progress;
            let nextStatus = student.status;
            
            // Randomly increase progress slightly
            if (Math.random() > 0.6 && nextProgress < 95) {
              nextProgress = Math.min(95, nextProgress + Math.floor(Math.random() * 4) + 1);
            }

            // Transition from Coding to Testing if progress high
            if (nextProgress > 75 && nextStatus === "Coding" && Math.random() > 0.7) {
              nextStatus = "Testing";
            }

            return {
              ...student,
              timerRemaining: nextTimer,
              progress: nextProgress,
              completionPercentage: nextProgress,
              status: nextStatus
            };
          }
          return student;
        });
      });

      // 2. Randomly trigger a live event every 2 cycles (~6 seconds)
      if (Math.random() > 0.4) {
        const randomNames = ["Sarah Chen", "Marcus Vance", "Elena Rostova", "David Kim", "Maya Lin", "Carlos Mendez"];
        const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
        const eventTypes = [
          { text: `${randomName} passed Unit Test suite`, type: "test", iconColor: "text-blue-400" },
          { text: `${randomName} pushed code updates`, type: "code", iconColor: "text-purple-400" },
          { text: `${randomName} triggered deployment preview`, type: "deploy", iconColor: "text-emerald-400" },
          { text: `Heartbeat ping from ${randomName}'s workspace`, type: "system", iconColor: "text-slate-400" },
        ];
        const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];

        setActivities(prev => [
          { id: Date.now(), text: randomEvent.text, time: "Just now", type: randomEvent.type, iconColor: randomEvent.iconColor },
          ...prev.slice(0, 15)
        ]);
      }

    }, updateIntervalMs);

    return () => clearInterval(interval);
  }, [isLiveUpdating, updateIntervalMs]);

  // Derived KPI metrics
  const totalStudents = students.length;
  const loginActiveCount = students.filter(s => s.status !== "Offline").length;
  const totalActiveUsers = students.filter(s => s.status === "Coding" || s.status === "Testing").length;
  const tasksAssigned = students.filter(s => s.assignedTask).length;
  const submissionsCount = students.filter(s => s.submissionStatus === "Submitted").length;
  const completedCount = students.filter(s => s.status === "Completed").length;
  const timerRunningCount = students.filter(s => s.timerRemaining > 0 && s.status !== "Completed").length;
  const unitTestsStartedCount = students.filter(s => s.unitTestStarted).length;
  const unitTestsPassedCount = students.filter(s => s.unitTestPassed.startsWith("12") || s.unitTestPassed.startsWith("15") || s.unitTestPassed.startsWith("10") || s.unitTestPassed.startsWith("14") || s.unitTestPassed.startsWith("18") || s.unitTestPassed.startsWith("16")).length;
  const integrationStartedCount = students.filter(s => s.integrationStarted).length;
  const integrationPassedCount = students.filter(s => s.integrationPassed && !s.integrationPassed.startsWith("0")).length;
  const successfulDeployments = students.filter(s => s.deploymentStatus === "Live").length;
  const failedBuilds = students.filter(s => s.buildStatus === "Failed").length;
  
  const overallCompletionPercentage = Math.round(
    students.reduce((acc, curr) => acc + curr.completionPercentage, 0) / totalStudents
  );

  return (
    <LiveDataContext.Provider value={{
      students,
      setStudents,
      activities,
      isLiveUpdating,
      setIsLiveUpdating,
      updateIntervalMs,
      setUpdateIntervalMs,
      notifications,
      setNotifications,
      selectedStudentModal,
      setSelectedStudentModal,
      selectedLogsModal,
      setSelectedLogsModal,
      // Search & Filters
      searchTerm,
      setSearchTerm,
      statusFilter,
      setStatusFilter,
      taskFilter,
      setTaskFilter,
      submissionFilter,
      setSubmissionFilter,
      testingFilter,
      setTestingFilter,
      sortBy,
      setSortBy,
      // KPIs
      kpis: {
        totalStudents,
        loginActiveCount,
        totalActiveUsers,
        tasksAssigned,
        submissionsCount,
        completedCount,
        timerRunningCount,
        unitTestsStartedCount,
        unitTestsPassedCount,
        integrationStartedCount,
        integrationPassedCount,
        successfulDeployments,
        failedBuilds,
        overallCompletionPercentage
      }
    }}>
      {children}
    </LiveDataContext.Provider>
  );
};

export const useLiveData = () => useContext(LiveDataContext);
