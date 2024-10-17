import React, { FunctionComponent } from "react";

const Resume:FunctionComponent<{}> = () => {
    return (
        <main>
            <embed
                src="https://miever.s3.ap-east-1.amazonaws.com/static/resume/miever.pdf"
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
