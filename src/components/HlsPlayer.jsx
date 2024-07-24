import React from 'react';
import Hls from 'hls.js';

const HlsPlayer = ({ url }) => {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (!url) return;

    let hls;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = url;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [url]);

  return (
    <div>
      <video ref={videoRef} controls style={{ width: '100%', maxWidth: '600px' }} />
    </div>
  );
};

export default HlsPlayer;
