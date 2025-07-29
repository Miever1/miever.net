import React from "react";
import { useTranslation } from "react-i18next";

import Designs from "./designs";
import { SEO } from "../../components/SEO";

export default Designs;

export const Head = () => {
    const { t } = useTranslation();
    return (
        <>
            <SEO title={t("designs.title")} description={t("designs.description")} pathname="/designs" />
        </>
    );
}