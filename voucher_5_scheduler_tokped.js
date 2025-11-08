// Node.js High-Precision Scheduler - Voucher 5 - Tokopedia
// Untuk timing yang sangat presisi dengan akurasi milidetik

const https = require('https');
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const dns = require('dns').promises;

const COOKIE = `DID=0d99b2dd2a8fe4c1c082143d07a884496db19fc20898be4dbfb83c1b25ab3c357cc3f45bc1cd5a6cc42abba7bd2ce199;DID_JS=MGQ5OWIyZGQyYThmZTRjMWMwODIxNDNkMDdhODg0NDk2ZGIxOWZjMjA4OThiZTRkYmZiODNjMWIyNWFiM2MzNTdjYzNmNDViYzFjZDVhNmNjNDJhYmJhN2JkMmNlMTk547DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=;_UUID_CAS_=ed5037cd-b677-4373-b8fc-59059a3d6d0d;g_state={"i_l":0,"i_ll":1762522922905,"i_b":"tbO17q41RzIcXRgdl6ZVltFupiPfCnJyq1dy3Gg3bwg"};TOPATK=9A0wLTYCTUC4WLbm776r-Q;_ga=GA1.1.944606221.1752671334;_gcl_au=1.1.21778167.1762567194;_ga_70947XW48P=GS2.1.s1757750353$o2$g0$t1757750355$j58$l0$h0;gec_id=150389100208209600;__krpc=true;_CASE_=742d6e466b2d352d3d3a3a3c3b3d3e3a3a2d232d6c466b2d353e383a232d6b466b2d353d3d393d232d635a7f6b2d352d2d232d636e7b2d352d2239213d373639393c2d232d636d632d352d446e617b607d2f4b66626e7c2d232d636061682d352d3e3f3921373f3f383c37382d232d7f4c602d352d3e3d3b3c3f2d232d7c466b2d352d3f2d232d7c5b767f6a2d352d2d232d78466b2d352d3f2d232d78677c7c2d352d54522d72;_SID_Tokopedia_=jwgTaiksrMFI-cjsWRZwjQ5_EiOOZlAiO35zMPMY-ivabZvtwm3FqFTqwxLkGiOjG8aW77UkpW2oenKLZVw_Wzmy_lecgduUx7jfaRwn2cf4lEkQMo6RJn_-0Oo33n8Y;home_libra=%255B%257B%2522experiment%2522%253A%2522plus_exp_key_assortment_plan%2522%252C%2522variant%2522%253A%2522v2%2522%257D%252C%257B%2522experiment%2522%253A%2522new_plus_landing_page%2522%252C%2522variant%2522%253A%2522variant%2522%257D%252C%257B%2522experiment%2522%253A%2522bonus_widget_rollout%2522%252C%2522variant%2522%253A%2522true%2522%257D%252C%257B%2522experiment%2522%253A%2522home_cache_exp%2522%252C%2522variant%2522%253A%2522variant1%2522%257D%252C%257B%2522experiment%2522%253A%2522home_revamp_3_type%2522%252C%2522variant%2522%253A%2522variant1%2522%257D%252C%257B%2522experiment%2522%253A%2522typ_plus_exp%2522%252C%2522variant%2522%253A%2522eligible%2522%257D%255D;ect=4g;_abck=4E25F2BE39715CA3BAACD824B7216F51~0~YAAQzegyF3l4Ki2aAQAAGSuDYA5B1ogFXDD0ScsmU40mpoaPQ/oEmpiwRw7UwuKmLQTI4PdNDJfABU3sR/MzL0JDl68CVQxjC2OCgPcmml7CV46o3Sap5j/NfhpVXSg3NMszIxhvverOvlWnp9vwvT4wpCaDyFVn7fXDocSF4f48XGG/5hoeSAMjDtylEUx8e+WrChaim5D7p3udzhniUwVQ9+TpPqw4mByMGxD+WDO/+foeFg/AP4X2l5rGeN/K4AerqpsvQ3/LnComGgiU8Nkwom7NlC3LECHYNrEmS3CjkVZOmW3oe/aR85tsRzkPCeLtXkdKWgymtblp9gOUVHLmdz307v8E/tWC3DYiqjZsA79rF7yUTdZdtopWn8WeqoDY37kpBp/TY/CK9zkkpIs6W/NtQM2VGpafJSB5zUsVhsT8qz5APL4bVSBF1JNifwZlFLM00wHtrFYIEb3aMJKnar8Rh4UrAc76UzITFaWmOoB7uIiz9dJs6Fz5GLxv8b45NkNauld3jycUnf6E/x0ja6q23CT4Ov/LvC4D78TMzcret2xptY75/p+aTKVJHOYSWK8tCt8r+VQBDq6uIIOCmbCRc0Cw6V5/6+qEWjO5g2lGvtPOVwCd+NkxgPXUP2Z2J5qeaLD9l4qQHVryc6Of9pScNZGwL08bdSGqevBrRQl7Af226ZlTHU0P445l7Gp4sl196YgQJVODmcu7iOmIoffEiZj80Scc2KQ8tXXObvY/1gc9kPoWi6QghOt/PlILzAagKZMrlitVsDufcVhHW6kNwIF6iu4NpXyqvOA9/RAs~-1~-1~-1~AAQAAAAE%2f%2f%2f%2f%2fzowej+cg8VooUB7fq2MPKcUeVnb4rt39JsFTZjnAzqYaFxa66JgK5FR6zbJCZUft4RRXswWzxuAsntbl17w%2fYSI0T42zgFOY6yV~-1;_UUID_NONLOGIN_=5edc026350e3b3ac5c552d46241d60c8;_UUID_NONLOGIN_.sig=R4ZsGhnFUyXj2Xguwh54804qy24;ak_bmsc=87F217DDF28F8F655983A5D2919598CA~000000000000000000000000000000~YAAQJp42F6QBSl2aAQAAcQQxYR0cgn0ivXV6k3fzHtDgkX+6CzI/BGTK7u2H8pooVxzIKukZROxRP9ksztD6rgKBfX2uo6MdhusREwPrBDrplhvkjcs909sgpKAUVXEUKJJLlE9AdTibuR0x7uIVtU0DZYG/yWUIzyH0jAfI/IoiT0zYze3Bv8WugqUcFz14+Avrx8kSCKh0ce/YSDCvJiclMD2Fx5y/wV0v8mgPV1uj2VpxKnTRXXxTr78O7AmYQfs8pe7eVHbg2Ay/gjk6dsXK+xZr5YcQ7yVMx3OA3JuK9DRSO/QSbHxaD+OKXHRJMlZkGkSYZ+jUv0dwpyZRGgOpLat6lSy44XWgTCAg3Q4cPTJlnAZ2D8m8u57B0SCKXPUCGD9uqzbJi1cieGrA;bd-device-id=8520715815979741556;bm_sz=07FFA5BD053FB205E3A1187A416280FF~YAAQzegyF3J4Ki2aAQAAqimDYB1gA/eA3X6c17jOzZYe8uccH4n6c4D7LLmiemlTF0D61R5yH5ib7CgdagtUM4/l4/PBad/62wkDw/3LmsLrpM+X4k0V83zjEqMq+B8pRKhw3gXcdt67dcQez7mYnGQxTfEup6aE+L1g7HgXaje0JjPk4UxPLY3qBHfX8W/XH7/tQ0miSj9mkivRvXK6saIVnu+HheWp/l3ySWxa1Uz4X4DlZbrbLYhNnwW5oW95qNhi27Qgo/Jpgy/TN+ilath/yFylWH3nstb4mifegneJP5EjGfpu5mrKhXSDdfUmgY8dEn2Syv7dArfWAziu3pH+65QPLoO5wTZEAvcM1JEsPI26VkKPTLDcDREGp4z4sjNEfC0fsJsd/n6nqolxLm4=~3159105~3488068;inbox_version=%22v2%22;ISID=%7B%22www.tokopedia.com%22%3A%22d3d3LnRva29wZWRpYS5jb20%3D.886b072434bbb4ab19559e0782f6a8d5.1752671334042.1752671334042.1757750353409.3%22%7D;tuid=35015191;w2a-hide=1`;

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
