/*
Project: Sky Marshal
Goals:
Poll URL (e.g. https://api.github.com/repos/winglang/wing/actions/workflows/build.yml/runs?branch=main&per_page=1&page=1&event=push&exclude_pull_requests=true)
Parse Response (if json) and look at specific value (e.g. .workflow_runs[0].conclusion)
Check/Update state if value found
if state changes, send update to pagerduty (check for transion of pass->fail or fail->pass)

(Optional/Later) webhook from pagerduty to force issue to be resolved for a given workflow run? 

References:
https://developer.pagerduty.com/docs/ZG9jOjExMDI5NTgx-send-an-alert-event

Notes:
`Json <=> struct` is sorely needed
Really hate that interfaces can't have properties. We at least need `abstract`
declaring structs and interfaces feel pointless (see last two points), classes are more powerful
type completions for inflight parameters does not show structs (because they're preflight?)
would love a way to have tests without a name
nested tests would be cool (to share data) (test setup/teardown?) (preflight test?)
really would like punning
mocking would be nice, no clue what it should look like
constructing an empty MutArray is annoying (regression?)
test --watch https://github.com/winglang/wing/issues/3198
Need to fix $Closure type on hover/completion (e.g. grab the type from the `handle` function)
*/

bring cloud;
bring http;
bring util;

let ttt = inflight () => {};

struct JsonCheckerOptions {
  url: str;
  jsonQuery: str;
  expectedSuccess: str;
  expectedFailure: str;
  name: str;
}

class JsonChecker {
  name: str;
  url: str;
  jsonQuery: str;
  expectedSuccess: str;
  expectedFailure: str;
  statusBucket: cloud.Bucket;

  init(options: JsonCheckerOptions) {
    this.url = options.url;
    this.jsonQuery = options.jsonQuery;
    this.expectedSuccess = options.expectedSuccess;
    this.expectedFailure = options.expectedFailure;
    this.name = options.name;
    this.statusBucket = new cloud.Bucket();
  }

  extern "./jq.js" static inflight query(obj: Json, query: str): Json?;

  inflight check() {
    if let body = http.get(this.url).body {
      if let status = JsonChecker.query(Json.parse(body), this.jsonQuery)?.tryAsStr() {
        if let lastStatus = this.statusBucket.tryGet(this.name) {
          if status != lastStatus {
            if status == this.expectedFailure {
              log("New failure!");
            } elif status == this.expectedSuccess {
              log("Issue has cleared up");
            } else {
              log("Unexpected status: ${status}");
            }
          }
        }
        this.statusBucket.put(this.name, status);
      }
    }
  }
}

if util.env("WING_IS_TEST") != "true" {
  let mainBuildCheck = new JsonChecker(
    url: "https://api.github.com/repos/winglang/wing/actions/workflows/build.yml/runs?branch=main&per_page=1&page=1&event=push&exclude_pull_requests=true",
    jsonQuery: ".workflow_runs[0].conclusion",
    expectedSuccess: "success",
    expectedFailure: "failure",
    name: "main build",
  );
  
  let schedule = new cloud.Schedule(rate: 1m);
  schedule.onTick(inflight () => { mainBuildCheck.check(); });
} else {
  class MockEndpoint {
    api: cloud.Api;
    bucket: cloud.Bucket;

    init() {
      this.api = new cloud.Api();
      this.bucket = new cloud.Bucket();

      this.api.get("/", inflight (): cloud.ApiResponse => {
        return cloud.ApiResponse {
          status: 200,
          body: Json.stringify(this.bucket.get("test")),
        };
      });
    }

    inflight setSuccess() {
      this.bucket.put("test", "success");
    }

    inflight setFailure() {
      this.bucket.put("test", "failure");
    }
  }

  let mock = new MockEndpoint();
  
  let testCheck = new JsonChecker(
    url: mock.api.url,
    jsonQuery: ".",
    expectedSuccess: "success",
    expectedFailure: "failure",
    name: "test",
  );
  
  test "multiple success does not trigger change" {
    mock.setSuccess();
    testCheck.check();
    testCheck.check();
    testCheck.check();
  }
  
  test "multiple failures do not trigger change" {
    mock.setFailure();
    testCheck.check();
    testCheck.check();
    testCheck.check();
  }
  
  test "success to failure" {
    mock.setSuccess();
    testCheck.check();
    mock.setFailure();
    testCheck.check();
  }
  test "failure to success" {
    mock.setFailure();
    testCheck.check();
    mock.setSuccess();
    testCheck.check();
  }
  
  test "full cycle" {
    mock.setSuccess();
    testCheck.check();
    mock.setFailure();
    testCheck.check();
    mock.setSuccess();
    testCheck.check();
  }
}

// POST https://events.pagerduty.com/v2/enqueue
// let examplePagerdutyEvent = {
//   payload: {
//     summary: "Test alert",
//     severity: "critical",
//     source: "Alert source",
//   },
//   routing_key: "d73299ae54a54307c0bdc5b4c7aee96e",
//   event_action: "trigger",
// };
