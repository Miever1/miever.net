import React, { FunctionComponent, useState } from "react";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "miever_ui";

/**
 * Project thumbnail/cover. Uses the project's screenshot directly from S3 (the
 * files are already web-sized WebP/PNG), with a branded gradient-tile fallback
 * for projects without a screenshot (or if the image fails to load).
 *
 * We intentionally avoid gatsby-plugin-image / StaticImage here: its build-time
 * derivatives 404 in dev whenever the cache is cleared, leaving blank covers,
 * and a plain <img> with onError is far more resilient for small thumbnails.
 * Shared by the listing cards and the detail-page hero.
 */
const IMAGE_BY_ID: Record<string, string> = {
    huawei: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/huawei-3d.webp",
    ai_game: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/ai_game.webp",
    mindflow: "https://miever.s3.ap-east-1.amazonaws.com/static/blogs/ai-smart-planer.png",
    vr_worlds: "https://miever.s3.ap-east-1.amazonaws.com/static/blogs/coding-virtual-world.webp",
    ucloud_console: "https://miever.s3.ap-east-1.amazonaws.com/static/blogs/ucloud-office.webp",
    miever_net: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-miever.webp",
    miever_ui: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-components.webp",
    news_project: "https://miever.s3.ap-east-1.amazonaws.com/static/projects/thumbnail-news-project.webp",
};

const FALLBACK_ICON: Record<string, IconProp> = {
    huawei: ["fas", "cube"],
    ai_game: ["fas", "gamepad"],
};

const ProjectThumb: FunctionComponent<{ id: string; alt: string }> = ({ id, alt }) => {
    const [failed, setFailed] = useState(false);
    const src = IMAGE_BY_ID[id];

    if (src && !failed) {
        return (
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onError={() => setFailed(true)}
                // Anchor to the top so screenshots show their header/hero rather
                // than an arbitrary center crop.
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            />
        );
    }

    return (
        <span className="project-thumb-fallback" aria-hidden="true">
            <Icon icon={FALLBACK_ICON[id] || ["fas", "folder"]} />
        </span>
    );
};

export default ProjectThumb;
