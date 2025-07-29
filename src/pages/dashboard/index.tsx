
import React from "react";
import { useTranslation } from "react-i18next";

import Dashboard from "./dashboard";
import { SEO } from "../../components/SEO";

export default Dashboard;

export const Head = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t("dashboard.title")} description={t("dashboard.description")} pathname="/dashboard" />
    </>
  );
}
