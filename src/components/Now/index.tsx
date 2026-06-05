import React from "react";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Box, Typography, Icon } from "miever_ui";
import { useTranslation } from "react-i18next";

const { Paragraph, Text } = Typography;

// Bump this whenever you edit the items below (and their translations).
const NOW_UPDATED = "2026-06-06";

const items: { icon: IconProp; key: string }[] = [
  { icon: ["fas", "graduation-cap"], key: "now_study" },
  { icon: ["fas", "laptop-code"], key: "now_building" },
  { icon: ["fas", "robot"], key: "now_ai" },
  { icon: ["fas", "briefcase"], key: "now_open" },
];

/**
 * A "now" block (nownownow.com convention): a short, dated snapshot of what
 * I'm currently focused on. Lives on the home page so it stays the freshest
 * thing a visitor sees.
 */
const Now: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box className="now">
      <Paragraph type="secondary" className="now-lead">{t("now_lead")}</Paragraph>
      <ul className="now-list">
        {items.map(({ icon, key }) => (
          <li className="now-item" key={key}>
            <span className="now-item-icon">
              <Icon icon={icon} />
            </span>
            <span className="now-item-text">{t(key)}</span>
          </li>
        ))}
      </ul>
      <Text type="secondary" className="now-updated">
        {t("now_updated", { date: NOW_UPDATED })}
      </Text>
    </Box>
  );
};

export default Now;
