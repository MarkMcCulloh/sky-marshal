exports.handler = async function(event) {
  return await (
          (await (async () => {
            const $Closure8Client = 
          require("././inflight.$Closure8.js")({
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
            checker: {name: "test",url: "NONE",},
            mockGitHubSuccess: 
          (await (async () => {
            const $Closure4Client = 
          require("././inflight.$Closure4.js")({
          })
        ;
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ,
            mockGitHubFailure: 
          (await (async () => {
            const $Closure5Client = 
          require("././inflight.$Closure5.js")({
          })
        ;
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ,
          })
        ;
            const client = new $Closure8Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ).handle(event);
};