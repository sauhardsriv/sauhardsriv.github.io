// app/components/Footer.js
'use client'

function Footer() {
  return (
    <footer className="bg-primary-navbar dark:bg-dark-navbar text-primary-text dark:text-dark-text px-[10px] mt-auto flex justify-center items-center">
      <div className="container mx-auto px-4 justify-center flex items-center">
        <div>
          <p className="text-sm">© {new Date().getFullYear()} Sauhard Srivastava</p>
          {/*<p className="text-xs">Last updated: December 2023</p>*/}
        </div>
        <span className="h-3 w-px bg-primary-text dark:bg-dark-text opacity-20 mx-4"></span>
          <span className="text-sm text-primary-text dark:text-dark-text hover:text-primary-hover dark:hover:text-dark-hover"><a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank" rel="noopener noreferrer">CC BY-NC 4.0</a></span>
        {/* <div className="flex items-center gap-4">
         <ThemeToggle />
        </div>*/}
      </div>
    </footer>
  );
}

export default Footer;