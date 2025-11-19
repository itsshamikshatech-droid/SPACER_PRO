import "./Home.css";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="home-bg">
      <div className="overlay"></div>

      <motion.div
        className="content-box"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="title">SPACER</h1>
        <p className="subtitle">
          Find. Book. Experience.  
          <br />
          Smart Spaces for Smart People.
        </p>

        <a className="login-btn" href="/login">
          Get Started →
        </a>
      </motion.div>
    </div>
  );
}

export default Home;
