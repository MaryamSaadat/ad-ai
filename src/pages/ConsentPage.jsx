import React, { useState } from "react";
import {
  Checkbox,
  Button,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import { Navbar } from "../components";
import { useNavigate } from "react-router-dom";

const ConsentPage = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleProceed = () => {
    // Add your proceed logic here
    if (checked) {
      navigate("/Info");
    } else {
      alert("Please agree to terms and conditions");
    }
  };

  return (
    <>
      <Navbar text="User Study Consent form" />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        textAlign="left"
        padding={10}
      >
        <Typography variant="body1">
          Hello,
          <br />
          We are a research group at UC Santa Cruz and Arizona State University
          exploring how to improve audio descriptions for videos and movies for
          blind and low-vision persons. For this particular study, we would like
          to understand user’s perceptions towards AI generated audio
          descriptions.
          <br />
          The study will consist of the two parts:
          <ol>
            <li>
              A video viewing segment where you will watch a few short videos
              and answer ratings related questions to the video. You will also
              provide a short summary of a few randomly selected videos. The
              video viewing segment would take about 30-40 minutes to complete.
            </li>
            <li>
              A 20-30 minute virtual chat session to discuss your responses.
            </li>
          </ol>
          We do not anticipate any risks to you from this study. There are no
          anticipated direct benefits to you from participating in the study
          alone. Your participation in this study is voluntary. You can take a
          break or discontinue participation at any time. We will send you a $50
          Amazon gift card as a token of appreciation for completing the study.
          Please note that we might need a few days to send you the gift cards
          because we order them in batches.
          <br />
          We will ask a few questions related to the videos watched in the
          viewing segment and some demographic data. We will audio record the
          session and take notes to record your comments. We will not request,
          and you should not provide, any sensitive personal information in this
          study. We will not record any identifying information including names,
          emails, etc. without your permission. The data collected may be used
          to analyze and improve the audio descriptions for our research
          project. By giving your consent, you agree to allow us to use all data
          collected in the survey.
        </Typography>
        <FormControlLabel
          sx={{ marginTop: "20px" }}
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label="I consent to the user study"
        />
        <br />
        <Button
          sx={{
            backgroundColor: "secondary.main",
            color: "white",
            margin: "10px",
          }}
          className="category-btn"
          onClick={handleProceed}
          disabled={!checked}
          style={{ marginTop: "10px" }}
        >
          Proceed to user study
        </Button>
      </Box>
    </>
  );
};

export default ConsentPage;
