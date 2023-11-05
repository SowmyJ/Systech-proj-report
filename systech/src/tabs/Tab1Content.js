// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';

// function DataExtraction() {
//   const [data, setData] = useState(null);
//   const [extractedData, setExtractedData] = useState(null);

//   // Define the 7 sentences
//   const sentences = [
//     'Release Details :',
//     'Highlights:',
//     'Feature Status :',
//     'Risk Tracker:',
//     'Defect Trend :',
//     'QA Test Execution Status :',
//   ];

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         const binaryString = e.target.result;
//         const workbook = XLSX.read(binaryString, { type: 'binary' });
//         const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet

//         const worksheet = workbook.Sheets[sheetName];
//         const tableData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//         setData(tableData);
//       };

//       reader.readAsBinaryString(file);
//     }
//   };

//   const extractDataBetweenSentences = () => {
//     if (data && sentences.every((sentence) => sentence.trim() !== '')) {
//       const extractedDataArray = [];
//       let isExtracting = false;

//       for (const row of data) {
//         for (const sentence of sentences) {
//           if (row.some((cell) => cell.includes(sentence))) {
//             isExtracting = true;
//             break;
//           }
//         }

//         if (isExtracting) {
//           extractedDataArray.push(row);
//           console.log(extractedDataArray)
          
//         }

//         // Stop extracting when all 7 sentences have been found.
//         if (extractedDataArray.length >=8) {
//           break;
//         }
//       }

//       setExtractedData(extractedDataArray);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} accept=".xlsx" />
//       <button onClick={extractDataBetweenSentences}>Extract Data/Table</button>

//       {extractedData && (
//         <table>
//           <thead>
//             <tr>
//               {extractedData[0].map((header, index) => (
//                 <th key={index}>{header}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {extractedData.slice(1).map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {row.map((cell, cellIndex) => (
//                   <td key={cellIndex}>{cell}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default DataExtraction;


import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './Tab.css';

function Tab1Content() {
  const [data, setData] = useState(null);
  const [extractedData, setExtractedData] = useState(null);

  // Define the 7 sentences
  const sentences = [
    'Release Details :',
    'Highlights:',
    'Feature Status :',
    'Risk Tracker:',
    'Defect Trend :',
    'QA Test Execution Status :',
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const binaryString = e.target.result;
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet

        const worksheet = workbook.Sheets[sheetName];
        const tableData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        setData(tableData);
      };

      reader.readAsBinaryString(file);
    }
  };

  const extractDataBetweenSentences = () => {
    if (data && sentences.every((sentence) => sentence.trim() !== '')) {
      const extractedDataArray = [];
      let isExtracting = false;
      let startIndex = -1;

      for (const row of data) {
        for (let i = 0; i < sentences.length - 1; i++) {
          if (
            row.some((cell) => typeof cell === 'string' && cell.includes(sentences[i]) && !isExtracting)
          ) {
            isExtracting = true;
            startIndex = i;
            extractedDataArray.push([]);
            break;
          } else if (isExtracting && i === startIndex + 1) {
            extractedDataArray[startIndex].push(row);
          }
        }
      }

      setExtractedData(extractedDataArray);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept=".xlsx" />
      <button onClick={extractDataBetweenSentences}>Extract Data/Table</button>

      {extractedData && (
        <div>
          {extractedData.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <table>
                <thead>
                  <tr>
                    {section[0].map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <br></br>
            </div>
          ))}
          <br></br>
        </div>
      )}
    </div>
  );
}

export default Tab1Content;



