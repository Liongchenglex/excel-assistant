import React, { useState, useRef, useEffect } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import Handsontable from 'handsontable'
import { registerAllModules } from 'handsontable/registry';
// register Handsontable's modules
registerAllModules();

function SampleDataTable({ initialRows = 1, initialCols = 1 }) {
    const [sampleData, setSampleData] = useState(
        Array.from({ length: initialRows }, () => Array.from({ length: initialCols }, () => ""))
    );
    const hotTableComponent = useRef(null);

    useEffect(() => {
        if (hotTableComponent.current) {
            const hotInstance = hotTableComponent.current.hotInstance;
            hotInstance.addHook('afterPaste', (data) => {
                if (Array.isArray(data[0]) && typeof data[0][0] === 'string') { 
                    hotInstance.updateSettings({
                        data: data.slice(1), // Remove the first row (headers)
                        colHeaders: data[0] // Set the first row as headers
                    });
                } else {
                    setSampleData(data);
                }
            });

            hotInstance.addHook('afterRenderer', (td, row, col, prop, value, cellProperties) => {
                if (value === null || value === undefined || value === "") {
                    td.style.color = '#999';
                    td.style.fontStyle = 'italic';
                    td.textContent = 'Please paste your sample data here';
                }
            });

            hotInstance.render(); 
        }
    }, []);

    const handleSampleDataChange = (changes, source) => {
        if (source === 'loadData') return; 
        setSampleData(changes);
    };

    return (
        <div>
            <h2>Sample Data</h2> 
            <HotTable
                ref={hotTableComponent}
                data={sampleData}
                colHeaders={true} 
                rowHeaders={true}
                width="800"
                height="300"
                licenseKey="non-commercial-and-evaluation"
                contextMenu={true}
                manualRowResize={true}
                manualColumnResize={true}
                onChange={handleSampleDataChange}
            />
        </div>
    );
}

export default SampleDataTable;
