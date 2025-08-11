"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, LogOut, Settings, UserCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navs: Array<{ id: number; name: string; href: string }> = [];

export const Header = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogin = () => {
    console.log('Login button clicked');
    console.log('Auth0 state:', { isAuthenticated, isLoading, user });
    login();
  };

  const handleProfile = () => {
    // Navigate to profile page or open profile modal
    window.location.href = '/account';
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  if (isLoading) {
    return (
      <div className="relative container mx-auto">
        <header className="fixed top-5 left-0 right-0 mx-auto z-[999] w-full px-4 sm:px-6">
          <div className="bg-[rgba(255,255,255,0.9)] backdrop-blur-lg border border-gray-400/30 flex justify-between w-full text-white z-[999] rounded-2xl h-[56px] max-w-7xl px-4 mx-auto">
            <div className="flex justify-center items-center">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src={"/logo.jpg"}
                  alt={`Datareel Logo`}
                  priority
                  width={2250}
                  height={800}
                  className="h-10 w-auto object-contain md:h-12"
                />
              </Link>
            </div>
            <div className="flex justify-center items-center">
              <div className="animate-pulse bg-gray-300 h-8 w-20 rounded-full"></div>
            </div>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="relative container mx-auto">
      <header className="fixed top-5 left-0 right-0 mx-auto z-[999] w-full px-4 sm:px-6">
        <div className="bg-[rgba(255,255,255,0.9)] backdrop-blur-lg border border-gray-400/30 flex justify-between w-full text-white z-[999] rounded-2xl h-[56px] max-w-7xl px-4 mx-auto">
          <div className="flex justify-center items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src={"/logo.jpg"}
                alt={`Datareel Logo`}
                priority
                width={2250}
                height={800}
                className="h-10 w-auto object-contain md:h-12"
              />
            </Link>
          </div>

          <div className="flex justify-center items-center gap-4">
            {pathname === "/catalogue-of-videos" && (
              <div className="md:hidden block  absolute md:top-[2rem] md:right-5 top-[1.2rem] right-[.5rem]  height-30">
                <Link href="/try">
                  <span className="underline inline-flex cursor-pointer gap-3 text-secondary text-[16px] font-medium px-3 py-1 justify-center rounded-[8px]  hover:opacity-90">
                    Generate AI Video
                  </span>
                </Link>
              </div>
            )}

            {isAuthenticated && user ? (
              <div className="relative user-menu-container">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 rounded-full border border-white/[0.12] bg-secondary px-4 py-2 text-xs font-medium tracking-wide shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] transition-all ease-out active:scale-95 cursor-pointer"
                >
                  {user.picture ? (
                    <img 
                      src={user.picture} 
                      alt={user.name || 'User'} 
                      className="w-5 h-5 rounded-full"
                    />
                  ) : (
                    <User size={14} />
                  )}
                  {user.name || user.email}
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleProfile}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <UserCircle size={14} />
                      Profile
                    </button>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center justify-center rounded-full border border-white/[0.12] bg-secondary px-5 py-2 text-xs font-medium tracking-wide shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] transition-all ease-out active:scale-95 cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* {pathname !== "/" && (
            <button
              className="md:block hidden md:px-6 px-2  "
              onClick={() => setModalOpen(true)}
            >
              <div className="md:text-[13px] text-[10px]">Book Demo</div>
            </button>
          )} */}
          </div>
        </div>
      </header>
    </div>
  );
};
