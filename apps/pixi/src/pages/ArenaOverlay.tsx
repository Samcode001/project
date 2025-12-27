import { motion, AnimatePresence } from "framer-motion";

type Props = {
  visible: boolean;
};

export default function PlanetOverlay({ visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1], // cinematic easing
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "radial-gradient(circle at center, #0b1026, #000)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.img
            src="/loader-planet.gif"
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.03, 0.9] }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={{
              width: 520,
              filter: "drop-shadow(0 0 40px rgba(120,180,255,0.45))",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
