import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "miever_ui";
import { useTranslation } from "react-i18next";

/**
 * A thin progress bar pinned to the top of the viewport that fills as the
 * reader scrolls. Rendered into a body portal so an ancestor's CSS transform
 * (e.g. the page-enter animation) can't trap its `position: fixed`.
 */
export const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(1, el.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="reading-progress"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />,
    document.body,
  );
};

/**
 * A floating button that appears after scrolling down and smoothly returns the
 * reader to the top. Body-portaled for the same reason as ReadingProgress.
 */
export const BackToTop: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible || typeof document === "undefined") return null;

  return createPortal(
    <button
      type="button"
      className="back-to-top"
      aria-label={t("back_to_top")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Icon icon={["fas", "arrow-up"]} />
    </button>,
    document.body,
  );
};
