import { useState } from 'react'
// import VideoPlayer from "./components/VideoPlayer.jsx"
// import StreamPlayer from "./components/StreamPlayer.jsx"
import HlsPlayer from "./components/HlsPlayer.jsx"
// import './App.css'

function App() {
  const [url, setUrl] = useState("")

  return (
    <div>
      <h1>WebRTC Video Player</h1>
      <input
      type="text"
      value={url}
      onChange = {(e) => setUrl(e.target.value)}
      placeholder="Enter HLS URL"
      />
      <HlsPlayer url={url} />
    </div>
  )
}

export default App
// http://localhost:85/stream/camera1/index.m3u8