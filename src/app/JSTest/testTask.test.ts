import { runTest, sleep } from "./testTask";

test("test run", () => {
  runTest();
  expect(1).toBe(1);
});
