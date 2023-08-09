const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
const http = require('@winglang/sdk').http;
const util = require('@winglang/sdk').util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class JsonChecker extends $stdlib.std.Resource {
      constructor(scope, id, options) {
        super(scope, id);
        this.url = options.url;
        this.jsonQuery = options.jsonQuery;
        this.expectedSuccess = options.expectedSuccess;
        this.expectedFailure = options.expectedFailure;
        this.name = options.name;
        this.statusBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        this._addInflightOps("query", "check", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.JsonChecker.js")({
            $http_Util: ${context._lift(http.Util)},
            $std_Json: ${context._lift(std.Json)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const JsonCheckerClient = ${JsonChecker._toInflightType(this).text};
            const client = new JsonCheckerClient({
              $this_expectedFailure: ${this._lift(this.expectedFailure)},
              $this_expectedSuccess: ${this._lift(this.expectedSuccess)},
              $this_jsonQuery: ${this._lift(this.jsonQuery)},
              $this_name: ${this._lift(this.name)},
              $this_statusBucket: ${this._lift(this.statusBucket)},
              $this_url: ${this._lift(this.url)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("check")) {
          JsonChecker._registerBindObject(this.expectedFailure, host, []);
          JsonChecker._registerBindObject(this.expectedSuccess, host, []);
          JsonChecker._registerBindObject(this.jsonQuery, host, ["tryAsStr"]);
          JsonChecker._registerBindObject(this.name, host, []);
          JsonChecker._registerBindObject(this.statusBucket, host, ["put", "tryGet"]);
          JsonChecker._registerBindObject(this.url, host, ["body"]);
        }
        super._registerBind(host, ops);
      }
    }
    if (((util.Util.env("WING_IS_TEST")) !== "true")) {
      const mainBuildCheck = new JsonChecker(this,"JsonChecker",{ url: "https://api.github.com/repos/winglang/wing/actions/workflows/build.yml/runs?branch=main&per_page=1&page=1&event=push&exclude_pull_requests=true", jsonQuery: ".workflow_runs[0].conclusion", expectedSuccess: "success", expectedFailure: "failure", name: "main build" });
      const schedule = this.node.root.newAbstract("@winglang/sdk.cloud.Schedule",this,"cloud.Schedule",{ rate: (std.Duration.fromSeconds(60)) });
      class $Closure1 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this.display.hidden = true;
          this._addInflightOps("handle", "$inflight_init");
        }
        static _toInflightType(context) {
          return $stdlib.core.NodeJsCode.fromInline(`
            require("./inflight.$Closure1.js")({
              $mainBuildCheck: ${context._lift(mainBuildCheck)},
            })
          `);
        }
        _toInflight() {
          return $stdlib.core.NodeJsCode.fromInline(`
            (await (async () => {
              const $Closure1Client = ${$Closure1._toInflightType(this).text};
              const client = new $Closure1Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `);
        }
        _registerBind(host, ops) {
          if (ops.includes("handle")) {
            $Closure1._registerBindObject(mainBuildCheck, host, ["check"]);
          }
          super._registerBind(host, ops);
        }
      }
      (schedule.onTick(new $Closure1(this,"$Closure1")));
    }
    else {
      class MockEndpoint extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this.api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
          this.bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
          const __parent_this_2 = this;
          class $Closure2 extends $stdlib.std.Resource {
            constructor(scope, id, ) {
              super(scope, id);
              this.display.hidden = true;
              this._addInflightOps("handle", "$inflight_init");
            }
            static _toInflightType(context) {
              return $stdlib.core.NodeJsCode.fromInline(`
                require("./inflight.$Closure2.js")({
                  $__parent_this_2_bucket: ${context._lift(__parent_this_2.bucket)},
                  $std_Json: ${context._lift(std.Json)},
                })
              `);
            }
            _toInflight() {
              return $stdlib.core.NodeJsCode.fromInline(`
                (await (async () => {
                  const $Closure2Client = ${$Closure2._toInflightType(this).text};
                  const client = new $Closure2Client({
                  });
                  if (client.$inflight_init) { await client.$inflight_init(); }
                  return client;
                })())
              `);
            }
            _registerBind(host, ops) {
              if (ops.includes("handle")) {
                $Closure2._registerBindObject(__parent_this_2.bucket, host, ["get"]);
              }
              super._registerBind(host, ops);
            }
          }
          (this.api.get("/",new $Closure2(this,"$Closure2")));
          this._addInflightOps("setSuccess", "setFailure", "$inflight_init");
        }
        static _toInflightType(context) {
          return $stdlib.core.NodeJsCode.fromInline(`
            require("./inflight.MockEndpoint.js")({
            })
          `);
        }
        _toInflight() {
          return $stdlib.core.NodeJsCode.fromInline(`
            (await (async () => {
              const MockEndpointClient = ${MockEndpoint._toInflightType(this).text};
              const client = new MockEndpointClient({
                $this_bucket: ${this._lift(this.bucket)},
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `);
        }
        _registerBind(host, ops) {
          if (ops.includes("setFailure")) {
            MockEndpoint._registerBindObject(this.bucket, host, ["put"]);
          }
          if (ops.includes("setSuccess")) {
            MockEndpoint._registerBindObject(this.bucket, host, ["put"]);
          }
          super._registerBind(host, ops);
        }
      }
      const mock = new MockEndpoint(this,"MockEndpoint");
      const testCheck = new JsonChecker(this,"JsonChecker",{ url: mock.api.url, jsonQuery: ".", expectedSuccess: "success", expectedFailure: "failure", name: "test" });
      class $Closure3 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this.display.hidden = true;
          this._addInflightOps("handle", "$inflight_init");
        }
        static _toInflightType(context) {
          return $stdlib.core.NodeJsCode.fromInline(`
            require("./inflight.$Closure3.js")({
              $mock: ${context._lift(mock)},
              $testCheck: ${context._lift(testCheck)},
            })
          `);
        }
        _toInflight() {
          return $stdlib.core.NodeJsCode.fromInline(`
            (await (async () => {
              const $Closure3Client = ${$Closure3._toInflightType(this).text};
              const client = new $Closure3Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `);
        }
        _registerBind(host, ops) {
          if (ops.includes("handle")) {
            $Closure3._registerBindObject(mock, host, ["setSuccess"]);
            $Closure3._registerBindObject(testCheck, host, ["check"]);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:multiple success does not trigger change",new $Closure3(this,"$Closure3"));
      class $Closure4 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this.display.hidden = true;
          this._addInflightOps("handle", "$inflight_init");
        }
        static _toInflightType(context) {
          return $stdlib.core.NodeJsCode.fromInline(`
            require("./inflight.$Closure4.js")({
              $mock: ${context._lift(mock)},
              $testCheck: ${context._lift(testCheck)},
            })
          `);
        }
        _toInflight() {
          return $stdlib.core.NodeJsCode.fromInline(`
            (await (async () => {
              const $Closure4Client = ${$Closure4._toInflightType(this).text};
              const client = new $Closure4Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `);
        }
        _registerBind(host, ops) {
          if (ops.includes("handle")) {
            $Closure4._registerBindObject(mock, host, ["setFailure"]);
            $Closure4._registerBindObject(testCheck, host, ["check"]);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:multiple failures do not trigger change",new $Closure4(this,"$Closure4"));
      class $Closure5 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this.display.hidden = true;
          this._addInflightOps("handle", "$inflight_init");
        }
        static _toInflightType(context) {
          return $stdlib.core.NodeJsCode.fromInline(`
            require("./inflight.$Closure5.js")({
              $mock: ${context._lift(mock)},
              $testCheck: ${context._lift(testCheck)},
            })
          `);
        }
        _toInflight() {
          return $stdlib.core.NodeJsCode.fromInline(`
            (await (async () => {
              const $Closure5Client = ${$Closure5._toInflightType(this).text};
              const client = new $Closure5Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `);
        }
        _registerBind(host, ops) {
          if (ops.includes("handle")) {
            $Closure5._registerBindObject(mock, host, ["setFailure", "setSuccess"]);
            $Closure5._registerBindObject(testCheck, host, ["check"]);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:success to failure",new $Closure5(this,"$Closure5"));
      class $Closure6 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this.display.hidden = true;
          this._addInflightOps("handle", "$inflight_init");
        }
        static _toInflightType(context) {
          return $stdlib.core.NodeJsCode.fromInline(`
            require("./inflight.$Closure6.js")({
              $mock: ${context._lift(mock)},
              $testCheck: ${context._lift(testCheck)},
            })
          `);
        }
        _toInflight() {
          return $stdlib.core.NodeJsCode.fromInline(`
            (await (async () => {
              const $Closure6Client = ${$Closure6._toInflightType(this).text};
              const client = new $Closure6Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `);
        }
        _registerBind(host, ops) {
          if (ops.includes("handle")) {
            $Closure6._registerBindObject(mock, host, ["setFailure", "setSuccess"]);
            $Closure6._registerBindObject(testCheck, host, ["check"]);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:failure to success",new $Closure6(this,"$Closure6"));
      class $Closure7 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this.display.hidden = true;
          this._addInflightOps("handle", "$inflight_init");
        }
        static _toInflightType(context) {
          return $stdlib.core.NodeJsCode.fromInline(`
            require("./inflight.$Closure7.js")({
              $mock: ${context._lift(mock)},
              $testCheck: ${context._lift(testCheck)},
            })
          `);
        }
        _toInflight() {
          return $stdlib.core.NodeJsCode.fromInline(`
            (await (async () => {
              const $Closure7Client = ${$Closure7._toInflightType(this).text};
              const client = new $Closure7Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `);
        }
        _registerBind(host, ops) {
          if (ops.includes("handle")) {
            $Closure7._registerBindObject(mock, host, ["setFailure", "setSuccess"]);
            $Closure7._registerBindObject(testCheck, host, ["check"]);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:full cycle",new $Closure7(this,"$Closure7"));
    }
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "main", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();
