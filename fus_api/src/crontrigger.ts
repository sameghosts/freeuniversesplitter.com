

export interface Env {
	QUANTUM_NUMBERS_API_KEY: string;
	QUANTUM_NUMBERS_URL: string;
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	QRANDOMNESS_KV: KVNamespace;
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
const allowedOrigin = '*'

const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
};
// const storeBody = () => {

// 	}
	async function handleRequest(env: Env, request: Request): Promise<Response> {

  const qrngResult = await fetch(env.QUANTUM_NUMBERS_URL + "?length=1024&type=hex16&size=10", {
    headers: {
      'x-api-key': env.QUANTUM_NUMBERS_API_KEY
    }
  });
  if (qrngResult.status != 200) {
    const responseHeaders = new Headers(qrngResult.headers);
    responseHeaders.set('Access-Control-Allow-Origin', allowedOrigin);
		//Add code for body
    return new Response(qrngResult.body, {
        headers: responseHeaders,
        status: qrngResult.status,
        statusText: qrngResult.statusText
    });



  } else{

		return new Response(

			'no randomness', {status: 404}
		)
		}
	}


	//gather Results
	async function handleResults(env: Env, request: Request): Promise<Response> {
		const QRCONTENT = await handleRequest(env, request);
		const QRDATA = await JSON.stringify(QRCONTENT.json());

		await env.QRANDOMNESS_KV.put("qRandomness", QRDATA)

		return new Response(
			'success set KV', {status: 200}
		)

	}

		function handleOptions(request: Request): Response {
    const respHeaders = {
      ...corsHeaders,
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
			//TODO: Removed for debug
    //   'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers'),
    };
    return new Response(null, {
      headers: respHeaders,
    });
}


const handler: ExportedHandler = {
	async fetch(request: Request, env: Env, ctx: ExecutionContext){
		if (request.method === 'OPTIONS') {
				return handleOptions(request);
		} else if (request.method === 'GET') {
			return handleRequest(env, request);
		}
		return new Response(
			'not found', {status: 404}
		)
		},


  async scheduled(request: Request, env: Env, ctx: ExecutionContext) {

		ctx.waitUntil(handleResults(env, request))

  },
};
export default handler
