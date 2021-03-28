import compose from 'koa-compose'
import helmet from 'koa-helmet'
import bodyParser from 'koa-bodyparser'
import cacheControl from 'koa-cache-control'
import responseTime from './responseTime'
export default function middleware() {
    return compose(
        [
            helmet(),
            cacheControl(
                {
                    noCache: true
                }
            ),
            bodyParser(),
            responseTime()])
}