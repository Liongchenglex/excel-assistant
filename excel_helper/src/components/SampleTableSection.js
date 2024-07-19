import React from 'react';
import SampleData from './SampleData';
import './SampleTableSection.css';

function SampleTableSection({ sampleTables, setSampleTables, onDataChange }) {
  const addSampleTable = () => {
    if (sampleTables.length < 4) {
      setSampleTables([...sampleTables, { id: sampleTables.length + 1, data: [] }]);
    }
  };

  const removeSampleTable = () => {
    if (sampleTables.length > 1) {
      setSampleTables(sampleTables.slice(0, -1));
    }
  };

  return (
    <div className="table-container">
      <h2>Sample Tables from Excel</h2>
      {sampleTables.map((table, index) => (
        <div key={table.id} className="sample-table">
          <h3>Sample Table {index + 1}</h3>
          <SampleData 
            data={table.data}
            onDataChange={(newData) => onDataChange(table.id, newData)}
          />
        </div>
      ))}
      <div className="table-controls">
        {sampleTables.length < 4 && (
          <button onClick={addSampleTable} className="add-table-button">
            Add Sample Table
          </button>
        )}
        {sampleTables.length > 1 && (
          <button onClick={removeSampleTable} className="remove-table-button">
            Remove Sample Table
          </button>
        )}
      </div>
    </div>
  );
}

export default SampleTableSection;