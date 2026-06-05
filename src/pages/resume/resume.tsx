import React, { FunctionComponent } from "react";
import { Box, Button, Card, Icon } from "miever_ui";
import { useTranslation } from "react-i18next";

import { SEO } from "../../components/SEO";
import { BackToTop } from "../../components/ReadingAids";
import {
    profile,
    education,
    skills,
    experience,
    internships,
    awards,
    projects,
    languages,
    labels,
    Localized,
} from "../../data/resumeData";

import "./resume.css";

const Resume: FunctionComponent<{}> = () => {
    const { i18n } = useTranslation();
    const lang: "en" | "zh" = i18n.language === "zh" ? "zh" : "en";
    const tr = (value: Localized) => value[lang] || value.en;
    const pdf = profile.pdf[lang] || profile.pdf.en;

    return (
        <Box className="resume">
            <header className="resume-header">
                <div className="resume-identity">
                    <h1 className="resume-name">{profile.name}</h1>
                    <p className="resume-role">{tr(profile.role)}</p>
                    <ul className="resume-contact">
                        <li>
                            <Icon icon={["fas", "location-dot"]} /> {tr(profile.location)}
                        </li>
                        <li>
                            <a href={`mailto:${profile.email}`}>
                                <Icon icon={["fas", "envelope"]} /> {profile.email}
                            </a>
                        </li>
                        <li>
                            <a href={profile.github} target="_blank" rel="noopener noreferrer">
                                <Icon icon={["fab", "github"]} /> GitHub
                            </a>
                        </li>
                        <li>
                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                                <Icon icon={["fab", "linkedin"]} /> LinkedIn
                            </a>
                        </li>
                    </ul>
                </div>
                <Button type="primary" onClick={() => window.open(pdf)}>
                    <Icon icon={["fas", "download"]} style={{ marginRight: 8 }} />
                    {tr(labels.download)}
                </Button>
            </header>

            <div className="resume-grid">
                <main className="resume-main">
                    <section className="resume-section">
                        <h2 className="resume-section-title">{tr(labels.summary)}</h2>
                        <p className="resume-summary">{tr(profile.summary)}</p>
                    </section>

                    <section className="resume-section">
                        <h2 className="resume-section-title">{tr(labels.experience)}</h2>
                        <div className="resume-timeline">
                            {experience.map((entry, i) => (
                                <article className="resume-entry" key={i}>
                                    <div className="resume-entry-head">
                                        <h3 className="resume-entry-title">{tr(entry.title)}</h3>
                                        <span className="resume-entry-period">{entry.period}</span>
                                    </div>
                                    <p className="resume-entry-org">
                                        {tr(entry.company)} · {tr(entry.location)}
                                    </p>
                                    <ul className="resume-bullets">
                                        {entry.highlights.map((h, j) => (
                                            <li key={j}>{tr(h)}</li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="resume-section">
                        <h2 className="resume-section-title">{tr(labels.internships)}</h2>
                        <div className="resume-timeline">
                            {internships.map((entry, i) => (
                                <article className="resume-entry" key={i}>
                                    <div className="resume-entry-head">
                                        <h3 className="resume-entry-title">{tr(entry.title)}</h3>
                                        <span className="resume-entry-period">{entry.period}</span>
                                    </div>
                                    <p className="resume-entry-org">
                                        {tr(entry.company)} · {tr(entry.location)}
                                    </p>
                                    <ul className="resume-bullets">
                                        {entry.highlights.map((h, j) => (
                                            <li key={j}>{tr(h)}</li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="resume-section">
                        <h2 className="resume-section-title">{tr(labels.awards)}</h2>
                        <div className="resume-awards">
                            {awards.map((a, i) => (
                                <Card
                                    key={i}
                                    variant="elevated"
                                    className="resume-award"
                                    title={tr(a.title)}
                                    meta={`${tr(a.event)} · ${a.period}`}
                                    extra={<Icon icon={["fas", "trophy"]} theme="warning" />}
                                >
                                    {tr(a.note)}
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section className="resume-section">
                        <h2 className="resume-section-title">{tr(labels.projects)}</h2>
                        <div className="resume-proj-grid">
                            {projects.map((p, i) => (
                                <Card
                                    key={i}
                                    variant="outlined"
                                    className="resume-proj"
                                    title={
                                        p.link ? (
                                            <a href={p.link} target="_blank" rel="noopener noreferrer">
                                                {tr(p.name)} ↗
                                            </a>
                                        ) : (
                                            tr(p.name)
                                        )
                                    }
                                    meta={p.period}
                                >
                                    {p.points.map((pt) => tr(pt)).join(" ")}
                                </Card>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="resume-aside">
                    <section className="resume-section">
                        <h2 className="resume-section-title">{tr(labels.education)}</h2>
                        {education.map((ed, i) => (
                            <div className="resume-edu" key={i}>
                                <h3 className="resume-edu-degree">{tr(ed.degree)}</h3>
                                <p className="resume-edu-org">{tr(ed.org)}</p>
                                <p className="resume-edu-note">{tr(ed.note)}</p>
                                <span className="resume-edu-period">{ed.period}</span>
                            </div>
                        ))}
                    </section>

                    <section className="resume-section">
                        <h2 className="resume-section-title">{tr(labels.skills)}</h2>
                        {skills.map((group, i) => (
                            <div className="resume-skill-group" key={i}>
                                <h4 className="resume-skill-label">{tr(group.label)}</h4>
                                <div className="resume-chips">
                                    {group.items.map((it) => (
                                        <span className="resume-chip" key={it}>
                                            {it}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="resume-section">
                        <h2 className="resume-section-title">{tr(labels.languages)}</h2>
                        <ul className="resume-langs">
                            {languages.map((l, i) => (
                                <li key={i}>
                                    <strong>{tr(l.name)}</strong>
                                    <span>{tr(l.level)}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </aside>
            </div>
            <BackToTop />
        </Box>
    );
};

export default Resume;

export const Head = () => (
    <SEO title="Resume" description="Résumé of Aerman Huofuer — Front-End Engineer." pathname="/resume" />
);
