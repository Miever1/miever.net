import React, { FunctionComponent } from "react";
import { Card, Tag } from "miever_ui";
import { useTranslation } from "react-i18next";

import { skillGroups } from "./skillData";
import "./skills.css";

/** A distinct accent colour per category — brings the section to life. */
const CATEGORY_COLORS: Record<string, string> = {
    frontend: "#0CC0DF",
    backend: "#12AA9C",
    devops: "#6366F1",
    tooling: "#F59E0B",
    design: "#EC4899",
    visualization: "#8B5CF6",
    architecture: "#10B981",
    spoken: "#F43F5E",
};

/**
 * A calm, editorial skills overview: each category is a Card of skill tags,
 * with level-5 (expert) skills highlighted in the accent colour. Replaces the
 * old animated force-graph, which clashed with the site's restrained type.
 */
const SkillsMap: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <div className="skills-grid">
            {skillGroups.map((group) => {
                const color = CATEGORY_COLORS[group.id];
                return (
                    <Card
                        key={group.id}
                        variant="outlined"
                        className="skills-card"
                        title={t(group.label)}
                    >
                        <div className="skills-tags">
                            {group.skills.map((skill) => (
                                <Tag
                                    key={skill.id}
                                    style={{
                                        color,
                                        background: `${color}14`,
                                        borderColor: `${color}3d`,
                                    }}
                                >
                                    {t(skill.label)}
                                </Tag>
                            ))}
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

export default SkillsMap;
