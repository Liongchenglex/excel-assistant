import React, { useState, useEffect } from 'react';
import './SampleData.css';

function SampleData({ data: initialData, onDataChange }) {
  const [data, setData] = useState(initialData || []);

  useEffect(() => {
    setData(initialData || []);
  }, [initialData]);

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text/plain');
    const rows = pastedText.split('\n').map(row => row.split('\t'));
    setData(rows);
    onDataChange(rows);
  };

  const handleClear = () => {
    setData([]);
    onDataChange([]);
  };

  return (
    <div className="sample-data-container">
      {data.length === 0 ? (
        <>
          <div className="instructions">
            <p>Copy your Excel table and paste it below. Make sure to select and copy the sample table with as much data variety, including headers.</p>
          </div>
          <textarea
            onPaste={handlePaste}
            placeholder="Paste your Excel table here"
            rows="10"
            className="paste-area"
          />
        </>
      ) : (
        <div className="table-preview">
          <h4>Table Preview:</h4>
          <table>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleClear} className="clear-button">Clear and Paste Again</button>
        </div>
      )}
    </div>
  );
}

export default SampleData;