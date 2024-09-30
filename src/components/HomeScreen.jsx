import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from './HomeScreen.module.css'; // Import the CSS module

const image = new URL('./Preview.png', import.meta.url).href;

export default function HomeScreen() {
  const [isButtonHovered, setButtonHovered] = useState(false);

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h1 className={styles.headerText}>Task Master</h1>
        <nav className={styles.nav}>
          <Link to="#" className={styles.navLink}>Contact</Link>
          <Link to="#" className={styles.navLink}>About</Link>
          <Link to="/auth/login" id="login-button" className={styles.outLinedButton}>Login</Link>
        </nav>
      </div>
      <div className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.contentTitle}>Welcome to Your Productivity Hub</h1>
          <p className={styles.contentParagraph}>
            Take control of your day, organize your tasks, and achieve your goals with ease. Let's turn your to-do list into a done list!
          </p>
          <Link to="/auth/signup">
            <button
              className={isButtonHovered ? styles.contentButtonHover : styles.contentButton}
              
            >
              Start Organizing
            </button>
          </Link>
        </div>
        <img className={styles.image} src={image} alt="Task management preview" />
      </div>
      <div className={styles.footer}>
        <p className={styles.footerText}>Copyright &copy; 2024</p>
      </div>
    </div>
  );
}
