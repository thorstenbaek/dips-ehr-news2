
const AQL_NEWS2 = `SELECT    
--eformdataid": "57906,
c/content[openEHR-EHR-OBSERVATION.news2.v1]/data[at0001]/events[at0002]/time/value as date, 
c/content[openEHR-EHR-OBSERVATION.respiration.v2]/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/magnitude as resp,
c/content[openEHR-EHR-OBSERVATION.news2.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0034]/value/value as oxcode,
--oxpercent,
--oxflow,
--oxcodename,
c/content[openEHR-EHR-OBSERVATION.pulse_oximetry.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0006]/value/numerator as oxsat,
c/content[openEHR-EHR-OBSERVATION.news2.v1]/protocol[at0045]/items[openEHR-EHR-CLUSTER.news2_spo2_skala_dips.v1]/items[at0001]/value/defining_code/code_string AS oxsatscale,
c/content[openEHR-EHR-OBSERVATION.blood_pressure.v2]/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude as bps,
c/content[openEHR-EHR-OBSERVATION.blood_pressure.v2]/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude as bpd,
c/content[openEHR-EHR-OBSERVATION.pulse.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude as pulse,
c/content[openEHR-EHR-OBSERVATION.acvpu.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/value as acvpu,
c/content[openEHR-EHR-OBSERVATION.body_temperature.v2]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude as temp,
c/content[openEHR-EHR-OBSERVATION.news2.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0028]/value/magnitude as newstotal,
--newsrepeat,
--userinitials,
--username,
--userid,
--escalation
FROM COMPOSITION c CONTAINS OBSERVATION a_a[openEHR-EHR-OBSERVATION.news2.v1]
ORDER BY a_a/data[at0001]/events[at0002]/time/value DESC`;

const NEWS2 = {
    name: "News2",
    code: "789101",
    aql: AQL_NEWS2
}

async function queryClinicalConcept(ehrStoreUrl, patientId, concept) {

    const res = await fetch(
        ehrStoreUrl,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                aql: concept.aql,
                tagScope: {
                    tags: [
                        {
                            values: [
                                patientId
                            ],
                            tag: "PatientId"
                        }
                    ]
                }
            })
        }
    );

    const json = await res.json()    
    return json;
}