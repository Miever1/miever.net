import React from "react";
import Blogs from "./blogs";
import { SEO } from "../../components/SEO";
import { useTranslation } from "react-i18next";

export default Blogs;

export const Head = () => {
    const { t } = useTranslation();
    return (
        <>
            <SEO title={t("blogs.title")} description={t("blogs.description")} pathname="/blogs" />
        </>
    )
}