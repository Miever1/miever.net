import React, { FunctionComponent } from "react";
import { HeadFC } from "gatsby";
import { Box, PageHeader } from "miever_ui";
import { useTranslation } from "react-i18next";

import Notes from "../../components/Notes";
import { BackToTop } from "../../components/ReadingAids";
import { SEO } from "../../components/SEO";

const NotesPage: FunctionComponent<{}> = () => {
    const { t } = useTranslation();
    return (
        <Box className="content-list">
            <PageHeader title={t("note_title")} subtitle={t("note_subtitle")} />
            <div className="note-page">
                <Notes />
            </div>
            <BackToTop />
        </Box>
    );
};

export default NotesPage;

export const Head: HeadFC = () => {
    const { t } = useTranslation();
    return (
        <SEO
            title={`${t("note_title")} · Aerman Huofuer`}
            description={t("note_subtitle")}
            pathname="/notes"
        />
    );
};
