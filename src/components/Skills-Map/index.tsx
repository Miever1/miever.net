import React, { FunctionComponent } from "react";
import { Tag } from "miever_ui";
import { useTranslation } from "react-i18next";

import { skillGroups } from "./skillData";
import "./skills.css";

/**
 * A clean, professional skills overview: skills grouped by category as tags.
 * Groups size to their content, so sparse categories don't leave empty boxes.
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
                            <Tag key={skill.id} theme="primary">
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
