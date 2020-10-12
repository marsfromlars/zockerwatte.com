export default class TestRun {

  name: string;
  setupCode: Function;
  cleanupCode: Function;
  log = new Log();
  sums = new Summary();

  constructor( name: string, quiet: boolean = false ) {
    this.name = name;
    this.log.setQuiet( quiet );
    this.log.log( "\n============================================" );
    this.log.log( "Run: " + name );
  }

  getLog(): Log {
    return this.log;
  }

  assertTrue( description: string, actual : boolean ) : void {
    if( actual ) {
      this.log.logOk( "OK: " + description );
      this.sums.addSuccess();
    }
    else {
      this.log.logFailure( "Failed: " + description );
      this.sums.addFailure();
    }  
  }
  
  assertEqual( description: string, expected: any, actual : any ) : void {
    if( expected == actual ) {
      this.log.logOk( "OK: " + description );
      this.sums.addSuccess();
    }
    else {
      this.log.logFailure( "Failed: " + description + ", expected: " + expected + ", actual: " + actual );
      this.sums.addFailure();
    }  
  }
  
  assertNull( description: string, value: any ) : void {
    if( value == null ) {
      this.log.logOk( "OK: " + description );
      this.sums.addSuccess();
    }
    else {
      this.log.logFailure( "Failed: " + description + ", expected: null, actual: " + value );
      this.sums.addFailure();
    }  
  }

  assertNotNull( description: string, value: any ) : void {
    if( value != null ) {
      this.log.logOk( "OK: " + description );
      this.sums.addSuccess();
    }
    else {
      this.log.logFailure( "Failed: " + description + ", expected: not null, actual: null" );
      this.sums.addFailure();
    }  
  }

  setup( setupCode: Function ) {
    this.setupCode = setupCode;
  }
  
  cleanup( cleanupCode: Function ) {
    this.cleanupCode = cleanupCode;
  }

  test( testName: string, testCode: Function ) {
    this.sums.countTest();
    this.log.log( "" );
    this.log.log( "--------------------------------------------" );
    this.log.log( "Test: " + testName );
    let tt0 = new Date().getTime();

    try {

      try {
        if( this.setupCode != null ) {
          this.setupCode();
        }
      }
      catch( ex ) {
        this.log.logError( "Error in setup: " + testName + " " + ex );
        this.sums.addError();
        return;
      }

      try {
        testCode();
      }
      catch( ex ) {
        this.log.logError( "Error: " + testName + " " + ex );
        this.sums.addError();
      }

      try {
        if( this.cleanupCode != null ) {
          this.cleanupCode();
        }
      }
      catch( ex ) {
        this.log.log( "Error in cleanup: " + testName + " " + ex );
      }

    }
    finally {
      this.log.log( "Runtime " + (new Date().getTime() - tt0) + " ms" );
    }

  }

  getSummary() {
    return this.sums;
  }

  logSummary() {
    this.sums.log( this.log );
  }

}

class Log {

  quiet = false;
  logSuccesses = false;

  log( line: string ) {
    if( !this.quiet ) {
      console.log( line );
    }
  }

  logOk( line: string ) {
    if( this.logSuccesses ) {
      this.log( "_____ " + line );
    }
  }
  
  logFailure( line: string ) {
    this.log( "##### " + line );
  }

  logError( line: string ) {
    this.log( "%%%%% " + line );
  }

  setQuiet( quiet: boolean ) {
    this.quiet = quiet;
  }

  setLogSuccesses( logSuccesses: boolean ) {
    this.logSuccesses = logSuccesses;
  }

}

class Summary {
  
  testCount = 0;
  successCount = 0;
  failureCount = 0;
  errorCount = 0;
  t0 = new Date().getTime();

  countTest() {
    this.testCount++;
  }

  addSuccess() {
    this.successCount++;
  }

  addFailure() {
    this.failureCount++;
  }

  addError() {
    this.errorCount++;
  }

  allOk() : boolean {
    return this.failureCount + this.errorCount == 0;
  }

  getSuccesses() {
    return this.successCount;
  }

  getFailures() {
    return this.failureCount;
  }

  getErrors() {
    return this.errorCount;
  }

  noTests(): boolean {
    return this.successCount + this.failureCount + this.errorCount == 0;
  }

  getTestCount(): number {
    return this.testCount;
  }

  log( log: Log ) {
    
    log.log( "" );
    log.log( "--------------------------------------------" );
    log.log( "Summary" );
    log.log( "" );
    log.log( "Sucessful assertions : " + this.successCount );
    log.log( "Failed assertions    : " + this.failureCount );
    log.log( "Errors               : " + this.errorCount );
    log.log( "--------------------------------------------" );
    log.log( "Total test           : " + this.testCount );
    log.log( "Total assertions     : " + ( this.successCount + this.failureCount + this.errorCount ) );
    log.log( "Total runtime        : " + ( new Date().getTime() - this.t0 ) + " ms" );
    log.log( "" );

    if( this.noTests() ) {
      log.log( "FAILED: No tests found." );
    }
    else if( this.allOk() ) {
      log.log( "SUCCESS: All OK" );
    }
    else {
      log.log( "FAILED: " + ( this.failureCount + this.errorCount ) + " Problem(s)." );
    }

    log.log( "============================================\n" );

  }

}
