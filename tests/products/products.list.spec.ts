import { test, request, expect, APIResponse } from "@playwright/test";

test.describe('Listagem de Produtos', () => {

    let token: string;

    test.beforeEach(async ({ request }) => {

        const login = await request.post('auth/login', {
            data: {
                email: "admin@qatest.com",
                password: "Teste@123"
            }
        })
        const body = await login.json();
        token = body.data.token;
    });


    test('Acesso com sucesso ao endpoint de filtro de produtos', async ({ request }) => {

        const response = await request.get('products?page=1&limit=10', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        expect(response.status()).toBe(200);
        console.log('O token é: ', token)

    });
});