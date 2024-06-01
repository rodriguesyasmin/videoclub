import React from "react";
import { motion } from "framer-motion";
import json from "./Accueil.json";
import { NavLink } from "react-router-dom";
import "./Accueil.css";

function Accueil() {
  return (
    <motion.div
      className="banner"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      <div className="content">
        <h1 style={{ opacity: 1 }}>Films illimités</h1>
        {json.map((text, index) => (
          <p className="para" key={index} style={{ opacity: 1 }}>
            {text}
          </p>
        ))}
        <div className="button-accueil">
          <NavLink to="Films">Films</NavLink>
        </div>
      </div>
    </motion.div>
  );
}

export default Accueil;
