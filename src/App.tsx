import { useState } from 'react'
// import VideoPlayer from "./components/VideoPlayer.jsx"
// import StreamPlayer from "./components/StreamPlayer.jsx"
import HlsPlayer from "./components/HlsPlayer.jsx"
// import './App.css'
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';

function App() {
  const [url, setUrl] = useState("")
  const [objects, setObjects] = useState('');
  const [thresholds, setThresholds] = useState('');
  const [streamUrl, setStreamUrl] = useState("")

  const handleStart = async() => {
    try {
      const response = await axios.post('http://localhost:85/start', {
        uri: url,
        alias: 'out'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = response.data;
      if (data.running) {
        const streamUri = `http://localhost:85${data.uri}`;
        setStreamUrl(streamUri);
      }
    } catch (error) {
      console.error('Error starting stream:', error);
    }
  };

  const handleSubmit = async () => {
    const encodedObjects = objects.split(',').map(obj => encodeURIComponent(obj.trim())).join(',');
    const encodedThresholds = thresholds.split(',').map(thr => thr.trim()).join(',');

    const url = `http://0.0.0.0:5010/prompt?objects=${encodedObjects}&thresholds=${encodedThresholds}`;

    try {
      const response = await axios.get(url);
    } catch (error) {
      console.error('Error fetching from API:', error);
    }
  };


  return (
    <Container>
      <Typography variant="h4" gutterBottom>NanoOwl Viwer</Typography>
      <Grid container spacing={2} alignItems="center" direction="row">
        <Grid item>
          <TextField
            fullWidth
            label="Enter RTSP URL"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter RTSP URL"
          />
        </Grid>
        <Grid item>
          <Button onClick={handleStart}>Start</Button>
        </Grid>
      </Grid>
      { streamUrl && (
        <div>
        <HlsPlayer url={streamUrl} />
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="object name"
            variant="outlined"
            value={objects}
            onChange={(e) => setObjects(e.target.value)}
            placeholder="ex. a man,a hat"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            value={thresholds}
            onChange={(e) => setThresholds(e.target.value)}
            placeholder="ex. 0.1, 0.2"
          />
        </Grid>
        <Grid>
          <Button onClick={handleSubmit}>Submit</Button>
        </Grid>
        </div>
      )}
    </Container>
  )
}

export default App
// http://localhost:85/stream/camera1/index.m3u8