import React, { FunctionComponent } from "react";
import { Card, Tag } from "miever_ui";
import { useTranslation } from "react-i18next";

import { skillGroups } from "./skillData";
import "./skills.css";

/**
 * A calm, editorial skills overview: each category is a Card of skill tags,
 * with level-5 (expert) skills highlighted in the accent colour. Replaces the
 * old animated force-graph, which clashed with the site's restrained type.
 */
const SkillsMap: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <div className="skills-grid">
            {skillGroups.map((group) => (
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
                                theme={skill.level >= 5 ? "primary" : undefined}
                            >
                                {t(skill.label)}
                            </Tag>
                        ))}
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default SkillsMap;
