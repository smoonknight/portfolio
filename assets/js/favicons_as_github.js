const username = 'smoonknight';
const apiUrl = `https://api.github.com/users/${username}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const avatarUrl = data.avatar_url;

    // Mengubah favicon
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = avatarUrl;
    }

    // Mengubah apple-touch-icon
    const appleTouchIcon = document.querySelector("link[rel='apple-touch-icon']");
    if (appleTouchIcon) {
      appleTouchIcon.href = avatarUrl;
    }
  })
  .catch(error => console.error('Error fetching avatar:', error));
