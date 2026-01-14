"use client";
import { useEffect } from 'react';
import { useSetDocuments, useCurrentUser } from '@veltdev/react';
import { useJobs, JOBS_LIST_DOCUMENT_ID, JOBS_LIST_DOCUMENT_NAME } from '@/app/document/JobsContext';

export default function VeltInitializeDocument() {
  // [Velt] Get document setter hook
  const { setDocuments } = useSetDocuments();

  // [Velt] Wait for Velt user to be authenticated before setting document
  const veltUser = useCurrentUser();

  // [Velt] Get the selected job and page state
  const { selectedJob, isOnJobsListPage } = useJobs();

  // [Velt] Set document in Velt based on current page
  useEffect(() => {
    if (!veltUser) return;
    if (isOnJobsListPage) {
      setDocuments([
        { id: JOBS_LIST_DOCUMENT_ID, metadata: { documentName: JOBS_LIST_DOCUMENT_NAME } },
      ]);
    } else if (selectedJob && selectedJob.id && selectedJob.jobName) {
      setDocuments([
        { id: selectedJob.id, metadata: { documentName: selectedJob.jobName } },
      ]);
    }
  }, [veltUser, setDocuments, isOnJobsListPage, selectedJob]);

  return null;
}
