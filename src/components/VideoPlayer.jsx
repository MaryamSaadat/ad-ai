import React, { useState, useEffect } from "react";
import { Typography, Box, Chip } from "@mui/material";
import { TextToSpeech } from ".";
import formatTime from "../utils/functions";
import videoPaths from "../data/paths";
// import { getAnalytics, logEvent } from "firebase/analytics";

const VideoPlayer = (props) => {
  // console.log("My descriptions",props)
  const video = require("./videos/" + props.path);
  const defaultDescription = {
    descriptions: "No descriptions playing",
    time_stamp_start: "-",
    time_stamp_end: "-"
  };

  const [completeVideoDescriptions, setcompleteVideoDescriptions] = useState([defaultDescription]);
  const [conciseVideoDescriptions, setconciseVideoDescriptions] = useState([defaultDescription]);
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [descRequests, setDescRequests] = useState([]);
  const [type, setType] = useState("concise");

  // const analytics = getAnalytics();

  // sets the descriptions
  useEffect(() => {
    const completeUpdatedDescriptions = [defaultDescription, ...(props.completeDescrip || [])];
    setCurrentDescriptionIndex(0)
    setcompleteVideoDescriptions(completeUpdatedDescriptions);
    const conciseUpdatedDescriptions = [defaultDescription, ...(props.conciseDescrip || [])];
    setconciseVideoDescriptions(conciseUpdatedDescriptions);
  }, []);


  //handles key pressed event
  useEffect(() => {
    const handleKeyDown = (event) => {
      const videoElement = document.getElementById("video");
      const currentTime = Math.floor(videoElement.currentTime);
         if (event.key === "d" || event.key === "D") {
        const videoElement = document.getElementById("video");
        // logEvent(analytics, 'description_requested_detailed_at_'+currentTime);
        setDescRequests(prevRequests => {
          const updatedRequests = [...prevRequests, 'Detailed description requested at: '+formatTime(currentTime)];
          // console.log("Updated descRequests:", updatedRequests);
          return updatedRequests;
        });
        const index = completeVideoDescriptions.findIndex(
          (description) => parseInt(description.time_stamp_start) === currentTime
        );

        if (index !== -1) {
          setCurrentDescriptionIndex(index);
          setType("complete")
          videoElement.pause();
        }
      } else if (event.key === "c" || event.key === "C") {
          const videoElement = document.getElementById("video");
          setDescRequests(prevRequests => {
            const updatedRequests = [...prevRequests, 'Concise description requested at: '+formatTime(currentTime)];
            // console.log("Updated descRequests:", updatedRequests);
            return updatedRequests;
          });
          const index = conciseVideoDescriptions.findIndex(
            (description) => parseInt(description.time_stamp_start) === currentTime
          );

          if (index !== -1) {
            setCurrentDescriptionIndex(index);
            setType("concise")
            videoElement.pause();
            }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [completeVideoDescriptions]);

  const handleCallback = () => {
    const videoElement = document.getElementById("video");
    videoElement.play();
  };

  useEffect(() => {
    const handleVideoEnded = () => {
      const req = descRequests
      // console.log("Descriptions were requested at time:",req)
      setIsVideoCompleted(true);
      props.parentCallback(true, req)

    };

    const videoElement = document.getElementById("video");
    videoElement.addEventListener("ended", handleVideoEnded);

    return () => {
      videoElement.removeEventListener("ended", handleVideoEnded);
    };
  }, [descRequests]);

  // const handleVideoEnded = () => {
  //   setIsVideoCompleted(true);
  //   props.parentCallback(true)
  // };

  const currentDescription = type === "concise" 
  ? conciseVideoDescriptions[currentDescriptionIndex] 
  : completeVideoDescriptions[currentDescriptionIndex];


  return (
    <div>
      <video id="video" controls width="100%" height="400px">
        <source src={video} type="video/mp4" />
      </video>
      <div>

        <Typography variant="h6" color={"primary.light"} paddingTop={2}>
          {props.title}
        </Typography>
        <hr />
        <Box
          p={2}
          sx={{
            backgroundColor: "primary.light",
            borderRadius: "5px",
            marginBottom: "32px",
          }}
        >
          <Box p={1.5} borderRadius="5px" sx={{ backgroundColor: "white" }}>
            <Chip
              label={formatTime(parseInt(currentDescription.time_stamp_start)) + " - " + formatTime(parseInt(currentDescription.time_stamp_end))}
              sx={{
                backgroundColor: "primary.light",
                color: "white",
                marginBottom: "20px",
              }}
            />
            <Typography variant="body1" sx={{ color: "primary.main" }}>
              {currentDescription.descriptions}
              <hr />
              {(currentDescriptionIndex !== -1 &&  currentDescription.descriptions!== "No descriptions playing") && (
                <TextToSpeech
                  text={currentDescription.descriptions}
                  parentCallback={handleCallback}
                />
              )}
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default VideoPlayer;


// import React, { useState, useEffect } from "react";
// import { Typography, Box, Chip } from "@mui/material";
// import { TextToSpeech } from ".";
// import formatTime from "../utils/functions";
// import videoPaths from "../data/paths";

// const VideoPlayer = (props) => {
//   const video = require("./" + videoPaths[props.id]);
//   console.log("this is my video path", videoPaths[props.id])
//   const defaultDescription = {
//     descriptions: "No description playing",
//     time_stamp_start: "-",
//     time_stamp_end: "-"
//   };
//   // console.log("these are my descriptions in video-plaer", props.descrip)
//   const [videoDescriptions, setVideoDescriptions] = useState([defaultDescription]);
//   const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
//   const [isSpeechPlaying, setIsSpeechPlaying] = useState(false);

//   useEffect(() => {
//     // Concatenate the default description with the new descriptions from props
//     const updatedDescriptions = [defaultDescription, ...(props.descrip || [])];
//     setCurrentDescriptionIndex(0)
//     setVideoDescriptions(updatedDescriptions);
//   }, [props.descrip]);

//   useEffect(() => {
//     const videoElement = document.getElementById("video");

//     const handleTimeUpdate = () => {
//       // Ensure videoDescriptions is not empty before accessing properties
//       if (videoDescriptions.length > 0) {
//         const currentTime = Math.floor(videoElement.currentTime);
//         const index = videoDescriptions.findIndex(
//           (description) => parseInt(description.time_stamp_start) === currentTime
//         );

//         if (index !== -1 && index !== currentDescriptionIndex) {
//           setCurrentDescriptionIndex(index);
//           videoElement.pause();
//         }
//       }
//     };

//     videoElement.addEventListener("timeupdate", handleTimeUpdate);

//     return () => {
//       videoElement.removeEventListener("timeupdate", handleTimeUpdate);
//     };
//   }, [currentDescriptionIndex, videoDescriptions, props.parentCallback]);

//   const handleCallback = () => {
//     const videoElement = document.getElementById("video");
//     videoElement.play();
//   };

//   // Ensure videoDescriptions[currentDescriptionIndex] is defined before accessing its properties
//   const currentDescription = videoDescriptions[currentDescriptionIndex] || defaultDescription;


//   return (
//     <div>
//       <video id="video" controls width="100%" height="400px">
//         <source src={video} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       <div>
//         <Typography variant="h6" color={"primary.light"} paddingTop={2}>
//           {props.title}
//         </Typography>
//         <hr />
//         <Box
//           p={2}
//           sx={{
//             backgroundColor: "primary.light",
//             borderRadius: "5px",
//             marginBottom: "32px",
//           }}
//         >
//           <Box p={1.5} borderRadius="5px" sx={{ backgroundColor: "white" }}>
//             <Chip
//               label={formatTime(parseInt(currentDescription.time_stamp_start)) + " - " + formatTime(parseInt(currentDescription.time_stamp_end))}
//               sx={{
//                 backgroundColor: "secondary.light",
//                 color: "white",
//                 marginBottom: "20px",
//               }}
//             />
//             <Typography variant="body1" sx={{ color: "primary.light" }}>
//               {currentDescription.descriptions}
//               <hr />
//               {currentDescriptionIndex !== -1 && (
//                 <TextToSpeech
//                   text={currentDescription.descriptions}
//                   isPlayed={isSpeechPlaying}
//                   parentCallback={handleCallback}
//                 />
//               )}
//             </Typography>
//           </Box>
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;
