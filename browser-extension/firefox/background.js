// CORS logic based on: https://github.com/spenibus/cors-everywhere-firefox-addon

'use strict';

let videocollegeHelper = {
    transactions: {}, // contains requests/responses

    init: () => {
        browser.webRequest.onBeforeSendHeaders.addListener(
            videocollegeHelper.requestHandler,
            { urls: ["http://localhost:3000/*", "https://videocollege.tue.nl/*", "https://videocollege.vercel.app/*"] },
            ["blocking", "requestHeaders"]
        );

        browser.webRequest.onHeadersReceived.addListener(
            videocollegeHelper.responseHandler,
            { urls: ["http://localhost:3000/*", "https://videocollege.tue.nl/*", "https://videocollege.vercel.app/*"] },
            ["blocking", "responseHeaders"]
        );

        return this;
    },

    requestHandler: async (request) => {
        // prepare transaction, store transaction request
        let transaction = {
            request: request,
            requestHeaders: {},
            response: {},
            responseHeaders: {}
        };

        // shorthand access to request headers
        for (let header of request.requestHeaders) {
            transaction.requestHeaders[header.name.toLowerCase()] = header;
        }

        // store transaction
        videocollegeHelper.transactions[request.requestId] = transaction;

        if (transaction.requestHeaders['host'].value === "videocollege.tue.nl" && (transaction.request.originUrl.includes("http://localhost:3000") || transaction.request.originUrl.includes("https://videocollege.vercel.app"))) {
            const { name, value } = await browser.cookies.get({
                name: "MediasiteAuth",
                url: "https://videocollege.tue.nl"
            })

            const cookieString = `${name}=${value}`

            if (transaction.requestHeaders["cookie"]) {
                transaction.requestHeaders["cookie"].value += `; ${cookieString}`;
            } else {
                transaction.request.requestHeaders.push({
                    name: "Cookie",
                    value: cookieString,
                })
            }

            if (transaction.requestHeaders["content-type"].value === "text/plain") {
                transaction.requestHeaders["content-type"].value = "application/json";
            }
        }

        return {
            requestHeaders: transaction.request.requestHeaders
        };
    },

    responseHandler: (response) => {
        // get transaction
        let transaction = videocollegeHelper.transactions[response.requestId];

        // store transaction response
        transaction.response = response;

        // shorthand access to response headers
        for (let header of response.responseHeaders) {
            transaction.responseHeaders[header.name.toLowerCase()] = header;
        }

        // create response headers if necessary
        for (let name of [
            'access-control-allow-origin',
            'access-control-allow-methods',
            'access-control-allow-headers',
            'access-control-allow-credentials'
        ]) {
            // header exists, skip
            if (transaction.responseHeaders[name]) {
                continue;
            }

            // create header
            let header = {
                name: name,
                value: "null"
            };

            transaction.response.responseHeaders.push(header)
            transaction.responseHeaders[name] = header;
        }

        // set "access-control-allow-origin", prioritize "origin" else "*"
        transaction.responseHeaders['access-control-allow-origin'].value =
            transaction.requestHeaders['origin']
                && transaction.requestHeaders['origin'].value !== null
                ? transaction.requestHeaders['origin'].value
                : '*';

        if (
            transaction.requestHeaders['access-control-request-method']
            && transaction.requestHeaders['access-control-request-method'].value !== null
        ) {
            transaction.responseHeaders['access-control-allow-methods'].value =
                transaction.requestHeaders['access-control-request-method'].value
        }

        if (
            transaction.requestHeaders['access-control-request-headers']
            && transaction.requestHeaders['access-control-request-headers'].value !== null
        ) {
            transaction.responseHeaders['access-control-allow-headers'].value =
                transaction.requestHeaders['access-control-request-headers'].value
        }

        transaction.responseHeaders['access-control-allow-credentials'].value = "true";

        // delete transaction
        delete videocollegeHelper.transactions[response.requestId];

        return {
            responseHeaders: transaction.response.responseHeaders
        };
    }
};

let bg = videocollegeHelper.init();
