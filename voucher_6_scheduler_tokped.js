// Node.js High-Precision Scheduler - Voucher 5 - Tokopedia
// Untuk timing yang sangat presisi dengan akurasi milidetik

const https = require('https');
const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const dns = require('dns').promises;

const COOKIE = `DID=c31124bbe234042ea17513f0d2281a7720df42ed333962000bdb394bc15ef7775b05642f8931e94f2e067afbf9384e2b;DID_JS=NjYzZTBkNmI3ZjMyYzVkYmU1MDA3MGU5ZDNhMWExOTAxYTc4NTc5YzAxODZmNjJkYWE0YjdjNWE4NWM1MmMxZTNjZDJlZTYzOTI1ZGE3ZDM5MGM0YTg3MDNmNjY2ZWJi47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=;_UUID_CAS_=5a08605c-0dbe-4752-9d2b-6cf503748147;g_state={"i_l":0,"i_ll":1762597435088,"i_b":"LKxS0K/tHZIADeaohChIw2X3abG7hdbWNuKReKSYQJc"};TOPATK=momlRvpaSnW9BcnPed8NhA;gec_id=207273627056357056;dt_intl=DVLT_6542b775e3263c27e321b929-f52fc6e0_dFlt;serverECT=4g;__krpc=true;_CASE_=21783b133e7860786b6f6c62626263686378767839133e78606b6d6f76783e133e786068686c687678360f2a3e786078787678363b2e786078776c74696a68696368687876783638367860781135297a1e33373b297a08333c3b362e3b7876783635343d7860786b6a6c746d636d6f6f626b7876782a19357860786b686e6f6a78767829133e7860786a787678290e232a3f7860787876782d133e7860786a7876782d32292978607801077827;_SID_Tokopedia_=fOodAB4FwwJjLiGxHTMaJ_ZHeY0X5Pqzp8KtZ_rhV22lAaUNnVYy2Iwz0r2UDyT2j58Kay2ItzAzfUN8TE2jTsQBD5192X5yiKC-9Koz-fvkkV2KPw4OJcSAXp6phFuI;_abck=313E06831615B067408B82F0B9D9F822~0~YAAQldt5LSl8PF+aAQAA4aoAYw41CeDu4Rw1EJrreUAcPXv/p24P0zo7Cg8k/ioWAYub30e9///etRcWVHvizQdN8Uiah2dKemY6ilAS6oOjX+C7dyLC6UeJyIWGZczZHx2UjIAR+gRStj09B4kShlBeXKALOnaGNalt8F4Y82F9x5QH0zX9xQQZl/jzvcWrQXOCz6+UNHaG0W2+kZNM1WT4vqCAJ7snY1yL2zW3sbS2Ol8OpRJFVXp4Pjf6YGDu5XtmRANp0OVZPX2jdO0fNcxY+txMkOxEmG/EmR8Q90Qu0WcikqPZUV8yBy91SHtYxbWGwUS3h0vKCwNVNW0xcp9FrGfLvn/SnWabMSI/FvyDlHeU7y/hbjtpPS5KRP9q52VTBzdCiN1JqeEQrAXg886CxYhoJUwnUOqhcup++WDUOxZIzvNzQrr+llhm7mr/R952KkdS7gC+H0YP30wn6fqKCWRjks44XLDMUZLGGQPhPGHvgFySajN+GKZREJbsg/WAl0Qz2QLdT9YmZ/m9vvg1ASUuKNULZEl4KgOSexJULeo5LJ8CHTBsWRIwbi1vdWt2SPOcYZgfp9G8P43z1Pv7nMvT0CV27SROA0k3oVm97ZIGTWQ8Zxy+Ip7GETaDdeDvBiSRBPeAvt3BCROSaa5t1fqVlUZ5DBFJTFCBD6g1mlA4fPCkYHiuBR0Ju9KT/275J1+Ee0F6nDO4On32/5iC170KEc8MTijt9DoDdZQzBRTb9SO46IO+B8ZyTqy5xzN6mInnzxdTGvXoNtbJ6ySf8PzLfbaYX/kLO08s+oI=~-1~-1~-1~AAQAAAAE%2f%2f%2f%2f%2f%2fFnsN2r1+fwVrtvQIJ+p8wCXp0v8LyCKd0lMC4jjK2koZpSeNPpgoS0tqhU4ec8xqzkM3siAipwG1x29wPoZfpchohwiqymGvTL~-1;_UUID_NONLOGIN_=9c2396aa0097f9b70ab9f07077e0f6fb;_UUID_NONLOGIN_.sig=Zy0bwS_SSSnpyK4eqGfhpUrqpeQ;ak_bmsc=E3AC700E99DC2C8130E5AAA467BD583E~000000000000000000000000000000~YAAQh9t5LdutdlyaAQAAMKoAYx0+r89C6ROfJkmkF8IfMsisAVm9f6pYJInx8O4wX084ekl3Jw8kTrEy2wV76M+YLAkPSF+lZa8flUxgP8cvvjQA0DMB5FemVy0DLnFtrYRLoLt3Z6BZt081iTixE+vctBbiwa+7GJCr7VMrVQxJRNzqjEpN0QQXfcvDcZwExLqXSGSfZBikOuTQI3d52RMp8YcL1CbMWgbYO37lhP4Llepw1lV9SEdAr2MQu12x0mFAU3b+LdH76JzRS5AvO/XA7XqFact1ZOnShDu3DhWYJ1ZjPC8ioTwTgfLdAXnn/9zP3nr+eEV7QqdqIem9lbL37ujkGamE2i3jiTYsnvQjIZx7M0ikMFjvKXuuQsI+nOLsne8T2dVu7k1uFtXn6MXOVHJXMaxdjWoZybx2SSG+n67p;bd-device-id=7416634821478811137;bm_mi=47073DC637A40D80CFF133416516C1E4~YAAQldt5LVxzPF+aAQAA2lf/Yh3FDRAAFx0FKmMPGDnywHrN/iBRoCBMTnH3oxYMSnlBZTWgRoOgHrxEkXGc6AvHGk+MpXO7bggcRy4OupyWbKvEnQmh44UqYWNLZ/7VtAjCu6MmPS8IaqV8zEMySTikgFRbg9NZiuFYn3I9gFdILZaEfl0o9v63LNIxD/PCoYoe543/mpXPrSLuzU6RBEcMlYGb4vjneCycvlL6vOUOcW1eN/Wy3Sy1bZmbIMYj47FSEWWwFs9lBTjtKOsq5MHEDBvUo4lqRY7aSf1McGiwAMqVDL77a8/G61MyNgc=~1;bm_sz=6C3011590243349AFF7DFDE42BE73ACE~YAAQldt5LXdzPF+aAQAAQ1r/Yh2ZibOXE0qt14gmYJF9YPxiRsXQLTxKpDQsbR+6oGwMckaZ4XwidqMMg/FKaImChXl7j7bTHzjRjNYUGw5JtqbAToALWVGiuNWEPMbTktkZbsk4JPwEpmhQ2otdyIWFgQ2avmp3aO/MzOFnKk1/t114eJ+le3NxT1WcbaAHUVxVnh/XxObA89yMtDX9STbG4/0MfDPkdHRANhkqFSvPi3KEi/SQSNrzeghCGYd5ZRRsXGRbDKeH+awIcdrkcd2U/uwkoQ1vEskICLtwUEyFEv0UfXs0l8w8NHSOg5AzMElYpedia+Zc/8oiHNUvF4E68H7FsV/OyGp9CGQEV0oKYKBSWSKrGnpv4YM1qjX/3fTzzQNpya65aCroeA5CyBSIvwyU2rvvIRDXDbF59nBFWIT+mU0bIj3cC+Z1XOxUWK4=~3487797~3229234;hfv_banner=true;tuid=48259652;uide=R/956Y4/H0HG62xgqQpuiCDZsC40HsO9uFFrED53ZJdHS4av;uidh=KjfUKH6r4OJDv8e5yn3tL3CDH2STZlOrvzY7t9vk1Fw=;webauthn-session=880c5032-6cb0-4f5f-8d4f-879ac09a9858`;

// HTTP Keep-Alive Agent untuk connection reuse (SPEED BOOST!)
const keepAliveAgent = new https.Agent({
    keepAlive: true,
    keepAliveMsecs: 30000,
    maxSockets: Infinity,
    maxFreeSockets: 256,
    timeout: 30000,
    scheduling: 'lifo'
});

// Konfigurasi Voucher 6 - Tokopedia
const CONFIG = {
  voucherId: 6 ,
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
const CATALOG_ID_STR = "7568888192490325767";

// Pre-build payload string untuk speed (tidak perlu stringify berulang kali!)
const PREBUILT_PAYLOAD = JSON.stringify([{
    operationName: "hachikoRedeem",
    query: "mutation hachikoRedeem($catalogId: Int!, $isGift: Int!, $giftEmail: String, $notes: String, $apiVersion: String) {\n  hachikoRedeem(catalog_id: $catalogId, is_gift: $isGift, gift_email: $giftEmail, notes: $notes, apiVersion: $apiVersion) {\n    coupons{\n      id\n      owner\n      promo_id\n      code\n      title\n      description\n      cta\n      cta_desktop\n      appLink\n    }\n    reward_points\n    redeemMessage\n    ctaList {\n      text\n      type\n      isDisabled\n      jsonMetadata\n    }\n  }\n}",
    variables: {
        catalogId: "7568888192490325767",
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
