import React, { useState } from 'react';
import './FollowUpSection.css'; 

function FollowUpSection({ originalPrompt, originalResponse, responseType }) {
  const [followUpPrompt, setFollowUpPrompt] = useState('');
  const [followUpResponse, setFollowUpResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFollowUpPrompt = async () => {
    if (!followUpPrompt.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/follow-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          originalPrompt,
          originalResponse,
          responseType,
          followUpPrompt 
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.choices && data.choices[0] && data.choices[0].message) {
        //After getting responde, update the state
        setFollowUpResponse(data.choices[0].message.content);
      } else {
        throw new Error('Received an unexpected response format from the API.');
      }
    } catch (error) {
      console.error('Error details:', error);
      setError('An error occurred while processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

    // Function to process the text and preserve formatting
    const formatResponse = (text) => {
      const paragraphs = text.split('\n\n');
      return paragraphs.map((paragraph, index) => (
        <p key={index}>
          {paragraph.split('\n').map((line, lineIndex) => (
            <React.Fragment key={lineIndex}>
              {line}
              {lineIndex < paragraph.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      ));
    };



  return (
    <div className="follow-up-section">
      <h3>Need More Clarification?</h3>
      <p className="follow-up-instruction">
        If you need more information or have questions about the response above, 
        you can ask a follow-up question here.
      </p>
      <textarea
        value={followUpPrompt}
        onChange={(e) => setFollowUpPrompt(e.target.value)}
        placeholder="E.g., 'Can you explain step 2 in more detail?' or 'What if my data looks different?'"
        rows="4"
        className="follow-up-textarea"
      />
      <button 
        onClick={handleFollowUpPrompt}
        disabled={!followUpPrompt.trim() || isLoading}
        className="follow-up-button"
      >
        {isLoading ? 'Sending...' : 'Send Follow-up'}
      </button>
      {error && <p className="error-message">{error}</p>}
      {followUpResponse && (
        <div className="follow-up-response">
          <h4>Follow-up Response:</h4>
          <p>{formatResponse(followUpResponse)}</p>
        </div>
      )}
    </div>
  );
}

export default FollowUpSection;