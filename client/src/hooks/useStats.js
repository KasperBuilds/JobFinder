import { useQuery } from 'react-query';
import { api } from '../services/api';

export function useStats() {
  return useQuery(
    ['stats'],
    () => api.getStats(),
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );
}

export function useFilterOptions() {
  return useQuery(
    ['filterOptions'],
    () => api.getFilterOptions(),
    {
      staleTime: 30 * 60 * 1000, // 30 minutes
    }
  );
}
