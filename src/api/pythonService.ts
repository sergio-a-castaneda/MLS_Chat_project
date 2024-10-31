import { MLSListing, MLSSearchCriteria } from '../types';

const PYTHON_ENDPOINT = 'http://localhost:8000';

export async function searchListings(criteria: MLSSearchCriteria): Promise<MLSListing[]> {
  try {
    const response = await fetch(`${PYTHON_ENDPOINT}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(criteria),
    });
    
    if (!response.ok) {
      throw new Error('Search request failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to search listings:', error);
    throw error;
  }
}