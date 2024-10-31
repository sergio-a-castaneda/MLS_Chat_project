import React from 'react';
import { Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchStore } from '../store/searchStore';
import { MLSListing } from '../types';

function ListingCard({ listing }: { listing: MLSListing }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={listing.imageUrl}
        alt={listing.address}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{listing.address}</h3>
        <p className="text-xl font-bold text-blue-600">
          ${listing.price.toLocaleString()}
        </p>
        <div className="mt-2 text-gray-600">
          <span>{listing.bedrooms} beds</span> •{' '}
          <span>{listing.bathrooms} baths</span> •{' '}
          <span>{listing.sqft.toLocaleString()} sqft</span>
        </div>
      </div>
    </div>
  );
}

function ListingRow({ listing }: { listing: MLSListing }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex gap-4 items-center">
      <img
        src={listing.imageUrl}
        alt={listing.address}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{listing.address}</h3>
        <p className="text-lg font-bold text-blue-600">
          ${listing.price.toLocaleString()}
        </p>
        <div className="text-gray-600">
          <span>{listing.bedrooms} beds</span> •{' '}
          <span>{listing.bathrooms} baths</span> •{' '}
          <span>{listing.sqft.toLocaleString()} sqft</span>
        </div>
      </div>
    </div>
  );
}

export function SearchResults() {
  const {
    viewMode,
    currentPage,
    itemsPerPage,
    results,
    isLoading,
    error,
    setViewMode,
    setCurrentPage,
  } = useSearchStore();

  const totalPages = Math.ceil(results.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleResults = results.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Search Results ({results.length})
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${
              viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${
              viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-3 gap-4">
            {visibleResults.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {visibleResults.map((listing) => (
              <ListingRow key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}