import moment from 'moment';
import { isNilOrEmpty, isEmptyArray } from 'ramda-adjunct';
const Validator = require('jsonschema').Validator;
let v = new Validator();
let schema = {
    "title": "Asset list",
    "type": "array",
    "items": {
        "properties": {
            "match": {
                "type": "object",
                "properties": {
                    "homeTeam": {
                        "type": "object",
                        "required": [
                            "id",
                            "name",
                            "image"
                        ]
                    },
                    "awayTeam": {
                        "type": "object",
                        "required": [
                            "id",
                            "name",
                            "image"
                        ]
                    }
                },
                "required": [
                    "id",
                    "homeTeam",
                    "awayTeam"
                ]
            }
        },
        "required": [
            "id",
            "title",
            "description",
            "broadcastStartTime",
            "duration",
            "image"
        ]
    }
}
class Utils {

    getSchema() {
        return schema;
    }
    mandatoryCheck(payload) {
        const validationResponse = v.validate(payload, schema);
        if (isEmptyArray(validationResponse.errors)) {
            return [];
        }
        return validationResponse.errors.map(({ path }) => path);
    }

    removeOptionalFields(payload, root = schema.items) {
        for (var key in payload) {
            if (!root.required.includes(key) && (typeof payload[key] !== 'object' || Array.isArray(payload[key]))) {
                delete payload[key];
            } else if (typeof payload[key] === 'object' && !Array.isArray(payload[key])) {
                this.removeOptionalFields(payload[key], root.properties[key]);
            }
        }
        return payload;
    }

    deriveEndTime(startTime, duration) {
        if (isNilOrEmpty(startTime) || isNilOrEmpty(duration)) {
            return;
        }
        return moment(new Date(startTime)).add(duration, 's').toISOString();
    }
}
export default new Utils();
