import React, { useState, useRef, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import Handsontable from 'handsontable';
import { registerAllModules } from 'handsontable/registry';

registerAllModules();

function DesiredOutcomeTable({ initialRows = 1, initialCols = 1 }) {
  const [desiredOutcome, setDesiredOutcome] = useState(
    Array.from({ length: initialRows }, () => Array.from({ length: initialCols }, () => ""))
  );
  const hotTableComponent = useRef(null);

  useEffect(() => {
    if (hotTableComponent.current) {
      const hotInstance = hotTableComponent.current.hotInstance;

      hotInstance.addHook('afterPaste', (data) => {
        if (Array.isArray(data[0]) && typeof data[0][0] === 'string') {
          // If first row is string (headers), update headers and remaining data
          hotInstance.updateSettings({
            data: data.slice(1),
            colHeaders: data[0]
          });
        } else {
          // Otherwise, just update the data
          const pastedRows = data.length;
          const pastedCols = data[0].length;

          const newData = Array.from({ length: pastedRows }, () =>
            Array.from({ length: pastedCols }, () => "")
          );
          
          for (let i = 0; i < pastedRows; i++) {
            for (let j = 0; j < pastedCols; j++) {
              newData[i][j] = data[i][j] || "";
            }
          }
          setDesiredOutcome(newData);
        }
      });

      hotInstance.addHook('afterRenderer', (td, row, col, prop, value, cellProperties) => {
        if (value === null || value === undefined || value === "") {
          td.style.color = '#999';
          td.style.fontStyle = 'italic';
          td.textContent = 'Please paste your desired outcome here';
        }
      });

      hotInstance.render(); 
    }
  }, []);

  const handleDesiredOutcomeChange = (changes, source) => {
    if (source === 'loadData') return; 
    setDesiredOutcome(changes);
  };

  return (
    <div>
      <h2>Desired Outcome</h2>
      <HotTable
        ref={hotTableComponent}
        data={desiredOutcome}
        colHeaders={true}
        rowHeaders={true}
        width="600"
        height="300"
        licenseKey="non-commercial-and-evaluation"
        contextMenu={true}
        manualRowResize={true}
        manualColumnResize={true}
        onChange={handleDesiredOutcomeChange}
      />
    </div>
  );
}

export default DesiredOutcomeTable;
