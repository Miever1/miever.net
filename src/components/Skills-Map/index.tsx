import React, { FunctionComponent } from "react";
import { Tag } from "miever_ui";
import { useTranslation } from "react-i18next";

import { skillGroups } from "./skillData";
import "./skills.css";

/**
 * A calm, editorial skills overview: skills grouped by category as tags, with
 * level-5 (expert) skills highlighted in the accent colour. Replaces the old
 * animated force-graph, which clashed with the site's restrained typography.
 */
const SkillsMap: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <div className="skills-grid">
            {skillGroups.map((group) => (
                <div className="skills-group" key={group.id}>
                    <h3 className="skills-group-title">{t(group.label)}</h3>
                    <div className="skills-tags">
                        {group.skills.map((skill) => (
                            <Tag
                                key={skill.id}
                                theme={skill.level >= 5 ? "primary" : undefined}
                            >
                                {t(skill.label)}
                            </Tag>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkillsMap;
