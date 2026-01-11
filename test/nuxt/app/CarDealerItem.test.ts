import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import CarDealerItem from "../../../app/components/CarDealerItem.vue";
import { carTypes, type CarDealer } from "~~/server/types";

describe("CarDealerItem.vue", () => {
  const mockDealer: CarDealer = {
    carType: carTypes.KIA,
    dealerName: "Autohaus John Doe",
    dealerPhone: "0123 456789",
    dealerPostcode: 63775,
    dealerResidence: "Musterstadt",
    websiteUrl: "www.test@test.de",
  };

  it("renders dealer name", () => {
    const wrapper = mount(CarDealerItem, {
      props: { carDealer: mockDealer },
    });

    expect(wrapper.text()).toContain(mockDealer.dealerName);
  });

  it("renders car type", () => {
    const wrapper = mount(CarDealerItem, {
      props: { carDealer: mockDealer },
    });

    expect(wrapper.text()).toContain(mockDealer.carType);
  });

  it("renders correctly as a list item", () => {
    const wrapper = mount(CarDealerItem, {
      props: { carDealer: mockDealer },
    });

    expect(wrapper.element.tagName).toBe("LI");
    expect(wrapper.find("p").text()).toBe(mockDealer.dealerName);
    expect(wrapper.find("span").text()).toBe(mockDealer.carType);
  });
});
