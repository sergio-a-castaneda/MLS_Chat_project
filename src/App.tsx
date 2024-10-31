import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider';
import { LoginScreen } from './components/LoginScreen';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './components/MainLayout';
import { ChatInterface } from './components/ChatInterface';
import { SearchResults } from './components/SearchResults';
import { useSearchStore } from './store/searchStore';

// Temporary mock data
const MOCK_LISTINGS = Array.from({ length: 20 }, (_, i) => ({
  id: `listing-${i + 1}`,
  address: `${1234 + i} Example Street, City, State`,
  price: 500000 + (i * 50000),
  bedrooms: 3 + (i % 3),
  bathrooms: 2 + (i % 2),
  sqft: 1800 + (i * 100),
  imageUrl: `https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop&q=60`,
  description: 'Beautiful home in a great neighborhood...',
}));

function MainApp() {
  const { results, setResults } = useSearchStore();

  React.useEffect(() => {
    if (results.length === 0) {
      setResults(MOCK_LISTINGS);
    }
  }, [results.length, setResults]);

  return (
    <MainLayout>
      <div className="flex-1 flex">
        <div className="flex-1">
          <SearchResults />
        </div>
        <div className="w-[400px]">
          <ChatInterface />
        </div>
      </div>
    </MainLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;