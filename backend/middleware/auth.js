const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ data: "Not authenticated" });
};

const isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ data: "Not authenticated" });
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json({ data: "Access denied. Admin only" });
    }
    next();
};

module.exports = { isAuthenticated, isAdmin };
