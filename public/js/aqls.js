
const AQL_NEWS2 = `SELECT
   news/data[at0001]/events[at0002]/time/value as date,
   resp/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/magnitude as resp,
   news/data[at0001]/events[at0002]/data[at0003]/items[at0034]/value/value as oxcode,
   pox/data[at0001]/events[at0002]/data[at0003]/items[at0006]/value/numerator as oxsat,
   news/protocol[at0045]/items[openEHR-EHR-CLUSTER.news2_spo2_skala_dips.v1]/items[at0001]/value/defining_code/code_string AS oxsatscale,
   bp/data[at0001]/events[at0006]/data[at0003]/items[at0004]/value/magnitude as bps,
   bp/data[at0001]/events[at0006]/data[at0003]/items[at0005]/value/magnitude as bpd,
   puls/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude as pulse,
   avcpu/data[at0001]/events[at0002]/data[at0003]/items[at0004]/value/value as acvpu,
   temp/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value/magnitude as temp,
   news/data[at0001]/events[at0002]/data[at0003]/items[at0028]/value/magnitude as newstotal
FROM
   COMPOSITION c
      CONTAINS
         (
            OBSERVATION news[openEHR-EHR-OBSERVATION.news2.v1]
            AND
            OBSERVATION resp[openEHR-EHR-OBSERVATION.respiration.v2]
            AND
            OBSERVATION pox[openEHR-EHR-OBSERVATION.pulse_oximetry.v1]
            AND
            OBSERVATION bp[openEHR-EHR-OBSERVATION.blood_pressure.v2]
            AND
            OBSERVATION puls[openEHR-EHR-OBSERVATION.pulse.v2]
            AND
            OBSERVATION avcpu[openEHR-EHR-OBSERVATION.acvpu.v1]
            AND
            OBSERVATION temp[openEHR-EHR-OBSERVATION.body_temperature.v2]
         )
ORDER BY news/data[at0001]/events[at0002]/time/value DESC`;

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
