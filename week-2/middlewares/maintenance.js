
function maintenance(req, res) {
    if (process.env.MAINTENANCE === 'true') {
        return res.status(503).send("Site under maintenance");
    }
    next();
}

export default maintenance;