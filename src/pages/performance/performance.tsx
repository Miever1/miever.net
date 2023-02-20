import React, { FunctionComponent } from "react";

const Performance: FunctionComponent<{}> = () => {
    return (
        <iframe
            width="100%"
            style={{
                opacity: ".9",
                height: "100vh"
            }}
            src="https://lighthouse-report.miever.net/"
        />
    )
}

export default Performance;