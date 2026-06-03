import React, { FunctionComponent } from "react";
import { Box, Icon, Tag } from "miever_ui";
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
 * Per-skill icon. FontAwesome brand marks where they exist (React, AWS,
 * Figma...), otherwise a representative solid icon. Rendered monochrome in the
 * accent colour so the row of tags stays cohesive rather than multicoloured.
 */
const SKILL_ICONS: Record<string, [string, string]> = {
    html: ["fab", "html5"],
    css: ["fab", "css3-alt"],
    javascript: ["fab", "js"],
    typescript: ["fas", "code"],
    react: ["fab", "react"],
    reactquery: ["fas", "database"],
    gatsby: ["fas", "bolt"],
    nest: ["fas", "cube"],
    c_cpp: ["fas", "c"],
    aws: ["fab", "aws"],
    nginx: ["fas", "network-wired"],
    github_actions: ["fab", "github"],
    git: ["fab", "git-alt"],
    jest: ["fas", "vial"],
    eslint: ["fas", "check-double"],
    figma: ["fab", "figma"],
    interaction_design: ["fas", "hand-pointer"],
    ux_research: ["fas", "magnifying-glass"],
    prototyping: ["fas", "vector-square"],
    antv: ["fas", "chart-pie"],
    apexcharts: ["fas", "chart-line"],
    microfrontends: ["fas", "puzzle-piece"],
    design_system: ["fas", "shapes"],
    topology: ["fas", "diagram-project"],
    english: ["fas", "earth-americas"],
    chinese: ["fas", "earth-asia"],
    uyghur: ["fas", "earth-asia"],
};

/**
 * A clean, professional skills overview: skills grouped by category as tags,
 * each category led by an accent icon. Groups size to their content, so sparse
 * categories don't leave empty boxes.
 */
const SkillsMap: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <Box className="skills-grid">
            {skillGroups.map((group) => (
                <Box className="skills-group" key={group.id}>
                    <h3 className="skills-group-title">
                        <Icon
                            icon={CATEGORY_ICONS[group.id] as never}
                            className="skills-group-icon"
                        />
                        {t(group.label)}
                    </h3>
                    <Box className="skills-tags">
                        {group.skills.map((skill) => (
                            <Tag key={skill.id}>
                                <Icon
                                    icon={(SKILL_ICONS[skill.id] ?? ["fas", "code"]) as never}
                                    className="skills-tag-icon"
                                />
                                {t(skill.label)}
                            </Tag>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default SkillsMap;
