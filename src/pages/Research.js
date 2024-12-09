import React from 'react';

function Research() {
  return (
    <div>
      <h1 className="text-black dark:text-white text-3xl font-bold mb-6">Research</h1>
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6 text-black dark:text-white">
          <h2 className="text-2xl font-semibold mb-3">Current Projects</h2>
          <p className="mb-4">Financial Frictions, FX Reserves, and Exchange Rate
Management in Emerging Economies
    <a href="/papers/reserves2024.pdf" className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-500 ml-2" target="_blank" rel="noopener noreferrer">[PDF]</a>
  </p>
        </div>
        
        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6 text-black dark:text-white">
          <h2 className="text-2xl font-semibold mb-3">Research Interests</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Macroeconomics</li>
            <li>International Macroeconomics</li>
            <li>Monetary Economics</li>
             <li>Dynamic General Equilibrium Models</li>
            <li>Portfolio Choice and Asset Pricing</li>
            <li>Heterogenous Agent Models</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Research;