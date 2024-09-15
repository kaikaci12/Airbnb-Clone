"use client";
import { motion } from "framer-motion";

const Loading = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 2 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0 }}
    className="loading-screen"
  >
    <div className="spinner"></div>
  </motion.div>
);
export default Loading;
