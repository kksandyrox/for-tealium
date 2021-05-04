
function formatSetItemString(inputString) {
    try {
        return inputString.replace(/\s+/g, '-').toLowerCase();
    }
    catch (err) {
        console.log("%cformatSetItemString", "color:red;font-size:18px", err);
    }
}


function formatGetItemString(outputString) {
    try {
        return outputString.replace(/-/g, ' ').replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    }
    catch (err) {
        console.log("%cformatGetItemString", "color:red;font-size:18px", err);
    }
}

//get url visited
function getUrlVisited() {
    try {
        if (!JSON.parse(localStorage.getItem("nblr__urlVisited"))) {
            localStorage.setItem("nblr__urlVisited", JSON.stringify([window.location.hostname + window.location.pathname]));
        }
        return JSON.parse(localStorage.getItem("nblr__urlVisited"));
    }
    catch (err) {
        console.log("%cgetUrlVisited", "color:red;font-size:18px", err);
    }
}

//get time spent
function getTimeSpent() {
    try {
        if (!JSON.parse(localStorage.getItem("nblr__timeSpent"))) {
            localStorage.setItem("nblr__timeSpent", JSON.stringify([0]));
        }
        return JSON.parse(localStorage.getItem("nblr__timeSpent"));
    }
    catch (err) {
        console.log("%cgetTimeSpent", "color:red;font-size:18px", err);
    }
}

//get browser
function getBrowser() {
    try {
        if (localStorage.getItem("nblr__browser")) {
            return formatGetItemString(localStorage.getItem("nblr__browser"));
        }
        var browser;
        // Opera 8.0+
        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        if (isOpera) browser = 'Opera';

        // Firefox 1.0+
        var isFirefox = typeof InstallTrigger !== 'undefined';
        if (isFirefox) browser = 'Firefox';

        // Safari 3.0+ "[object HTMLElementConstructor]"
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
            return p.toString() === "[object SafariRemoteNotification]";
        })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
        if (isSafari) browser = 'Safari';

        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
        if (isIE) browser = 'Internet Explorer';

        // Edge 20+
        var isEdge = !isIE && !!window.StyleMedia;
        if (isEdge) browser = 'Edge';

        // Edge (based on chromium) detection
        var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
        var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
        if (isEdgeChromium) {
            browser = 'Edge Chromium';
        }
        if (isChrome && !isEdgeChromium) {
            browser = 'Chrome';
        }
        localStorage.setItem("nblr__browser", formatSetItemString(browser));
        return browser;
    }
    catch (err) {
        console.log("%cgetBrowser", "color:red;font-size:18px", err);
    }
}

//OS
function getOperatingSystem() {
    try {
        if (localStorage.getItem("nblr__operatingSystem")) {
            return formatGetItemString(localStorage.getItem("nblr__operatingSystem"));
        }
        var OSName = "Not known";
        if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
        if (navigator.appVersion.indexOf("Mac") != -1) OSName = "Mac";
        if (navigator.appVersion.indexOf("X11") != -1) OSName = "Unix";
        if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
        localStorage.setItem("nblr__operatingSystem", formatSetItemString(OSName));
        return OSName;
    }
    catch (err) {
        console.log("%cgetOperatingSystem", "color:red;font-size:18px", err);
    }
}

//Device Type
function getDeviceType() {
    try {
        if (localStorage.getItem("nblr__device")) {
            return localStorage.getItem("nblr__device");
        }
        var device = "desktop";
        var ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            device = "tablet";
        }
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            device = "mobile";
        }
        localStorage.setItem("nblr__device", device);
        return device;
    }
    catch (err) {
        console.log("%cgetDeviceType", "color:red;font-size:18px", err);
    }
}

//DateTime
function getDateTime() {
    try {
        var rightNow = new Date();
        var datenow = rightNow.toISOString().slice(0, 10).replace(/-/g, "");
        return datenow;
    }
    catch (err) {
        console.log("%cgetDateTime", "color:red;font-size:18px", err);
    }
}

//UTM and channelGrouping
function setCookie(expires) {
    document.cookie = "nblr__utm_medium=" + utag_data['qp.utm_medium'] + ";path=/;domain=.coloradotech.edu; expires=" + expires;
    document.cookie = "nblr__utm_source=" + utag_data['qp.utm_source'] + ";path=/;domain=.coloradotech.edu; expires=" + expires;
    document.cookie = "nblr__channelgroup=" + "null" + ";path=/;domain=.coloradotech.edu; expires=" + expires;
}
function setSessionUTM() {
    if (utag_data["qp.utm_medium"].includes("social") || utag_data["qp.utm_medium"].includes("social-network") || utag_data["qp.utm_medium"].includes("social-media") || utag_data["qp.utm_medium"].includes("sm") || utag_data["qp.utm_medium"].includes("social network") || utag_data["qp.utm_medium"].includes("social media")) {
        sessionStorage.setItem("nblr__channelgroup", formatSetItemString("Social"));
    } else if (utag_data["qp.utm_medium"] == "referral") {
        sessionStorage.setItem("nblr__channelgroup", formatSetItemString("Referral"));
    } else if (utag_data["qp.utm_medium"].includes("cpc") || utag_data["qp.utm_medium"].includes("ppc") || utag_data["qp.utm_medium"].includes("paidsearch")) {
        sessionStorage.setItem("nblr__channelgroup", formatSetItemString("Paid Search"));
    } else if (utag_data["qp.utm_medium"].includes("display") || utag_data["qp.utm_medium"].includes("cpm") || utag_data["qp.utm_medium"].includes("banner")) {
        sessionStorage.setItem("nblr__channelgroup", formatSetItemString("Display"));
    } else {
        sessionStorage.setItem("nblr__channelgroup", formatSetItemString("Other"));
    }
    sessionStorage.setItem("nblr__source", utag_data["qp.utm_source"]);
    sessionStorage.setItem("nblr__medium", utag_data["qp.utm_medium"]);
}
function getMediumAndSource(param) {
    try {
        var ref = document.referrer;
        var expires = (new Date(Date.now() + 15552000 * 1000)).toUTCString();
        if (window.sessionStorage.nblr__flag == 0 || !window.sessionStorage.nblr__flag) {
            window.sessionStorage.nblr__flag = 1;
            if (document.cookie.match("nblr__utm_medium=([^;]*)") && document.cookie.match("nblr__utm_source=([^;]*)") && document.cookie.match("nblr__channelgroup=([^;]*)") && !utag_data["qp.utm_medium"] && !utag_data["qp.utm_source"]) {
                sessionStorage.setItem("nblr__medium", document.cookie.match("nblr__utm_medium=([^;]*)")[1]);
                sessionStorage.setItem("nblr__source", document.cookie.match("nblr__utm_source=([^;]*)")[1]);
                sessionStorage.setItem("nblr__channelgroup", document.cookie.match("nblr__channelgroup=([^;]*)")[1]);

                if (sessionStorage.getItem("nblr__medium") == "referral") {
                    if (ref.includes("facebook") || ref.includes("linkedin") || ref.includes("yammer") || ref.includes("instagram") || ref.includes("youtube") || ref.includes("twitter")) {
                        sessionStorage.setItem("nblr__channelgroup", formatSetItemString("Social"));
                        sessionStorage.setItem("nblr__medium", "social");
                        sessionStorage.setItem("nblr__source", new URL(document.referrer).hostname.split(".")[1]);

                    }
                }
                else if (sessionStorage.getItem("nblr__medium") == "social") {
                    if (ref != "" && !ref.includes("facebook") && !ref.includes("linkedin") && !ref.includes("yammer") && !ref.includes("instagram") && !ref.includes("youtube") && !ref.includes("twitter") && !ref.includes("www.google.com") && !ref.includes("bing") && !ref.includes("yahoo") && !ref.includes("duckduckgo") && !ref.includes("ask") && !ref.includes("qwant") && !ref.includes("baidu") && !ref.includes("sogou") && !ref.includes("ecosia")) {
                        sessionStorage.setItem("nblr__channelgroup", formatSetItemString("Referral"));
                        sessionStorage.setItem("nblr__medium", "referral");
                        sessionStorage.setItem("nblr__source", document.referrer);
                    }
                }
                else if (document.cookie.match("nblr__utm_source=([^;]*)")[1] == 'direct' || document.cookie.match("nblr__utm_medium=([^;]*)")[1] == 'organic') {
                    if (sessionStorage.getItem("nblr__medium") != "organic" && (ref.includes("www.google.com") || ref.includes("bing") || ref.includes("yahoo") || ref.includes("duckduckgo") || ref.includes("ask") || ref.includes("qwant") || ref.includes("baidu") || ref.includes("sogou") || ref.includes("ecosia"))) {
                        sessionStorage.setItem("nblr__channelgroup", formatSetItemString("Organic Search"));
                        sessionStorage.setItem("nblr__medium", "organic");
                        sessionStorage.setItem("nblr__source", new URL(document.referrer).hostname.split(".")[1]);
                    }
                    else if (ref.includes("facebook") || ref.includes("linkedin") || ref.includes("yammer") || ref.includes("instagram") || ref.includes("youtube") || ref.includes("twitter")) {
                        sessionStorage.setItem("nblr__channelgroup", formatSetItemString("Social"));
                        sessionStorage.setItem("nblr__medium", "social");
                        sessionStorage.setItem("nblr__source", new URL(document.referrer).hostname.split(".")[1]);
                    }
                    else if (sessionStorage.getItem("nblr__medium") != "organic") {
                        sessionStorage.setItem("nblr__channelgroup", formatSetItemString("Referral"));
                        sessionStorage.setItem("nblr__medium", "referral");
                        sessionStorage.setItem("nblr__source", document.referrer);
                    }
                }
            }
            if (!document.cookie.match("nblr__utm_medium=([^;]*)") && !document.cookie.match("nblr__utm_source=([^;]*)") && !document.cookie.match("nblr__channelgroup=([^;]*)") && !utag_data["qp.utm_medium"] && !utag_data["qp.utm_source"] && !sessionStorage.getItem("nblr__source") && !sessionStorage.getItem("nblr__medium") && !sessionStorage.getItem("nblr__channelgroup")) {
                if (ref == "") {
                    sessionStorage.setItem("nblr__channelgroup", formatSetItemString("Direct"));
                    sessionStorage.setItem("nblr__medium", "none");
                    sessionStorage.setItem("nblr__source", "direct");
                }
                else if (ref.includes("www.google.com") || ref.includes("bing") || ref.includes("yahoo") || ref.includes("duckduckgo") || ref.includes("ask") || ref.includes("qwant") || ref.includes("baidu") || ref.includes("sogou") || ref.includes("ecosia")) {
                    sessionStorage.setItem("nblr__channelgroup", formatSetItemString("Organic Search"));
                    sessionStorage.setItem("nblr__medium", "organic");
                    sessionStorage.setItem("nblr__source", new URL(document.referrer).hostname.split(".")[1]);
                }
                else if (ref.includes("facebook") || ref.includes("linkedin") || ref.includes("yammer") || ref.includes("instagram") || ref.includes("youtube") || ref.includes("twitter")) {
                    sessionStorage.setItem("nblr__channelgroup", formatSetItemString("Social"));
                    sessionStorage.setItem("nblr__medium", "social");
                    sessionStorage.setItem("nblr__source", new URL(document.referrer).hostname.split(".")[1]);
                }
                else {
                    sessionStorage.setItem("nblr__channelgroup", formatSetItemString("Referral"));
                    sessionStorage.setItem("nblr__medium", "referral");
                    sessionStorage.setItem("nblr__source", document.referrer);
                }
            }
            else if (!document.cookie.match("nblr__utm_medium=([^;]*)") && !document.cookie.match("nblr__utm_source=([^;]*)") && !document.cookie.match("nblr__channelgroup=([^;]*)") && utag_data["qp.utm_medium"] && utag_data["qp.utm_source"]) {
                setCookie(expires);
                setSessionUTM();
            }
            else if (document.cookie.match("nblr__utm_medium=([^;]*)") && document.cookie.match("nblr__utm_source=([^;]*)") && document.cookie.match("nblr__channelgroup=([^;]*)") && utag_data["qp.utm_medium"] && utag_data["qp.utm_source"]) {
                if (document.cookie.match("nblr__utm_medium=([^;]*)")[1] != utag_data["qp.utm_medium"] || document.cookie.match("nblr__utm_source=([^;]*)")[1] != utag_data["qp.utm_source"]) {
                    setSessionUTM();
                }
            }
            document.cookie = "nblr__utm_medium=" + sessionStorage.getItem("nblr__medium") + ";path=/;domain=.coloradotech.edu; expires=" + expires;
            document.cookie = "nblr__utm_source=" + sessionStorage.getItem("nblr__source") + ";path=/;domain=.coloradotech.edu; expires=" + expires;
            document.cookie = "nblr__channelgroup=" + sessionStorage.getItem("nblr__channelgroup") + ";path=/;domain=.coloradotech.edu; expires=" + expires;
        }
        return sessionStorage.getItem(param);
    }
    catch (err) {
        console.log("%cgetMediumAndSource", "color:red;font-size:18px", err);
    }
}


//visitID
function getVisitId() {
    try {
        if (utag_data["cp._ga"]) {
            var visitvalue = utag_data["cp.utag_main_ses_id"] + ":" + utag_data["cp._ga"].split(".").splice(2, 2).join(".");
        } else {
            var visitvalue = utag_data["cp.utag_main_ses_id"] + ":" + document.cookie.match("_ga=([^;]*)")[1].split(".").splice(2, 2).join(".");
        }
        return visitvalue;
    }
    catch (err) {
        console.log("%cgetVisitId", "color:red;font-size:18px", err);
    }
}

//time spent //page path
var start = new Date();
$(window).unload(function () {
    var urlVisited = JSON.parse(localStorage.getItem("nblr__urlVisited"));
    urlVisited.push(document.location.hostname + document.location.pathname);
    localStorage.setItem('nblr__urlVisited', JSON.stringify(urlVisited));
    var end = new Date();
    var secs = (end - start) / 1000;
    var timeSpent = JSON.parse(localStorage.getItem("nblr__timeSpent"));
    timeSpent.push(secs);
    localStorage.setItem("nblr__timeSpent", JSON.stringify(timeSpent));
});

//JSON input for API
var input = {
    "visitId": getVisitId(),
    "pagePath": getUrlVisited(),
    "time": getTimeSpent(),
    "visitNumber": parseInt(utag_data['cp.utag_main__sn']),
    "medium": getMediumAndSource("nblr__medium"),
    "source": getMediumAndSource("nblr__source"),
    "browser": getBrowser(),
    "operatingSystem": getOperatingSystem(),
    "date": getDateTime(),
    "channelGrouping": getMediumAndSource("nblr__channelgroup"),
    "deviceCategory": getDeviceType(),
    "enrolled": 0,
};

//Intent Score
var Http = new XMLHttpRequest();
var url = 'https://realtimeism-cors-updatebq-2ifiidu4wq-el.a.run.app/';
var data = [];
Http.open("POST", url);
Http.setRequestHeader("Content-type", "application/json");
var obj = JSON.stringify(input);
Http.send(obj);
window.sessionStorage.nblr__flag = 0;
Http.onload = (e) => {
    data = Http.responseText;
    utag_data["nblr__intent_score"] = data;
};
console.log("%cInput Object","color:red;font-size:18px",input);