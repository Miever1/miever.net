import React, { FunctionComponent } from "react";
import type { PageProps } from "gatsby";
import { useTranslation } from "react-i18next";

import Home from "./home";
import { SEO } from "../components/SEO";
import { profile } from "../data/resumeData";

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
      <SEO title={t("home.title")} description={t("home.description")} pathname="/" image="https://miever.net/og/home.png">
        {/* Person entity so search engines can identify who the site is about
            (name searches / knowledge panel). sameAs links the canonical
            profiles. */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            url: "https://miever.net/",
            image: "https://miever.s3.ap-east-1.amazonaws.com/static/footprints/Frankfurt.webp",
            jobTitle: "Software Engineer",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Helsinki",
              addressCountry: "FI",
            },
            alumniOf: [
              { "@type": "CollegeOrUniversity", name: "Aalto University" },
              { "@type": "CollegeOrUniversity", name: "Universidad Politécnica de Madrid" },
            ],
            knowsAbout: [
              "Artificial Intelligence",
              "Computer Graphics",
              "Human-Computer Interaction",
              "Augmented Reality",
              "Front-end Development",
            ],
            sameAs: [profile.github, profile.linkedin],
          })}
        </script>
      </SEO>
    </>
  );
}
