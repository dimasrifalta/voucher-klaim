// Node.js High-Precision Scheduler - Voucher 5 - Tokopedia
// Untuk timing yang sangat presisi dengan akurasi milidetik

const https = require('https');
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const COOKIE = `DID=a2f382a3f7a4410a7275a8907624b17925b3b4cf75d6434e55986255fb0bb703f88d88e1afa8a39fb6a973d35a4bed49;odin_tt=880e20a63eb1a3a3d6e2ee13d7750f5a09545a5c75731dd75603cdd5fc472cd3068ccb51f3e91d71459e03e697e74c6943e589f3395cf7b1b7e6870b58f39f46;DID_JS=NjJlMGI1YjNiMzlkNDIyNjM2NzU1ODVkMDRhMThjOTM2ODBkMmY0MDgwM2NmMjc0ZDM4YmMyZTIzOWIzM2Y3ZTM4MGZiZDcxNzA4YmM1OTk0MGYwZjBlMjQ3MjRmM2M347DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=;_UUID_CAS_=6a9d036b-7743-4c22-a16d-36d498a9976a;g_state={"i_l":0};TOPATK=0;_ga=GA1.2.2087157981.1722777967;_ga_70947XW48P=GS2.1.s1749605109$o160$g1$t1749608048$j60$l0$h0;_tt_enable_cookie=1;gec_id=207273627056357056;l=1;dt_intl=JT_xzARo9fGkl4glSlLlvmMd-Oah5ENXA6OjpU57K_CZZK;serverECT=4g;d_ticket=03cf825edb8a2cd386228544f9891da46898e;__krpc=true;_CASE_=21783b133e7860786b6f6c62626263686378767839133e78606b6d6f76783e133e786068686c687678360f2a3e786078787678363b2e786078776c74696a686963687876783638367860781135297a1e33373b297a08333c3b362e3b7876783635343d7860786b6a6c746d636d6f6f627876782a19357860786b686e6f6a78767829133e78606a7678290e232a3f7860787876782d133e78606a76782d322978607801077876782d32292978607801077827;_SID_Tokopedia_=T48E1ftHSfb-gOGepNdpOkVy_8ZZtgHd44e6eaWaNZ8QX2m7Mnozo-8Qz1PL5zCZHfoqq8XlB8dqSo2MkqCzyy7AML9WQEurfeRhqlTK2FA6tCxkgAD__avKPABdsTpW;_ttp=hkgoXmt9nX3L9zGTlsSCpN4JOh-.tt.1;aus=1;ttcsid=1749607833700::SA_HLxVEG-T5eIFuvtzU.58.1749607833700;sid_guard=23d36a00654e3e3509348228c17b3b45%7C1751896844%7C259198%7CThu%2C+10-Jul-2025+14%3A00%3A42+GMT;home_libra=%255B%257B%2522experiment%2522%253A%2522home_cache_exp%2522%252C%2522variant%2522%253A%2522variant1%2522%257D%252C%257B%2522experiment%2522%253A%2522bonus_widget_rollout%2522%252C%2522variant%2522%253A%2522true%2522%257D%252C%257B%2522experiment%2522%253A%2522bonus_widget_rollout_superior%2522%252C%2522variant%2522%253A%2522true%2522%257D%252C%257B%2522experiment%2522%253A%2522home_revamp_3_type%2522%252C%2522variant%2522%253A%2522variant1%2522%257D%255D;ect=4g;_abck=5F0B0EEF75374A1CDE16E8CD60BF13CD~0~YAAQnDwxF2gkUTyaAQAAsrCsWw7d5ioGpbtFs0qks3kC/ft5XZjRHPqmgjS7Z5aoL9fWr2ManjdUA9de+VY7i+e47dxk4FSo7GIExydSUuZGvzP4muC/VgDSD+WDqArRSgzroXkSMe349u6wapRwYV2/fkzDPksTeE/oJ+QMFRU9ktluZ13sHYS5YA/xd+1eVM91e2iLbnYwuVvKCpU2wLK+t+eQS8iqtitImltSwhYkXO44IrXrm2ZOQp9jlql+uu9up82CO57fzUw3e2ePdh/SSosvwJjragbEoVBzj00Cg0UccXFJH701WOdw2k0HAdQxhrIsp9GWv2tUL6mZ0ROiMXQ82hyQixmeK/3aYaKspmAxkKEskbg4XxPsmZcXDNJy1gY4ut+XLpvx7Bd4yMEpXVcBNO3jLEQE+tKEtvDxqmOMOAR4VYZnziaVGm/Mw4CTHlevsb9NMHjjfB7YrohEdtPlVMTDI3SwZ1eaoCyFpp/K1hVd8oQfMx9hggrnWmcTDnMoXh8PwsHSnPhAbQv/0PPk9SFg7mmZEtSUbOhk/Ib3wkMkEQVvZtrop1HWHXmXdyWWjWKsg5KYykW8jxn8F1oWksF5d1c424dw1+QEktXE+56rz7meVpCNiv+qowt/XQb9nm03oHweAN7qWVrWIDQdtrV0kt+5XxWKxiZAgBbt200b47nBelwg0SS1UumAUY+GUtpaDBJVDwCmFKQlMm8loh2a10deBcd4G2XCgpo0mO76EqYSyYVyvTkxEt8jCo3AmmzG8JBdzZlZIy9qS1pobBWNGsFcmrPvWpFs5SsTjt3dMAz2knN0y7+RLzWc/xcA0OsDr9XIAWoVb6n2qypwvULFYBnyGYgoyTvUERlspPek3wrFEk+KHi8oHa34LPxTBrJVEVnzymwvH6FvZInIP9ahDetpd2cTWXXFgnFkHaKPhgMPUNf2Pog5/W6GaHgrKOn8kwurCWM=~-1~-1~-1~AAQAAAAE%2f%2f%2f%2f%2f4WVpRY+P4JklyQxsteGlRsMHhptPlwdC+oIRLFXegEM6x%2fRl%2finT5qYnUmVjFnM8BEXFAw74uS81xfic4LhSnjwnEXLSA47iU2bFPDLi+LxX6lhCPGawlmmp83MMYhCUvckAeA%3d~-1;_UUID_NONLOGIN_=6ce71a06cb20dae933c694e9040af6bc;_UUID_NONLOGIN_.sig=5odvKQL1_L5SGSoIiiAEz7om7jU;ak_bmsc=B70E29B0C0036F49CB780507CBEA658E~000000000000000000000000000000~YAAQqc4tF8PhdFmaAQAA03CEWx2hE/ePcTZD2YA6PIwxc4ZkAKdZppF6ayS76RW2/OcDgyWsz3eEorQ/R4CST4AHnHbwNDkpe4xqZDzn/OB8iQ7mM8w+w41DK/pntKqcBQ8lp0v4diAJ8OFuJlG3T6MVxFZFReErEJWVDGJcXqkj5xniBalXaPIvqHKsEWAuFhoG9ezolgmVamVmPsBrSz2eQk/j71wVCBaHNXeckuVFh35hts32qPQxcXkbt6rwrsA/EZz/K848S2ULO2gAyJa7D4DTvW8A2CJbKEc1e5I3Lw552vXb3ALdYiYgBwP26YMlBRHV4SFS16ijt3jNvPW+yFgcDdgUHk3Q365uA90zX1vI0cGXaRq+K7Ufs5baTViiLC+DYVN1+NEOr+ApSVk0WLfNdQyRmff2jmebgd+Yh8zf355MtITaGHheDcx7CYISt8wFXJB5IF0o5d88J81yODT6X+gnFe1y0Prjd8D3jGgw4nmv;bd-device-id=3911448711131024134;bm_mi=CE0470DDF59D70EF68EC2A9F21E606B5~YAAQsc4tF5+Y+lGaAQAA6bqCWx1AxQa34si0fOBP7/uAoC4dGAN9XmJ4D7B+6uz9CY4RTTakEWnovmE7abXFeYZVCoqDk5yk67Z7PNe481bLuY+kuM3P1KDS+1gcQ8NI8rTdRjPpHE6kTa4CXqqI67WJwYr7ZX1koSONmmIDiCJjHdo8RI2gxPoz/nPAaOYN3eD7mZjWbj63MhdqsyHu5K4ZWTp6ZJHlaN6fu/MVQ4rdzKfoQJnGDpDiIYCb/Z8xtWbUkWiKNNq3i4ONmhVRRL8E0G/TxQ4aOiaZZylpuzrLTAAU9ojxILMbB0esot4olfdJ21BHTwZEzLXwJj5IYB0lPQZc2cu6u+mPAHCqRBIhN5rh+0HW~1;bm_sz=30545D1E46BCBFAB759E9F01D1867686~YAAQnDwxF2YkUTyaAQAAWrCsWx001PjPhIzmpvLTh0rG/ZqgiNf3fqIXiyvEnINLFEhxru18fGRzjgGlR3jq/O1rwPuQSkljel2mhntR0ZIHuZJICth0zsrHDYJnS3qnR/VEy8/x5heGKPa715BedPyj+Od0yqETT/Ps7YYKFGmsreYjkGPjr7m2eEH4fILGAfZ9/4j+Yz8gMVGeE82TMPY201oK/ijbexyARZE14qfwFBr7IelC4UCefbWcnIvI0TCUzK7gFNJrfPi30pwfHTolmqHtoCsSpfS5aUUsgNLhcxshwHDM/83PP85vLM9eOVhwNGfIEfgI4K03VrIaaDbZQFudzFaLrRGA2+n28nd9Mg5M0hmJCkaAquR9DLF5+lATE+yZmzjHX7YaUFjgZob9lynkdKK2B2t8iyo2K+jGBqcV+M0cj8zm0Hvoxro4OjWzgapyNk7uxCK7JzD51YBBI1IK1U8HM26Wbd74Rr858L/ANNO/PQuBPzkGCqYbqFn6pM1Ii9TospQIvmJv6lcAtOx5p0sMgRCv016czAFEmWV6/Q==~3487025~3686708;FPF=1;home_libra_parameters=%7B%22experiment%22%3A%22home_revamp_3_type%22%2C%22variant%22%3A%22variant1%22%7D;inbox_version=%22v2%22;ISID=%7B%22www.tokopedia.com%22%3A%22d3d3LnRva29wZWRpYS5jb20%3D.8725932346678444d9b4b0ffc3be9b12.1749607830138.1749607830138.1749608048026.2%22%7D;store-country-sign=MEIEDAcj1CBmwRjYOJ3i9gQgU3GrQXYqur57T2swMIF2RXf8eqjKJIvMpUqaVscDLPwEEFM3jp3oUTGWXs7lAklerx0;tkpd-x-device=undefined;ttcsid_CPTR1KRC77UF05LN2NAG=1749607832031::6WESjsjAzoicSnRZargW.60.1749607833941;ttwid=1%7CO26edYQoPRADiOJNTaSXnTcY5YIuaMWRoqd2y_nzO7w%7C1751896859%7Cb6975daa53f1e99b096c70883ea5aa01a548c70344114d1d7d001029d44698d6;tuid=48259652;uide=aqLAm0FxUv9uRGPBpA9iQ9KD5qqaMQ+DcjYEhFLVFBEFwarO;uidh=KjfUKH6r4OJDv8e5yn3tL3CDH2STZlOrvzY7t9vk1Fw=;webauthn-session=84927781-a37d-44bf-aef5-8b98e4340b98`; 


// Konfigurasi Voucher 5 - Tokopedia
const CONFIG = {
  voucherId: 5,
  url: 'https://gql.tokopedia.com/hachikoRedeem',
  targetHour: 12,
  targetMinute: 0,
  targetSecond: 0,
  targetMillisecond: 0,
  headers: {
    'Content-Type': 'application/json',
    'Cookie': COOKIE       // ← pakai cookies kamu
  },
  payload: [{
    operationName: "hachikoRedeem",
    query: "mutation hachikoRedeem($catalogId: Int!, $isGift: Int!, $giftEmail: String, $notes: String, $apiVersion: String) {\n  hachikoRedeem(catalog_id: $catalogId, is_gift: $isGift, gift_email: $giftEmail, notes: $notes, apiVersion: $apiVersion) {\n    coupons{\n      id\n      owner\n      promo_id\n      code\n      title\n      description\n      cta\n      cta_desktop\n      appLink\n    }\n    reward_points\n    redeemMessage\n    ctaList {\n      text\n      type\n      isDisabled\n      jsonMetadata\n    }\n  }\n}",
    variables: {
      catalogId: 7568008814016988935,
      isGift: 0,
      giftEmail: "dimasrifalta@gmail.com",
      notes: "",
      apiVersion: "2.0.0"
    }
  }]
};

// Fungsi untuk mendapatkan waktu WIB
function getWIBTime() {
    // Gunakan offset UTC+7 untuk timezone Jakarta
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const jakartaTime = new Date(utcTime + (7 * 3600000)); // UTC+7
    return jakartaTime;
}

// Fungsi untuk logging dengan timestamp presisi
function log(message, level = 'INFO') {
    const wibTime = getWIBTime();
    const timestamp = wibTime.getFullYear() + '-' +
        String(wibTime.getMonth() + 1).padStart(2, '0') + '-' +
        String(wibTime.getDate()).padStart(2, '0') + ' ' +
        String(wibTime.getHours()).padStart(2, '0') + ':' +
        String(wibTime.getMinutes()).padStart(2, '0') + ':' +
        String(wibTime.getSeconds()).padStart(2, '0') + '.' +
        String(wibTime.getMilliseconds()).padStart(3, '0');
    
    const logLine = `[${timestamp}] [${level}] [VOUCHER-${CONFIG.voucherId}] ${message}`;
    console.log(logLine);
    
    // Simpan ke file log
    fs.appendFileSync(`voucher_${CONFIG.voucherId}_scheduler.log`, logLine + '\n', 'utf8');
}

// Fungsi untuk eksekusi request dengan timing presisi
function executeVoucherRequest() {
    return new Promise((resolve, reject) => {
        const executionTime = getWIBTime();
        const timeStr = executionTime.getFullYear() + '-' +
            String(executionTime.getMonth() + 1).padStart(2, '0') + '-' +
            String(executionTime.getDate()).padStart(2, '0') + ' ' +
            String(executionTime.getHours()).padStart(2, '0') + ':' +
            String(executionTime.getMinutes()).padStart(2, '0') + ':' +
            String(executionTime.getSeconds()).padStart(2, '0') + '.' +
            String(executionTime.getMilliseconds()).padStart(3, '0');
        
        log(`🚀 Menjalankan request voucher ${CONFIG.voucherId} pada: ${timeStr} WIB`);
        
        // Manual JSON stringify untuk handle large integers
        const payloadStr = JSON.stringify(CONFIG.payload)
            .replace('"catalogId":7568008814016989000', '"catalogId":7568008814016988935');
        
        const postData = payloadStr;
        log(`📤 Request Payload: ${postData}`);
        
        const url = new URL(CONFIG.url);
        
        const options = {
            hostname: url.hostname,
            port: url.port || 443,
            path: url.pathname,
            method: 'POST',
            headers: {
                ...CONFIG.headers,
                'Content-Length': Buffer.byteLength(postData),
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            },
            timeout: 60000, // Increased to 60 seconds
            agent: false,
            rejectUnauthorized: false
        };
        
        const req = https.request(options, (res) => {
            const chunks = [];
            
            // Handle gzip/deflate compression
            let responseStream = res;
            const encoding = res.headers['content-encoding'];
            
            if (encoding === 'gzip') {
                responseStream = res.pipe(zlib.createGunzip());
            } else if (encoding === 'deflate') {
                responseStream = res.pipe(zlib.createInflate());
            } else if (encoding === 'br') {
                responseStream = res.pipe(zlib.createBrotliDecompress());
            }
            
            responseStream.on('data', (chunk) => {
                chunks.push(chunk);
            });
            
            responseStream.on('end', () => {
                const buffer = Buffer.concat(chunks);
                const data = buffer.toString('utf-8');
                
                log(`📊 Status Code: ${res.statusCode}`);
                log(`📊 Response: ${data}`);
                
                let jsonData = null;
                let isSuccess = false;
                
                try {
                    jsonData = JSON.parse(data);
                    log(`📊 Parsed JSON: ${JSON.stringify(jsonData, null, 2)}`);
                    
                    // Handle both array and object response
                    const responseData = Array.isArray(jsonData) ? jsonData[0] : jsonData;
                    
                    // Check for GraphQL errors
                    if (responseData.errors && responseData.errors.length > 0) {
                        const error = responseData.errors[0];
                        log(`❌ GraphQL Error: ${error.message}`, 'ERROR');
                        if (error.extensions) {
                            log(`❌ Error Code: ${error.extensions.code}`, 'ERROR');
                            log(`❌ Error Detail: ${error.extensions.developerMessage}`, 'ERROR');
                        }
                    }
                    
                    // Check for success (data exists)
                    if (responseData.data && responseData.data.hachikoRedeem) {
                        const redeemData = responseData.data.hachikoRedeem;
                        log(`✅ Redeem berhasil!`);
                        log(`🎁 Reward Points: ${redeemData.reward_points}`);
                        log(`📝 Message: ${redeemData.redeemMessage}`);
                        if (redeemData.coupons && redeemData.coupons.length > 0) {
                            log(`🎟️ Coupon Code: ${redeemData.coupons[0].code}`);
                            log(`🎟️ Coupon Title: ${redeemData.coupons[0].title || '(Tidak ada title)'}`);
                            log(`🔗 Link: ${redeemData.coupons[0].cta_desktop}`);
                        }
                        isSuccess = true;
                    }
                } catch (e) {
                    log(`⚠️ Response bukan JSON: ${e.message}`, 'WARN');
                }
                
                if (res.statusCode === 200 && isSuccess) {
                    log('✅ Request voucher berhasil!');
                    resolve({ success: true, status: res.statusCode, data });
                } else {
                    log(`❌ Request voucher gagal`, 'ERROR');
                    resolve({ success: false, status: res.statusCode, data });
                }
            });
            
            responseStream.on('error', (err) => {
                log(`❌ Error dekompresi response: ${err.message}`, 'ERROR');
                reject(err);
            });
        });
        
        req.on('error', (err) => {
            log(`❌ Error saat mengirim request: ${err.message}`, 'ERROR');
            log(`❌ Error code: ${err.code}`, 'ERROR');
            reject(err);
        });
        
        req.on('timeout', () => {
            log('❌ Request timeout setelah 60 detik', 'ERROR');
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        req.on('socket', (socket) => {
            socket.setTimeout(60000);
            socket.on('timeout', () => {
                log('❌ Socket timeout', 'ERROR');
                req.destroy();
            });
        });
        
        req.write(postData);
        req.end();
    });
}

// High-precision timing function
function waitUntilPreciseTime(targetTime) {
    return new Promise((resolve) => {
        function checkTime() {
            const now = getWIBTime().getTime();
            const target = targetTime.getTime();
            const diff = target - now;
            
            if (diff <= 0) {
                resolve();
                return;
            }
            
            // Gunakan setTimeout dengan interval yang adaptif
            if (diff > 1000) {
                setTimeout(checkTime, 100); // Check setiap 100ms jika masih lama
            } else if (diff > 100) {
                setTimeout(checkTime, 10);  // Check setiap 10ms jika mendekati
            } else {
                setTimeout(checkTime, 1);   // Check setiap 1ms jika sangat dekat
            }
        }
        
        checkTime();
    });
}

// Scheduler untuk eksekusi sekali pada jam yang ditentukan
async function scheduleOnce() {
    const now = getWIBTime();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), CONFIG.targetHour, CONFIG.targetMinute, CONFIG.targetSecond, CONFIG.targetMillisecond);
    
    // Jika sudah lewat waktu target hari ini, set untuk hari berikutnya
    if (now.getTime() >= today.getTime()) {
        today.setDate(today.getDate() + 1);
    }
    
    const delayMs = today.getTime() - now.getTime();
    
    const targetTimeStr = today.getFullYear() + '-' +
        String(today.getMonth() + 1).padStart(2, '0') + '-' +
        String(today.getDate()).padStart(2, '0') + ' ' +
        String(today.getHours()).padStart(2, '0') + ':' +
        String(today.getMinutes()).padStart(2, '0') + ':' +
        String(today.getSeconds()).padStart(2, '0') + '.' +
        String(today.getMilliseconds()).padStart(3, '0');
    
    log(`⏰ Target waktu voucher ${CONFIG.voucherId}: ${targetTimeStr} WIB`);
    log(`⏰ Delay: ${(delayMs / 1000).toFixed(3)} detik`);
    
    await waitUntilPreciseTime(today);
    
    try {
        await executeVoucherRequest();
    } catch (error) {
        log(`❌ Error saat eksekusi voucher ${CONFIG.voucherId}: ${error.message}`, 'ERROR');
    }
}

// Scheduler untuk eksekusi harian
async function scheduleDailyLoop() {
    log(`📅 Memulai scheduler harian voucher ${CONFIG.voucherId} - Request akan dijalankan setiap hari jam ${CONFIG.targetHour.toString().padStart(2, '0')}:${CONFIG.targetMinute.toString().padStart(2, '0')}:${CONFIG.targetSecond.toString().padStart(2, '0')}.${CONFIG.targetMillisecond.toString().padStart(3, '0')} WIB`);
    
    while (true) {
        try {
            await scheduleOnce();
            
            // Tunggu 2 detik sebelum set schedule berikutnya
            await new Promise(resolve => setTimeout(resolve, 2000));
            
        } catch (error) {
            log(`❌ Error dalam scheduler loop voucher ${CONFIG.voucherId}: ${error.message}`, 'ERROR');
            // Tunggu 5 detik sebelum mencoba lagi jika ada error
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

// Test function
async function testRequest() {
    log(`🧪 Menjalankan test request voucher ${CONFIG.voucherId}...`);
    try {
        await executeVoucherRequest();
    } catch (error) {
        log(`❌ Error saat test voucher ${CONFIG.voucherId}: ${error.message}`, 'ERROR');
    }
}

// Main function
function main() {
    const args = process.argv.slice(2);
    
    // Parse parameter waktu dari command line
    const timeArg = args.find(arg => arg.startsWith('--time='));
    if (timeArg) {
        const timeStr = timeArg.split('=')[1];
        const timeParts = timeStr.split(':');
        if (timeParts.length >= 2) {
            CONFIG.targetHour = parseInt(timeParts[0]) || CONFIG.targetHour;
            CONFIG.targetMinute = parseInt(timeParts[1]) || CONFIG.targetMinute;
            CONFIG.targetSecond = parseInt(timeParts[2]) || CONFIG.targetSecond;
            CONFIG.targetMillisecond = parseInt(timeParts[3]) || CONFIG.targetMillisecond;
        }
    }
    
    console.log(`🎯 Shopee Voucher Auto Scheduler - Node.js (Voucher ${CONFIG.voucherId})`);
    console.log('='.repeat(60));
    console.log(`⏰ Target waktu: ${CONFIG.targetHour.toString().padStart(2, '0')}:${CONFIG.targetMinute.toString().padStart(2, '0')}:${CONFIG.targetSecond.toString().padStart(2, '0')}.${CONFIG.targetMillisecond.toString().padStart(3, '0')} WIB`);
    console.log('='.repeat(60));
    
    if (args.includes('--once')) {
        console.log(`⏰ Mode: Sekali pada jam ${CONFIG.targetHour.toString().padStart(2, '0')}:${CONFIG.targetMinute.toString().padStart(2, '0')}:${CONFIG.targetSecond.toString().padStart(2, '0')}.${CONFIG.targetMillisecond.toString().padStart(3, '0')} WIB (Voucher ${CONFIG.voucherId})`);
        scheduleOnce().then(() => {
            console.log(`✅ Scheduler voucher ${CONFIG.voucherId} selesai`);
            process.exit(0);
        });
    } else if (args.includes('--daily')) {
        console.log(`📅 Mode: Harian setiap jam ${CONFIG.targetHour.toString().padStart(2, '0')}:${CONFIG.targetMinute.toString().padStart(2, '0')}:${CONFIG.targetSecond.toString().padStart(2, '0')}.${CONFIG.targetMillisecond.toString().padStart(3, '0')} WIB (Voucher ${CONFIG.voucherId})`);
        scheduleDailyLoop();
    } else if (args.includes('--test')) {
        testRequest().then(() => {
            process.exit(0);
        });
    } else {
        console.log('Penggunaan:');
        console.log(`  node voucher_4_scheduler.js --once [--time=HH:MM:SS:mmm]    # Jalankan sekali pada waktu tertentu`);
        console.log(`  node voucher_4_scheduler.js --daily [--time=HH:MM:SS:mmm]   # Schedule harian pada waktu tertentu`);
        console.log(`  node voucher_4_scheduler.js --test                          # Test request sekarang`);
        console.log('');
        console.log('Contoh:');
        console.log(`  node voucher_4_scheduler.js --once                          # Default 18:00:00.000`);
        console.log(`  node voucher_4_scheduler.js --once --time=14:30:15:50       # Custom 14:30:15.050`);
        console.log(`  node voucher_4_scheduler.js --once --time=14:30:15          # Custom 14:30:15.000`);
        console.log(`  node voucher_4_scheduler.js --once --time=14:30             # Custom 14:30:00.000`);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    log(`❌ Scheduler voucher ${CONFIG.voucherId} dihentikan oleh pengguna (SIGINT)`);
    process.exit(0);
});

process.on('SIGTERM', () => {
    log(`❌ Scheduler voucher ${CONFIG.voucherId} dihentikan oleh sistem (SIGTERM)`);
    process.exit(0);
});

// Jalankan main function
main();
