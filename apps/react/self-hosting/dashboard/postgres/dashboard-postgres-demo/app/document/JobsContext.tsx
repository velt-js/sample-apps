'use client';
import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
  useRef,
  useCallback,
  ReactNode,
} from 'react';
import { Job } from '@/components/document/types';
import { jobsData } from '@/components/document/jobs-data';

/**
 * ⚠️ IMPORTANT DISCLAIMER FOR DEVELOPERS ⚠️
 *
 * This jobId logic using URL parameters is ONLY for demo sharing purposes.
 * It allows users to share a link to a specific job in this demo app.
 *
 * IN YOUR REAL APPLICATION:
 * - Use your own job/document ID system (e.g., from your database, CMS, or routing)
 * - You do NOT need to use URLs as job IDs
 * - You do NOT need to store job IDs in URL params
 * - Simply use your existing routing or state management
 *
 * The URL-based approach here is purely for convenience in this demo environment
 * to enable sharing and collaboration testing.
 */

// Constants for the jobs list page document
export const JOBS_LIST_DOCUMENT_ID = 'jobsList';
export const JOBS_LIST_DOCUMENT_NAME = 'Jobs List';

// Types
export interface JobsContextValue {
  /** The currently selected job, or null if none is selected */
  selectedJob: Job | null;
  /** Select a job - this will also update the URL */
  selectJob: (job: Job) => void;
  /** Clear the selected job - this will also remove jobId from URL */
  clearSelectedJob: () => void;
  /** Whether the context has been initialized (read from URL) */
  isInitialized: boolean;
  /** All available jobs data */
  jobs: Job[];
  /** True when viewing the jobs list page (no job selected) */
  isOnJobsListPage: boolean;
}

// Create the context
const JobsContext = createContext<JobsContextValue | null>(null);

// Helper to update URL without triggering Next.js navigation
function updateUrlParam(key: string, value: string | null) {
  const url = new URL(window.location.href);
  if (value === null) {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }
  window.history.replaceState({}, '', url.toString());
}

// Provider component
interface JobsProviderProps {
  children: ReactNode;
}

export function JobsProvider({ children }: JobsProviderProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const initializedRef = useRef(false);

  // Initialize from URL on mount (client-side only)
  useEffect(() => {
    // Prevent double initialization (React Strict Mode, HMR, etc.)
    if (initializedRef.current) return;
    initializedRef.current = true;

    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('jobId');
    
    if (jobId) {
      const job = jobsData.find((j) => j.id === jobId);
      if (job) {
        setSelectedJob(job);
      }
    }
    
    setIsInitialized(true);
  }, []);

  // Select a job and update URL
  const selectJob = useCallback((job: Job) => {
    setSelectedJob(job);
    updateUrlParam('jobId', job.id);
  }, []);

  // Clear selected job and remove from URL
  const clearSelectedJob = useCallback(() => {
    setSelectedJob(null);
    updateUrlParam('jobId', null);
  }, []);

  // True when viewing the jobs list page (no job selected)
  const isOnJobsListPage = selectedJob === null;

  const value = useMemo<JobsContextValue>(
    () => ({
      selectedJob,
      selectJob,
      clearSelectedJob,
      isInitialized,
      jobs: jobsData,
      isOnJobsListPage,
    }),
    [selectedJob, selectJob, clearSelectedJob, isInitialized, isOnJobsListPage]
  );

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

// Hook to use the jobs context
export function useJobs(): JobsContextValue {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
}

// Hook to get just the selected job (convenience hook)
export function useSelectedJob(): Job | null {
  const { selectedJob } = useJobs();
  return selectedJob;
}

