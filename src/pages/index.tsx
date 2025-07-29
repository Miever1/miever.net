import React, { FunctionComponent } from "react";
import type { PageProps } from "gatsby";
import { useTranslation } from "react-i18next";

import Home from "./home";
import { SEO } from "../components/SEO";

const IndexPage: FunctionComponent<PageProps> = () => {
  return (
    <Home />
  )
}

export default IndexPage

export const Head = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t("home.title")} description={t("home.description")} pathname="/" />
    </>
  );
}
