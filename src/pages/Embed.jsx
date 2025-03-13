import React from "react";

const EmbedGame = ({url,name}) => {
    return (
        <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
            <iframe
                src={url}
                //src="https://slotslaunch.com/iframe/5148?token=rCTsJ6ZUVkYBt1Qj0LGrXxoQfikEp1JFy233npVtQAZ37DbvWq"
                title={name}
                style={{ width: "100%", height: "100%", border: "none" }}
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default EmbedGame;
