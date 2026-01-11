import { describe, it, expect, vi, beforeEach } from "vitest";
import * as XLSX from "xlsx";
import { exportToExcel } from "../../../app/utils";

vi.mock("xlsx", () => {
  return {
    utils: {
      json_to_sheet: vi.fn(),
      book_new: vi.fn(),
      book_append_sheet: vi.fn(),
    },
    writeFile: vi.fn(),
  };
});

describe("exportToExcel", () => {
  const mockWorksheet = { mock: "worksheet" };
  const mockWorkbook = { mock: "workbook" };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(XLSX.utils.json_to_sheet).mockReturnValue(mockWorksheet as any);
    vi.mocked(XLSX.utils.book_new).mockReturnValue(mockWorkbook as any);
  });

  it("creates a worksheet from data", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }];

    exportToExcel(data);

    expect(XLSX.utils.book_new).toHaveBeenCalled();
    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith(data);
  });

  it("appends the worksheet to the workbook with the default sheet name", () => {
    exportToExcel([]);

    expect(XLSX.utils.book_append_sheet).toHaveBeenCalledWith(
      mockWorkbook,
      mockWorksheet,
      "Sheet1"
    );
  });

  it("writes the workbook to a file with the default filename", () => {
    exportToExcel([]);

    expect(XLSX.writeFile).toHaveBeenCalledWith(mockWorkbook, "export.xlsx");
  });

  it("uses custom file name and sheet name when provided", () => {
    exportToExcel([{ id: 1 }], "custom.xlsx", "Users");

    expect(XLSX.utils.book_append_sheet).toHaveBeenCalledWith(
      mockWorkbook,
      mockWorksheet,
      "Users"
    );

    expect(XLSX.writeFile).toHaveBeenCalledWith(mockWorkbook, "custom.xlsx");
  });
});
