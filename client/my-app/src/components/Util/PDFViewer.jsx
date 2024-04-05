import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Required to set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = (props) => {
  const [numPages, setNumPages] = useState(null);

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    console.log(`Number of pages: ${numPages}`);
  };

  return (
    <div>
      <Document
        file={props.path}
        onLoadSuccess={handleLoadSuccess}
        onLoadError={(error) => console.error('Error loading PDF:', error,props.path)}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </div>
  );
};

export default PDFViewer;
