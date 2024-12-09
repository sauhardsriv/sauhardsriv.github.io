import React from 'react';
import ThemeToggle from './ThemeToggle';

function Footer() {
  return (
    <footer className="bg-[#5b0013] dark:bg-gray-700 text-white py-1 mt-auto">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <p className="text-xs">© {new Date().getFullYear()} Sauhard Srivastava. All rights reserved.</p>
          {/*<p className="text-xs">Last updated: December 2023</p>*/}
        </div>
        <div className="flex items-center gap-4">
         <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}

export default Footer;