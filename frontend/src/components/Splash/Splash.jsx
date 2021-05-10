import React from "react";

import "./splash.css";

const Splash = () => {
  return (
    <main>
      <div className="splash-container">
        <div className="splash-content">
          <h2 className="splash-welcome">Welcome to my full stack todo app!</h2>
          <p className="splash-text">
            Thank you for the opportunity to create this app.
          </p>
          <p className="splash-text">I hope you enjoy!</p>
          <p className="splash-text copy">&copy; Michael Gann</p>
        </div>
      </div>
    </main>
  );
};

export default Splash;
