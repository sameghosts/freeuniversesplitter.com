

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
const allowedOrigin = '*'

const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
};
// const storeBody = () => {

// 	}
// 	async function handleBatchAPI(env: Env, request: Request): Promise<Response> {
//   // const {searchParams} = new URL(request.url);
//   // let outcomes = searchParams.getAll('outcome');
//   // const max = Number(searchParams.get('max'));
//   // if (max > 0) {
//   //   for (let i = 1; i <= max; i++) {
//   //     outcomes.push(i.toString());
//   //   }
//   // }
//   // if (outcomes.length === 0) {
//   //   outcomes = defaultOutcomes;
//   // }
//   const qrngResult = await fetch(env.QUANTUM_NUMBERS_URL + "?length=1024&type=hex16&size=10", {
//     headers: {
//       'x-api-key': env.QUANTUM_NUMBERS_API_KEY
//     }
//   });
//   if (qrngResult.status != 200) {
//     const responseHeaders = new Headers(qrngResult.headers);
//     responseHeaders.set('Access-Control-Allow-Origin', allowedOrigin);
// 		//Add code for body
//     return new Response(qrngResult.body, {
//         headers: responseHeaders,
//         status: qrngResult.status,
//         statusText: qrngResult.statusText
//     });
// 		//TODO: Store Response in the KV
//   } else{

// 		return new Response(

// 			'no randomness', {status: 404}
// 		)
// 		}
// 	}
// 	// else {

// 	// 	//TODO: Properly type json
//   //   const json: any = await qrngResult.json();
//   //   const randNum = json.data[0];
//   //   const selectedOutcome = outcomes[randNum % outcomes.length];
//   //   const p = 1.0/outcomes.length;
//   //   const responseHeaders = new Headers();
//   //   responseHeaders.set('Access-Control-Allow-Origin', allowedOrigin);
//   //   responseHeaders.set('Content-Type', 'text/plain')
//   //   return new Response(`${selectedOutcome}`, {
//   //       headers: responseHeaders,
//   //       status: 200,
//   //       statusText: selectedOutcome
//   //   });
//   // }
// // }

const handler: ExportedHandler = {
  async scheduled(controller, env, ctx) {

		console.log("cron processed")
  },
};
export default handler;
