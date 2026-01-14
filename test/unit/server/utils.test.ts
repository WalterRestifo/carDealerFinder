import { describe, it, expect } from "vitest";
import {
  serializeKiaDealerData,
  serializeSeatData,
  serializeOpelData,
  noUrl,
} from "../../../server/utils";
import { carTypes } from "../../../server/types";

describe("serializeKiaDealerData", () => {
  it("serializes Kia dealer data correctly", () => {
    const input = [
      {
        dealerName: "Kia Center",
        dealerPhone: "123456",
        dealerPostcode: 10115,
        dealerResidence: "Berlin",
        websiteUrl: "https://kia.example",
      },
    ];

    const result = serializeKiaDealerData(input);

    expect(result).toEqual([
      {
        carType: carTypes.KIA,
        dealerName: "Kia Center",
        dealerPhone: "123456",
        dealerPostcode: 10115,
        dealerResidence: "berlin",
        websiteUrl: "https://kia.example",
      },
    ]);
  });

  it("sets websiteUrl to noUrl string when missing", () => {
    const input = [
      {
        dealerName: "Kia Center",
        dealerPhone: "123456",
        dealerPostcode: 10115,
        dealerResidence: "Berlin",
        websiteUrl: "",
      },
    ];

    const result = serializeKiaDealerData(input);

    expect(result[0].websiteUrl).toBe(noUrl);
  });
});

describe("serializeSeatData", () => {
  it("serializes Seat dealer data correctly", () => {
    const input = [
      {
        NAME1: "Seat Autohaus",
        TELEFON: "987654",
        PLZ: 80331,
        ORT: "Munich",
        URL: "https://seat.example",
      },
    ];

    const result = serializeSeatData(input);

    expect(result).toEqual([
      {
        carType: carTypes.SEAT,
        dealerName: "Seat Autohaus",
        dealerPhone: "987654",
        dealerPostcode: 80331,
        dealerResidence: "munich",
        websiteUrl: "https://seat.example",
      },
    ]);
  });

  it("sets websiteUrl to no url string when URL is missing", () => {
    const input = [
      {
        NAME1: "Seat Autohaus",
        TELEFON: "987654",
        PLZ: 80331,
        ORT: "Munich",
        URL: "",
      },
    ];

    const result = serializeSeatData(input);

    expect(result[0].websiteUrl).toBe(noUrl);
  });
});

describe("serializeOpelData", () => {
  it("serializes Opel dealer data correctly", () => {
    const input = [
      {
        dealerName: "Opel Händler",
        generalContact: {
          phone1: "555000",
        },
        address: {
          postalCode: 50667,
          cityName: "Cologne",
        },
        dealerUrl: "https://opel.example",
      },
    ];

    const result = serializeOpelData(input);

    expect(result).toEqual([
      {
        carType: carTypes.OPEL,
        dealerName: "Opel Händler",
        dealerPhone: "555000",
        dealerPostcode: 50667,
        dealerResidence: "cologne",
        websiteUrl: "https://opel.example",
      },
    ]);
  });

  it("sets websiteUrl to noUrl string when dealerUrl is missing", () => {
    const input = [
      {
        dealerName: "Opel Händler",
        generalContact: {
          phone1: "555000",
        },
        address: {
          postalCode: 50667,
          cityName: "Cologne",
        },
        dealerUrl: "",
      },
    ];

    const result = serializeOpelData(input);

    expect(result[0].websiteUrl).toBe(noUrl);
  });
});
