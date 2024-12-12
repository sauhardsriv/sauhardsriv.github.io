import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
 return (
   <nav className="bg-[#5b0013] dark:bg-gray-700 text-white py-4">
     <div className="container mx-auto flex justify-between items-center px-4">
       <Link to="/" className="text-2xl font-bold hover:text-blue-200">Sauhard Srivastava</Link>
       <div className="flex items-center space-x-4">
         <Link to="/" className="hover:text-blue-200">Home</Link>
         <Link to="/research" className="hover:text-blue-200">Research</Link>
         {/*<Link to="/publications" className="mx-2 hover:text-blue-200">Publications</Link>*/}
         <Link to="/cv" className="hover:text-blue-200">CV</Link>
       </div>
     </div>
   </nav>
 );
}

export default Navbar;