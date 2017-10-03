
module.exports = (template) => {
    return (ctx, req) => {
        return template(req, ctx);
    };
};
