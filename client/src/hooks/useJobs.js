import { useQuery } from 'react-query';
import { api } from '../services/api';

export function useJobs(filters = {}) {
  return useQuery(
    ['jobs', filters],
    () => api.getJobs(filters),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

export function useJob(id) {
  return useQuery(
    ['job', id],
    () => api.getJob(id),
    {
      enabled: !!id,
    }
  );
}
