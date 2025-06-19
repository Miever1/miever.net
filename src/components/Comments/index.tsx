import Giscus from '@giscus/react';
import { FunctionComponent } from 'react';

const Comments: FunctionComponent<{
    reactionsEnabled?: "0" | "1";
}> = ({
    reactionsEnabled = "1",
}) => {
    return (
        <Giscus
            id="comments"
            repo="Miever1/miever.net"
            repoId="R_kgDOIm-VVA"
            category="General"
            categoryId="DIC_kwDOIm-VVM4CruHb"
            mapping="pathname"
            reactionsEnabled={reactionsEnabled}
            emitMetadata="0"
            inputPosition="top"
            theme="light"
            lang="en"
            loading="lazy"
        />
    );
}

export default Comments;