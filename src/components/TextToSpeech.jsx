import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId : process.env.REACT_APP_CLIENTID,
  secretAccessKey: process.env.REACT_APP_SECRETKEY,
  region: process.env.REACT_APP_REGION
})

const polly = new AWS.Polly()

const TextToSpeech = ({ text, parentCallback }) => {
  const [audioFile, setAudioFile] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    polly.synthesizeSpeech({
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: "Danielle",
      Engine : 'neural',
    },
    (error, data) => {
      if (error) {
        console.log(error);
      }else{
        console.log(data);
        const audioBlob = new Blob([data.AudioStream.buffer], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioFile(audioUrl);
        const audio = audioRef.current;
        audio.src = audioUrl;

        audio.addEventListener('ended', () => {
          parentCallback(); // Set isPlaying to false when audio playback ends
        });

        audio.play();

        return () => {
          URL.revokeObjectURL(audioUrl)
        }
      }
    }
    )
  }, [text]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying){
      audio.pause();
    }
    else{
      audio.play();
    }
    setIsPlaying(!isPlaying)
  }

  // const [isPaused, setIsPaused] = useState(false);
  // const [utterance, setUtterance] = useState(null);
  // const [voice, setVoice] = useState(null);
  // const [pitch, setPitch] = useState(1);
  // const [rate, setRate] = useState(1);
  // const [volume, setVolume] = useState(1);

  // useEffect(() => {
  //   const synth = window.speechSynthesis;
  //   const voices = synth.getVoices();

  //   const newUtterance = new SpeechSynthesisUtterance(text);
  //   newUtterance.voice = voices.find((v) => v.name === voice?.name);
  //   newUtterance.pitch = pitch;
  //   newUtterance.rate = rate;
  //   newUtterance.volume = volume;

  //   if (!isPaused) {
  //     synth.speak(newUtterance);

  //     newUtterance.onend = () => {
  //       parentCallback();
  //     }
  //   }

  //   setUtterance(newUtterance);

  //   return () => {
  //     synth.cancel();
  //   };
  // }, [text, voice, pitch, rate, volume, isPaused]);

  // const handlePause = () => {
  //   const synth = window.speechSynthesis;
  //   synth.pause();
  //   setIsPaused(true);
  // };

  // const handleResume = () => {
  //   const synth = window.speechSynthesis;
  //   synth.resume();
  //   setIsPaused(false);
  // };

  // const handleStop = () => {
  //   const synth = window.speechSynthesis;
  //   synth.cancel();
  //   setIsPaused(false);
  // };

  // const handleVoiceChange = (event) => {
  //   const selectedVoice = event.target.value;
  //   setVoice(selectedVoice);
  // };

  // const handleRateChange = (event) => {
  //   setRate(parseFloat(event.target.value));
  // };

  // const handleVolumeChange = (event) => {
  //   setVolume(parseFloat(event.target.value));
  // };

  return (
    <div>
    <div>
      <audio ref={audioRef}/>
      <div>
        <Button onClick={togglePlay}
          sx={{
            backgroundColor: "secondary.main",
            color: "white",
            margin: "10px",
          }}
          className="category-btn"
        >
         {
            isPlaying ? <p>Pause</p> : <p>Play</p>
          }
        </Button>
      </div>
    </div>
      {/* <label>
        Voice:
        <select value={voice} onChange={handleVoiceChange}>
          {window.speechSynthesis.getVoices().map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>
      </label>

      <br />

      <label>
        Speed:
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
        />
      </label>
      <br />
      <label>
        Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </label>

      <br />

      <Button
        sx={{
          backgroundColor: "secondary.main",
          color: "white",
          margin: "10px",
        }}
        className="category-btn"
        onClick={isPaused ? handleResume : handlePause}
      >
        {isPaused ? "Resume" : "Pause"}
      </Button>
      <Button
        sx={{
          backgroundColor: "secondary.main",
          color: "white",
          margin: "10px",
        }}
        className="category-btn"
        onClick={handleStop}
      >
        Stop
      </Button> */}
    </div>
  );
};

export default TextToSpeech;

// import React, { useState, useEffect, useRef } from "react";
// import { Button } from "@mui/material";

// const TextToSpeech = ({ text, parentCallback }) => {
//   const [audioFile, setAudioFile] = useState();
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef();
//   const apiKey = process.env.REACT_APP_CHATGPT;

//   const apiBody = {
//     model: "tts-1",
//     input: text,
//     voice: "alloy",
//   };

//   const handleTextToSpeech = async () => {
//     try {
//       const response = await fetch("https://api.openai.com/v1/audio/speech", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: "Bearer " + apiKey,
//         },
//         responseType: "arraybuffer",
//         body: JSON.stringify(apiBody),
//       })
//         .then((data) => {
//           return data.blob();
//         })
//         .then((data) => {
//           console.log(data);
//           const audioUrl = URL.createObjectURL(data);
//           setAudioFile(audioUrl);
//           const audio = audioRef.current;
//           audio.src = audioUrl;

//           audio.addEventListener("ended", () => {
//             parentCallback(); // Set isPlaying to false when audio playback ends
//           });

//           audio.play();

//           return () => {
//             URL.revokeObjectURL(audioUrl);
//           };
//         });
//     } catch (error) {
//       console.error("Error converting text to speech:", error);
//     }
//   };

//   useEffect(() => {
//     handleTextToSpeech();
//   }, [text]);

//   const togglePlay = () => {
//     const audio = audioRef.current;
//     if (isPlaying) {
//       audio.pause();
//     } else {
//       audio.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   return (
//     <div>
//       <div>
//         <audio ref={audioRef} />
//         <div>
//           <button onClick={togglePlay}>
//             {isPlaying ? <p>Pause</p> : <p>Play</p>}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TextToSpeech;
