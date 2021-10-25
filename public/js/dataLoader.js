async function queryObservations(patientId, ehrStoreUrl) {

    var observations = [];
    var months = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "Mai",
        6: "Jun",
        7: "Jul",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec"
    }

    var news2 = await queryClinicalConcept(ehrStoreUrl, patientId, NEWS2);
    news2.rows.map(r => {
        var date = new Date(r[0]);

        observations.push({
        eformdataid: "57906",
        date: `${date.getDate()} ${months[date.getMonth() + 1]}`,
        time: `${date.getHours()}:${date.getMinutes()}`,
        resp: r[1],
        oxcode: r[2],
        oxpercent: "",
        oxflow: "",
        oxcodename: "",
        oxsat: `${r[3]}`,
        oxsatscale: r[4],
        bps: r[5],
        bpd: r[6],
        pulse: r[7],
        acvpu: r[8],
        temp: r[9],
        newstotal: r[10],
        newsrepeat: "",
        userinitials: "",
        username: "",
        userid: "",
        escalation: ""
        });
    });

    console.log(news2);    
    console.log(observations);
    return observations;
}

function cleanPatientId(patientId) {
    return patientId.replace("cdp", "");
}

async function getData(data) {
    /*$.getJSON("data.json", function (result) {
        console.log(result);
        data(result);
    })*/
    
    const cleanedPatientId = cleanPatientId(smartClient.patient.id);
    const result = await queryObservations(cleanedPatientId, ehrStoreApi); 

    data(result);
}