import React from "react";
import { Link } from "react-router-dom";
const theme = {
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
    },
  },
};

const styles = {
    outLinedButton : {
        borderRadius : '10px',
        border : '1px solid #3f50b5',
        color: theme.palette.primary.main,
    fontSize: "16px",
    textDecoration: "none",
    padding: "8px 15px",
    
    transition: "background-color 0.3s ease"
    },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f4f7fc",
  },
  header: {
    height: "60px",
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 50px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  headerText: {
    color: theme.palette.primary.main,
    fontSize: "24px",
    margin: 0,
  },
  nav: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    color: theme.palette.primary.main,
    fontSize: "16px",
    textDecoration: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
  navLinkHover: {
    backgroundColor: theme.palette.primary.light,
  },
  main: {
    display: "flex",
    justifyContent: "space-between",
    padding: "50px 80px",
    height: "calc(100vh - 120px)",
    fontFamily: "'Poppins', sans-serif",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "20px",
  },
  contentTitle: {
    fontSize: "48px",
    color: "#333",
    marginBottom: "10px",
  },
  contentParagraph: {
    fontSize: "18px",
    color: "#555",
    lineHeight: 1.6,
  },
  contentButton: {
    padding: "15px 30px",
    width: "200px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  contentButtonHover: {
    backgroundColor: theme.palette.primary.dark,
  },
  image: {
    flex: 0.5,
    
    backgroundSize: "cover",
    borderRadius: "20px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    marginLeft: "40px",
  },
  footer: {
    height: "60px",
    backgroundColor: "#111",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: "14px",
  },
  responsive: {
    main: {
      flexDirection: "column",
      padding: "30px",
    },
    image: {
      marginTop: "20px",
      marginLeft: 0,
    },
    contentTitle: {
      fontSize: "36px",
    },
    contentButton: {
      width: "100%",
    },
  },
};

const image  = new URL('./Preview.png', import.meta.url).href

export default function HomeScreen() {
  return (
    <div style={styles.body}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Task Master </h1>
        <nav style={styles.nav}>
          <Link to="#" style={styles.navLink}>Contact</Link>
          <Link to="#" style={styles.navLink}>About</Link>
          <Link to="/auth/login" id="login-button" style={styles.outLinedButton}>Login</Link>
        </nav>
      </div>
      <div style={styles.main}>
        <div style={styles.content}>
          <h1 style={styles.contentTitle}>Welcome to Your Productivity Hub</h1>
          <p style={styles.contentParagraph}>
            Take control of your day, organize your tasks, and achieve your goals with ease. Let's turn your to-do list into a done list!
          </p>
          <Link to="/auth/signup">
            <button style={styles.contentButton}>Start Organizing</button>
          </Link>
        </div>
        <img style={styles.image} src={image}/>
      </div>
      <div style={styles.footer}>
      <p style={styles.footerText}>Copyright &copy; 2024</p>
      </div>
    </div>
  );
}
