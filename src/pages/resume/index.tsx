import React from "react";
import Resume from "./resume";

import { SEO } from "../../components/SEO";
import { useTranslation } from "react-i18next";

export default Resume;

export const Head = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t("resume.title")} description={t("resume.description")} pathname="/resume" />
    </>
  )
}