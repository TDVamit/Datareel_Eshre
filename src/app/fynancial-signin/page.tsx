"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Building } from "lucide-react";

export default function FynancialSignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOrgPrompt, setShowOrgPrompt] = useState(false);
  const [creatingOrg, setCreatingOrg] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to check if organization exists
    setTimeout(() => {
      setIsLoading(false);
      // Simulate that organization doesn't exist
      setShowOrgPrompt(true);
    }, 2000);
  };

  const handleOrgDecision = async (shouldCreate: boolean) => {
    if (shouldCreate) {
      setCreatingOrg(true);
      // Simulate organization creation
      setTimeout(() => {
        setCreatingOrg(false);
        setShowOrgPrompt(false);
        // Store user info and redirect to generate-videos
        localStorage.setItem('user', JSON.stringify({ name: 'John Doe', email }));
        window.location.href = "/generate-videos";
      }, 3000);
    } else {
      setShowOrgPrompt(false);
      // Proceed with normal login and redirect to generate-videos
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify({ name: 'John Doe', email }));
        window.location.href = "/generate-videos";
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 pt-24">
      {/* Organization Creation Loading Screen */}
      {creatingOrg && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[99999] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#4ec48f] rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Creating Organization
            </h3>
            <p className="text-sm text-gray-200">
              Please wait while we set up your organization...
            </p>
          </div>
        </div>
      )}

      {/* Organization Prompt Modal */}
      {showOrgPrompt && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#4ec48f] rounded-full flex items-center justify-center mx-auto mb-4">
                <Building size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Organization Not Found
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                It seems we don't have your organization. Do you want to create a new one?
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => handleOrgDecision(true)}
                className="w-full bg-[#4ec48f] hover:bg-[#3db37f] text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
              >
                Yes, Create Organization
              </button>
              <button
                onClick={() => handleOrgDecision(false)}
                className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
              >
                No, Continue Without Organization
              </button>
              <button
                onClick={() => setShowOrgPrompt(false)}
                className="w-full bg-transparent hover:bg-gray-50 text-gray-500 font-medium py-3 px-4 rounded-xl transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        {/* Back to Sign In */}
        <div className="mb-8">
          <Link 
            href="/signin"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Sign In</span>
          </Link>
        </div>

        {/* Fynancial Sign In Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#4ec48f] rounded-full flex items-center justify-center mx-auto mb-4">
              <Building size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Fynancial Sign In
            </h1>
            <p className="text-gray-600">
              Sign in with your Fynancial account
            </p>
          </div>

          {/* Fynancial Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="fynancial-email" className="block text-sm font-medium text-gray-700 mb-2">
                Fynancial Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input
                  id="fynancial-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ec48f] focus:border-[#4ec48f] transition-colors"
                  placeholder="Enter your Fynancial email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="fynancial-password" className="block text-sm font-medium text-gray-700 mb-2">
                Fynancial Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  id="fynancial-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ec48f] focus:border-[#4ec48f] transition-colors"
                  placeholder="Enter your Fynancial password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>



            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-fynancial"
                  type="checkbox"
                  className="h-4 w-4 text-[#4ec48f] focus:ring-[#4ec48f] border-gray-300 rounded"
                />
                <label htmlFor="remember-fynancial" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                href="#"
                className="text-sm text-[#4ec48f] hover:text-[#3db37f] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4ec48f] hover:bg-[#3db37f] disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in with Fynancial...
                </div>
              ) : (
                "Sign in with Fynancial"
              )}
            </button>
          </form>



          {/* Back to Regular Sign In */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have a Fynancial account?{" "}
              <Link
                href="/signin"
                className="text-[#4ec48f] hover:text-[#3db37f] font-medium transition-colors"
              >
                Use regular sign-in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 Datareel. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
} 