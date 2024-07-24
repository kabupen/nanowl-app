#!/bin/bash

curl -X POST http://localhost:85/start  \
	-H "Content-Type: application/json" \
	-d '{"uri": "rtsp://192.168.0.96/live/551178b6-0211-4821-bc0a-86bbbd581441", "alias": "out"}'
	# -d '{"uri": "rtsp://192.168.0.96/live/a20901aa-5e7d-4a89-970a-3f672d88b958", "alias": "out"}'
