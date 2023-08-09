exports.handler = async function(event) {
  return await (new (require("/Users/markm/.volta/tools/image/packages/winglang/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/target-sim/schedule.ontick.inflight.js")).ScheduleOnTickHandlerClient({ handler: 
          (await (async () => {
            const $Closure3Client = 
          require("././inflight.$Closure3.js")({
            pollTick: 
          (await (async () => {
            const $Closure2Client = 
          require("././inflight.$Closure2.js")({
            bucket: (function(env) {
        let handle = process.env[env];
        if (!handle) {
          throw new Error("Missing environment variable: " + env);
        }
        return $simulator.findInstance(handle);
      })("BUCKET_HANDLE_2cd0933d"),
          })
        ;
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ,
            wingMainBuildCheck: {name: "main",url: "https://api.github.com/repos/winglang/wing/actions/workflows/build.yml/runs?branch=main&per_page=1&page=1&event=push&exclude_pull_requests=true",},
            fetchGithubData: 
          (await (async () => {
            const $Closure1Client = 
          require("././inflight.$Closure1.js")({
            http_Util: require("/Users/markm/.volta/tools/image/packages/winglang/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/http/http.js").Util,
            std_Json: require("/Users/markm/.volta/tools/image/packages/winglang/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json.js").Json,
            JQ: 
          require("././inflight.JQ.js")({
          })
        ,
          })
        ;
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ,
          })
        ;
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        , args: {} })).handle(event);
};