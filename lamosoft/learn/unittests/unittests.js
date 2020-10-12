import { TestRun } from "./tsunit.js";
testRun.test( "test initialization", () => {
  testRun.assertTrue( "true", true );
});
testRun.logSummary();
