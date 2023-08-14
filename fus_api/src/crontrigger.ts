export interface Env {
	QUANTUM_NUMBERS_API_KEY: string;
	QUANTUM_NUMBERS_URL: string;
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}
//? Copied code for cron call
async function handRequestApiBatch(env: Env, request: Request): Promise<Response> {
if (qrngResult.status != 200) {
    const responseHeaders = new Headers(qrngResult.headers);
    responseHeaders.set('Access-Control-Allow-Origin', allowedOrigin);
    return new Response(qrngResult.body, {
        headers: responseHeaders,
        status: qrngResult.status,
        statusText: qrngResult.statusText
    });
  } else {
		//TODO: Properly type json
    const json: any = await qrngResult.json();
    const randNum = json.data[0];
    const selectedOutcome = outcomes[randNum % outcomes.length];
    const p = 1.0/outcomes.length;
    const responseHeaders = new Headers();
    responseHeaders.set('Access-Control-Allow-Origin', allowedOrigin);
    responseHeaders.set('Content-Type', 'text/plain')
    return new Response(`${selectedOutcome}`, {
        headers: responseHeaders,
        status: 200,
        statusText: selectedOutcome
    });
  }
}
