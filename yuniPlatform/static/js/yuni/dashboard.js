console.log("Dahboard JS");
// Create dom object here
// var activeNavMenu = document.querySelector(".dashboard");

// // Page general
// activeNavMenu.classList.add("active");

// Initialize and add the map
async function initMap() {
// get data db
    const response = await fetch("api/get_branch_coordinates");
    var data = await response.json();
    lat_center = 0
    lng_center = 0

    for (var k in data) {
        lat_center += parseFloat(data[k]['lat']);
        lng_center += parseFloat(data[k]['lng']);
    }
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: {"lat": lat_center/Object.keys(data).length, "lng": lng_center/Object.keys(data).length},
        mapTypeId: 'terrain'
        });
    for (var k in data) {
        key = k;
        // The marker, positioned at Stores
        const marker = new google.maps.Marker({
            position: data[key],
            map: map,
            title: key
        });
    }
};


async function plot_chart() {
// get data db
    const response = await fetch("api/ranking_by_average_new_monthly_acquisition");
    var data = await response.json();
    console.log(data)
    let ctx1 = document.getElementById('charts-1');
    data_chart1 =  {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Customer Count',
            data: Object.values(data),
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)'
              ],
            borderColor: [
            'rgb(54, 162, 235)'
            ],
            borderWidth: 1
          }
        ]
      };
    let chart1 = new Chart(ctx1, {
        type: 'bar',
        data: data_chart1,
        options: {
            responsive: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Average New Monthly Customers'
                }
            }
        }
    })

    let ctx2 = document.getElementById('charts-2');
    data_chart2 =  {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Customer Count',
                data: Object.values(data),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                  ],
                borderColor: [
                'rgb(54, 162, 235)'
                ],
                borderWidth: 1
            }
        ]
      };
    let chart2 = new Chart(ctx2, {
        type: 'bar',
        data: data_chart2,
        options: {
            responsive: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Repeat customers YTD'
                }
            }
        }
    })

    let ctx3 = document.getElementById('charts-3');
    data_chart3 =  {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'in Rupees',
                data: Object.values(data),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                  ],
                borderColor: [
                'rgb(54, 162, 235)'
                ],
                borderWidth: 1
              }
        ]
      };
    let chart3 = new Chart(ctx3, {
        type: 'bar',
        data: data_chart3,
        options: {
            responsive: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Monthly Average Sales YTD'
                }
            }
        }
    })

    let ctx4 = document.getElementById('charts-4');
    data_chart4 =  {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'in Rupees',
                data: Object.values(data),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                  ],
                borderColor: [
                'rgb(54, 162, 235)'
                ],
                borderWidth: 1
              }
        ]
      };
    let chart4 = new Chart(ctx4, {
        type: 'bar',
        data: data_chart4,
        options: {
            responsive: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Average Basket Size YTD'
                }
            }
        }
    })

    let ctx6 = document.getElementById('charts-6');
    data_chart6 =  {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'in Rupees',
                data: Object.values(data),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                  ],
                borderColor: [
                'rgb(54, 162, 235)'
                ],
                borderWidth: 1
              }
        ]
      };
    let chart6 = new Chart(ctx6, {
        type: 'bar',
        data: data_chart6,
        options: {
            responsive: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Highest sales value YTD'
                }
            }
        },
    })

    let ctx5 = document.getElementById('charts-5');
    data_chart5 =  {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Percentage Discount',
                data: Object.values(data),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                  ],
                borderColor: [
                'rgb(54, 162, 235)'
                ],
                borderWidth: 1
              }
        ]
      };
    let chart5 = new Chart(ctx5, {
        type: 'bar',
        data: data_chart5,
        options: {
            responsive: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Average percent promotional discount to realize sales'
                }
            }
        }
    })
}

plot_chart()




