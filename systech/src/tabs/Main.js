import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function DataExtraction() {
  const [data, setData] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const sentenceToSearch = 'Release Details :';

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

  const extractDataUntilSentence = () => {
    if (data && sentenceToSearch.trim() !== '') {
      const extractedDataArray = [];
      let isExtracting = true;

      for (const row of data) {
        if (row.some((cell) => typeof cell === 'string' && cell.includes(sentenceToSearch))) {
          isExtracting = false;
          break;
        }

        if (isExtracting) {
          extractedDataArray.push(row);
        }
      }

      setExtractedData(extractedDataArray);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept=".xlsx" />
      <button onClick={extractDataUntilSentence}>Extract Data/Table Until Sentence</button>

      {extractedData && (
        <table>
          <thead>
            <tr>
              {extractedData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {extractedData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataExtraction;
