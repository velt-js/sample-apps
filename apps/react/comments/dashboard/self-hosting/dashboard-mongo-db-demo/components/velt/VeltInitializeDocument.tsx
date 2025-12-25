"use client";
import { useEffect } from 'react';
import { useSetDocuments } from '@veltdev/react';
import { useJobs, JOBS_LIST_DOCUMENT_ID, JOBS_LIST_DOCUMENT_NAME } from '@/app/document/JobsContext';

export default function VeltInitializeDocument() {
  // [Velt] Get document setter hook
  const { setDocuments } = useSetDocuments();

  // [Velt] Get the selected job and page state
  const { selectedJob, isOnJobsListPage } = useJobs();

  // [Velt] Set document in Velt based on current page
  useEffect(() => {
    if (isOnJobsListPage) {
      setDocuments([
        { id: JOBS_LIST_DOCUMENT_ID, metadata: { documentName: JOBS_LIST_DOCUMENT_NAME } },
      ]);
    } else if (selectedJob && selectedJob.id && selectedJob.jobName) {
      setDocuments([
        { id: selectedJob.id, metadata: { documentName: selectedJob.jobName } },
      ]);
    }
  }, [setDocuments, isOnJobsListPage, selectedJob]);

  return null;
}
