import App from './App.svelte';

const app = new App({
	target: document.body,
  props: {
    serviceWorkerSupported: 'serviceWorker' in navigator,
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('Service worker registration succeeded:', registration);
    }).catch((error) => {
      console.log('Service worker registration failed:', error);
    });
} else {
  console.log('Service workers are not supported.');
}

export default app;
