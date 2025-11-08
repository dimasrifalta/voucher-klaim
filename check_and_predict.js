const https = require('https');
const zlib = require('zlib');

// === CONFIG ===
const cookie = 'DID=a2f382a3f7a4410a7275a8907624b17925b3b4cf75d6434e55986255fb0bb703f88d88e1afa8a39fb6a973d35a4bed49;odin_tt=880e20a63eb1a3a3d6e2ee13d7750f5a09545a5c75731dd75603cdd5fc472cd3068ccb51f3e91d71459e03e697e74c6943e589f3395cf7b1b7e6870b58f39f46;_tu_prod=0;DID_JS=NjJlMGI1YjNiMzlkNDIyNjM2NzU1ODVkMDRhMThjOTM2ODBkMmY0MDgwM2NmMjc0ZDM4YmMyZTIzOWIzM2Y3ZTM4MGZiZDcxNzA4YmM1OTk0MGYwZjBlMjQ3MjRmM2M347DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=;_UUID_CAS_=6a9d036b-7743-4c22-a16d-36d498a9976a;g_state={"i_l":1,"i_ll":1762574502597,"i_b":"u64M5kGqdIobJ8doLQn3m7b3gYPwibdkn06JsYO97X4","i_p":1762581704192};TOPATK=m9oapAdhRT-32iuzQ3crQg;_CAS_=0;_ga=GA1.2.2087157981.1722777967;_ga_70947XW48P=GS2.1.s1749605109$o160$g1$t1749608048$j60$l0$h0;_tt_enable_cookie=1;gec_id=150389100208209600;l=0;dt_intl=DVLT_6542b775e3263c27e321b929-f52fc6e0_dFlt;serverECT=4g;d_ticket=03cf825edb8a2cd386228544f9891da46898e;__krpc=true;_CASE_=21783b133e7860786b6f6c62626263686378767839133e78606b6d6f76783e133e786068686c687678360f2a3e786078787678363b2e786078776c74696a686963687876783638367860781135297a1e33373b297a08333c3b362e3b7876783635343d7860786b6a6c746d636d6f6f627876782a19357860786b686e6f6a78767829133e78606a7678290e232a3f7860787876782d133e78606a76782d322978607801077876782d32292978607801077827;_SID_Tokopedia_=XiRSvzextb9CKkq6lOjL1P7QrVvOMem1vpuci8LS3aH2EilZxAhm7g5LHuztkWGPrhf1XkAUN7RTbsUO3h2zvLkYqaaQAq4WoVEsHg5bTLuKUIAWgFBlvDeiiX38gAO-;_ttp=hkgoXmt9nX3L9zGTlsSCpN4JOh-.tt.1;aus=0;ttcsid=1749607833700::SA_HLxVEG-T5eIFuvtzU.58.1749607833700;shipping_notif=0;TOPRTK=0;sid_guard=23d36a00654e3e3509348228c17b3b45%7C1751896844%7C259198%7CThu%2C+10-Jul-2025+14%3A00%3A42+GMT;home_libra=%255B%257B%2522experiment%2522%253A%2522home_cache_exp%2522%252C%2522variant%2522%253A%2522variant1%2522%257D%252C%257B%2522experiment%2522%253A%2522bonus_widget_rollout%2522%252C%2522variant%2522%253A%2522true%2522%257D%252C%257B%2522experiment%2522%253A%2522bonus_widget_rollout_superior%2522%252C%2522variant%2522%253A%2522true%2522%257D%252C%257B%2522experiment%2522%253A%2522home_revamp_3_type%2522%252C%2522variant%2522%253A%2522variant1%2522%257D%255D;_abck=5F0B0EEF75374A1CDE16E8CD60BF13CD~0~YAAQj9DdF+FSvVyaAQAAShKIYg7/qnR9p0wf9cOfm7AK2ASsr782UGLKGcgdzHXKZsLUqIbfmfXDdbHaJN51WIn/d9Vg11KxKL8NhG5IWp8Ueb8dedwbCLpukocVe/x/R8P3eywSXRYjPplzTDNgnPZfw7f1UlZc3N2HzIjOTwZIy56Z23jNmW+NRf8QaZMINaboRmwYq4iJWyeIkPmTg2bRBJj6aIWNAdC5aRYbXvN7oPLU3RtQOlI9YmGSCYzqK66sJMXXZXNOHDj6hvqbAQLkIVhzYaLpIslpFYY6UP0ViJ3sKK8R1nNqv8T3hKftExsSs505lY/evkxVXSpYK+C/du2fpDzWe2xBAw4jEAlbifsCXqR4olgCcBCMxpr/jf/3F6jOSnNgvf3tu7wv0eDgW2qamqVU4wbhZjGTflHWw7pnVYK8K0vIDWwfwg5UpkzyPLghM7Mpv2bzM5Bfi36k5V2tYnZbJvtVxlkjvbmAIxLm4ZIKmk0fijwmXOfZWrc/s9OUXs/M/MMB+GdEy7MwBeQdjdTEDQa5o09XhVM254id2SAp4+sOTv9ys652W2AjqldLBA6GS4dlE0hlNLzAn77JsdPCQh0bN3QxtT7zkEpfXjs2BMLHQLV2A+cCRJH6fxQGnlMJ9JmneAyoIMJ6RY1t56ZZ0uI89e2vFAGwEezMdoZLKlsCGfEIf537ofc76mQ0DyTmi5wRW7cH6y+cTe0rt3dGg0pTCjROUGrSjQYdmCVDaZjNc9Elj4h8YpwvNzkDXqmrUJ7NZUJVAEHYglW0J94yyNwWsxa+00gOWO6w478W/fA4h8GN0QCVS4ufJo1XyKBNFCkKDkTHXgZleoOzIWimozjVey0b1iGjwv5QEiGkDF4xKo0=~-1~-1~-1~AAQAAAAE%2f%2f%2f%2f%2f6ng%2frsq+NJrdQ5Pxp6kc5+nVAfEyxmdPabL4Peqd9OVQ0FEs3JA7vbiAdBLa98bCSUZluvrST855VFQw9b+0jxk8dwvapAFz6MbyaMdV+v3mKdWaOOPm2lLWcoVYV4wb80Og76GWDG13EF0QTpiHnrNwgvEeim6k3Ct892e3LDhGYpCFr%2fPG4ec%2fdDtKP3oiiDhvi6wZPZv~-1;_UUID_NONLOGIN_=6ce71a06cb20dae933c694e9040af6bc;_UUID_NONLOGIN_.sig=5odvKQL1_L5SGSoIiiAEz7om7jU;ak_bmsc=44150B796A7403F46F91DE003E2B5463~000000000000000000000000000000~YAAQjjwxFz5akDGaAQAAclt6Yh2oCsWPdpb3B2bVakS+ZqPb9VsAmPAIpi+cKK3V3Dq4r6pI8Lw5JJjnDx9JwS3/d0rqwK7n7hw1k2mcFVagmIJcmgwdCNAttYHzBet072mOtdg7qXj0doWSmDjHrvm1qE0nbcqUR3mmxepZoBTjOsB3a8LqtDApJ9xsLvtoGR7IE9RPkW7shOvNpd9g2K3iKJ9c6mr5YzpIP2QHTextpoY5i2q+jgcoKnDbevytKB/dGoj48tUuRDKPJzzQekeDJlLoMsrLnkfmCeJz3VJlh1Zf1ThXBgKR9CGg2xFUAbN20uAlMPymp0EdXBGk69Xp3mLptKEQ99DkzbHizxbb6N4EFK2AxLHWrTAcQo9qhceZaHIq0mWw06w4R0tJEhlbda4y2ctTenO8adm0hMtYax6G7Wlgp9h5dtkVWSCR7+kS/xuqNHOQfuwc4fQ6sauRKP/gJ8CWDmefFA==;bd-device-id=3911448711131024134;bm_mi=8809AB9A4177EAF0AE25506768E98BE6~YAAQjjwxF15RkDGaAQAA7/p5Yh3bLYfajAztgd6eeHfTVCBtJdJgkxgEfMttWBfsQgRjuwVX58yqv6rhts8XEp6KypGj6inNC2MQ7+jQL7z2shst6Z0AKH6XvalcvQcrUxbSZf3Mh1pGx0s4prZZiZQFX4To/4Ofh2hOjfk0JH0bm2QrAy7BUiIluk74jec3eJRzQihNtdms9XFwKjMf2f8w69n0s0vArA1rmOLE+ca5x9uzhJkLv4p/tLjpUfhFmQPvdUQsRbjvJJOtzdNc3t8yiiax7ENp7qqzM+cy2subhVTy8+aD46GtCDBAiRipMo7QkaK06duROgWBATPpHGdpfUEth4S8fX6QrsU+tZV3BAyMSLdo~1;bm_sz=233ACFA2A633C2B2491C7BECD9A7DC39~YAAQR/EWAjE67GGaAQAA9v2HYh34UmmN4/TGXh5bTUrCbknjuPATBvZft51cK675eFjEdjQWdEmIjDwQRaw5f0haJo+o5hIB3z0j8UOLfxUCHLsbp/C+BmgDkFoAqw+ZnzkdeEwmpnlyHOz415U20jvKjE3d3jIhRT3caFEPJYjfp70vJTMSYJEbDNIrx2eGIlnbqFuFwdWI9k4P73p1+4MYOr0mH2uxHUrkLLN76CtabiMndlr1iCSmrkvWBdcfCgrjQJFW33UnntoxEwld+7z3RsAsCjE09PxFOlcyvlWXJsc2z1YIiv7YShjEv5Wq42VsJ2cubVjkpg2lQjkMJnqUwEvkCwHT/+8Hphg9PnKe61XtdtNkk/pVx1IEQ0dPEeXcHNW2IwwsBrNks6rlCc6+3HsfY9ewV69dMp/qyV0ag+31C+6k8YtICJ5FjUVY/HknxmYhZH7jLTggoWz3MhT2/TZGwHQ2aOxDElSfxQL38PVq8zldS7fG3yiuIz4vDn1NJ4hfxpCZLce4hKHzPPUlYuaiiaXHuFxvWRoSXWQuFEqzdWiFMmFtxxk=~4404784~3618372;FPF=0;g_yolo_production=1;hfv_banner=true;home_libra_parameters=%7B%22experiment%22%3A%22home_revamp_3_type%22%2C%22variant%22%3A%22variant1%22%7D;inbox_version=%22v2%22;ISID=%7B%22www.tokopedia.com%22%3A%22d3d3LnRva29wZWRpYS5jb20%3D.8725932346678444d9b4b0ffc3be9b12.1749607830138.1749607830138.1749608048026.2%22%7D;laf=0;lasty=;store-country-sign=MEIEDAcj1CBmwRjYOJ3i9gQgU3GrQXYqur57T2swMIF2RXf8eqjKJIvMpUqaVscDLPwEEFM3jp3oUTGWXs7lAklerx0;tkpd-x-device=undefined;ttcsid_CPTR1KRC77UF05LN2NAG=1749607832031::6WESjsjAzoicSnRZargW.60.1749607833941;ttwid=1%7CO26edYQoPRADiOJNTaSXnTcY5YIuaMWRoqd2y_nzO7w%7C1751896859%7Cb6975daa53f1e99b096c70883ea5aa01a548c70344114d1d7d001029d44698d6;tuid=35015191;uide=0;uidh=nPmHTDqEuPvSVRU9A6cEeOYhG+FG1hYebrTOkzNZHKo=;webauthn-session=fa11c6b2-4913-40de-abb5-7cc31f0bd4f2';
const endpoint = 'https://gql.tokopedia.com';

// === SAMPLE DATA ===
const ids = [
  { id: '7568888192490161927', time: '2025-11-07 09:00' },
  { id: '7568888192490194695', time: '2025-11-07 12:00' },
  { id: '7568888192490227463', time: '2025-11-07 15:00' },
  { id: '7568888192490260231', time: '2025-11-07 18:00' },
  { id: '7568888192490292999', time: '2025-11-07 21:00' },
  { id: '7568888192490325767', time: '2025-11-08 06:00' },
  { id: '7568888192490358535', time: '2025-11-08 09:00' },
  { id: '7568888192490391303', time: '2025-11-08 12:00' },
  { id: '7568888240435037960', time: '2025-11-08 15:00' },
];

// === PREDICTOR ===
function predictNextIds(samples) {
  const last = samples[samples.length - 1].id;
  const lastPrefix = last.slice(0, 13);
  const lastNum = parseInt(last.slice(-7));
  return [1, 2].map((i) => `${lastPrefix}${(lastNum + i * 32768).toString().padStart(7, '0')}`);
}

// === VALIDATOR ===
async function checkCatalog(id) {
  const body = [{
    operationName: 'hachikoCatalogDetailQuery',
    variables: { slug: id },
    query: `query hachikoCatalogDetailQuery($slug: String, $catalog_id: Int) {\n  detail: hachikoCatalogDetail(\n    slug: $slug\n    catalog_id: $catalog_id\n    apiVersion: \"3.0.0\"\n  ) { id title is_disabled __typename }\n}`
  }];

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(body);
    const url = new URL(endpoint);
    
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookie,
        'Origin': 'https://www.tokopedia.com',
        'Referer': 'https://www.tokopedia.com/',
        'User-Agent': 'Mozilla/5.0',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = https.request(options, (res) => {
      const chunks = [];
      let responseStream = res;
      const encoding = res.headers['content-encoding'];
      
      if (encoding === 'gzip') {
        responseStream = res.pipe(zlib.createGunzip());
      } else if (encoding === 'deflate') {
        responseStream = res.pipe(zlib.createInflate());
      } else if (encoding === 'br') {
        responseStream = res.pipe(zlib.createBrotliDecompress());
      }
      
      responseStream.on('data', (chunk) => chunks.push(chunk));
      responseStream.on('end', () => {
        try {
          const data = Buffer.concat(chunks).toString('utf-8');
          const json = JSON.parse(data);
          
          if (json[0]?.data?.detail) {
            console.log(`✅ Valid: ${id} -> ${json[0].data.detail.title}`);
          } else {
            console.log(`❌ Invalid: ${id}`);
          }
          resolve();
        } catch (e) {
          console.log(`❌ Error parsing: ${id}`);
          resolve();
        }
      });
      responseStream.on('error', (err) => {
        console.log(`❌ Error: ${id} - ${err.message}`);
        resolve();
      });
    });
    
    req.on('error', (err) => {
      console.log(`❌ Request error: ${id} - ${err.message}`);
      resolve();
    });
    
    req.write(postData);
    req.end();
  });
}

(async () => {
  console.log('=== Predicting Next Catalog IDs ===');
  const [pred18, pred21] = predictNextIds(ids);
  console.log(`Predicted 18: ${pred18}`);
  console.log(`Predicted 21: ${pred21}`);

  console.log('\n=== Checking IDs on Tokopedia ===');
  await checkCatalog(pred18);
  await checkCatalog(pred21);
})();
