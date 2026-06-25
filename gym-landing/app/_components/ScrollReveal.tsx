"use client";

import { motion, type MotionProps } from "framer-motion";
import { PropsWithChildren } from "react";

export default function ScrollReveal({
  children,
  delay = 0,
  className,
  ...rest
}: PropsWithChildren<{
  delay?: number;
  className?: string;
}> & Omit<MotionProps, "children">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

