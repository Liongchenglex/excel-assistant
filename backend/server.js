// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post('/api/generate-formula', async (req, res) => {
  try {
    const { sampleTableData, expectedOutcomeData } = req.body;
    
    let prompt = "I have the following sample tables from Excel:\n\n";
    
    sampleTableData.forEach((table, index) => {
      prompt += `Sample Table ${index + 1}:\n${table.data}\n\n`;
    });
    
    prompt += `Expected Outcome:\n${expectedOutcomeData}\n\n`;
    prompt += "You are a master in excel. Can you come up with a set of steps to transform the sample tables into the expected outcome? You need to start by showing the sample data structure that you are analysing.";
    prompt += "Remember, the input data is a sample set of a bigger dataset, hence you smust handle the data with formulas/automation as much as possible. You can do one round of checking first before giving me the answer. The steps have to flow logically and must have every granular details. You can start from the original Sample Data table, and work your way down to the expected outcome. After every step, you should give me the state of the table after applying the steps until we reach the expected outcome."

    console.log('Prompt being sent to GPT:', prompt); // Log the prompt on server side

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('OpenAI API Response:', response.data);
    res.json({ ...response.data, prompt }); // Include the prompt in the response
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

app.post('/api/follow-up', async (req, res) => {
  try {
    const { originalPrompt, originalResponse, followUpPrompt } = req.body;
    
    const prompt = `Original prompt: ${originalPrompt}\n\n` +
                   `Original response: ${originalResponse}\n\n` +
                   `Follow-up question: ${followUpPrompt}\n\n` +
                   `Please provide a clarification or additional information based on the follow-up question.`;

    console.log('Follow-up prompt being sent to GPT:', prompt);

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('OpenAI API Follow-up Response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing your follow-up request.' });
  }
});

app.post('/api/generate-vba-steps', async (req, res) => {
  try {
    const { sampleTableData, expectedOutcomeData } = req.body;
    
    let prompt = "I have the following sample tables from Excel:\n\n";
    
    sampleTableData.forEach((table, index) => {
      prompt += `Sample Table ${index + 1}:\n${table.data}\n\n`;
    });
    
    prompt += `Expected Outcome:\n${expectedOutcomeData}\n\n`;
    prompt += "Can you provide step-by-step instructions to create a VBA macro that transforms the sample tables into the expected outcome? Please include code snippets where appropriate.";

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('OpenAI API VBA Steps Response:', response.data);
    res.json({ ...response.data, prompt });
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing your VBA steps request.' });
  }
});



app.listen(3001, () => console.log('Server running on port 3001'));