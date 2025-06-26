import Giscus from '@giscus/react';
import { useTheme } from "../Theme-Context";
import { FunctionComponent } from 'react';

const Comments: FunctionComponent<{
    reactionsEnabled?: "0" | "1";
}> = ({
    reactionsEnabled = "1",
}) => {
    const { currentTheme } = useTheme();
    const id = `giscus-${currentTheme}`;
    return (
        <Giscus
            id={id}
            repo="Miever1/miever.net"
            repoId="R_kgDOIm-VVA"
            category="General"
            categoryId="DIC_kwDOIm-VVM4CruHb"
            mapping="pathname"
            reactionsEnabled={reactionsEnabled}
            emitMetadata="0"
            inputPosition="top"
            theme={currentTheme === "dark" ? "dark_dimmed" : "light"}
            lang="en"
        />
    );
}

export default Comments;