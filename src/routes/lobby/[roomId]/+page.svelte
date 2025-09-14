<script lang="ts">
  import { page } from '$app/stores';
  $: roomId = $page.params.roomId;
</script>

<h2>Lobby: {roomId}</h2>
<p>Waiting room. Multiplayer setup will appear here.</p>
