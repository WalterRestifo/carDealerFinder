import { mount, VueWrapper } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import CarDealerItem from "../../../app/components/CarDealerItem.vue";
import { mockDealer } from "../../mocks";

describe("CarDealerItem.vue", () => {
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
    expect(
      wrapper
        .findAll("span")
        .find((span) => span.text() === mockDealer.dealerName)
        ?.exists()
    ).toBe(true);

    console.log(wrapper.html());

    expect(
      wrapper
        .findAll("span")
        .find((span) => span.text() === "- " + mockDealer.carType)
        ?.exists()
    ).toBe(true);
  });
});
