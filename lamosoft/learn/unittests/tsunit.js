"use strict";
exports.__esModule = true;
var TestRun = /** @class */ (function () {
    function TestRun(name, quiet) {
        if (quiet === void 0) { quiet = false; }
        this.log = new Log();
        this.sums = new Summary();
        this.name = name;
        this.log.setQuiet(quiet);
        this.log.log("\n============================================");
        this.log.log("Run: " + name);
    }
    TestRun.prototype.getLog = function () {
        return this.log;
    };
    TestRun.prototype.assertTrue = function (description, actual) {
        if (actual) {
            this.log.logOk("OK: " + description);
            this.sums.addSuccess();
        }
        else {
            this.log.logFailure("Failed: " + description);
            this.sums.addFailure();
        }
    };
    TestRun.prototype.assertEqual = function (description, expected, actual) {
        if (expected == actual) {
            this.log.logOk("OK: " + description);
            this.sums.addSuccess();
        }
        else {
            this.log.logFailure("Failed: " + description + ", expected: " + expected + ", actual: " + actual);
            this.sums.addFailure();
        }
    };
    TestRun.prototype.assertNull = function (description, value) {
        if (value == null) {
            this.log.logOk("OK: " + description);
            this.sums.addSuccess();
        }
        else {
            this.log.logFailure("Failed: " + description + ", expected: null, actual: " + value);
            this.sums.addFailure();
        }
    };
    TestRun.prototype.assertNotNull = function (description, value) {
        if (value != null) {
            this.log.logOk("OK: " + description);
            this.sums.addSuccess();
        }
        else {
            this.log.logFailure("Failed: " + description + ", expected: not null, actual: null");
            this.sums.addFailure();
        }
    };
    TestRun.prototype.setup = function (setupCode) {
        this.setupCode = setupCode;
    };
    TestRun.prototype.cleanup = function (cleanupCode) {
        this.cleanupCode = cleanupCode;
    };
    TestRun.prototype.test = function (testName, testCode) {
        this.sums.countTest();
        this.log.log("");
        this.log.log("--------------------------------------------");
        this.log.log("Test: " + testName);
        var tt0 = new Date().getTime();
        try {
            try {
                if (this.setupCode != null) {
                    this.setupCode();
                }
            }
            catch (ex) {
                this.log.logError("Error in setup: " + testName + " " + ex);
                this.sums.addError();
                return;
            }
            try {
                testCode();
            }
            catch (ex) {
                this.log.logError("Error: " + testName + " " + ex);
                this.sums.addError();
            }
            try {
                if (this.cleanupCode != null) {
                    this.cleanupCode();
                }
            }
            catch (ex) {
                this.log.log("Error in cleanup: " + testName + " " + ex);
            }
        }
        finally {
            this.log.log("Runtime " + (new Date().getTime() - tt0) + " ms");
        }
    };
    TestRun.prototype.getSummary = function () {
        return this.sums;
    };
    TestRun.prototype.logSummary = function () {
        this.sums.log(this.log);
    };
    return TestRun;
}());
exports["default"] = TestRun;
var Log = /** @class */ (function () {
    function Log() {
        this.quiet = false;
        this.logSuccesses = false;
    }
    Log.prototype.log = function (line) {
        if (!this.quiet) {
            console.log(line);
        }
    };
    Log.prototype.logOk = function (line) {
        if (this.logSuccesses) {
            this.log("_____ " + line);
        }
    };
    Log.prototype.logFailure = function (line) {
        this.log("##### " + line);
    };
    Log.prototype.logError = function (line) {
        this.log("%%%%% " + line);
    };
    Log.prototype.setQuiet = function (quiet) {
        this.quiet = quiet;
    };
    Log.prototype.setLogSuccesses = function (logSuccesses) {
        this.logSuccesses = logSuccesses;
    };
    return Log;
}());
var Summary = /** @class */ (function () {
    function Summary() {
        this.testCount = 0;
        this.successCount = 0;
        this.failureCount = 0;
        this.errorCount = 0;
        this.t0 = new Date().getTime();
    }
    Summary.prototype.countTest = function () {
        this.testCount++;
    };
    Summary.prototype.addSuccess = function () {
        this.successCount++;
    };
    Summary.prototype.addFailure = function () {
        this.failureCount++;
    };
    Summary.prototype.addError = function () {
        this.errorCount++;
    };
    Summary.prototype.allOk = function () {
        return this.failureCount + this.errorCount == 0;
    };
    Summary.prototype.getSuccesses = function () {
        return this.successCount;
    };
    Summary.prototype.getFailures = function () {
        return this.failureCount;
    };
    Summary.prototype.getErrors = function () {
        return this.errorCount;
    };
    Summary.prototype.noTests = function () {
        return this.successCount + this.failureCount + this.errorCount == 0;
    };
    Summary.prototype.getTestCount = function () {
        return this.testCount;
    };
    Summary.prototype.log = function (log) {
        log.log("");
        log.log("--------------------------------------------");
        log.log("Summary");
        log.log("");
        log.log("Sucessful assertions : " + this.successCount);
        log.log("Failed assertions    : " + this.failureCount);
        log.log("Errors               : " + this.errorCount);
        log.log("--------------------------------------------");
        log.log("Total test           : " + this.testCount);
        log.log("Total assertions     : " + (this.successCount + this.failureCount + this.errorCount));
        log.log("Total runtime        : " + (new Date().getTime() - this.t0) + " ms");
        log.log("");
        if (this.noTests()) {
            log.log("FAILED: No tests found.");
        }
        else if (this.allOk()) {
            log.log("SUCCESS: All OK");
        }
        else {
            log.log("FAILED: " + (this.failureCount + this.errorCount) + " Problem(s).");
        }
        log.log("============================================\n");
    };
    return Summary;
}());
