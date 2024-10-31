import { create } from 'zustand';
import { MLSListing, MLSSearchCriteria } from '../types';
import { searchListings } from '../api/pythonService';

interface SearchState {
  viewMode: 'list' | 'grid';
  currentPage: number;
  itemsPerPage: number;
  results: MLSListing[];
  isLoading: boolean;
  error: string | null;
  setViewMode: (mode: 'list' | 'grid') => void;
  setCurrentPage: (page: number) => void;
  setResults: (results: MLSListing[]) => void;
  searchProperties: (criteria: MLSSearchCriteria) => Promise<void>;
}

export const useSearchStore = create<SearchState>((set) => ({
  viewMode: 'grid',
  currentPage: 1,
  itemsPerPage: 9,
  results: [],
  isLoading: false,
  error: null,
  setViewMode: (mode) => set({ viewMode: mode }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setResults: (results) => set({ results }),
  searchProperties: async (criteria) => {
    set({ isLoading: true, error: null });
    try {
      const results = await searchListings(criteria);
      set({ results, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch properties', isLoading: false });
    }
  },
}));