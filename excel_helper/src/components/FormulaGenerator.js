import React from 'react';

function FormulaGenerator({ sampleTables, expectedOutcome, generateResponse, canGenerate }) {
    const generateFormula = async () => {
        const sampleTableData = sampleTables.map(table => ({
          id: table.id,
          data: table.data.map(row => row.join(', ')).join('\n')
        }));
    
        const expectedOutcomeData = expectedOutcome.data.map(row => row.join(', ')).join('\n');
    
        //To check data sent to API
        console.log('Data being sent to API:', { sampleTableData, expectedOutcomeData });
    
        try {
          const response = await fetch('/api/generate-formula', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sampleTableData, expectedOutcomeData }),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
          //for debugging
          console.log('API Response:', data);


        // if (data && data.choices && data.choices[0] && data.choices[0].message) {
        //   setResponse(data.choices[0].message.content, data.prompt);
        // } else {
        //   console.error('Unexpected API response structure:', data);
        //   setResponse('Received an unexpected response format from the API.', '');
        // }

        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          return { content: data.choices[0].message.content, prompt: data.prompt };
        } else {
          throw new Error('Unexpected API response structure');
        }
      } catch (error) {
        console.error('Error details:', error);
        throw error;
        // setResponse('Error calling ChatGPT API. Please try again.', '');
      }
    };

    return (
      <button 
        onClick={() => generateResponse(generateFormula)} 
        disabled={!canGenerate}
        className={`generate-button ${!canGenerate ? 'disabled' : ''}`}
      >
        Generate Formula
      </button>
    );
  }
    
export default FormulaGenerator;