import React from "react";
import { useTranslation } from "react-i18next";

import Performance from "./performance";
import { SEO } from "../../components/SEO";

export default Performance;

export const Head = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t("performance.title")} description={t("performance.description")} pathname="/performance" />
    </>
  );
}