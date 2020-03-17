$(document).ready(function() {

    $('.input-focus').on('click', function() {
      $(this).children('input').focus();
    });

    $('.clockpicker').clockpicker();

    var data = {
        labels: ["8","7","9","11","10"],
        datasets: [{
            type: "line",
            label: "Line",
            borderColor: "#FF9300",
            backgroundColor: "#FF9300",
            pointBorderWidth: 5,
            fill: false,
            data: [34.04,57.45,76.60,89.36,100.00],
            yAxisID: 'y-axis-2'
        },{
            type: "bar",
            label: "Bar",
            borderColor: "#4D35CB",
            backgroundColor: "#4D35CB",
            data: [16,11,9,6,5],
            yAxisID: 'y-axis-1'
        }]
    };

    var options = {
        scales: {
            xAxes: [{
                stacked: true,
                scaleLabel: {
                    display: true,
                    labelString: "Machines"
                }
            }],

            yAxes: [{
                type: "linear",
                position: "left",
                id: "y-axis-1",
                stacked: true,
                ticks: {
                    suggestedMin: 0
                },
                scaleLabel: {
                    display: true,
                    labelString: ""
                }
            },{
                type: "linear",
                position: "right",
                id: "y-axis-2",
                ticks: {
                    suggestedMin: 0,
                    callback: function(value) {
                        return value + "%";
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: ""
                }
            }]
        }
    };


    window.onload = function() {
        var ctx = document.getElementById("myChart").getContext("2d");

        window.myBar = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    };


});
