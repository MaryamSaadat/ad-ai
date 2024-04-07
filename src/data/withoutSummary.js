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
        "title": "For the audio descriptions of the video you just watched, to what extent do you agree with the following statements?",
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
          "text": "The audio descriptions made watching the video more efficient"
         },
         {
          "value": "sufficient",
          "text": "The information provided in the audio descriptions was effective in helping me understand the visual content of the video"
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