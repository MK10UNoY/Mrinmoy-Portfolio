<script>
	// You can pass props or fetch data as needed
	// Placeholder data for demonstration
	let leetcodeStatus = {
		solved: 350,
		easy: 150,
		medium: 120,
		hard: 80
	};

	let gitStats = {
		commits: 1200,
		repos: 15,
		streak: 45 // days
	};
	import Overallstat from '$lib/components/customui/Overallstat.svelte';
	import Leetstat from '$lib/components/customui/Overallstat.svelte';
	import Heatmap from './customui/Heatmap.svelte';
</script>

<div class="px-4 lg:px-6 py-8">
    <h1 class="text-2xl font-bold mb-6">Coding Stats</h1>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		<!-- LeetCode Card -->
		<Overallstat />

		<!-- GitHub Card -->
		<div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
			<Heatmap />
        </div>
	</div>
</div>
