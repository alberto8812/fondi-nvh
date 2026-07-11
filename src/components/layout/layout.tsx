import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useLocation, useOutlet } from "react-router-dom";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { FloatingChatWidget } from "@/components/floating-chat-widget";
import { ScrollToHash } from "@/lib/scroll-to-hash";
import { EASE } from "@/components/motion";

export function Layout() {
  const { pathname } = useLocation();
  // useOutlet (not <Outlet />) captures the current route's element so it can be
  // keyed and handed to AnimatePresence — <Outlet /> swaps immediately on
  // navigation and gives exit animations nothing to animate.
  const element = useOutlet();

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <ScrollToHash />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          {element}
        </motion.div>
      </AnimatePresence>
      <Footer />
      <FloatingChatWidget />
    </MotionConfig>
  );
}
