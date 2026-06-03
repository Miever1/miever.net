import React, { FunctionComponent } from "react";
import { Box, Typography, Icon } from "miever_ui";
import { useTranslation } from "react-i18next";

import Comments from "../Comments";

const { Title, Paragraph, Text, Link } = Typography;

type Contact = {
    key: string;
    icon: [string, string];
    label: string;
    value: React.ReactNode;
    href: string;
    external?: boolean;
};

// Primary ways to reach me. Email first (fastest), then the two profiles a
// recruiter is most likely to check. Email matches the address on the résumé.
const CONTACTS: Contact[] = [
    {
        key: "email",
        icon: ["fas", "envelope"],
        label: "Email",
        // <wbr> lets the address wrap after the "@" instead of mid-word.
        value: (
            <>
                aerman.huofuer@<wbr />gmail.com
            </>
        ),
        href: "mailto:aerman.huofuer@gmail.com",
    },
    {
        key: "linkedin",
        icon: ["fab", "linkedin"],
        label: "LinkedIn",
        value: "in/aerman-huofuer",
        href: "https://www.linkedin.com/in/aerman-huofuer-413328280/",
        external: true,
    },
    {
        key: "github",
        icon: ["fab", "github"],
        label: "GitHub",
        value: "@Miever1",
        href: "https://github.com/Miever1",
        external: true,
    },
];

/**
 * Contact block for the home page: an invitation, three direct contact cards,
 * and the giscus thread underneath so the section reads as a real "get in
 * touch" area rather than a bare comment widget.
 */
const Connect: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <Box className="connect">
            <Paragraph className="connect-lead" type="secondary">
                {t("connect_lead")}
            </Paragraph>

            <div className="connect-grid">
                {CONTACTS.map((c) => (
                    <Link
                        key={c.key}
                        className="connect-card"
                        href={c.href}
                        aria-label={c.label}
                        {...(c.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                    >
                        <span className="connect-card-icon">
                            <Icon icon={c.icon as [any, any]} />
                        </span>
                        <span className="connect-card-body">
                            <Text className="connect-card-label" strong>
                                {c.label}
                            </Text>
                            <Text className="connect-card-value" type="secondary">
                                {c.value}
                            </Text>
                        </span>
                        <span className="connect-card-arrow" aria-hidden="true">
                            →
                        </span>
                    </Link>
                ))}
            </div>

            <div className="connect-comments">
                <Title level={4} className="connect-comments-title">
                    {t("connect_comments_title")}
                </Title>
                <Comments />
            </div>
        </Box>
    );
};

export default Connect;
