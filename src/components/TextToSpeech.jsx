import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";

const TextToSpeech = ({ text, parentCallback }) => {
  const [audioFile, setAudioFile] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();
  const apiKey = process.env.REACT_APP_API_KEY;

  console.log("This is my API key", apiKey)

  const apiBody = {
    model: "tts-1",
    input: text,
    voice: "alloy",
  };

  const handleTextToSpeech = async () => {
    try {
      const response = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
        responseType: "arraybuffer",
        body: JSON.stringify(apiBody),
      })
        .then((data) => {
          return data.blob();
        })
        .then((data) => {
          console.log(data);
          const audioUrl = URL.createObjectURL(data);
          setAudioFile(audioUrl);
          const audio = audioRef.current;
          audio.src = audioUrl;

          audio.addEventListener("ended", () => {
            parentCallback(); // Set isPlaying to false when audio playback ends
          });

          audio.play();

          return () => {
            URL.revokeObjectURL(audioUrl);
          };
        });
    } catch (error) {
      console.error("Error converting text to speech:", error);
    }
  };

  useEffect(() => {
    handleTextToSpeech();
  }, [text]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <div>
        <audio ref={audioRef} />
        <div>
          <button onClick={togglePlay}>
            {isPlaying ? <p>Pause</p> : <p>Play</p>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
