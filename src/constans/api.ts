import ky from 'ky';

export const api = ky.create({
    prefix: process.env.URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const apiExchange = ky.create({
    prefix: process.env.EXCHANGE_RATE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const params = {
    'orgId': process.env.ORG_ID
}
