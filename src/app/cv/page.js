// src/app/cv/page.js
export const metadata = {
  title: 'Sauhard Srivastava - CV',
  description: 'Academic curriculum vitae, education, and professional experience',
  keywords: ['CV', 'education', 'experience', 'academic', 'economics']
}

export default function CV() {
  return (
    <article className="max-w-7xl mx-auto px-8 pt-8 pb-8">
      <h1 className="text-primary-text dark:text-dark-text text-[24px] font-semibold mb-6">
        Curriculum Vitae{' '}
        <a 
          href="/resume/resume.pdf" 
          className="text-primary-url dark:text-dark-url hover:text-primary-url-hover dark:hover:text-dark-url-hover font-extrabold" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          [PDF]
        </a>
      </h1>

      <div className="space-y-6">
        <section className="bg-primary-main dark:bg-dark-surface shadow-md rounded-lg p-6 text-primary-text dark:text-dark-text">
          <h2 className="text-[20px] font-semibold mb-4">Education</h2>
          <ul className="list-disc ml-6 space-y-4 font-normal text-[16px]">
            <li>
              <p>PhD in Economics (In progress)</p>
              <p>University of Minnesota</p>
              <p className="text-primary-text dark:text-dark-text opacity-60 dark:opacity-50">2027 (expected)</p>
            </li>
            <li>
              <p>MA Economics</p>
              <p>University of Minnesota</p>
              <p className="text-primary-text dark:text-dark-text opacity-60 dark:opacity-50">2024</p>
            </li>
            <li>
              <p>MSc Economics</p>
              <p>The London School of Economics and Political Science</p>
              <p className="text-primary-text dark:text-dark-text opacity-60 dark:opacity-50">2019</p>
            </li>
            <li>
              <p>BA (Hons.) Economics</p>
              <p>Shri Ram College of Commerce, University of Delhi</p>
              <p className="text-primary-text dark:text-dark-text opacity-60 dark:opacity-50">2018</p>
            </li>
          </ul>
        </section>

        <section className="bg-primary-main dark:bg-dark-surface shadow-md rounded-lg p-6 text-primary-text dark:text-dark-text">
          <h2 className="text-[20px] font-semibold mb-4">Experience</h2>
          <ul className="list-disc ml-6 space-y-4 font-normal text-[16px]">
            <li>
              <p>Research Analyst</p>
              <p>Federal Reserve Bank of Minneapolis</p>
              <p className="text-primary-text dark:text-dark-text opacity-60 dark:opacity-50">Sep 2023-present</p>
            </li>
            <li>
              <p>Teaching Assistant</p>
              <p>CLA, University of Minnesota</p>
              <p className="text-primary-text dark:text-dark-text opacity-60 dark:opacity-50">Sep 2021-Jul 2023</p>
            </li>
            <li>
              <p>Research Assistant/Intern</p>
              <p>Reserve Bank of India</p>
              <p className="text-primary-text dark:text-dark-text opacity-60 dark:opacity-50">Jan 2020-Jun 2021</p>
            </li>
            <li>
              <p>Research Assistant/Intern</p>
              <p>United Nations Development Programme (UNDP) in India</p>
              <p className="text-primary-text dark:text-dark-text opacity-60 dark:opacity-50">Aug 2019-Dec 2019</p>
            </li>
            <li>
              <p>Graduate Teaching Assistant</p>
              <p>Department of Economics, LSE</p>
              <p className="text-primary-text dark:text-dark-text opacity-60 dark:opacity-50">Sep 2018-May 2019</p>
            </li>
          </ul>
        </section>
      </div>
    </article>
  )
}