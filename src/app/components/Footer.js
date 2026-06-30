// app/components/Footer.js
'use client'

import { site, styles } from '../settings'

function Footer() {
  return (
    <footer className={styles.footer.root}>
      <div className={styles.footer.container}>
        <div>
          <p className={styles.footer.text}>© {new Date().getFullYear()} {site.name}</p>
        </div>
        <span className={styles.footer.divider}></span>
          <span className={styles.footer.link}><a href={site.license.url} target="_blank" rel="noopener noreferrer">{site.license.label}</a></span>
      </div>
    </footer>
  );
}

export default Footer;
