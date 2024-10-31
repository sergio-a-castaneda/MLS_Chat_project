import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Home, Lock } from 'lucide-react';

export function LoginScreen() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="bg-blue-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
            <Home className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            MLS Chat Interface
          </h1>
          <p className="text-gray-600">
            Sign in to access property listings and chat assistance
          </p>
        </div>

        <button
          onClick={() => loginWithRedirect()}
          className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Lock className="w-5 h-5" />
          Sign In Securely
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Protected with Multi-Factor Authentication</p>
          <p className="mt-2">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}