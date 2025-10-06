"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, startTransition } from "react";
import { FaUserCircle } from "react-icons/fa";

type User = {
  username: string;
  logout: () => Promise<void>;
};

const AdminHeader = ({ username, logout }: User) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = () => {
    startTransition(() => {
      logout().then(() => {
        router.replace("/reboots");
      });
    });
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [dropdownOpen]);

  return (
    <header className="w-full flex justify-between items-center md:px-18 px-4 bg-defined-yellow/35 h-20 shadow">
      <h1 className="text-2xl font-semibold text-red-600">
        Welcome back, {username}
      </h1>
      <div className="relative" ref={dropdownRef}>
        <FaUserCircle
          className="text-3xl cursor-pointer text-gray-700 hover:text-black transition"
          onClick={() => setDropdownOpen((prev) => !prev)}
        />

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
            <div className="px-4 py-2 text-gray-800 font-semibold border-b">
              {username}
            </div>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
