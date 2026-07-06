'use client';

import { motion } from 'framer-motion';

export function TimelineLine() {
  return (
    <motion.div
      className="absolute left-[23px] top-2 bottom-2 w-px bg-brand-border origin-top"
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeOut' }}
    />
  );
}
