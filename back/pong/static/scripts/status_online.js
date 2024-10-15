// Script to detect user status (online, offline, is_playing)
function runsocketStatus() {

    let url = `wss://${window.location.host}/ws/status/`
    const statusSock = new WebSocket(url);

    statusSock.onopen = function (event) {
        console.log('Status_indicator socket is open.');
    };

    statusSock.onmessage = function(event) {

        let data = JSON.parse(event.data)
        // console.log('Data received in front is : ', data);
        if (data.type == 'status_update') {

            var statusIndicator = document.getElementById('status-indicator-' + data.user_id);
            if (statusIndicator) {

                if (data.status === 'is_online') {
                    statusIndicator.classList.remove('border', 'border-2', 'border-danger'); 
                    statusIndicator.classList.add('border', 'border-2', 'border-primary'); // bordure verte
                }
                else if (data.status === 'is_playing') {
                    statusIndicator.classList.remove('border', 'border-2', 'border-primary'); 
                    statusIndicator.classList.add('border', 'border-2', 'border-danger'); // bordure bleue
                }
                else if (data.status === 'is_offline') {
                    statusIndicator.classList.remove('border', 'border-2', 'border-primary', 'border-danger'); // sans bordure
                }

            }
            else {
                console.log('Status Indicator Element not found for user', data.user_id);
            }
        }
    };

    statusSock.onclose = function(event) {
        console.log('Status_indicator socket is closed');
    };
}

document.addEventListener('DOMContentLoaded', (event) => {
    runsocketStatus();
});