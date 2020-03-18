$(document).ready(function () {

    $('.input-focus').on('click', function () {
        $(this).children('input').focus();
    });

    $('.clockpicker').clockpicker();

    // Function to format labels of the alarms 
    function formatLabel(str, maxwidth) {
        var sections = [];
        var words = str.split(" ");
        var temp = "";

        words.forEach(function (item, index) {
            if (temp.length > 0) {
                var concat = temp + ' ' + item;
                if (concat.length > maxwidth) {
                    sections.push(temp);
                    temp = "";
                }
                else {
                    if (index == (words.length - 1)) {
                        sections.push(concat);
                        return;
                    }
                    else {
                        temp = concat;
                        return;
                    }
                }
            }

            if (index == (words.length - 1)) {
                sections.push(item);
                return;
            }

            if (item.length < maxwidth) {
                temp = item;
            }
            else {
                sections.push(item);
            }

        });

        return sections;
    }


    var data = {
        labels: ["8ST00: Door 02 open (+ST00-FQ02)", "ST06: Quality - NOK counter reached", "ST00: Box 1 full (box change, 3 seconds)", "ST01: Feed female housing type NOK, remove part (+ST01-BG03)", "ST00: Box 1 full (box change, 3 seconds)", "ST00: Box 1 full (box change, 3 seconds)", "ST00: Box 1 full (box change, 3 seconds)", "ST00: Box 1 full (box change, 3 seconds)", "ST00: Box 1 full (box change, 3 seconds)", "ST00: Box 1 full (box change, 3 seconds)"],
        datasets: [{
            type: "line",
            borderColor: "#FF9300",

            backgroundColor: "#FF9300",
            pointBorderWidth: 5,
            fill: false,
            data: [17.07, 32.04, 46.05, 57.9, 68.9, 77.60, 84.00, 89.36, 95.00, 100.00],
            yAxisID: 'y-axis-2'
        }, {
            type: "bar",
            borderColor: "rgba(40,53,147 ,1)",
            borderWidth: 3,
            backgroundColor: "rgba(40,53,147 ,0.7)",
            data: [16, 14, 11, 9, 8, 6, 5, 4, 2, 1],
            yAxisID: 'y-axis-1'
        }]
    };

    var data2 = {
        labels: ["H392", "H393", "H394", "H412", "H442", "H452", "H454"],
        datasets: [{
            type: "line",
            borderColor: "#FF9300",

            backgroundColor: "#FF9300",
            pointBorderWidth: 5,
            fill: false,
            data: [17.07, 32.04, 46.05, 57.9, 68.9, 77.60, 84.00, 89.36, 95.00, 100.00],
            yAxisID: 'y-axis-2'
        }, {
            type: "bar",
            borderColor: "rgba(40,53,147 ,1)",
            borderWidth: 3,
            backgroundColor: "rgba(40,53,147 ,0.7)",
            data: [16, 14, 11, 9, 8, 6, 5, 4, 2, 1],
            yAxisID: 'y-axis-1'
        }]
    };

    var options = {

        scales: {
            xAxes: [{
                ticks: {
                    fontSize: 11,
                    maxRotation: 0,
                    minRotation: 0,
                    callback: function (value, index, values) {
                        var formmatedvalue = formatLabel(value, 15);
                        return formmatedvalue;
                    }
                },
                stacked: false,
                scaleLabel: {
                    display: false,
                    labelString: "Alarms"
                }
            }],

            yAxes: [{
                gridLines: {
                    display: false
                },
                type: "linear",
                position: "left",
                id: "y-axis-1",
                stacked: false,
                ticks: {
                    suggestedMin: 0
                },
                scaleLabel: {
                    display: true,
                    labelString: ""
                }
            }, {
                type: "linear",
                position: "right",
                id: "y-axis-2",
                ticks: {
                    suggestedMin: 0,
                    callback: function (value) {
                        return value + "%";
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: ""
                }
            }]
        },
        legend: {
            display: false
        },
    };


    window.onload = function () {
        var ctx = document.getElementById("myChart").getContext("2d");

        window.myBar = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });

        var ctx2 = document.getElementById("myChart2").getContext("2d");

        window.myBar = new Chart(ctx2, {
            type: 'bar',
            data: data2,
            options: options
        });

        var ctx3 = document.getElementById("myChart3").getContext("2d");

        window.myBar = new Chart(ctx3, {
            type: 'bar',
            data: data2,
            options: options
        });
    };




});
