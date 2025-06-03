<script lang="ts">
	import { T } from '@threlte/core';
	import { interactivity, OrbitControls } from '@threlte/extras';
	import { Environment } from '@threlte/extras';
	interactivity();

	type Props = {
		autoRotateCamera?: boolean;
		environmentUrl: string;
		environmentIsBackground?: boolean;
		isBackground?: boolean;
		useEnvironment?: boolean;
	};
	let {
		autoRotateCamera = true,
		environmentUrl,
		environmentIsBackground = true,
		useEnvironment = true
	}: Props = $props();
</script>

<T.PerspectiveCamera makeDefault position.z={0}>
	<OrbitControls
		enableDamping
		autoRotateSpeed={0.6}
		autoRotate={autoRotateCamera}
		enablePan={false}
		enableZoom={false}
		minPolarAngle={Math.PI / 2}
		maxPolarAngle={Math.PI / 2}
	/>
</T.PerspectiveCamera>

{#if useEnvironment}
	<Environment isBackground={environmentIsBackground} url={environmentUrl} />
{/if}
