// Node.js High-Precision Scheduler - Voucher 5 - Tokopedia
// Untuk timing yang sangat presisi dengan akurasi milidetik

const https = require('https');
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const dns = require('dns').promises;

const COOKIE = `DID=a2f382a3f7a4410a7275a8907624b17925b3b4cf75d6434e55986255fb0bb703f88d88e1afa8a39fb6a973d35a4bed49;odin_tt=880e20a63eb1a3a3d6e2ee13d7750f5a09545a5c75731dd75603cdd5fc472cd3068ccb51f3e91d71459e03e697e74c6943e589f3395cf7b1b7e6870b58f39f46;DID_JS=NjJlMGI1YjNiMzlkNDIyNjM2NzU1ODVkMDRhMThjOTM2ODBkMmY0MDgwM2NmMjc0ZDM4YmMyZTIzOWIzM2Y3ZTM4MGZiZDcxNzA4YmM1OTk0MGYwZjBlMjQ3MjRmM2M347DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=;_UUID_CAS_=6a9d036b-7743-4c22-a16d-36d498a9976a;g_state={"i_l":0};_ga=GA1.2.2087157981.1722777967;_ga_70947XW48P=GS2.1.s1749605109$o160$g1$t1749608048$j60$l0$h0;_tt_enable_cookie=1;gec_id=207273627056357056;l=1;dt_intl=JT_xzARo9fGkl4glSlLlvmMd-Oah5ENXA6OjpU57K_CZZK;serverECT=4g;d_ticket=03cf825edb8a2cd386228544f9891da46898e;__krpc=true;_CASE_=21783b133e7860786b6f6c62626263686378767839133e78606b6d6f76783e133e786068686c687678360f2a3e786078787678363b2e786078776c74696a686963687876783638367860781135297a1e33373b297a08333c3b362e3b7876783635343d7860786b6a6c746d636d6f6f627876782a19357860786b686e6f6a78767829133e78606a7678290e232a3f7860787876782d133e78606a76782d322978607801077876782d32292978607801077827;_SID_Tokopedia_=T48E1ftHSfb-gOGepNdpOkVy_8ZZtgHd44e6eaWaNZ8QX2m7Mnozo-8Qz1PL5zCZHfoqq8XlB8dqSo2MkqCzyy7AML9WQEurfeRhqlTK2FA6tCxkgAD__avKPABdsTpW;_ttp=hkgoXmt9nX3L9zGTlsSCpN4JOh-.tt.1;aus=1;ttcsid=1749607833700::SA_HLxVEG-T5eIFuvtzU.58.1749607833700;sid_guard=23d36a00654e3e3509348228c17b3b45%7C1751896844%7C259198%7CThu%2C+10-Jul-2025+14%3A00%3A42+GMT;home_libra=%255B%257B%2522experiment%2522%253A%2522home_cache_exp%2522%252C%2522variant%2522%253A%2522variant1%2522%257D%252C%257B%2522experiment%2522%253A%2522bonus_widget_rollout%2522%252C%2522variant%2522%253A%2522true%2522%257D%252C%257B%2522experiment%2522%253A%2522bonus_widget_rollout_superior%2522%252C%2522variant%2522%253A%2522true%2522%257D%252C%257B%2522experiment%2522%253A%2522home_revamp_3_type%2522%252C%2522variant%2522%253A%2522variant1%2522%257D%255D;_abck=5F0B0EEF75374A1CDE16E8CD60BF13CD~0~YAAQkoTeragAozGaAQAAZONvYQ7NRBoPXJziqbxSlo4Q3uNfJYtQtfZZhpiAc5pSNJ5a+RbUeuFrjhPsqv/prg6d84101oAftpGOWnddCCwIPJbVTGZ26szvTEpft+s/dsWZd9eyltYZQkk12olMb+V8sVG/FeZz+8X+ovr8AAGn9CAucjrrXj5wRgi24Nsi3SGj9YOid8mXP0TuK7cw3lFwMLuV328aSugOgQJarup1wmX7nbjBvlK2uv7PetHgoeaB9lfPUGHub+Bu4ZuagV3VnDghVzeCMcYvetzYYix8qBNpBru3yhJmvHVZjYsijeXM6KzqvBF+WdxpuS7Sw+a+oZOYrG4YSBE+gWkQjTsmRcYh7JpbpssDx9vPHJIp7S9/VcVhUSjVAQSz5nD04uNqVWmru9WYi9bZuqyP6EytKz8Gk0GFKesRpvNWvqOIjJZsbhmQ95t+pf+nYt1ucM51JLsW/haaGedhu5vEH3rIUld/2hyhkFXM7mI7YgPI2xNNWHhPfBN6O3d8Ir/S6g3g+4E4KSJsgxVIbqAJUIalZoFVwyFMOcCjuzWQDWRJcp9UOdGopwSNL/8UCZJymU9uOg71FYpYnIMWt63uzyX9sS/ES8DHrtTi9Toyu+Nn2RkFs0MNbYMHTSyjxgEvwzinS0T/fcm+q7VdDzfS/En34QygrXnunMiduFzEoV8Wwk/aBnnKhl2Ft1et6gw9SKlwILGlxnd8SvgrBKeO5U0t86nPgxNJbzr7MD1zcE5QAAuF3vxTdNDGNJOjIIMcUNC9t018O+DPlxha1MuB/wns0Qk3uYWRhdFvYdpystIDBfESLnQTzJdcgYacTj8kb7eLc87Qsd37m/80+8Tj2L1bMS9N1gU5ijsuxIrtCWX2S7+6iXuvZksJMYDRUS/q+1COap6+sAQWk3Pp++SRr/kTSALA0Bdw6NJSGa4jYARwL5bwZl0XNIGGY3xEoHw=~-1~-1~-1~AAQAAAAE%2f%2f%2f%2f%2f0GCF8Th6pWNMNDvFiVWXJKa05UhjwPC8gXVXkskUEDt+2LQ5Asa8QTfn11i5M2+JFWLLHYQhwhnnQ16tHC+Hr+44WwWnvJKN9gtqNXEDU%2fNXq0uV87zayDwpBWd8RM7nq8xjHE%3d~-1;_UUID_NONLOGIN_=6ce71a06cb20dae933c694e9040af6bc;_UUID_NONLOGIN_.sig=5odvKQL1_L5SGSoIiiAEz7om7jU;ak_bmsc=62ACA190EF488278D2E48C4B14B16429~000000000000000000000000000000~YAAQnoM0FwC8RS6aAQAAonCYYR0FeGnMz4N7RUGh1PPNx7Ox6+3SQ0dXyG3N+k3uQFmFgOjo44BXyO2NWEpr4RSOWg4Pu+R1TdIfze6tdXuL/NhDYqZsdwg9xzMCGJWktPUEw/iz7EndtefA/tryXROC3FtS4jIZYyaCCpnw2pH8/O/KmH0EAM/btvNV+6Q+xeKZwHUiA03vX6RcCraDQ95d9csVDzN3oVYFEitRa1MnTWaQPvaNSgrTt0VjmourtnS8htm+bsiEFiPWGwSih/50gvTnS4+SLDM+z2lQHRKu1ZcJkO/Tb8FlUK4OLbfLLiSQQgfmeWLYIIF7EEdeEtSoFKQdHW15fcHdJkBRsoobRP9GL0emy5fS7yjYmc5B4u2OJK3V8pB5zBQmWhIj;bd-device-id=3911448711131024134;bm_mi=212B8AE583016C5695D125C8CDDCDDA0~YAAQnoM0F1G9RS6aAQAAKXWeYR1d4s+w7/SIhsDuTV3V0yhKfeWhp6a9bBNlAuo4tyzJ7p1sBFFAkFVww7pZJ1xUiGd8ueEbh/Hk17qhYTmGDW3EX4LbaXUKUOFGmDkFcTwXHiWnfHbytyMidxERMr9m4CyzSUCwjPB5F+0m8S6AEaEXUTcrKV3NQi5S8HEB1E/5R+4e5PY5c3Bn83euLpDSHqkPQ/ABmWATswVFH0KQVqvscuFdqNZDbtqR7aNgUEgJLe0DYzxzpw2TSvfvVMSVxTFsmmp5SHlmxrQlQ9IgcW8Iqud9Ru6CMPWe0kk=~1;bm_sz=16395F29178DB432E53712B6721CBDEF~YAAQnoM0F1K9RS6aAQAAKXWeYR1SG6+M74a9luXbWpc/N4p1pdxUQHs2c6j8Wd5oBhNXS7V36flZGf2MCidGk1r5o+3KEUChFQyzW52UUFsCn5ChUVbLFW9AZilBPY/G4cKU6JzOPrRzjOVEyg0kSmaPIKQO4cSmn3b+S55bjApOIHr13c0Ky2v0HwT7GS055JuHTF7uaJIRHbvbcZIHihh7sQeuOkMJPmtiNncKK8iIcPgKZbSotLpoWZFXhe0lrfnlLdpMaHtwGXPLcvrm9Js9lDjhSZsACANWpYrCL4foX/S15/f4uxCC6u9eLZpfkA9C08QOumocczjuIrDY57s995PUnQ/YcD1USd5f1SZNpTgB/jTtrh8LT++4UrUkxg/ouIYHX5UIvltynxzg8Jt9P6CMkIP2J9oL40Jd~3753285~3422278;FPF=1;home_libra_parameters=%7B%22experiment%22%3A%22home_revamp_3_type%22%2C%22variant%22%3A%22variant1%22%7D;inbox_version=%22v2%22;ISID=%7B%22www.tokopedia.com%22%3A%22d3d3LnRva29wZWRpYS5jb20%3D.8725932346678444d9b4b0ffc3be9b12.1749607830138.1749607830138.1749608048026.2%22%7D;store-country-sign=MEIEDAcj1CBmwRjYOJ3i9gQgU3GrQXYqur57T2swMIF2RXf8eqjKJIvMpUqaVscDLPwEEFM3jp3oUTGWXs7lAklerx0;tkpd-x-device=undefined;ttcsid_CPTR1KRC77UF05LN2NAG=1749607832031::6WESjsjAzoicSnRZargW.60.1749607833941;ttwid=1%7CO26edYQoPRADiOJNTaSXnTcY5YIuaMWRoqd2y_nzO7w%7C1751896859%7Cb6975daa53f1e99b096c70883ea5aa01a548c70344114d1d7d001029d44698d6;tuid=48259652;uide=cWOBj6UDRDTvLApWd30o9BGgS6deXCY1ddiE+qBtHLqHupcx;uidh=KjfUKH6r4OJDv8e5yn3tL3CDH2STZlOrvzY7t9vk1Fw=;webauthn-session=f3888af4-9ad0-4d09-bdfc-4e9ef1ab17c8`;

// HTTP Keep-Alive Agent untuk connection reuse (SPEED BOOST!)
const keepAliveAgent = new https.Agent({
    keepAlive: true,
    keepAliveMsecs: 30000,
    maxSockets: Infinity,
    maxFreeSockets: 256,
    timeout: 30000,
    scheduling: 'lifo'
});

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
    'Cookie': COOKIE
  }
};

// Catalog ID (sebagai string untuk precision)
const CATALOG_ID_STR = "7568888192490358535";

// Pre-build payload string untuk speed (tidak perlu stringify berulang kali!)
const PREBUILT_PAYLOAD = JSON.stringify([{
    operationName: "hachikoRedeem",
    query: "mutation hachikoRedeem($catalogId: Int!, $isGift: Int!, $giftEmail: String, $notes: String, $apiVersion: String) {\n  hachikoRedeem(catalog_id: $catalogId, is_gift: $isGift, gift_email: $giftEmail, notes: $notes, apiVersion: $apiVersion) {\n    coupons{\n      id\n      owner\n      promo_id\n      code\n      title\n      description\n      cta\n      cta_desktop\n      appLink\n    }\n    reward_points\n    redeemMessage\n    ctaList {\n      text\n      type\n      isDisabled\n      jsonMetadata\n    }\n  }\n}",
    variables: {
        catalogId: "7568888192490358535",
        isGift: 0,
        giftEmail: "dimasrifalta@gmail.com",
        notes: "",
        apiVersion: "2.0.0"
    }
}]).replace(`"catalogId":"${CATALOG_ID_STR}"`, `"catalogId":${CATALOG_ID_STR}`);

// Cache untuk DNS resolution
let cachedIP = null;

// Fungsi untuk pre-resolve DNS
async function prewarmDNS() {
    try {
        const addresses = await dns.resolve4('gql.tokopedia.com');
        cachedIP = addresses[0];
        log(`🌐 DNS resolved: ${cachedIP}`, 'INFO', true);
    } catch (err) {
        log(`⚠️ DNS prewarm failed: ${err.message}`, 'WARN');
    }
}

// Fungsi untuk pre-warm connection
async function prewarmConnection() {
    return new Promise((resolve) => {
        const url = new URL(CONFIG.url);
        const options = {
            hostname: url.hostname,
            port: 443,
            method: 'GET',
            path: '/',
            agent: keepAliveAgent,
            timeout: 5000
        };
        
        const req = https.request(options, (res) => {
            res.on('data', () => {});
            res.on('end', () => {
                log(`🔥 Connection pre-warmed`, 'INFO', true);
                resolve();
            });
        });
        
        req.on('error', () => resolve());
        req.on('timeout', () => {
            req.destroy();
            resolve();
        });
        
        req.end();
    });
}

// Fungsi untuk mendapatkan waktu WIB
function getWIBTime() {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utcTime + (7 * 3600000));
}

// Fungsi untuk logging dengan timestamp presisi
function log(message, level = 'INFO', forceLog = false) {
    if (!forceLog && level === 'INFO' && !message.includes('✅') && !message.includes('❌')) {
        return;
    }
    
    const wibTime = getWIBTime();
    const timestamp = wibTime.getFullYear() + '-' +
        String(wibTime.getMonth() + 1).padStart(2, '0') + '-' +
        String(wibTime.getDate()).padStart(2, '0') + ' ' +
        String(wibTime.getHours()).padStart(2, '0') + ':' +
        String(wibTime.getMinutes()).padStart(2, '0') + ':' +
        String(wibTime.getSeconds()).padStart(2, '0') + '.' +
        String(wibTime.getMilliseconds()).padStart(3, '0');
    
    const logLine = `[${timestamp}] [${level}] ${message}`;
    console.log(logLine);
    
    if (message.includes('✅') || message.includes('❌') || message.includes('🎟️')) {
        fs.appendFileSync(`voucher_${CONFIG.voucherId}_scheduler.log`, logLine + '\n', 'utf8');
    }
}

// Fungsi untuk eksekusi request dengan timing presisi
function executeVoucherRequest() {
    return new Promise((resolve, reject) => {
        const postData = PREBUILT_PAYLOAD;
        const url = new URL(CONFIG.url);
        
        const options = {
            hostname: url.hostname,
            port: url.port || 443,
            path: url.pathname,
            method: 'POST',
            headers: {
                ...CONFIG.headers,
                'Content-Length': Buffer.byteLength(postData),
                'User-Agent': 'Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'X-Device': 'android-7.0.0',
                'X-Tkpd-Lite-Service': 'zeus'
            },
            timeout: 30000,
            agent: keepAliveAgent,
            rejectUnauthorized: false
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
                const data = Buffer.concat(chunks).toString('utf-8');
                let isSuccess = false;
                
                try {
                    const jsonData = JSON.parse(data);
                    const responseData = Array.isArray(jsonData) ? jsonData[0] : jsonData;
                    
                    if (responseData.errors && responseData.errors.length > 0) {
                        const error = responseData.errors[0];
                        log(`❌ ${error.message}`, 'ERROR');
                        if (error.extensions && error.extensions.developerMessage) {
                            log(`❌ ${error.extensions.developerMessage}`, 'ERROR');
                        }
                    }
                    
                    if (responseData.data && responseData.data.hachikoRedeem) {
                        const redeemData = responseData.data.hachikoRedeem;
                        log(`✅ ${redeemData.redeemMessage}`);
                        if (redeemData.coupons && redeemData.coupons.length > 0) {
                            log(`🎟️ ${redeemData.coupons[0].code}`);
                        }
                        isSuccess = true;
                    }
                } catch (e) {
                    log(`❌ Parse error: ${e.message}`, 'ERROR');
                }
                
                resolve({ success: isSuccess && res.statusCode === 200, status: res.statusCode, data });
            });
            
            responseStream.on('error', (err) => {
                log(`❌ Dekompresi error: ${err.message}`, 'ERROR');
                reject(err);
            });
        });
        
        req.on('error', (err) => {
            log(`❌ Request error: ${err.message}`, 'ERROR');
            reject(err);
        });
        
        req.on('timeout', () => {
            log('❌ Timeout', 'ERROR');
            req.destroy();
            reject(new Error('Request timeout'));
        });
        
        req.on('socket', (socket) => {
            socket.setTimeout(30000);
            socket.on('timeout', () => {
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
        const checkTime = () => {
            const diff = targetTime.getTime() - getWIBTime().getTime();
            
            if (diff <= 0) {
                resolve();
                return;
            }
            
            if (diff > 1000) {
                setTimeout(checkTime, 50);
            } else if (diff > 100) {
                setTimeout(checkTime, 5);
            } else {
                setTimeout(checkTime, 1);
            }
        };
        
        checkTime();
    });
}

// Scheduler untuk eksekusi sekali
async function scheduleOnce() {
    const now = getWIBTime();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), CONFIG.targetHour, CONFIG.targetMinute, CONFIG.targetSecond, CONFIG.targetMillisecond);
    
    if (now.getTime() >= today.getTime()) {
        today.setDate(today.getDate() + 1);
    }
    
    log(`⏰ Target: ${today.getHours().toString().padStart(2, '0')}:${today.getMinutes().toString().padStart(2, '0')}:${today.getSeconds().toString().padStart(2, '0')}.${today.getMilliseconds().toString().padStart(3, '0')} | Delay: ${((today.getTime() - now.getTime()) / 1000).toFixed(1)}s`, 'INFO', true);
    
    const prewarmTime = new Date(today.getTime() - 5000);
    if (getWIBTime().getTime() < prewarmTime.getTime()) {
        await waitUntilPreciseTime(prewarmTime);
        await prewarmDNS();
        await prewarmConnection();
    }
    
    await waitUntilPreciseTime(today);
    
    try {
        await executeVoucherRequest();
    } catch (error) {
        log(`❌ Exec error: ${error.message}`, 'ERROR');
    }
}

// Scheduler untuk eksekusi harian
async function scheduleDailyLoop() {
    log(`📅 Daily scheduler aktif - ${CONFIG.targetHour.toString().padStart(2, '0')}:${CONFIG.targetMinute.toString().padStart(2, '0')}:${CONFIG.targetSecond.toString().padStart(2, '0')}.${CONFIG.targetMillisecond.toString().padStart(3, '0')} WIB`, 'INFO', true);
    
    while (true) {
        try {
            await scheduleOnce();
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            log(`❌ Loop error: ${error.message}`, 'ERROR');
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

// Test function
async function testRequest() {
    log(`🧪 Test request...`, 'INFO', true);
    try {
        await executeVoucherRequest();
    } catch (error) {
        log(`❌ Test error: ${error.message}`, 'ERROR');
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
    
    console.log(`🎯 Tokopedia Voucher Scheduler (V${CONFIG.voucherId})`);
    console.log('='.repeat(50));
    console.log(`⏰ ${CONFIG.targetHour.toString().padStart(2, '0')}:${CONFIG.targetMinute.toString().padStart(2, '0')}:${CONFIG.targetSecond.toString().padStart(2, '0')}.${CONFIG.targetMillisecond.toString().padStart(3, '0')} WIB`);
    console.log('='.repeat(50));
    
    if (args.includes('--once')) {
        scheduleOnce().then(() => process.exit(0));
    } else if (args.includes('--daily')) {
        scheduleDailyLoop();
    } else if (args.includes('--test')) {
        testRequest().then(() => process.exit(0));
    } else {
        console.log('Usage:');
        console.log('  --once [--time=HH:MM:SS:mmm]   Run once');
        console.log('  --daily [--time=HH:MM:SS:mmm]  Run daily');
        console.log('  --test                         Test now');
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    log(`❌ Stopped by user`, 'ERROR');
    process.exit(0);
});

process.on('SIGTERM', () => {
    log(`❌ Stopped by system`, 'ERROR');
    process.exit(0);
});

// Jalankan main function
main();
