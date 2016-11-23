
// $(document).ready(function() {
// // google.charts.load('current', {'packages':['line','corechart']});
//     // radychart1(); 
    
// });


function search_date(){
 // console.log('ssssssss') 
 $("#date").click(function() {
    var day = $("#date_input").val();
          // console.log(day)
      obj = {};
      obj.day = day;
      // console.log(obj)
          $.post("/users/search", obj).done(function (result) {
                  // console.log(result)
                  summer(result);
          });
        });
}

                        
                    
function click_all(){
     $.get('/users/google',function(result){
     console.log(result)
               summer(result);

    });
}
 

function compare_date(){
 // console.log('ssssssss')
 $("#date_compare").click(function() {
    var c_date1 = $("#compare_date1").val();
    var c_date2 = $("#compare_date2").val();

      obj = {};
      obj.c_date1 = c_date1;
      obj.c_date2 = c_date2;
       console.log(obj)
          $.post("/users/compare_o", obj).done(function (data_o) {
                  // console.log(data_o)
                  summer_compare_date1(data_o);
          });

          $.post("/users/compare_t", obj).done(function (data_t) {
                  // console.log(data_t)
                  summer_compare_date2(data_t);
          });
  });
    
}

google.charts.load('current', {'packages':['corechart','line','bar']});
google.charts.setOnLoadCallback(search_date,click_all);
     
function summer(result){
             // console.log('summer',result)
  
  

    var data = new google.visualization.DataTable();
        data.addColumn('string', 'Time of Day');
        //data.addColumn('number', 'Day');
        data.addColumn('number', 'Set');
        data.addColumn('number', 'Set50');
        data.addColumn('number', 'Set100');
        data.addColumn('number', 'SetHD');
        data.addColumn('number', 'mai');

        data.addRows(result); 
            // data.addRows([
            //   [1,  37.8, 80.8, 41.8,33],
            //   [2,  30.9, 69.5, 32.4,22],
            //   [3,  25.4,   57, 25.7,44],
            //   [4,  11.7, 18.8, 10.5,13],
            //   [5,  11.9, 17.6, 10.4,21]
            // ]);
        var options = {
              title: 'ตลาดหลักทรัพย์',
              width: 1100,
              height: 500,

              chart: { subtitle: 'popularity by percentage' },
              hAxis: { slantedText: true },
              vAxis: {minValue: 0}
        };

        var chart_line = new google.visualization.LineChart(document.getElementById('chart_line'));
        chart_line.draw(data, options);


        var chart_Area = new google.visualization.AreaChart(document.getElementById('chart_Area'));
        chart_Area.draw(data, options);


        var chart_stacked = new google.visualization.ColumnChart(document.getElementById('chart_stacked'));
            chart_stacked.draw(data, options);
                  // var chart_div = new google.visualization.ComboChart(document.getElementById('chart_div'));
                  //     chart_div.draw(data, options);
}  

google.charts.setOnLoadCallback(compare_date);
function summer_compare_date1(data_o){
             // console.log('summer',result)


     

    var data = new google.visualization.DataTable();
        data.addColumn('string', 'Time of Day');
        //data.addColumn('number', 'Day');
        data.addColumn('number', 'Set');
        data.addColumn('number', 'Set50');
        data.addColumn('number', 'Set100');
        data.addColumn('number', 'SetHD');
        data.addColumn('number', 'mai');

        data.addRows(data_o); 

        
            // data.addRows([
            //   [1,  37.8, 80.8, 41.8,33],
            //   [2,  30.9, 69.5, 32.4,22],
            //   [3,  25.4,   57, 25.7,44],
            //   [4,  11.7, 18.8, 10.5,13],
            //   [5,  11.9, 17.6, 10.4,21]
            // ]);
        var options_compare1 = {
              title: 'ตลาดหลักทรัพย์',
              width: 1100,
              height: 500,

              chart: { subtitle: 'popularity by percentage' },
              hAxis: { slantedText: true },
              vAxis: {minValue: 0}
        };

        var chart_liner_compare1 = new google.visualization.LineChart(document.getElementById('chart_liner_compare1'));
        chart_liner_compare1.draw(data, options_compare1);

        var chart_Area_compare1 = new google.visualization.AreaChart(document.getElementById('chart_Area_compare1'));
        chart_Area_compare1.draw(data, options_compare1);

        
}  

google.charts.setOnLoadCallback(compare_date);

function summer_compare_date2(data_t){
             // console.log('summer',result)


     

    var data = new google.visualization.DataTable();
        data.addColumn('string', 'Time of Day');
        //data.addColumn('number', 'Day');
        data.addColumn('number', 'Set');
        data.addColumn('number', 'Set50');
        data.addColumn('number', 'Set100');
        data.addColumn('number', 'SetHD');
        data.addColumn('number', 'mai');

        

        data.addRows(data_t); 
            // data.addRows([
            //   [1,  37.8, 80.8, 41.8,33],
            //   [2,  30.9, 69.5, 32.4,22],
            //   [3,  25.4,   57, 25.7,44],
            //   [4,  11.7, 18.8, 10.5,13],
            //   [5,  11.9, 17.6, 10.4,21]
            // ]);
        var options_compare2 = {
              title: 'ตลาดหลักทรัพย์',
              width: 1100,
              height: 500,

              chart: { subtitle: 'popularity by percentage' },
              hAxis: { slantedText: true },
              vAxis: {minValue: 0}
        };

        

        var chart_liner_compare2 = new google.visualization.LineChart(document.getElementById('chart_liner_compare2'));
        chart_liner_compare2.draw(data, options_compare2);

        var chart_Area_compare2 = new google.visualization.AreaChart(document.getElementById('chart_Area_compare2'));
        chart_Area_compare2.draw(data, options_compare2);
}  

function chart_line(){
 // google.charts.setOnLoadCallback(drawChart1);
    document.getElementById("chart_line").style.display = 'block';
    document.getElementById("chart_Area").style.display = 'none';
    document.getElementById("chart_stacked").style.display = 'none';
    document.getElementById("chart_div").style.display = 'none';
    // document.getElementById("chart_liner_compare1").style.display = 'none';
    // document.getElementById("chart_liner_compare2").style.display = 'none';
    // document.getElementById("chart_Area_compare1").style.display = 'none';
    // document.getElementById("chart_Area_compare2").style.display = 'none';
    //console.log('a')
} 

function chart_Area(){

  // google.charts.setOnLoadCallback(drawChart2);
    document.getElementById("chart_Area").style.display = 'block';
    document.getElementById("chart_line").style.display = 'none';
    document.getElementById("chart_stacked").style.display = 'none';
    document.getElementById("chart_div").style.display = 'none';
    // document.getElementById("chart_liner_compare1").style.display = 'none';
    // document.getElementById("chart_liner_compare2").style.display = 'none';
    // document.getElementById("chart_Area_compare1").style.display = 'none';
    // document.getElementById("chart_Area_compare2").style.display = 'none';
     //console.log('b')
} 

function chart_stacked(){

  // google.charts.setOnLoadCallback(drawChart2);
    document.getElementById("chart_stacked").style.display = 'block';
    document.getElementById("chart_Area").style.display = 'none';
    document.getElementById("chart_line").style.display = 'none';
    document.getElementById("chart_div").style.display = 'none';
    // document.getElementById("chart_liner_compare1").style.display = 'none';
    // document.getElementById("chart_liner_compare2").style.display = 'none';
    //console.log('c')
} 
function chart_liner_compare(){
 // google.charts.setOnLoadCallback(drawChart1);
    document.getElementById("chart_line").style.display = 'none';
    document.getElementById("chart_Area").style.display = 'none';
    document.getElementById("chart_stacked").style.display = 'none';
    document.getElementById("chart_div").style.display = 'none';
    document.getElementById("chart_Area_compare1").style.display = 'none';
    document.getElementById("chart_Area_compare2").style.display = 'none';
    document.getElementById("chart_liner_compare1").style.display = 'block';
    document.getElementById("chart_liner_compare2").style.display = 'block';
    //console.log('a')
} 
function chart_Area_compare(){
 // google.charts.setOnLoadCallback(drawChart1);
    document.getElementById("chart_line").style.display = 'none';
    document.getElementById("chart_Area").style.display = 'none';
    document.getElementById("chart_stacked").style.display = 'none';
    document.getElementById("chart_div").style.display = 'none';
    document.getElementById("chart_liner_compare1").style.display = 'none';
    document.getElementById("chart_liner_compare2").style.display = 'none';
    document.getElementById("chart_Area_compare1").style.display = 'block';
    document.getElementById("chart_Area_compare2").style.display = 'block';
    //console.log('a')
} 

