console.log("Asset JS");



async function plot_graph() {
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
                    text: 'Monthly Average New Customer Acquisition'
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
                    text: 'Repeat Customer analysis'
                }
            }
        }
    })

    let ctx3 = document.getElementById('charts-3');
    data_chart3 =  {
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
    let chart3 = new Chart(ctx3, {
        type: 'bar',
        data: data_chart3,
        options: {
            responsive: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Active Customer Analysis'
                }
            }
        }
    })

    let ctx4 = document.getElementById('charts-4');
    data_chart4 =  {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'One Time',
                data: Object.values(data),
                backgroundColor: [
                    'rgba(141, 141, 255, 0.74)'
                  ],
                borderColor: [
                'rgb(0, 79, 176)'
                ],
                borderWidth: 1
            },
            {
            label: '2-4 Times',
            data: Object.values(data),
            backgroundColor: [
                'rgba(248, 83, 92, 0.74)'
                ],
            borderColor: [
            'rgb(178, 20, 6)'
            ],
            borderWidth: 1
            },
            {
            label: '>= 5 Times',
            data: Object.values(data),
            backgroundColor: [
                'rgba(31, 236, 56, 0.48)'
                ],
            borderColor: [
            'rgb(19, 174, 78)'
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
                    text: 'Percentage of Sales to X-time Customer'
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
                    text: 'Monthly Average Sales YTD'
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
                    text: 'Average Discount to Sales'
                }
            }
        }
    })
}

plot_graph()




