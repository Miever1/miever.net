import React from "react";

/**
 * A calm, static page backdrop.
 *
 * Replaces the old animated tsparticles mesh (80 linked dots), which fought the
 * editorial whitespace and read as visual noise. This is a fixed, pointer-events
 * free layer with a very subtle brand-tinted glow that adapts to the theme via
 * CSS variables — depth without distraction, and no animation cost.
 */
const BackgroundCanvas = () => <div className="bg-canvas" aria-hidden="true" />;

export default BackgroundCanvas;
