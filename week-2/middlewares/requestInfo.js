function requestInfo(req, res, next) {
    console.log(req.method, req.originalUrl, req.url, new Date ().toISOString());

    next();

}

export default requestInfo;