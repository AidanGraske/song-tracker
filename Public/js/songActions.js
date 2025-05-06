
console.log("songActions.js loaded");


async function handleListen(songId) {
    try {
      const res = await fetch(`/songs/listen/${songId}`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.recommended) {
        document.getElementById('recommendation').innerText =
          `🎶 You've listened 5 times! Try: ${data.recommended.title} by ${data.recommended.artist}`;
      } else {
        location.reload();
      }
    } catch (err) {
      alert('Error listening to song');
    }
  }
  
  async function handleDelete(songId) {
    try {
      const res = await fetch(`/songs/listen/${songId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      alert(data.message);
      location.reload();
    } catch (err) {
      alert('Error deleting listen record');
    }
  }
  