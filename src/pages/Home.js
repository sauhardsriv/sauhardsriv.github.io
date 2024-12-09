import React from 'react';

function Home() {
  return (
    <div>
      <h1 className="ext-black dark:text-white text-3xl font-bold mb-4">About Me</h1>
      <div className="ext-black dark:text-white space-y-4">
        <p>I am a PhD Candidate in Economics at the <a href="https://cla.umn.edu/economics" className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-500" target="_blank" rel="noopener noreferrer">University of Minnesota</a> and a Research Analyst at the <a href="https://www.minneapolisfed.org/economic-research" className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-500" target="_blank" rel="noopener noreferrer">Federal Reserve Bank of Minneapolis</a>.</p>
        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6 text-black dark:text-white">
  <h2 className="text-xl font-semibold mb-2">Contact</h2>
  <p>
    Email: <a href="mailto:sauhardsrivastava@gmail.com" className="text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-500">sauhardsrivastava@gmail.com</a>
  </p>
  <p>Office: Herbert M. Hanson Jr Hall<br />
     4-130<br />
     1925 S 4th St<br />
     Minneapolis, MN 55455<br />
  </p>
</div>
      </div>
    </div>
  );
}

export default Home;