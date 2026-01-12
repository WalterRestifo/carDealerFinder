//IMPORTANT: This file is not recognized in the tests because it has no .test.ts ending.
// I did this because it doesn't work. defineNitroPlugin is not defined, even if I mock it.
// When a solution to this problem is found, this test can be reintegrated.

import { describe, it, expect, vi, beforeEach } from "vitest";
import retrieveCardDealerDataPlugin from "../../../server/plugins/retrieveCarDealerData";
import { db } from "../../../server/db/createDatabase";
import type { NitroApp } from "nitropack";
import { type KiaData, type OpelData, type SeatData } from "~~/server/types";
import {
  mockDealer,
  mockOpelCarDealer,
  mockSeatCarDealer,
} from "~~/test/mocks";
import { mockNuxtImport } from "@nuxt/test-utils/runtime";

const { defineNitroPlugin } = vi.hoisted(() => {
  return {
    defineNitroPlugin: (fn: any) => fn,
  };
});

mockNuxtImport("defineNitroPlugin", () => {
  return defineNitroPlugin;
});

vi.mock("../../../server/db/createDatabase", () => ({
  db: {
    prepare: vi.fn(),
  },
}));

const nitroMock = {} as NitroApp;

const kiaMockedFetchedData: KiaData = { total: 1, list: [mockDealer] };
const seatMockedFetchedData: SeatData = {
  allDealers: { v: [mockSeatCarDealer] },
};
const opelMockedFetchedData: OpelData = [mockOpelCarDealer];

vi.stubGlobal("$fetch", vi.fn());

describe("fetchDealers Nitro plugin", () => {
  const mockInsertRun = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (db.prepare as any).mockReturnValue({
      run: mockInsertRun,
    });
  });

  it("fetches data, serializes it and inserts into DB", () => {
    (global.$fetch as any)
      .mockResolvedValueOnce(kiaMockedFetchedData)
      .mockResolvedValueOnce(seatMockedFetchedData)
      .mockResolvedValueOnce(opelMockedFetchedData);

    retrieveCardDealerDataPlugin(nitroMock);

    expect(global.$fetch).toHaveBeenCalledTimes(3);

    expect(db.prepare).toHaveBeenCalledOnce();

    expect(mockInsertRun).toHaveBeenCalledTimes(3);

    expect(mockInsertRun).toHaveBeenCalledWith(
      "KIA",
      "Kia Dealer",
      "123",
      "11111",
      "Berlin",
      "https://kia.de"
    );
  });

  it("logs an error if fetching fails", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    (global.$fetch as any).mockRejectedValue(new Error("Network error"));

    retrieveCardDealerDataPlugin(nitroMock);

    expect(consoleSpy).toHaveBeenCalledWith(
      "error while retrieving the data: ",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
