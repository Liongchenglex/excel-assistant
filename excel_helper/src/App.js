import React, { useState, useEffect } from 'react';
import './App.css';
import SampleTableSection from './components/SampleTableSection';
import ExpectedOutcomeSection from './components/ExpectedOutcomeSection';
import FormulaGenerator from './components/FormulaGenerator';
import VBAStepGenerator from './components/VBAStepGenerator';
// import PromptDisplay from './components/PromptDisplay';
import FollowUpSection from './components/FollowUpSection';

function App() {
  const [sampleTables, setSampleTables] = useState([{ id: 1, data: [] }]);
  const [expectedOutcome, setExpectedOutcome] = useState({ data: [] });
  const [latestResponse, setLatestResponse] = useState({ type: null, content: '', prompt: '' });
//   const [apiResponse, setApiResponse] = useState('');
//   const [prompt, setPrompt] = useState('');
//   const [vbaResponse, setVBAResponse] = useState('');
//   const [vbaPrompt, setVBAPrompt] = useState('');
  const [canGenerateFormula, setCanGenerateFormula] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hasSampleData = sampleTables.some(table => table.data.length > 0);
    const hasExpectedOutcome = expectedOutcome.data.length > 0;
    setCanGenerateFormula(hasSampleData && hasExpectedOutcome);
  }, [sampleTables, expectedOutcome]);

  const handleSampleDataChange = (id, newData) => {
    setSampleTables(sampleTables.map(table => 
      table.id === id ? { ...table, data: newData } : table
    ));
  };

  const handleExpectedOutcomeChange = (newData) => {
    setExpectedOutcome({ data: newData });
  };

  const generateResponse = async (type, generateFunction) => {
    setIsLoading(true);
    try {
      const { content, prompt } = await generateFunction();
      setLatestResponse({ type, content, prompt });
    } catch (error) {
      console.error(`Error generating ${type}:`, error);
      setLatestResponse({ type, content: `Error generating ${type}. Please try again.`, prompt: '' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetAll = () => {
    setSampleTables([{ id: 1, data: [] }]);
    setExpectedOutcome({ data: [] });
    setLatestResponse({ type: null, content: '', prompt: '' });
    setCanGenerateFormula(false);
    setIsLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Excel Table Processor</h1>
      
      <SampleTableSection 
        sampleTables={sampleTables} 
        setSampleTables={setSampleTables}
        onDataChange={handleSampleDataChange}
      />

      <ExpectedOutcomeSection 
        expectedOutcome={expectedOutcome}
        setExpectedOutcome={ setExpectedOutcome}
        onDataChange={handleExpectedOutcomeChange}
      />

    <div className="generator-buttons">
        <FormulaGenerator 
          sampleTables={sampleTables}
          expectedOutcome={expectedOutcome}
        //   setResponse={setFormulaResponse}
          generateResponse={(generateFunction) => generateResponse('formula', generateFunction)}
          canGenerate={canGenerateFormula && !isLoading}
        />
        <VBAStepGenerator 
          sampleTables={sampleTables}
          expectedOutcome={expectedOutcome}
        //   setResponse={setVBAResponse}
          generateResponse={(generateFunction) => generateResponse('vba', generateFunction)}
          canGenerate={canGenerateFormula && !isLoading}
        />
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Generating response...</p>
        </div>
      ) : latestResponse.content && (
        <div className="response-container">
          <h3>{latestResponse.type === 'formula' ? 'Formula Generation Response:' : 'VBA Steps Response:'}</h3>
          <p className="response-content">{latestResponse.content}</p>
        </div>
      )}

        {latestResponse.content && !isLoading && (
                <FollowUpSection 
                originalPrompt={latestResponse.prompt}
                originalResponse={latestResponse.content}
                responseType={latestResponse.type}
                />
            )}

    <button onClick={resetAll} className="reset-button">Reset All</button>
    </div>
  );
}

export default App;