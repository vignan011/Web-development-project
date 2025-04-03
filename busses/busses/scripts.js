

        function goBack() {
            const loginSection = document.getElementById('login');
            const routeSelection = document.getElementById('route-selection');
            const busDetails = document.getElementById('bus-details');
            const userTypeSelection = document.getElementById('user-type-selection');

            if (!loginSection.classList.contains('hidden')) {
                loginSection.classList.add('hidden');
                userTypeSelection.classList.remove('hidden');
            } else if (!routeSelection.classList.contains('hidden')) {
                routeSelection.classList.add('hidden');
                loginSection.classList.remove('hidden');
            } else if (!busDetails.classList.contains('hidden')) {
                busDetails.classList.add('hidden');
                routeSelection.classList.remove('hidden');
            }
        }

        function setUserType(type) {
            userType = type;
            document.getElementById('user-type-selection').classList.add('hidden');
            document.getElementById('login').classList.remove('hidden');
        }

        function handleLogin(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username && password) {
                document.getElementById('login').classList.add('hidden');
                document.getElementById('route-selection').classList.remove('hidden');

                // Clear the form fields after successful login
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
            } else {
                alert("Please enter valid credentials.");
            }
        }

        function getBusData(starting, ending) {
            // Sample bus data
            const buses = [
                {
                    start: 'gajuwaka',
                    end: 'yendada',
                    busNumber: '111V',
                    busName: 'Kurmanpalem to Vijayanagram',
                    seatsAvailable: 10,
                    totalWeight: 3000,
                    time: 5,
                    location: { lat: 17.683482975584397, lng: 83.19348885642955 }
                },
                {
                    start: 'yendada',
                    end: 'rtc complex',
                    busNumber: '222R',
                    busName: 'Tagarapuvalasa to RTC Complex',
                    seatsAvailable: 5,
                    totalWeight: 3500,
                    time: 8,
                    location: { lat: 17.797372627588604, lng: 83.2095 }
                }
            ];

            return buses.filter(bus =>
                bus.start.toLowerCase() === starting.toLowerCase() &&
                bus.end.toLowerCase() === ending.toLowerCase()
            );
        }

        function displayBuses(buses) {
            const busList = document.getElementById('bus-list');
            busList.innerHTML = '';

            if (buses.length > 0) {
                buses.forEach(bus => {
                    const busInfo = document.createElement('div');
                    busInfo.className = 'bus-info';
                    busInfo.innerHTML = `
                        <strong>Bus Number:</strong> ${bus.busNumber}<br>
                        <strong>Bus Name:</strong> ${bus.busName}<br>
                        <strong>Seats Available:</strong> ${bus.seatsAvailable}<br>
                        <strong>Arriving in:</strong> ${bus.time} minutes<br>
                        <strong>Total Weight:</strong> ${bus.totalWeight} kg<br>
                        <button onclick="viewLocation(${bus.location.lat}, ${bus.location.lng})">View Location</button>
                    `;
                    busList.appendChild(busInfo);
                });
            } else {
                busList.innerHTML = '<p>No buses available for the selected route.</p>';
            }
        }

        function getBuses() {
            const startingPoint = document.getElementById('starting-point').value.trim();
            const endingPoint = document.getElementById('ending-point').value.trim();

            if (!startingPoint || !endingPoint) {
                alert('Please enter both starting and ending points.');
                return;
            }

            const buses = getBusData(startingPoint, endingPoint);
            displayBuses(buses);
            document.getElementById('route-selection').classList.add('hidden');
            document.getElementById('bus-details').classList.remove('hidden');
        }

        function viewLocation(lat, lng) {
            const url = `https://www.google.com/maps?q=${lat},${lng}`;
            window.open(url, '_blank'); // Open Google Maps in a new tab
        }
        
   