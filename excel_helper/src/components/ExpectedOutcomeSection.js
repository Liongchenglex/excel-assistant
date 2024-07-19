import React from 'react';
import SampleData from './SampleData';

// function ExpectedOutcomeSection({ expectedOutcome, setExpectedOutcome }) {
//   const handleExpectedOutcomeChange = (newData) => {
//     setExpectedOutcome({ data: newData });
//   };

//   return (
//     <div className="table-container">
//       <h2>Expected Outcome</h2>
//       <SampleData onDataChange={handleExpectedOutcomeChange} />
//     </div>
//   );
// }


function ExpectedOutcomeSection({ expectedOutcome, onDataChange }) {
  return (
    <div className="table-container">
      <h2>Expected Outcome</h2>
      <SampleData 
        data={expectedOutcome.data}
        onDataChange={onDataChange}
      />
    </div>
  );
}
export default ExpectedOutcomeSection;