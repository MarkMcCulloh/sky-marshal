exports.handler = async function(event) {
  return await (new (require("/Users/markm/.volta/tools/image/packages/winglang/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/target-sim/schedule.ontick.inflight.js")).ScheduleOnTickHandlerClient({ handler: 
            (await (async () => {
              const $Closure1Client = 
            require("./inflight.$Closure1.js")({
              $mainBuildCheck: 
          (await (async () => {
            const JsonCheckerClient = 
          require("./inflight.JsonChecker.js")({
            $http_Util: require("/Users/markm/.volta/tools/image/packages/winglang/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/http/http.js").Util,
            $std_Json: require("/Users/markm/.volta/tools/image/packages/winglang/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json.js").Json,
          })
        ;
            const client = new JsonCheckerClient({
              $this_expectedFailure: "failure",
              $this_expectedSuccess: "success",
              $this_jsonQuery: ".workflow_runs[0].conclusion",
              $this_name: "main build",
              $this_statusBucket: (function(env) {
        let handle = process.env[env];
        if (!handle) {
          throw new Error("Missing environment variable: " + env);
        }
        return $simulator.findInstance(handle);
      })("BUCKET_HANDLE_4cafb644"),
              $this_url: "https://api.github.com/repos/winglang/wing/actions/workflows/build.yml/runs?branch=main&per_page=1&page=1&event=push&exclude_pull_requests=true",
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ,
            })
          ;
              const client = new $Closure1Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          , args: {} })).handle(event);
};