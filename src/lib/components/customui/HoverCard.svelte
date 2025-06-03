<script lang="ts">
	import { experiences } from '$lib/jsons/experiences.js';
	import { onDestroy } from 'svelte';

	let hoveredIndex: number | null = null;
	let iframeTimeout: ReturnType<typeof setTimeout> | null = null;
	let iframeError = false;
	let previewLock: boolean = false;
	let restoredStates = new Array(experiences.length).fill(false);
	let minimizedStates = new Array(experiences.length).fill(false);

	import { fade } from 'svelte/transition';
	// Track iframe load state
	$: if (hoveredIndex !== null && experiences[hoveredIndex]?.link) {
		if (iframeTimeout) clearTimeout(iframeTimeout);
		iframeError = false;

		iframeTimeout = setTimeout(() => {
			iframeError = true;
		}, 2000);
	}

	// Cleanup timeout on destroy
	onDestroy(() => {
		if (iframeTimeout) clearTimeout(iframeTimeout);
	});
</script>

<div class="space-y-6 px-4 lg:px-6">
	<h2 class="text-2xl font-semibold">Experiences</h2>

	{#each experiences as exp, i}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="relative group p-4 bg-card rounded-xl border hover:bg-muted transition"
			onmouseenter={() => {
				if (!previewLock && !minimizedStates[i]) hoveredIndex = i;
			}}
			onmouseleave={() => {
				hoveredIndex = null;
				previewLock = false; // Unlock after full leave
			}}
			role="button"
			tabindex="0"
		>
			<h3 class="font-semibold">{exp.title}</h3>
			<p class="text-muted-foreground text-sm">{exp.description}</p>

			<!-- Pop-up iframe or fallback GIF -->
			{#if (hoveredIndex === i && !minimizedStates[i]) || restoredStates[i]}
				<div
					class="absolute top-0 left-2/3 w-[300px] h-[220px] z-50 overflow-hidden rounded-xl shadow-xl bg-background border"
				>
					<!-- Mini browser window header -->
					<div
						class="flex items-center justify-between px-3 py-1 bg-[#e0e0e0] rounded-t-xl text-sm"
					>
						<!-- Traffic lights -->
						<div class="flex gap-2 select-none">
							<button
								title="Close"
								aria-label="Close"
								class="w-2 h-2 rounded-full hover:scale-150 bg-red-700 hover:bg-red-500 text-amber-50"
								onclick={() => {
									hoveredIndex = null;
									restoredStates[i] = false;
									previewLock = true;
								}}
							></button>
							<button
								title="Minimize"
								aria-label="Minimize"
								class="w-2 h-2 rounded-full bg-yellow-500 hover:bg-yellow-400 hover:scale-150"
								onclick={() => {
									minimizedStates[i] = true;
									hoveredIndex = null;
									previewLock = true;
								}}
							></button>
							<button
								title="New tab"
								aria-label="Open"
								class="w-2 h-2 rounded-full bg-green-500 hover:scale-150"
								onclick={() => {
									window.open(exp.link, '_blank');
								}}
							></button>
						</div>
						<span class="text-center flex-1 text-muted-foreground -ml-6 truncate"></span>
					</div>

					<!-- Scaled preview -->
					<div
						class="scale-wrapper"
						style="transform: scale(0.3); transform-origin: top left; width: 1024px; height: 768px;"
					>
						{#if exp.link}
							{#if !iframeError}
								<iframe
									title="Experience Preview"
									src={exp.link}
									style="width: 1024px; height: 768px; border: none;"
									loading="lazy"
									sandbox="allow-scripts allow-same-origin"
									onload={() => {
										if (iframeTimeout) clearTimeout(iframeTimeout);
										iframeError = false;
									}}
									onerror={() => {
										iframeError = true;
									}}
								></iframe>
							{:else}
								<img
									src={exp.fallback || '/fallback.gif'}
									alt="Preview unavailable"
									style="width: 1024px; height: 768px; object-fit: cover;"
								/>
							{/if}
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/each}
	<!-- Floating minimized preview buttons, stacked vertically -->
	<div class="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
		{#each experiences as exp, i}
			{#if minimizedStates[i]}
				<div
					class="bg-card px-4 py-2 rounded shadow-md border flex items-center -gap-1 transition"
				>
					<span class="text-sm truncate max-w-[120px]">{exp.title}</span>

					<!-- Restore button -->
					<button
						title="Restore"
						class="text-sm px-2 py-1 rounded hover:bg-muted"
						onclick={() => {
							minimizedStates[i] = false;
							restoredStates[i] = true;
						}}
					>
						⬆️
					</button>

					<!-- Close button -->
					<button
						title="Close"
						class="text-sm px-2 py-1 rounded hover:bg-muted text-red-500"
						onclick={() => {
							minimizedStates[i] = false;
							restoredStates[i] = false;
							if (hoveredIndex === i) hoveredIndex = null;
						}}
					>
						❌
					</button>
				</div>
			{/if}
		{/each}
	</div>
</div>
