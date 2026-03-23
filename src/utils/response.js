const sendJSON = (res, statusCode, data) => {
    res.writeHead(statusCode);
    res.end(JSON.stringify(data));
};

module.exports = { sendJSON };