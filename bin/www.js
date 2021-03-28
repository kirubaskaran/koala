import app from '../server'
import fs from 'fs'
import https from 'https'

(async () => {
    try {
        await startHttpsServer();
    } catch (e) {
        console.error(e);
    }

})();

async function startHttpsServer() {
    await https.createServer({
        key: fs.readFileSync('./resources/cert/server.key', 'utf8'),
        cert: fs.readFileSync('./resources/cert/server.cert', 'utf8')
    }, app.callback()).listen(443);
    await app.listen(8081);
}