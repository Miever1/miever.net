import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Timeline, Card, Tag, Typography } from "miever_ui";

import { notes, pickLang, Lang } from "../../data/notesData";

const { Title, Paragraph, Link, Text } = Typography;

/**
 * Notes stream, rendered as a miever_ui Timeline whose nodes are Cards, so each
 * entry reads as a distinct, self-contained note. The home page shows the latest
 * few (pass `limit`); /notes shows the full list.
 */
const Notes: FunctionComponent<{ limit?: number }> = ({ limit }) => {
    const { t, i18n } = useTranslation();
    const lang: Lang = i18n.language === "zh" ? "zh" : "en";
    const tr = (v: { en: string; zh: string }) => pickLang(v, lang);

    const entries = typeof limit === "number" ? notes.slice(0, limit) : notes;

    const items = entries.map((entry) => ({
        color: "primary" as const,
        children: (
            <Card className="note-card">
                <div className="note-card-meta">
                    <Text className="note-date">{entry.date}</Text>
                    {/* {entry.tag && <Tag className="note-tag">{entry.tag}</Tag>} */}
                </div>
                <Title level={5} className="note-title">{tr(entry.title)}</Title>
                <Paragraph type="secondary" className="note-body">{tr(entry.body)}</Paragraph>
                {entry.link && (
                    <Link
                        href={entry.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="note-link"
                    >
                        {entry.link.label ? tr(entry.link.label) : t("note_read_more")} →
                    </Link>
                )}
            </Card>
        ),
    }));

    return <Timeline mode="left" items={items} className="note-timeline" />;
};

export default Notes;
