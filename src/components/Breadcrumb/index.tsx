import React, { FunctionComponent } from "react";
import { navigate } from "gatsby";
import { Breadcrumb as UIBreadcrumb } from "miever_ui";

export interface Crumb {
    /** Visible label. */
    label: string;
    /** Internal path; omit for the current (last) page. */
    to?: string;
}

/**
 * Thin wrapper over miever_ui's <Breadcrumb> that adds client-side navigation
 * and emits BreadcrumbList structured data (which the library component doesn't
 * do) so search engines show the path.
 */
const Breadcrumb: FunctionComponent<{ items: Crumb[] }> = ({ items }) => {
    const uiItems = items.map((c) => ({
        label: c.label,
        href: c.to,
        onClick: c.to ? () => navigate(c.to as string) : undefined,
    }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.to ? { item: `https://miever.net${c.to}` } : {}),
        })),
    };

    return (
        <div className="breadcrumb-wrap">
            <UIBreadcrumb items={uiItems} separator="›" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    );
};

export default Breadcrumb;
