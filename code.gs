function onFormSubmit(e) {

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = e ? e.range.getRow() : sheet.getLastRow(); 


  var sleep = sheet.getRange(row, 4).getValue();
  var stress = sheet.getRange(row, 5).getValue();
  var symptoms = sheet.getRange(row, 6).getValue();

  if(!symptoms) return;

  var apiKey = PropertiesService.getScriptProperties().getProperty('GROQ_API_KEY');
  var url = "https://api.groq.com/openai/v1/chat/completions";


var systemPrompt = "You are a data output machine. Analyze symptoms, sleep, and stress. You MUST reply ONLY in this exact format: [Primary Condition] ([Probability]%) | [One short actionable tip]. DO NOT add any intro text like 'Based on...'. NEVER use line breaks. Example: Screen Fatigue (80%) | Drink water and use the 20-20-20 rule.";  var userPrompt = "Symptoms: " + symptoms + ", Sleep: " + sleep + " hours, Stress: " + stress + "/10.";

  var payload = {
    "model": "llama-3.1-8b-instant", 
    "messages": [
      {"role": "system", "content": systemPrompt},
      {"role": "user", "content": userPrompt}
    ],
    "temperature": 0.2 
  };

  var options = {
    "method": "post",
    "headers": {
      "Authorization": "Bearer " + apiKey,
      "Content-Type": "application/json"
    },
    "payload": JSON.stringify(payload)
  };


  try {
    var response = UrlFetchApp.fetch(url, options);
    var json = JSON.parse(response.getContentText());
    var aiText = json.choices[0].message.content;


    var parts = aiText.split("|");
    var condition = parts[0] ? parts[0].trim() : "Analysis Pending";
    var tip = parts[1] ? parts[1].trim() : aiText;


    sheet.getRange(row, 7).setValue(condition);
    sheet.getRange(row, 8).setValue(tip);


    if(sheet.getRange(1, 7).getValue() === "") {
      sheet.getRange(1, 7).setValue("AI Predicted Condition");
      sheet.getRange(1, 8).setValue("AI Wellness Tip");
    }

  } catch(error) {
    sheet.getRange(row, 7).setValue("API Error: " + error.toString());
  }
}
