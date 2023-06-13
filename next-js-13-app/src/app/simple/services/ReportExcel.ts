import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import itemDTO from '../shared/constants';

const simpleReportCSV = (rows: itemDTO[], getHead: Function) => {
  const date = Date().split(' ');
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

  const filename = `report_${dateStr}.xlsx`;

  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  const tableRows: object[] = [];

  // for each ticket pass all its data into an array
  rows.forEach((row: itemDTO) => {
    const itemData = {
      'Item Name': row.name,
      Code: row.code,
      Head: getHead(row.head),
      Status: Boolean(row.status) === true ? 'Active' : 'In-active',
    };
    // push each tickcet's info into a row
    tableRows.push(itemData);
  });

  const ws = XLSX.utils.json_to_sheet(tableRows);
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, filename);
};

export default simpleReportCSV;
