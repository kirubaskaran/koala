import Router from '@koa/router';
import koaBody from 'koa-body';
import compose from 'koa-compose';
import sortArray from 'sort-array';
import { isEmptyArray } from 'ramda-adjunct';
import utils from '../utils/util';


const router = new Router();

export default function api() {
    router.get('/', (ctx, next) => {
        ctx.body = 'Hello World!!'
    });

    router.post('/processAssetList', koaBody({ multipart: true }), (ctx, next) => {
        try {
            //Payload parsing starts
            let payload = ctx.request.body.replace(/(\r\n|\n|\r)/gm, "");
            payload = eval(payload.replace(/"/gi, "'")) || [];
            //Payload parsing ends

            //Validation starts
            const errors = utils.mandatoryCheck(payload);
            const invalidObjectIdx = [];
            const invalidMatchObjectIdx = [];
            if (!isEmptyArray(errors)) {
                for (const errItem of errors) {
                    if (!isEmptyArray(errItem) && errItem.length === 1) {
                        invalidObjectIdx.push(errItem[0]);
                    } else if (!isEmptyArray(errItem) && errItem.length > 1 && !invalidObjectIdx.includes(errItem[0])) {
                        invalidMatchObjectIdx.push(errItem[0]);
                    }
                }
            }
            //Validation ends

            //Data filtering starts
            const filteredPayload = [];
            payload.forEach(function (asset, i) {
                if (invalidMatchObjectIdx.includes(i)) {
                    delete asset.match;
                }
                if (!invalidObjectIdx.includes(i)) {
                    const filteredAsset = utils.removeOptionalFields(asset);
                    filteredAsset.broadcastEndTime = utils.deriveEndTime(asset.broadcastStartTime, asset.duration);
                    filteredAsset.image = filteredAsset.image.replace('image.domain1.com/cms', 'cms.domain2.com');
                    filteredPayload.push(eval(filteredAsset));
                }
            });


            //Data filtering ends
            ctx.status = 200;
            ctx.body = sortArray(filteredPayload, {
                by: 'broadcastStartTime'
            });

        } catch (err) {
            console.error(`Error while processing data ${err}`);
        }
    });

    return compose(
        [
            router.routes(),
            router.allowedMethods()
        ]
    );
}