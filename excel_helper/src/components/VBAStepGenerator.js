import React from 'react';
import './VBAStepGenerator.css';

function VBAStepGenerator({ sampleTables, expectedOutcome, generateResponse, canGenerate }) {
  const generateVBASteps = async () => {
    const sampleTableData = sampleTables.map(table => ({
      id: table.id,
      data: table.data.map(row => row.join(', ')).join('\n')
    }));

    const expectedOutcomeData = expectedOutcome.data.map(row => row.join(', ')).join('\n');

    try {
      const response = await fetch('/api/generate-vba-steps', {
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
      // debugging
      console.log('VBA Steps API Response:', data);

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
      // onClick={generateVBASteps} 
      onClick={() => generateResponse(generateVBASteps)}
      disabled={!canGenerate}
      className={`vba-generate-button ${!canGenerate ? 'disabled' : ''}`}
    >
      Create VBA Steps
    </button>
  );
}

export default VBAStepGenerator;