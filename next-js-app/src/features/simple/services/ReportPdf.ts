import jsPDF from 'jspdf';
import 'jspdf-autotable';

import itemDTO from '../shared/data';

// define a generatePDF function that accepts a tickets argument
const simpleReportPdf = (rows: itemDTO[], getHead: Function) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ['Item', 'Head', 'Code', 'Status'];
  // define an empty array of rows
  const tableRows: object[] = [];

  // for each ticket pass all its data into an array
  rows.forEach((row: itemDTO) => {
    const itemData = [
      row.name,
      row.code,
      getHead(row.head),
      Boolean(row.status) === true ? 'Active' : 'In-active',
    ];
    // push each tickcet's info into a row
    tableRows.push(itemData);
  });

  // startY is basically margin-top
  (doc as any).autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(' ');
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.text('Showing all items', 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default simpleReportPdf;
