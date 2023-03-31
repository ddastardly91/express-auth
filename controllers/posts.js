exports.getPosts = (req, res, next) => {
    res.status(200).json({ success: true, user: res.user });
};
