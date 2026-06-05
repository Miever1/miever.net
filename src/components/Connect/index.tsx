import React, { FunctionComponent } from "react";
import { Box, Typography, Icon } from "miever_ui";
import { useTranslation } from "react-i18next";

import Comments from "../Comments";
import { useSiteMetadata } from "../../hooks/use-site-metadata";

const { Title, Paragraph, Text, Link } = Typography;

type Contact = {
    key: string;
    icon: [string, string];
    label: string;
    value: React.ReactNode;
    href: string;
    external?: boolean;
};

// Split the canonical email (from siteMetadata) so it can wrap after the "@"
// instead of mid-word; <wbr> only matters for the displayed value.
const renderEmail = (email: string) => {
    const [user, domain] = email.split("@");
    return (
        <>
            {user}@<wbr />
            {domain}
        </>
    );
};

/**
 * Contact block for the home page: an invitation, three direct contact cards,
 * and the giscus thread underneath so the section reads as a real "get in
 * touch" area rather than a bare comment widget.
 */
const Connect: FunctionComponent = () => {
    const { t } = useTranslation();
    const { social } = useSiteMetadata();

    // Primary ways to reach me. Email first (fastest), then the two profiles a
    // recruiter is most likely to check. All sourced from siteMetadata.
    const CONTACTS: Contact[] = [
        {
            key: "email",
            icon: ["fas", "envelope"],
            label: "Email",
            value: renderEmail(social.email),
            href: `mailto:${social.email}`,
        },
        {
            key: "linkedin",
            icon: ["fab", "linkedin"],
            label: "LinkedIn",
            value: "in/aerman-huofuer",
            href: social.linkedin,
            external: true,
        },
        {
            key: "github",
            icon: ["fab", "github"],
            label: "GitHub",
            value: "@Miever1",
            href: social.github,
            external: true,
        },
    ];

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
