<script>
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  let { children } = $props();
</script> 
<ModeWatcher defaultMode={"system"} themeColors={{ dark: "black", light: "white" }} />
{@render children?.()}