import * as React from "react"
import { navigate, HeadFC, PageProps } from "gatsby"
import { Box, Button, Typography } from "miever_ui"
import { useTranslation } from "react-i18next"
import { SEO } from "../components/SEO"

const { Title, Paragraph } = Typography

const NotFoundPage: React.FC<PageProps> = () => {
  const { t } = useTranslation()
  return (
    <Box
      flexBox
      direction="column"
      alignItems="center"
      justifyContent="center"
      className="not-found"
    >
      <span className="not-found-code">404</span>
      <Title level={2} className="not-found-title">{t("not_found_title")}</Title>
      <Paragraph type="secondary" className="not-found-message">
        {t("not_found_message")}
      </Paragraph>
      <Button type="primary" onClick={() => navigate("/")}>
        {t("not_found_home")}
      </Button>
    </Box>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <SEO title="404 — Not found" />
