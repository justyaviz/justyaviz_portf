import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';

interface CounterProps {
  value: number;
  direction?: 'up' | 'down';
  suffix?: string;
  prefix?: string;
}

const Counter = ({ value, direction = 'up', suffix = '', prefix = '' }: CounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString()
  );

  return (
    <span ref={ref} className="inline-flex">
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
};

export default Counter;
