import React, { FunctionComponent } from "react";

const Resume:FunctionComponent<{}> = () => {
    return (
        <main>
            <embed
                src="/resume/miever.pdf"
                type="application/pdf"
                style={{
                    height: "100vh",
                    width: "100%"
                }}
            />
        </main>
    );
}

export default Resume;
