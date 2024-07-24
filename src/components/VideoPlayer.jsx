import React, { useRef, useEffect } from "react";

const VideoPlayer = ({ url }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (!url) return;

        const startVideo = async () => {
            try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    videoRef.current.srcObject = stream;
            } catch (err) {
                console.error("Error accessing webcam: ", err);
            }
        };

        startVideo();
    }, [url]);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxwidth: '600px' }} />
        </div>
    );
};

export default VideoPlayer;