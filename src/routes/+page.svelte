<script lang="ts">
	// Lucide Svelte
	// @ts-ignore
	import { Home, PencilLine, TvMinimalPlay, Github, Linkedin, Mails } from 'lucide-svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	//   Major Components
	import Dock from '$lib/Dock.svelte';
	import DockIcon from '$lib/DockIcon.svelte';
	import Projects from '$lib/components/projects.svelte';
	import Experiences from '$lib/components/customui/HoverCard.svelte';
	import Coding from '$lib/components/coding.svelte';

	let navs = {
		navbar: [
			{ label: 'Home', icon: Home, href: '#' },
			{ label: 'Blog', icon: PencilLine, href: '#' },
			{ label: 'Developer', icon: TvMinimalPlay, href: '#' }
		],
		contact: [
			{ label: 'Github', icon: Github, href: '#' },
			{ label: 'LinkedIn', icon: Linkedin, href: '#' },
			{ label: 'Email', icon: Mails, href: '#' }
		]
	};
	import data from '$lib/jsons/data.ts';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';
	import SectionCards from '$lib/components/section-cards.svelte';
</script>

<Sidebar.Provider
	style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
	<AppSidebar variant="inset" />
	<Sidebar.Inset>
		<SiteHeader />
		<div class="flex flex-1 flex-col">
			<div class="@container/main flex flex-1 flex-col gap-2">
				<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<SectionCards />
					<Experiences />
					<Projects />
					<Coding />
				</div>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
<div class="fixed right-1/2 left-1/2 bottom-1/20 z-50">
	<Dock
		direction="middle"
		class="absolute bottom-0 -translate-x-1/2"
		let:mouseX
		let:distance
		let:magnification
	>
		{#each navs.navbar as item}
			<DockIcon {mouseX} {magnification} {distance}>
				<svelte:component this={item.icon} size={22} strokeWidth={1.2} />
			</DockIcon>
		{/each}
		<Separator orientation="vertical" class="h-full w-[0.6px]" />
		{#each navs.contact as item}
			<DockIcon {mouseX} {magnification} {distance}>
				<svelte:component this={item.icon} size={22} strokeWidth={1.2} />
			</DockIcon>
		{/each}
	</Dock>
</div>
