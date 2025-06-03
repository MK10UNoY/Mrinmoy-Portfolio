<script lang="ts">
	import Scene from '$lib/Scene.svelte';
	import { Canvas } from '@threlte/core';

	const environmentUrl = $state('/golden_gate_hills_2k.hdr');
	let environmentIsBackground = $state(true);
	let useEnvironment = $state(true);
	let autoRotateCamera = $state(true);
  const trendingWords = [
    'Rizzing',
    'Let them cook',
    'Brain rot',
    'Yassified',
    'Midlife crisis',
    'Goblin mode',
    'Gaslight',
    'Unhinged'
  ];

  let dynamicTxt = $state('');

  // Select a random word on component mount
  $effect(() => {
    const randomIndex = Math.floor(Math.random() * trendingWords.length);
    dynamicTxt = trendingWords[randomIndex];
  });
</script>

<div>
	<div class="md:h-full h-screen w-full relative">
		<Canvas>
			<Scene {autoRotateCamera} {environmentUrl} {environmentIsBackground} {useEnvironment} />
		</Canvas>
	</div>
	<div
		class="absolute w-full md:h-96 h-10/12 flex flex-col justify-center items-center bg-transparent top-0 left-0 right-0 z-10"
	>
		<div class="relative w-fit border-4 border-amber-700 h-fit flex justify-center items-center">
			<img
				class="main-txt sm:w-3/4 md:w-9/12 w-full aspect-auto"
				src="/4d62ece0ce998610357284e74918a0fc.png"
				alt=""
			/>
		</div>
		<h1
			class="text-3xl font-bold mb-4 text-white md:absolute md:bottom-4 md:left-1/2 md:-translate-x-1/2"
		>
			Building
		</h1>
	</div>
	<iframe src="https://skybox.blockadelabs.com/e/a7d517b257519faaeb19bf902ea726db" width=700 height=700 style="border:0;" allow="fullscreen"></iframe>
</div>

<style>
  .main-txt::before {
    content: '{dyanamicTxt}';
    font-size: xx-large;
    translate: 0% 50%;
    color: #ffcc00;
    position: relative;
    z-index: 10;
  }

	@keyframes bounce {
		0%,
		100% {
			transform: rotate(-35deg) skew(-2deg, 0deg) scale(1);
		}
		50% {
			transform: rotate(-35deg) skew(-2deg, 0deg) scale(1.2);
		}
	}
</style>
