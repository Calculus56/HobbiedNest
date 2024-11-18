window.onload = function() {
    const ctx = document.getElementById('hoursChart').getContext('2d');
    const hoursChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Drawing', 'Cycling', 'Reading'],
            datasets: [{
                label: 'Total Hours',
                // The different values of the pie chart
                data: [80, 60, 50], 
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
};