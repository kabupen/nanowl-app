import React, { useRef, useEffect } from 'react';

const StreamPlayer = ({ url }) => {
  const videoRef = useRef(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    if (!url) return;

    const startVideo = async () => {
      try {
        const ws = new WebSocket(url);

        ws.onopen = () => {
          console.log('WebSocket connection opened');
        };

        ws.onmessage = async (message) => {
          const data = JSON.parse(message.data);
          if (data.offer) {
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);
            ws.send(JSON.stringify({ answer }));
          } else if (data.answer) {
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
          } else if (data.iceCandidate) {
            try {
              await peerConnection.current.addIceCandidate(data.iceCandidate);
            } catch (e) {
              console.error('Error adding received ice candidate', e);
            }
          }
        };

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;

        peerConnection.current = new RTCPeerConnection();
        stream.getTracks().forEach(track => {
          peerConnection.current.addTrack(track, stream);
        });

        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            ws.send(JSON.stringify({ iceCandidate: event.candidate }));
          }
        };

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        ws.send(JSON.stringify({ offer }));
      } catch (err) {
        console.error('Error accessing webcam or creating WebRTC connection:', err);
      }
    };

    startVideo();

    return () => {
      peerConnection.current.close();
      peerConnection.current = null;
    };
  }, [url]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '600px' }} />
    </div>
  );
};

export default StreamPlayer;
