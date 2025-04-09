async function getSunsetTime() {
    try {
        // Get user's location
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const latitude = data.latitude;
        const longitude = data.longitude;
        const location = data.city + ', ' + data.region;

        // Fetch sunset time
        const sunsetResponse = await fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`);
        const sunsetData = await sunsetResponse.json();
        const sunsetTime = new Date(sunsetData.results.sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Update the DOM
        document.getElementById('loc').innerText = location;
        document.getElementById('time').innerText = sunsetTime;

        // Start sunset animation
        startSunsetAnimation();
    } catch (error) {
        console.error('Error fetching sunset time:', error);
    }
}

function startSunsetAnimation() {
    const sun = document.getElementById('sun');
    sun.style.animation = 'sunset 10s linear forwards';
}

document.addEventListener('DOMContentLoaded', getSunsetTime);