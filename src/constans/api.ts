import ky from 'ky';

export const api = ky.create({
    prefix: process.env.URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
