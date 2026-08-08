import React, { FunctionComponent, useState } from "react";
import { Button, Icon, Typography } from "miever_ui";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

/**
 * A compact share row for detail pages: LinkedIn, X and copy-link, built on
 * miever_ui's <Button>. No third-party scripts — just intent URLs and the
 * Clipboard API. `url` is the canonical page URL (falls back to the live URL).
 */
const ShareButtons: FunctionComponent<{ url?: string; title?: string }> = ({
    url,
    title = "",
}) => {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const resolve = () =>
        url || (typeof window !== "undefined" ? window.location.href : "");

    const openShare = (href: string) => {
        if (typeof window !== "undefined") {
            window.open(href, "_blank", "noopener,noreferrer");
        }
    };

    const shareLinkedIn = () =>
        openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(resolve())}`);

    const shareX = () =>
        openShare(`https://twitter.com/intent/tweet?url=${encodeURIComponent(resolve())}&text=${encodeURIComponent(title)}`);

    const copyLink = async () => {
        try {
            if (navigator?.clipboard) {
                await navigator.clipboard.writeText(resolve());
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
            }
        } catch {
            /* clipboard blocked — no-op */
        }
    };

    return (
        <div className="share-row">
            <Text type="secondary" className="share-label">{t("share_label")}</Text>
            <Button type="link" className="share-btn" aria-label={t("share_linkedin")} onClick={shareLinkedIn}>
                <Icon icon={["fab", "linkedin"]} />
            </Button>
            <Button type="link" className="share-btn" aria-label={t("share_x")} onClick={shareX}>
                <Icon icon={["fab", "x-twitter"]} />
            </Button>
            <Button type="link" className="share-btn" aria-label={t("share_copy")} onClick={copyLink}>
                <Icon icon={["fas", copied ? "check" : "link"]} />
            </Button>
            <span className="share-copied" role="status" aria-live="polite">
                {copied ? t("share_copied") : ""}
            </span>
        </div>
    );
};

export default ShareButtons;
