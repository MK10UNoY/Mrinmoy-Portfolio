<script lang="ts">
	import { onMount } from 'svelte';

	// Replace with the desired LeetCode username
	const username = 'zimmMK';

	let profileData: {
		username: string;
		totalSolved: number;
		easySolved: number;
		mediumSolved: number;
		hardSolved: number;
		acceptanceRate: number;
		ranking: number;
		contributionPoints: number;
		reputation: number;
	} | null = null;
	let loading = true;
	let error: string | null = null;

	$: solved = profileData?.totalSolved ?? 0;
	$: total =
		(profileData?.easySolved ?? 0) +
		(profileData?.mediumSolved ?? 0) +
		(profileData?.hardSolved ?? 0);
	$: percent = total > 0 ? Math.round((solved / total) * 100) : 0;

	async function fetchLeetCodeProfile() {
		try {
			const response = await fetch(
				`https://alfa-leetcode-api.onrender.com/userProfile/${username}`
			);
			if (!response.ok) {
				throw new Error(`Error fetching data: ${response.statusText}`);
			}
			profileData = await response.json();
		} catch (err: any) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchLeetCodeProfile();
	});
</script>

{#if loading}
	<div class="leetcode-card"><p>Loading LeetCode profile...</p></div>
{:else if error}
	<div class="leetcode-card"><p class="error">Error: {error}</p></div>
{:else if profileData}
	<div class="leetcode-card">
				<div class="rank absolute md:top-1/12 top-0 left-1/12">#{profileData.ranking}</div>

		<div class="header">
			<div class="progress-ring">
				{#key profileData.totalSolved}
					<svg viewBox="0 0 60 60" width="90" height="90" style="transform: rotate(0deg);">
						<circle
							r="26"
							cx="30"
							cy="30"
							fill="none"
							stroke="#FFC700"
							stroke-width="4"
							stroke-dasharray={2 * Math.PI * 26}
							stroke-dashoffset={2 * Math.PI * 26 * (1 - solved / total)}
							stroke-linecap="round"
							style="transition: stroke-dashoffset 5s; filter: drop-shadow(0 0 1px #FFC70088);"
						/>
						<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">{solved}</text>
					</svg>
				{/key}
			</div>
			<div>
				<div class="username">{profileData.username}</div>
			</div>
		</div>
		<div class="bar-labels">
			<div class="bar-row">
				<span class="stat-label" style="color:#4ade80">Easy</span>
				<span class="stat-value">{profileData.easySolved} / 880</span>
				<div class="bar">
					<div
						class="bar-inner bar-easy"
						style="width: {Math.round((profileData.easySolved / 880) * 100)}%"
					></div>
				</div>
			</div>
			<div class="bar-row">
				<span class="stat-label" style="color:#fbbf24">Medium</span>
				<span class="stat-value">{profileData.mediumSolved} / 1852</span>
				<div class="bar">
					<div
						class="bar-inner bar-medium"
						style="width: {Math.round((profileData.mediumSolved / 1852) * 100)}%"
					></div>
				</div>
			</div>
			<div class="bar-row">
				<span class="stat-label" style="color:#f87171">Hard</span>
				<span class="stat-value">{profileData.hardSolved} / 839</span>
				<div class="bar">
					<div
						class="bar-inner bar-hard"
						style="width: {Math.round((profileData.hardSolved / 839) * 100)}%"
					></div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.leetcode-card {
		background: #181a20;
		color: #fff;
		border-radius: 1.5rem;
		box-shadow: 0 4px 32px 0 #000a;
		padding: 2rem;
		margin: 0 auto;
		font-family: 'Inter', Arial, sans-serif;
		position: relative;
		width: 100%;
		box-sizing: border-box;
	}

	/* Width adjustments */
	@media (min-width: 768px) {
		.leetcode-card {
			max-width: 600px;
		}
	}
	@media (min-width: 1024px) {
		.leetcode-card {
			max-width: 100%;
			display: flex;
			justify-content: space-between;
			gap: 2rem;
		}
	}

	.header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.2rem;
		flex: 1;
	}

	.username {
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: 0.01em;
		word-break: break-word;
	}

	.rank {
		margin-left: auto;
		font-size: 1.1rem;
		color: #ffd700;
		font-weight: 600;
	}

	.progress-ring {
		width: 90px;
		height: 90px;
		margin-right: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	svg {
		width: 90px;
		height: 90px;
		transform: rotate(-90deg);
	}
	text {
		font-size: 1.4rem;
		font-weight: 700;
		fill: #fff;
		dominant-baseline: middle;
		alignment-baseline: middle;
	}

	.bar-labels {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-bottom: 0.5rem;
	}

	.bar-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.3rem;
		flex-wrap: wrap;
	}

	.bar {
		flex: 1;
		height: 7px;
		border-radius: 4px;
		background: #23272f;
		overflow: hidden;
		position: relative;
	}

	.bar-inner {
		height: 100%;
		border-radius: 4px;
		transition: width 0.7s cubic-bezier(0.4, 2, 0.6, 1);
	}

	.bar-easy {
		background: linear-gradient(90deg, #4ade80, #22c55e);
	}
	.bar-medium {
		background: linear-gradient(90deg, #fbbf24, #f59e42);
	}
	.bar-hard {
		background: linear-gradient(90deg, #f87171, #ef4444);
	}

	.stat-label {
		font-size: 1rem;
		font-weight: 500;
		min-width: 60px;
	}
	.stat-value {
		font-size: 1rem;
		font-weight: 600;
		min-width: 60px;
	}
</style>
