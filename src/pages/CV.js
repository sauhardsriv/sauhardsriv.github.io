import React from 'react';

function CV() {
  return (
    <div>
      <h1 className="text-black dark:text-white text-3xl font-bold mb-6">Curriculum Vitae</h1>

<div className="mb-6">
  <a href="/resume/resume.pdf" className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-800 text-2xl font-bold" target="_blank" rel="noopener noreferrer">[Download PDF]</a>
</div>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6 text-black dark:text-white">
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <ul className="space-y-4">
            <li>
              <p className="font-medium">PhD in Economics (In progress)</p>
              <p>University of Minnesota</p>
              <p className="text-gray-600 dark:text-gray-400">2027 (expected)</p>
            </li>
            <li>
              <p className="font-medium">MA Economics</p>
              <p>University of Minnesota</p>
              <p className="text-gray-600 dark:text-gray-400">2024</p>
            </li>
            <li>
              <p className="font-medium">MSc Economics</p>
              <p>The London School of Economics and Political Science</p>
              <p className="text-gray-600 dark:text-gray-400">2019</p>
            </li>
            <li>
              <p className="font-medium">BA (Hons.) Economics</p>
              <p>Shri Ram College of Commerce, University of Delhi</p>
              <p className="text-gray-600 dark:text-gray-400">2018</p>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-6 text-black dark:text-white">
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          <ul className="space-y-4">
            <li>
              <p className="font-medium">Research Analyst</p>
              <p>Federal Reserve Bank of Minneapolis</p>
              <p className="text-gray-600 dark:text-gray-400">Sep 2023-present</p>
            </li>
<li>
              <p className="font-medium">Teaching Assistant</p>
              <p>CLA, University of Minnesota</p>
              <p className="text-gray-600 dark:text-gray-400">Sep 2021-Jul 2023</p>
            </li>
<li>
              <p className="font-medium">Research Assistant/Intern</p>
              <p>Reserve Bank of India</p>
              <p className="text-gray-600 dark:text-gray-400">Jan 2020-Jun 2021</p>
            </li>
<li>
              <p className="font-medium">Research Assistant/Intern</p>
              <p>United Nations Development Programme (UNDP) in India</p>
              <p className="text-gray-600 dark:text-gray-400">Aug 2019-Dec 2019</p>
            </li>
<li>
              <p className="font-medium">Graduate Teaching Assistant</p>
              <p>Department of Economics, LSE</p>
              <p className="text-gray-600 dark:text-gray-400">Sep 2018-May 2019</p>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}

export default CV;