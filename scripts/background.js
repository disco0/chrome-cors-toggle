const getAllowHeader = () => {
    var allow = localStorage.getItem('allowOrigin');

    return allow
        ? allow
        : '*';
};

const handleResponse = (res) => {
    let CORS = false;

    for (let i in res.responseHeaders) {
        if (
            res.responseHeaders[i].name === 'access-control-allow-origin'
            && res.responseHeaders[i].value === '*'
        ) {
            CORS = true;
        }
    }

    if (!CORS) {
        res.responseHeaders.push({
            name: 'access-control-allow-origin',
            value: getAllowHeader()
        });

        res.responseHeaders.push({
            name: 'access-control-allow-credentials',
            value: 'true'
        });
    }

    return res;
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
    }, [ 'responseHeaders', "blocking" ]);
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
