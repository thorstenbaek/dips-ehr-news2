var smartClient;
var ehrStoreApi;

(function(window){
    window.extractData = function() {
      var ret = $.Deferred();       

      function onError() {
        console.log('Loading error', arguments);
        ret.reject();
      }
  
      async function onReady(smart)  {
        console.log(smart);
        smartClient = smart;

        const url = new URL(smartClient.state.serverUrl);
        // ehrStoreApi = url.protocol + url.hostname + ":4443/api/v1/query";
        ehrStoreApi = "https://vt-d211-ehr1.demo.dips.no:4443/api/v1/query";


        if (smartClient.hasOwnProperty('patient')) { 
          var pt = smartClient.patient;
          try {            
            var patient = await pt.read();            

            var gender = patient.gender;
            var dob = new Date(patient.birthDate);     
            var day = dob.getDate(); 
            var monthIndex = dob.getMonth() + 1;
            var year = dob.getFullYear();
  
            var dobStr = monthIndex + '/' + day + '/' + year;
            var fname = '';
            var lname = '';
             
            if(typeof patient.name[0] !== 'undefined') {
              fname = patient.name[0].given[0] + ' ';
              lname = patient.name[0].family + ' ';
            }
           
            var p = defaultPatient();          

            p.birthdate = dobStr;
            p.gender = gender;
            p.fname = fname;
            p.lname = lname;
            p.age = parseInt(calculateAge(dob));
            
            ret.resolve(p);
          }
          catch(e) {
            onError();
          }
        }          
      }
      
      FHIR.oauth2.ready(onReady, onError);
      return ret.promise();
  
    };
  
    function defaultPatient(){
      return {
        fname: {value: ''},
        lname: {value: ''},
        gender: {value: ''},
        birthdate: {value: ''},
        age: {value: ''},
        height: {value: ''},
        systolicbp: {value: ''},
        diastolicbp: {value: ''},
        ldl: {value: ''},
        hdl: {value: ''},
      };
    }
  
    function isLeapYear(year) {
      return new Date(year, 1, 29).getMonth() === 1;
    }
  
    function calculateAge(date) {
      if (Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime())) {
        var d = new Date(date), now = new Date();
        var years = now.getFullYear() - d.getFullYear();
        d.setFullYear(d.getFullYear() + years);
        if (d > now) {
          years--;
          d.setFullYear(d.getFullYear() - 1);
        }
        var days = (now.getTime() - d.getTime()) / (3600 * 24 * 1000);
        return years + days / (isLeapYear(now.getFullYear()) ? 366 : 365);
      }
      else {
        return undefined;
      }
    }
  })(window);