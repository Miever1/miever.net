import React, { FunctionComponent } from "react";
import { Icon, Tag } from "miever_ui";
import { useTranslation } from "react-i18next";

import { skillGroups } from "./skillData";
import "./skills.css";

/** A small icon per category adds visual rhythm without colour noise. */
const CATEGORY_ICONS: Record<string, string> = {
    frontend: "code",
    backend: "server",
    devops: "cloud",
    tooling: "screwdriver-wrench",
    design: "pen-ruler",
    visualization: "chart-column",
    architecture: "sitemap",
    spoken: "language",
};

/**
 * A clean, professional skills overview: skills grouped by category as tags,
 * each category led by an accent icon. Groups size to their content, so sparse
 * categories don't leave empty boxes.
 */
const SkillsMap: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <div className="skills-grid">
            {skillGroups.map((group) => (
                <div className="skills-group" key={group.id}>
                    <h3 className="skills-group-title">
                        <Icon
                            icon={CATEGORY_ICONS[group.id] as never}
                            className="skills-group-icon"
                        />
                        {t(group.label)}
                    </h3>
                    <div className="skills-tags">
                        {group.skills.map((skill) => (
                            <Tag key={skill.id}>{t(skill.label)}</Tag>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkillsMap;
