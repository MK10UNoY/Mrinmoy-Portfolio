<script lang="ts">
	import TrendingDownIcon from '@tabler/icons-svelte/icons/trending-down';
	import TrendingUpIcon from '@tabler/icons-svelte/icons/trending-up';
	import { IconCircle, IconHeartFilled } from '@tabler/icons-svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { techstack } from '$lib/jsons/techstack.js';

	let hoveredIndex = $state<number | null>(null);
	let itemPositions = $state<{ row: number; col: number }[]>([]);

	let container: HTMLElement;

	const maxBlur = 4;
	const maxScaleDown = 0.8;

	function getDistance(pos1: { row: number; col: number }, pos2: { row: number; col: number }) {
		return Math.sqrt((pos1.row - pos2.row) ** 2 + (pos1.col - pos2.col) ** 2);
	}

	function getBlur(distance: number) {
		return Math.min(distance * 2, maxBlur);
	}

	function getScale(distance: number) {
		return Math.max(1 - 0.1 * distance, maxScaleDown);
	}

	function getOpacity(distance: number) {
		return Math.max(1 - 0.3 * distance, 0.4);
	}

	// After the DOM renders, measure grid positions of each item
	function updatePositions() {
		if (!container) return;

		itemPositions = Array.from(container.children).map((el) => {
			const style = getComputedStyle(el);
			return {
				row: parseInt(style.gridRowStart),
				col: parseInt(style.gridColumnStart)
			};
		});
	}

	$effect(() => {
		updatePositions();
		window.addEventListener('resize', updatePositions);
		return () => window.removeEventListener('resize', updatePositions);
	});
</script>

<div
	bind:this={container}
	class="grid grid-cols-1 @xl/main:grid-cols-2 @5xl/main:grid-cols-3 grid-flow-row-dense @xl/main:grid-flow-col-dense gap-4 px-4 lg:px-6
		 *:data-[slot=card]:bg-gradient-to-t
		 *:data-[slot=card]:from-primary/5
		 *:data-[slot=card]:to-card
		 dark:*:data-[slot=card]:bg-card
		 *:data-[slot=card]:shadow-xs"
>
	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Description>I'm</Card.Description>
			<Card.Title class="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
				Mrinmoy Koiri
			</Card.Title>
			<Card.Action>
				<Badge variant="outline" class="bg-green-600 text-white animate-pulse">
					<IconCircle class="animate-ping" />
					Developing
				</Badge>
			</Card.Action>
		</Card.Header>
		<Card.Footer class="flex-col items-start gap-1.5 text-sm">
			<div class="line-clamp-1 flex gap-2 font-medium">
				<ul>
					<li>Full Stack Developer</li>
					<li>ML Enthusiast</li>
				</ul>
			</div>
		</Card.Footer>
	</Card.Root>
	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Title class="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
				Engineer@🧡
			</Card.Title>
			<Card.Action>
				<Badge variant="outline" class="bg-red-500 dark:bg-red-700 text-white">
					<IconHeartFilled class="animate-ping" />
					Alive
				</Badge>
			</Card.Action>
		</Card.Header>
		<Card.Footer class="flex-col items-start gap-1.5 text-sm">
			<div class="line-clamp-1 flex gap-2 font-medium">
				<ul>
					<li>B.Tech in Electrical Engineering</li>
					<li>NIT Silchar</li>
				</ul>
			</div>
			<div class="text-muted-foreground"></div>
		</Card.Footer>
	</Card.Root>
	<!-- TechStack card -->
	<Card.Root
		class="@container/card @xl/main:col-span-1 @xl/main:row-span-2 @5xl/main:row-span-2 @5xl/main:col-span-2">
		<Card.Header>
			<Card.Description>TechStack</Card.Description>
		</Card.Header>
		<Card.Content
			class="grid gap-4 justify-self-stretch text-xs"
			style="grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));"
		>
			{#each techstack as tech, index}
				<div
					class="text-center group transition-transform duration-200"
					onmouseenter={() => (hoveredIndex = index)}
					onmouseleave={() => (hoveredIndex = null)}
					role="button"
					tabindex="0"
				>
					<img
						src={`https://skillicons.dev/icons?i=${tech.skilliconId}`}
						alt={tech.name}
						class="w-16 h-16 mx-auto transition-all duration-300"
						style={
							hoveredIndex !== null && index !== hoveredIndex && itemPositions[index] && itemPositions[hoveredIndex]
								? `filter: blur(${getBlur(getDistance(itemPositions[index], itemPositions[hoveredIndex]))}px); transform: scale(${getScale(getDistance(itemPositions[index], itemPositions[hoveredIndex]))}); opacity: ${getOpacity(getDistance(itemPositions[index], itemPositions[hoveredIndex]))}; transition: filter 0.3s, transform 0.3s, opacity 0.3s;`
								: hoveredIndex === index
									? 'filter: blur(0px); transform: scale(1.1); opacity: 1; transition: filter 0.3s, transform 0.3s, opacity 0.3s;'
									: 'filter: blur(0px); transform: scale(1); opacity: 1; transition: filter 0.3s, transform 0.3s, opacity 0.3s;'
						}
					/>
					<p
						class="text-xs mt-1 transition-opacity duration-300"
						style={
							hoveredIndex !== null && index !== hoveredIndex && itemPositions[index] && itemPositions[hoveredIndex]
								? `opacity: ${getOpacity(getDistance(itemPositions[index], itemPositions[hoveredIndex]))}`
								: 'opacity: 1'
						}
					>
						{tech.name}
					</p>
				</div>
			{/each}
		</Card.Content>
	</Card.Root>
	
</div>
