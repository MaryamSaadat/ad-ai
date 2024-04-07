export const withOutSummary = {
    "title": "Feedback",
    "logoPosition": "right",
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "matrix",
        "name": "detail",
        "title": "To what extent do you agree with the following statements?",
        "isRequired": true,
        "rowTitleWidth": "500px",
        "columns": [
         {
          "value": "stronglyDisagree",
          "text": "Strongly disagree"
         },
         {
          "value": "disagree",
          "text": "Disagree"
         },
         {
          "value": "neutral",
          "text": "Neutral"
         },
         "Agree",
         {
          "value": "stronglyAgree",
          "text": "Strongly Agree"
         }
        ],
        "rows": [
         {
          "value": "confusion",
          "text": "There was no confusion or ambiguity in understanding the content of the videos due to the audio descriptions"
         },
         {
          "value": "sufficient",
          "text": "The information provided in the audio descriptions was sufficient for comprehending the content of the videos"
         },
         {
          "value": "enjoyable",
          "text": "The experience of listening to the audio descriptions while watching the videos was enjoyable"
         }
        ]
       },
       {
        "type": "comment",
        "name": "anyQuestion",
        "title": "Do you have any questions related to the video?"
       }
      ]
     }
    ],
    "showPageTitles": false,
    "showCompletedPage": false
   }