$(document).ready(function () {

    // Inputs icons
    $('.input-focus').on('click', function () {
        $(this).children('input').focus();
    });

    // Initialize the clockpcker for the time inputs.
    $('.clockpicker').clockpicker();

    // Function to format labels of the alarms in the charts
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

    
    // Test data of in the main Pareto chart.
    // This code will can be useful on the develop of the backend.
    var data = {

        // Labels of the alarm names.
        // These labels will cane be changed for an array with a query from any database.
        labels: ["8ST00: Door 02 open (+ST00-FQ02)", "ST06: Quality - NOK counter reached", "ST00: Box 1 full (box change, 3 seconds)", "ST01: Feed female housing type NOK, remove part (+ST01-BG03)", "ST00: Box 1 full (box change, 3 seconds)", "ST00: Box 1 full (box change, 3 seconds)", "ST00: Box 1 full (box change, 3 seconds)", "ST00: Box 1 full (box change, 3 seconds)", "ST00: Box 1 full (box change, 3 seconds)", "ST00: Box 1 full (box change, 3 seconds)"],
        
        // Line chart of Pareto.
        datasets: [{
            type: "line",
            borderColor: "#FF9300",

            backgroundColor: "#FF9300",
            pointBorderWidth: 5,
            fill: false,
            data: [17.07, 32.04, 46.05, 57.9, 68.9, 77.60, 84.00, 89.36, 95.00, 100.00], // This array can be changed for a query from the database.
            yAxisID: 'y-axis-2'
        }, {

            // Bar chart of the alarms.
            type: "bar",
            borderColor: "rgba(40,53,147 ,1)",
            borderWidth: 3,
            backgroundColor: "rgba(40,53,147 ,0.7)",
            data: [16, 14, 11, 9, 8, 6, 5, 4, 2, 1], // This array can be changed for a query from the database.
            yAxisID: 'y-axis-1'
        }]
    };

    // Test data for the Frecuency chart
    // This code will can be useful on the develop of the backend.
    var data2 = {

        // Labels of the Machines names.
        labels: ["H392", "H393", "H394", "H412", "H442", "H452", "H454"],  // This array can be changed for a query from the database.
        datasets: [{

            // Line chart of Parerto.
            type: "line",
            borderColor: "#FF9300",

            backgroundColor: "#FF9300",
            pointBorderWidth: 5,
            fill: false,
            data: [32.04, 58.05, 70.9, 80.60, 88.00, 95.00, 100.00],  // This array can be changed for a query from the database.
            yAxisID: 'y-axis-2'
        }, {

            // Bar chart of the machines.
            type: "bar",
            borderColor: "rgba(40,53,147 ,1)",
            borderWidth: 3,
            backgroundColor: "rgba(40,53,147 ,0.7)",
            data: [16, 14, 11, 9, 8, 6, 5, 4, 2, 1],  // This array can be changed for a query from the database.
            yAxisID: 'y-axis-1'
        }]
    };

    // Options for better visualization.
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


    // Function that load all charts on load de main page.
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
            data: data,
            options: options
        });

       
    };

});

// Function test to change the titles after clicking in any elemento of the machines check list.


function selectedMachine(){

    var favorite = [];
    $.each($("input[name='customSwitch']:checked"), function(){
        favorite.push($(this).val());
        
        document.getElementById("title_machines").innerHTML = "Selected " +favorite.join(", ");
        document.getElementById("frequency_title").innerHTML = "- " +favorite.join(", ");
        //document.getElementById("consumption_title").innerHTML = "- " +favorite.join(", ");
    });

    $.each($("input[name='customSwitch']"), function(){
        favorite.push($(this).val());
        if(favorite.length == 1){
            document.getElementById("title_machines").innerHTML = "All Machines";
            document.getElementById("frequency_title").innerHTML = "- All Machines";
       // document.getElementById("consumption_title").innerHTML = "- All Machines";
        }
    });
}

// Functions test to change the date labels after clicking on the filter button.
function filterDashboard(){
    let startDate = document.getElementById("startDate").value;
    let startTime = document.getElementById("startTime").value;
    let endDate = document.getElementById("endDate").value;
    let endTime = document.getElementById("endTime").value;
    
    document.getElementById("filter_text").innerHTML = startDate+", "+startTime+" - "+endDate+", "+endTime
    document.getElementById("frequency_filter").innerHTML = startDate+", "+startTime+" - "+endDate+", "+endTime
    //document.getElementById("consumption_filter").innerHTML = startDate+", "+startTime+" - "+endDate+", "+endTime
}

function filterDashboardMachine(){
    let startDate = document.getElementById("startDate").value;
    let startTime = document.getElementById("startTime").value;
    let endDate = document.getElementById("endDate").value;
    let endTime = document.getElementById("endTime").value;
    
    document.getElementById("resume_machine").innerHTML = startDate+", "+startTime+" - "+endDate+", "+endTime
    
}