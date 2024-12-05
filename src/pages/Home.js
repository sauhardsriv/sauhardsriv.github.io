import React from 'react';

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <div className="space-y-4">
        <p>I am a Economics PhD Candidate at the <a href="https://cla.umn.edu/economics" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Economics Department, University of Minnesota</a> and a Research Analyst at the <a href="https://www.minneapolisfed.org/economic-research" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Federal Reserve Bank of Minneapolis</a>.</p>
        <div className="bg-white shadow rounded-lg p-6">
  <h2 className="text-xl font-semibold mb-2">Contact</h2>
  <p>
    Email: <a href="mailto:sauhardsrivastava@gmail.com" className="text-blue-600 hover:text-blue-800">sauhardsrivastava@gmail.com</a>
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