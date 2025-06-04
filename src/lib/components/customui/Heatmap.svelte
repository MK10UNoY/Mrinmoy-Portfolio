<script lang="ts">
	import { onMount } from 'svelte';

	const username = 'zimmMK';

	let canvasEl: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let heatmapData: { [timestamp: string]: number } = {};
	let loading = true;
	let error: string | null = null;

	const CELL_SIZE = 12;
	const CELL_GAP = 2;
	const DAYS = 365;
	const COLS = 53; // ~weeks in a year
	const ROWS = 7;

	function getColor(count: number): string {
		if (count === 0) return '#2c2e35';
		if (count < 3) return '#4ade80';
		if (count < 6) return '#22c55e';
		if (count < 10) return '#16a34a';
		return '#15803d';
	}

	async function fetchHeatmap() {
		try {
			const res = await fetch(`https://zimmsleetapi.onrender.com/userHeatmap/${username}`);
			const json = await res.json();
			heatmapData = json.submissionCalendar ?? {};
		} catch (err: any) {
			error = err.message;
		} finally {
			loading = false;
			drawHeatmap();
		}
	}

	function drawHeatmap() {
		if (!canvasEl || !ctx) return;
		ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

		const now = new Date();
		let col = COLS - 1;
		let row = now.getDay();

		for (let i = 0; i < DAYS; i++) {
			const date = new Date(now);
			date.setDate(now.getDate() - i);
			const timestamp = Math.floor(date.getTime() / 1000);
			const count = heatmapData[timestamp] ?? 0;

			const x = col * (CELL_SIZE + CELL_GAP);
			const y = row * (CELL_SIZE + CELL_GAP);
			ctx.fillStyle = getColor(count);
			ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);

			row--;
			if (row < 0) {
				row = 6;
				col--;
			}
		}
	}

	onMount(() => {
		ctx = canvasEl.getContext('2d');
		fetchHeatmap();
	});
</script>

{#if loading}
	<div class="heatmap-card">Loading heatmap...</div>
{:else if error}
	<div class="heatmap-card error">Error: {error}</div>
{:else}
	<div class="heatmap-card">
		<h2>LeetCode Activity</h2>
		<canvas bind:this={canvasEl} width={(CELL_SIZE + CELL_GAP) * COLS} height={(CELL_SIZE + CELL_GAP) * ROWS} />
	</div>
{/if}

<style>
	.heatmap-card {
		background: #181a20;
		color: white;
		border-radius: 1rem;
		padding: 1.5rem;
		box-shadow: 0 4px 16px #000a;
		font-family: Inter, sans-serif;
		max-width: 100%;
		overflow-x: auto;
	}

	canvas {
		display: block;
		max-width: 100%;
		height: auto;
	}
</style>
