import { useState } from 'react'
import VideoPlayer from "./components/VideoPlayer.jsx"
import './App.css'

function App() {
  const [url, setUrl] = useState("")

  return (
    <div>
      <h1>WebRTC Video Player</h1>
      <input
      type="text"
      value={url}
      onChange = {(e) => setUrl(e.target.value)}
      placeholder="Enter webRTC URL"
      />
      <VideoPlayer url={url} />
    </div>
  )
}

export default App
