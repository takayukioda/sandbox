<script lang="ts">
	import { urlBase64ToUint8Array } from './helper.ts';
	const publicVapidKey = 'BO3RaGZf5xBIxvn5ZyHtznkli42k2WMAAxCAo5nVifW4rQi9ReZSHhybw1v31KgklUP2SLSxcBKpucZ-t8YMJ9M';
	let subscription: PushSubscription;
	let message: string = "";
	let subscriptionId: string = "";

	const subscribe = async () => {
		if (subscription) {
			console.log("Already subscribed");
			return;
		}

		const registration = await navigator.serviceWorker.ready;
		if (!("pushManager" in registration)) {
			console.log("pushManager not supported");
			return;
		}
		const options = {
			userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
		};
		subscription = await registration.pushManager.subscribe(options);
		const res = await fetch("/subscription", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(subscription),
		});
		const body = await res.json();
		if (!res.ok) {
			throw new Error(`${res.status} ${res.statusText}: ${JSON.stringify(body)}`);
		}
		const { data } = body;
		console.log("Share subscription endpiont", { data });
		subscriptionId = data.id;
	};

	const unsubscribe = () => {
		if (!subscription) {
			console.log("Set subscription before unsubscribe");
			return
		}
		return subscription.unsubscribe().then((succeed) => {
			if (succeed) {
				subscription = undefined;
				subscriptionId = "";
				console.log("unsubscribed");
			}
		}).catch((error) => {
			console.log("Unsubscribe failed:", error);
		});
	};

	const push = () => {
		if (!subscription) {
			console.log("Set subscription before push");
			return
		}
		return fetch("/push-simple", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				message,
			}),
		}).then((res) => {
			console.log("pushed");
		}).catch((error) => {
			console.log("Push failed:", error);
		});
	};
</script>

<main>
	<div class="container">
		<h1>Web push experiment</h1>
		<section>
			<h2>Subscribe to web push</h2>
			<button on:click={subscribe}>Subscribe</button>
			<div class="row">
				<div class="twelve columns">
					<table>
						<thead>
							<tr>
								<th>Subscription ID</th>
								<th>Subscription</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{subscriptionId}</td>
								<td>{JSON.stringify(subscription)}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
		<section>
			<h2>Remove subscription</h2>
			<button on:click={unsubscribe}>Unsubscribe</button>
		</section>
		<section>
			<h2>Sending notification</h2>
			<div class="row">
				<div class="twelve columns">
					<label for="push-message">Message ({message})</label>
					<input
						id="push-message"
						type="text"
						bind:value="{message}"
					>
						<button
							class="button-primary"
							on:click={push}
						>
							Push
						</button>
					</div>
				</div>
			</section>
		</div>
	</main>

<style>
</style>
