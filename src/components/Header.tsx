import React from 'react';
import SymbolSearch from './SymbolSearch';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">My Stock Market View</h1>
        <div className="relative">
          {/* Render the SymbolSearch component for symbol searching */}
          <SymbolSearch />
          {/* Render a search icon using SVG */}
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15.637 14.121l4.242 4.243a1 1 0 01-1.415 1.414l-4.243-4.242a8 8 0 111.415-1.415zM9 16a7 7 0 100-14 7 7 0 000 14z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
