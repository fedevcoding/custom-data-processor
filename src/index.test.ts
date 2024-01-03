import { describe, expect, it, vi } from "vitest";
import { DataProcessor } from ".";

describe("Test data processor", () => {
  const dp = new DataProcessor({
    dataCallback: () => {},
    dataThreshold: 2,
    timeThreshold: 1000,
  });

  it("should trigger callback (from data)", () => {
    const dp = new DataProcessor({
      dataCallback: () => {},
      dataThreshold: 2,
      timeThreshold: 1000,
    });
    const spy = vi.spyOn(dp, "dataCallback");

    dp.addData(1);
    dp.addData(1);
    expect(spy).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it("should trigger callback (from time)", async () => {
    const dp = new DataProcessor({
      dataCallback: () => {},
      dataThreshold: 2,
      timeThreshold: 1000,
    });
    const spy = vi.spyOn(dp, "dataCallback");
    dp.addData(1);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("should NOT trigger callback (from time)", async () => {
    const dp = new DataProcessor({
      dataCallback: () => {},
      dataThreshold: 2,
      timeThreshold: 1000,
    });
    const spy = vi.spyOn(dp, "dataCallback");
    dp.addData(1);
    await new Promise((resolve) => setTimeout(resolve, 900));
    expect(spy).toHaveBeenCalledTimes(0);
    spy.mockRestore();
  });

  it("should NOT trigger callback because empty", async () => {
    const dp = new DataProcessor({
      dataCallback: () => {},
      dataThreshold: 2,
      timeThreshold: 1000,
    });
    const spy = vi.spyOn(dp, "dataCallback");
    await new Promise((resolve) => setTimeout(resolve, 1100));
    expect(spy).toHaveBeenCalledTimes(0);
    spy.mockRestore();
  });

  it("should match data type", () => {
    expect(typeof dp.dataCallback).toBe("function");
    expect(typeof dp.dataThreshold).toBe("number");
    expect(typeof dp.timeThreshold).toBe("number");
  });
});
