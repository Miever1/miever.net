import Giscus from '@giscus/react';
import { FunctionComponent, useEffect, useState } from 'react';
import { Skeleton } from 'miever_ui';
import { useTheme } from "../Theme-Context";

const Comments: FunctionComponent<{
    reactionsEnabled?: "0" | "1";
    /**
     * How giscus locates the discussion. Defaults to "pathname" (one thread per
     * URL). Pass "number" + `term` to pin a page to a specific discussion by its
     * number — this skips giscus's title search entirely, so it can never create
     * a duplicate or drift on trailing-slash/host differences. We use it on the
     * home page (pinned to #44) after a search-lag duplicate appeared there.
     */
    mapping?: "pathname" | "url" | "title" | "og:title" | "specific" | "number";
    term?: string;
}> = ({
    reactionsEnabled = "1",
    mapping = "pathname",
    term,
}) => {
    const { resolvedTheme } = useTheme();
    const id = `giscus-${resolvedTheme}`;
    const [loaded, setLoaded] = useState(false);

    // giscus posts a message once its iframe is ready; until then we cover it
    // with a skeleton so the area doesn't sit blank then pop in.
    useEffect(() => {
        const onMessage = (e: MessageEvent) => {
            if (e.origin === "https://giscus.app" && e.data?.giscus) {
                setLoaded(true);
            }
        };
        window.addEventListener("message", onMessage);
        // Fallback in case the ready message is missed.
        const timer = window.setTimeout(() => setLoaded(true), 6000);
        return () => {
            window.removeEventListener("message", onMessage);
            window.clearTimeout(timer);
        };
    }, []);

    return (
        <div className="comments">
            {!loaded && (
                <div className="comments-skeleton" aria-hidden="true">
                    <Skeleton active title paragraph={4} />
                </div>
            )}
            {/* Keep giscus mounted (so its iframe loads) but collapsed until
                ready, so the user sees the skeleton instead of giscus's own
                loading flash. */}
            <div style={{ height: loaded ? "auto" : 0, overflow: "hidden" }}>
                <Giscus
                    id={id}
                    repo="Miever1/miever.net"
                    repoId="R_kgDOIm-VVA"
                    category="General"
                    categoryId="DIC_kwDOIm-VVM4CruHb"
                    mapping={mapping}
                    {...(term ? { term } : {})}
                    reactionsEnabled={reactionsEnabled}
                    emitMetadata="0"
                    inputPosition="top"
                    theme={resolvedTheme === "dark" ? "dark_dimmed" : "light"}
                    lang="en"
                />
            </div>
        </div>
    );
}

export default Comments;
