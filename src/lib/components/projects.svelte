<script lang="ts">
	import { projects } from '$lib/jsons/projects.js';
</script>

<h1 class="px-4 lg:px-6 text-2xl font-bold">Projects</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 px-4 lg:px-6">
	{#each projects as project}
		<div
			class="bg-gray-50 dark:bg-neutral-950 border hover:bg-gray-200 dark:hover:bg-neutral-900 border-black/[0.08] dark:border-white/[0.12] rounded-2xl p-4 shadow transition-all duration-300 flex flex-col h-full transform-gpu hover:scale-105 hover:z-10 hover:shadow-[0_0_32px_0_rgba(34,211,238,0.18)] dark:hover:shadow-[0_0_20px_0px_rgba(34,211,238,0.22)] relative"
		>
			<!-- Open in new tab icon -->
			<a
				href={project.status === 'private' ? project.llink : project.rlink}
				target="_blank"
				rel="noopener noreferrer"
				class="absolute top-3 right-3 text-neutral-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
				aria-label={project.status === 'private' ? 'Open Live Demo in new tab' : 'Open View Code in new tab'}
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M14 3h7m0 0v7m0-7L10 17M5 21h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z"/></svg>
			</a>
			<div class="text-xl font-bold text-neutral-700 dark:text-white mb-2">{project.title}</div>
			<img
				src={project.image}
				alt="thumbnail"
				class="h-60 w-full rounded-xl object-cover mb-4 shadow-sm ring-1 ring-neutral-400 dark:ring-neutral-400"
				width="1000"
				height="1000"
			/>
			<div class="text-sm text-neutral-500 dark:text-neutral-300 mb-1">
				<strong>Technologies:</strong> {project.technologies.join(', ')}
			</div>
			<div class="text-sm text-neutral-500 dark:text-neutral-300 mb-2">
				<strong>Role:</strong> {project.role}
			</div>
			<div class="mt-auto flex flex-col gap-2">
				{#if project.status === 'private'}
					<a
						href={project.llink}
						target="_blank"
						class="inline-block text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
					>
						Live Demo
					</a>
				{:else}
					<a
						href={project.rlink}
						target="_blank"
						class="inline-block text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
					>
						View Code
					</a>
				{/if}
			</div>
		</div>
	{/each}
</div>
