import {test as base} from  "@playwright/test";
import dotenv from 'dotenv'

dotenv.config();

type Fixtures = {
    authToken: string
}

export const test = base.extend<Fixtures>({
    authToken: async ({ request }: any, use) => {

         const login = await request.post('auth/login', {
            data: {
                email: process.env.EMAIL!,
                password: process.env.PASSWORD!
            }
        });
        const body = await login.json();
        const token = body.data.token;

        await use(token);
       
    }
});

export const expect = test.expect;