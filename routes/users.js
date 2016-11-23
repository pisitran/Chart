var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var unirest = require('unirest');
var DOMParser = require('xmldom').DOMParser;
var xpath = require('xpath');
var moment = require('moment');
var cron = require('node-schedule');
var schedule = require('node-schedule');
var later = require('later');
/* run the job at 18:55:30 on Dec. 14 2018*/



var pool  = mysql.createPool({
  connectionLimit : 100,
  connectTimeout  : 50000,
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'database'
});


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


var j = schedule.scheduleJob('0 9-16/1 * * 1-5', function(){
 // var j = schedule.scheduleJob('0 10-16/1 * * 1-5', function(){
    console.log('The 30th second of the minute.');

    unirest.get('http://marketdata.set.or.th/mkt/sectorialindices.do?language=en&country=US')
  // .header("User-Agent","Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36")


  .end(function(xpath_set) { 


                      var doc = new DOMParser().parseFromString(xpath_set.body);
                      var table_TS = xpath.select("//table",doc)

                      var table = new DOMParser().parseFromString(table_TS[0].toString());
                      var tbody_TS = xpath.select("//tbody",table);

                      var tbody = new DOMParser().parseFromString(tbody_TS[0].toString());
                      var td_TS = xpath.select("//td",tbody);

//*[@id="maincontent"]/div/div[1]/div/div/table/tbody/tr[1]/td[2]

                      var td_set = new DOMParser().parseFromString(td_TS[1].toString());
                      var xpath_set = xpath.select("//text()",td_set);

                      var td_set50 = new DOMParser().parseFromString(td_TS[9].toString());
                      var xpath_set50 = xpath.select("//text()",td_set50);

                      var td_set100 = new DOMParser().parseFromString(td_TS[17].toString());
                      var xpath_set100 = xpath.select("//text()",td_set100);

                      var td_setHD = new DOMParser().parseFromString(td_TS[25].toString());
                      var xpath_setHD = xpath.select("//text()",td_setHD);

                      var td_mai = new DOMParser().parseFromString(td_TS[33].toString());
                      var xpath_mai = xpath.select("//text()",td_mai);

               
                      var obj = {};
                      var now = new Date();
                      var set = Number(xpath_set.toString().replace(",",""));
                      var set50 = Number(xpath_set50.toString().replace(",",""));
                      var set100 = Number(xpath_set100.toString().replace(",",""));
                      var sethd = Number(xpath_setHD.toString().replace(",",""));
                      var mai = Number(xpath_mai.toString().replace(",",""));
                      
            
                      
                      
                      obj.day_ts = now;
                      obj.set = set;
                      obj.set50 = set50;
                      obj.set100 = set100;
                      obj.sethd = sethd;
                      obj.mai = mai;


           var sql = pool.query( 'INSERT INTO `database`.`google` SET ?',obj, function(err, result){
            // console.log(err)
            // console.log(result)
            });

  });
});


router.post('/search',function (req,res) {

    var DAY = req.body.day;
    var start = ' 09:00:00' ;
    var end = ' 16:00:00' ;

      pool.getConnection(function(err) {   
          if (err) {
             console.error('error connecting: ' + err.stack);
          }  
          pool.query('SELECT * FROM google WHERE day_ts BETWEEN "'+DAY+start+'" AND "'+DAY+end+'"', function(err, rows, fields) {
                if (rows == "") {
                  console.log('nulllllllllllllllllllllllllllll')
                }else{
                    var arr = []; 
                    var brr = [];
                    rows.forEach(function (data,i) { 
                      // console.log(test)  
                        arr = [ moment(data.day_ts).format('DD/MM, H:mm'),data.set,data.set50,data.set100,data.sethd,data.mai];
                      
                       console.log('as',arr)
                      
                        brr.push(arr);  
                      // console.log(brr)   
                            if(rows.length - 1 == i){

                                  res.send(brr);
                                  // console.log('as',brr)
                            }
                    }); 
                }
          });
      });
  
});



router.get('/google',function (req,res) {
    pool.getConnection(function(err) {

    if (err) {
      console.error('error connecting: ' + err.stack);
    }
   
    pool.query('SELECT * FROM google', function(err, rows, fields) {
      if (rows == "") {

                }else{
                    var arr = []; 
                    var brr = [];
                    rows.forEach(function (data,i) { 
                      // console.log(test)  
                        arr = [ moment(data.day_ts).format('DD/MM, H:mm'),data.set,data.set50,data.set100,data.sethd,data.mai];
                      
                       console.log('as',arr)
                      
                        brr.push(arr);  
                      // console.log(brr)   
                            if(rows.length - 1 == i){

                                  res.send(brr);
                                  // console.log('as',brr)
                            }
                    }); 
                }
          });
      });
  
});




router.post('/compare_o',function (req,res) {

  var compare_date1 = req.body.c_date1;
 var start = ' 09:00:00' ;
  var end = ' 16:00:00' ;   
       
 // console.log('aaaaaaaaaaaaaaaaaa',compare_date1)
    pool.getConnection(function(err) {

  
    if (err) {
      console.error('error connecting: ' + err.stack);
    }
   
        pool.query('SELECT * FROM google WHERE day_ts BETWEEN "'+compare_date1+start+'" AND "'+compare_date1+end+'"', function(err, rows, fields) {
                if (rows == "") {
                  console.log('nulllllllllllllllllllllllllllll')
                }else{
                    var arr = []; 
                    var brr = [];
                    rows.forEach(function (data,i) { 
                      // console.log(test)  
                        arr = [ moment(data.day_ts).format('DD/MM, H:mm'),data.set,data.set50,data.set100,data.sethd,data.mai];

                      
                        brr.push(arr);  
                      // console.log(brr)   
                            if(rows.length - 1 == i){

                                  res.send(brr);
                                  // console.log('as',brr)
                            }
                    }); 
                }
          });
      });
  
});


router.post('/compare_t',function (req,res) {

  var compare_date2 = req.body.c_date2;
  var start = ' 09:00:00' ;
  var end = ' 16:00:00' ;  

 // console.log('bbbbbbbbbbbbbb',compare_date2)
 pool.getConnection(function(err) {
     
       
    if (err) {
      console.error('error connecting: ' + err.stack);
    }
   
        pool.query('SELECT * FROM google WHERE day_ts BETWEEN "'+compare_date2+start+'" AND "'+compare_date2+end+'"', function(err, rows, fields) {
        if (rows == "") {
                  console.log('nulllllllllllllllllllllllllllll')
                }else{
                    var arr = []; 
                    var brr = [];
                    rows.forEach(function (data,i) { 
                      // console.log(test)  
                        arr = [ moment(data.day_ts).format('DD/MM, H:mm'),data.set,data.set50,data.set100,data.sethd,data.mai];
                      
                       console.log('as',arr)
                      
                        brr.push(arr);  
                      // console.log(brr)   
                            if(rows.length - 1 == i){

                                  res.send(brr);
                                  // console.log('as',brr)
                            }
                    }); 
                }
          });
      });
  
});

module.exports = router;
