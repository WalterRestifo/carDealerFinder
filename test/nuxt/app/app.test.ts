import { describe, it, vi, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import App from "~/app.vue";
import SearchBar from "~/components/SearchBar.vue";
import CarDealerItem from "~/components/CarDealerItem.vue";
import * as utils from "~/utils";

vi.spyOn(utils, "exportToExcel").mockImplementation(vi.fn());
vi.stubGlobal("$fetch", vi.fn());

const mockCarDealers = [{ dealerName: "Dealer A" }, { dealerName: "Dealer B" }];

describe("App.vue", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(App);
    vi.clearAllMocks();
  });

  it("renders SearchBar and no CarDealerItem initially", () => {
    expect(wrapper.findComponent(SearchBar).exists()).toBe(true);
    expect(wrapper.findAllComponents(CarDealerItem).length).toBe(0);
    expect(
      wrapper
        .findAll("button")
        .find((btn: VueWrapper) => btn.text() === "Download Excel File")
        ?.exists()
    ).not.toBe(true);
  });

  it("updates carDealerList when updateData is emitted from SearchBar", async () => {
    wrapper.findComponent(SearchBar).vm.$emit("update:data", mockCarDealers);
    await wrapper.vm.$nextTick();

    const items = wrapper.findAllComponents(CarDealerItem);
    expect(items.length).toBe(2);
    expect(items[0].props("carDealer")).toEqual(mockCarDealers[0]);
    expect(items[1].props("carDealer")).toEqual(mockCarDealers[1]);

    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("calls exportToExcel when download button is clicked", async () => {
    wrapper.vm.updateData(mockCarDealers);
    await wrapper.vm.$nextTick();

    await wrapper
      .findAll("button")
      .find((btn: VueWrapper) => btn.text() === "Download Excel File")
      .trigger("click");
    expect(utils.exportToExcel).toHaveBeenCalledWith(mockCarDealers);
  });
});
