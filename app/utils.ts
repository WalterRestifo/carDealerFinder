import * as XLSX from "xlsx";

/**
 *
 * @param data The data that needs to be exported
 * @param fileName Optional file name
 * @param sheetName Optional sheet name
 */
export function exportToExcel<T>(
  data: T[],
  fileName = "export.xlsx",
  sheetName = "Sheet1"
) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
}
