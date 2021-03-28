export default function responseTime() {
    return function response(ctx, next) {
        const startTime = Date.now();
        return next().then(function () {
            const delta = Math.ceil(Date.now() - startTime);
            ctx.header['X-Response-Time'] = `${delta}ms`;
        })
    }
}