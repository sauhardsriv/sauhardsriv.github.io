import React from 'react';

function Publications() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Publications</h1>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Journal Articles</h2>
          <ul className="space-y-4">
            <li className="border-b pb-4">
              <p className="font-medium">[Author(s)] ([Year])</p>
              <p>[Paper Title]</p>
              <p className="text-gray-600 italic">[Journal Name]</p>
            </li>
          </ul>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Conference Papers</h2>
          <ul className="space-y-4">
            <li className="border-b pb-4">
              <p className="font-medium">[Author(s)] ([Year])</p>
              <p>[Paper Title]</p>
              <p className="text-gray-600 italic">[Conference Name]</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Publications;