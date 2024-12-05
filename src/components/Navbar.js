import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
 return (
   <nav className="bg-blue-600 text-white py-4">
     <div className="container mx-auto flex justify-between items-center px-4">
       <Link to="/" className="text-2xl font-bold">Sauhard Srivastava</Link>
       <div>
         <Link to="/" className="mx-2 hover:text-blue-200">Home</Link>
         <Link to="/research" className="mx-2 hover:text-blue-200">Research</Link>
         {/* <Link to="/publications" className="mx-2 hover:text-blue-200">Publications</Link> */}
         <Link to="/cv" className="mx-2 hover:text-blue-200">CV</Link>
       </div>
     </div>
   </nav>
 );
}

export default Navbar;