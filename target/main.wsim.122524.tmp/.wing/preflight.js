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
        this._addInflightOps("query", "check");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.JsonChecker.js";
        const http_UtilClient = http.Util._toInflightType(context);
        const std_JsonClient = std.Json._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            http_Util: ${http_UtilClient.text},
            std_Json: ${std_JsonClient.text},
          })
        `);
      }
      _toInflight() {
        const expectedFailure_client = this._lift(this.expectedFailure);
        const expectedSuccess_client = this._lift(this.expectedSuccess);
        const jsonQuery_client = this._lift(this.jsonQuery);
        const name_client = this._lift(this.name);
        const statusBucket_client = this._lift(this.statusBucket);
        const url_client = this._lift(this.url);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const JsonCheckerClient = ${JsonChecker._toInflightType(this).text};
            const client = new JsonCheckerClient({
              expectedFailure: ${expectedFailure_client},
              expectedSuccess: ${expectedSuccess_client},
              jsonQuery: ${jsonQuery_client},
              name: ${name_client},
              statusBucket: ${statusBucket_client},
              url: ${url_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          JsonChecker._registerBindObject(this.expectedFailure, host, []);
          JsonChecker._registerBindObject(this.expectedSuccess, host, []);
          JsonChecker._registerBindObject(this.jsonQuery, host, []);
          JsonChecker._registerBindObject(this.name, host, []);
          JsonChecker._registerBindObject(this.statusBucket, host, []);
          JsonChecker._registerBindObject(this.url, host, []);
        }
        if (ops.includes("check")) {
          JsonChecker._registerBindObject(JsonChecker, host, ["query"]);
          JsonChecker._registerBindObject(this.expectedFailure, host, []);
          JsonChecker._registerBindObject(this.expectedSuccess, host, []);
          JsonChecker._registerBindObject(this.jsonQuery, host, []);
          JsonChecker._registerBindObject(this.name, host, []);
          JsonChecker._registerBindObject(this.statusBucket, host, ["put", "tryGet"]);
          JsonChecker._registerBindObject(this.url, host, []);
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("query")) {
        }
        super._registerTypeBind(host, ops);
      }
    }
    if (((util.Util.env("WING_IS_TEST")) !== "true")) {
      const mainBuildCheck = new JsonChecker(this,"JsonChecker",{ url: "https://api.github.com/repos/winglang/wing/actions/workflows/build.yml/runs?branch=main&per_page=1&page=1&event=push&exclude_pull_requests=true", jsonQuery: ".workflow_runs[0].conclusion", expectedSuccess: "success", expectedFailure: "failure", name: "main" });
      const schedule = this.node.root.newAbstract("@winglang/sdk.cloud.Schedule",this,"cloud.Schedule",{ rate: (std.Duration.fromSeconds(60)) });
      (schedule.onTick(mainBuildCheck.check));
    }
    else {
      class MockEndpoint extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this.api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
          this.bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
          const __parent_this_1 = this;
          class $Closure1 extends $stdlib.std.Resource {
            constructor(scope, id, ) {
              super(scope, id);
              this.display.hidden = true;
              this._addInflightOps("handle");
            }
            static _toInflightType(context) {
              const self_client_path = "././inflight.$Closure1.js";
              const __parent_this_1_client = context._lift(__parent_this_1);
              const std_JsonClient = std.Json._toInflightType(context);
              return $stdlib.core.NodeJsCode.fromInline(`
                require("${self_client_path}")({
                  __parent_this_1: ${__parent_this_1_client},
                  std_Json: ${std_JsonClient.text},
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
              if (ops.includes("$inflight_init")) {
                $Closure1._registerBindObject(__parent_this_1, host, []);
              }
              if (ops.includes("handle")) {
                $Closure1._registerBindObject(__parent_this_1.bucket, host, ["get"]);
              }
              super._registerBind(host, ops);
            }
          }
          (this.api.get("/",new $Closure1(this,"$Closure1")));
          this._addInflightOps("setSuccess", "setFailure");
        }
        static _toInflightType(context) {
          const self_client_path = "././inflight.MockEndpoint.js";
          return $stdlib.core.NodeJsCode.fromInline(`
            require("${self_client_path}")({
            })
          `);
        }
        _toInflight() {
          const api_client = this._lift(this.api);
          const bucket_client = this._lift(this.bucket);
          return $stdlib.core.NodeJsCode.fromInline(`
            (await (async () => {
              const MockEndpointClient = ${MockEndpoint._toInflightType(this).text};
              const client = new MockEndpointClient({
                api: ${api_client},
                bucket: ${bucket_client},
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `);
        }
        _registerBind(host, ops) {
          if (ops.includes("$inflight_init")) {
            MockEndpoint._registerBindObject(this.api, host, []);
            MockEndpoint._registerBindObject(this.bucket, host, []);
          }
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
      class $Closure2 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this.display.hidden = true;
          this._addInflightOps("handle");
        }
        static _toInflightType(context) {
          const self_client_path = "././inflight.$Closure2.js";
          const mock_client = context._lift(mock);
          const testCheck_client = context._lift(testCheck);
          return $stdlib.core.NodeJsCode.fromInline(`
            require("${self_client_path}")({
              mock: ${mock_client},
              testCheck: ${testCheck_client},
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
          if (ops.includes("$inflight_init")) {
            $Closure2._registerBindObject(mock, host, []);
            $Closure2._registerBindObject(testCheck, host, []);
          }
          if (ops.includes("handle")) {
            $Closure2._registerBindObject(mock, host, ["setSuccess"]);
            $Closure2._registerBindObject(testCheck, host, ["check"]);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:multiple success does not trigger change",new $Closure2(this,"$Closure2"));
      class $Closure3 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this.display.hidden = true;
          this._addInflightOps("handle");
        }
        static _toInflightType(context) {
          const self_client_path = "././inflight.$Closure3.js";
          const mock_client = context._lift(mock);
          const testCheck_client = context._lift(testCheck);
          return $stdlib.core.NodeJsCode.fromInline(`
            require("${self_client_path}")({
              mock: ${mock_client},
              testCheck: ${testCheck_client},
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
          if (ops.includes("$inflight_init")) {
            $Closure3._registerBindObject(mock, host, []);
            $Closure3._registerBindObject(testCheck, host, []);
          }
          if (ops.includes("handle")) {
            $Closure3._registerBindObject(mock, host, ["setFailure"]);
            $Closure3._registerBindObject(testCheck, host, ["check"]);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:multiple failures do not trigger change",new $Closure3(this,"$Closure3"));
      class $Closure4 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this.display.hidden = true;
          this._addInflightOps("handle");
        }
        static _toInflightType(context) {
          const self_client_path = "././inflight.$Closure4.js";
          const mock_client = context._lift(mock);
          const testCheck_client = context._lift(testCheck);
          return $stdlib.core.NodeJsCode.fromInline(`
            require("${self_client_path}")({
              mock: ${mock_client},
              testCheck: ${testCheck_client},
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
          if (ops.includes("$inflight_init")) {
            $Closure4._registerBindObject(mock, host, []);
            $Closure4._registerBindObject(testCheck, host, []);
          }
          if (ops.includes("handle")) {
            $Closure4._registerBindObject(mock, host, ["setFailure", "setSuccess"]);
            $Closure4._registerBindObject(testCheck, host, ["check"]);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:success to failure",new $Closure4(this,"$Closure4"));
      class $Closure5 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this.display.hidden = true;
          this._addInflightOps("handle");
        }
        static _toInflightType(context) {
          const self_client_path = "././inflight.$Closure5.js";
          const mock_client = context._lift(mock);
          const testCheck_client = context._lift(testCheck);
          return $stdlib.core.NodeJsCode.fromInline(`
            require("${self_client_path}")({
              mock: ${mock_client},
              testCheck: ${testCheck_client},
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
          if (ops.includes("$inflight_init")) {
            $Closure5._registerBindObject(mock, host, []);
            $Closure5._registerBindObject(testCheck, host, []);
          }
          if (ops.includes("handle")) {
            $Closure5._registerBindObject(mock, host, ["setFailure", "setSuccess"]);
            $Closure5._registerBindObject(testCheck, host, ["check"]);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:failure to success",new $Closure5(this,"$Closure5"));
      class $Closure6 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this.display.hidden = true;
          this._addInflightOps("handle");
        }
        static _toInflightType(context) {
          const self_client_path = "././inflight.$Closure6.js";
          const mock_client = context._lift(mock);
          const testCheck_client = context._lift(testCheck);
          return $stdlib.core.NodeJsCode.fromInline(`
            require("${self_client_path}")({
              mock: ${mock_client},
              testCheck: ${testCheck_client},
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
          if (ops.includes("$inflight_init")) {
            $Closure6._registerBindObject(mock, host, []);
            $Closure6._registerBindObject(testCheck, host, []);
          }
          if (ops.includes("handle")) {
            $Closure6._registerBindObject(mock, host, ["setFailure", "setSuccess"]);
            $Closure6._registerBindObject(testCheck, host, ["check"]);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:full cycle",new $Closure6(this,"$Closure6"));
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
