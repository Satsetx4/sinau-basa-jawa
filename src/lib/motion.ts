export const transitionNormal = { type: 'spring', stiffness: 300, damping: 25 };
export const transitionGentle = { duration: 0.3, ease: [0.16, 1, 0.3, 1] };

export const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04
    }
  }
};

export const popIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: transitionNormal }
};

export const cardHover = {
  scale: 1.02,
  y: -4,
  transition: { duration: 0.2 }
};

export const buttonTap = {
  scale: 0.96
};
