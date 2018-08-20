const getAllowHeader = () => {
    const allow = localStorage.getItem('allowOrigin');

    return allow
        ? allow
        : '*';
};

const getDomains = () => {
    const domains = localStorage.getItem('allowDomains');

    if (domains) {
        return domains
        .split(',')
        .reduce((obj, domain) => {
            obj[domain] = true;
            return obj;
        }, {});
    }

    return null;
};

const handleResponse = (res) => {
    const {
        initiator,
        responseHeaders
    } = res;

    const domains = getDomains();

    if (domains !== null && !domains[initiator]) {
        return res;
    }

    let CORS = false;

    for (let i in responseHeaders) {
        if (
            responseHeaders[i].name === 'access-control-allow-origin'
            && responseHeaders[i].value === '*'
        ) {
            CORS = true;
        }
    }

    if (!CORS) {
        responseHeaders.push({
            name: 'access-control-allow-origin',
            value: getAllowHeader()
        });

        responseHeaders.push({
            name: 'access-control-allow-credentials',
            value: 'true'
        });
    }

    return { responseHeaders };
}

const setOn = () => {
    chrome.browserAction.setBadgeText({
        text: 'on'
    });

    chrome.browserAction.setBadgeBackgroundColor({
        color: [ 86, 171, 86, 1 ]
    });

    chrome.webRequest.onHeadersReceived.addListener(handleResponse, {
        urls: [ '<all_urls>' ],
        types: [ 'xmlhttprequest' ]
    }, [ 'responseHeaders', 'blocking' ]);
};

const setOff = () => {
    chrome.browserAction.setBadgeText({
        text: ''
    });

    chrome.webRequest.onHeadersReceived.removeListener(
        handleResponse
    );
};

if (localStorage.getItem('on')) {
    setOn();
}
else {
    setOff();
}

chrome.browserAction.onClicked.addListener(() => {
    if (localStorage.getItem('on')) {
        localStorage.setItem('on', '');
        setOff();
    }
    else {
        localStorage.setItem('on', '1');
        setOn();
    }
});
