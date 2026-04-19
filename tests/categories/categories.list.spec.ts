import { test, request, expect, APIResponse } from "@playwright/test";


test.describe('Listagem Categorias', () => {

    test.describe('Listagem completa', () => {


        let response: APIResponse;
        test.beforeEach(async ({ request }) => {
            response = await request.get('categories');
        });

        test('debug baseURL', async () => {

            console.log('URL FINAL:', response.url());
        });

        test('não permite listar categorias sem autenticação', async ({ request }) => {

            //console.log(response.status());
            console.log('URL FINAL:', response.url());
            expect(response.status()).toBe(401);

        });

        test('explorando responses - verificando status code', async ({ request }) => {

            console.log('Status Code:', response.status());

        });

        test('explorando responses', async ({ request }) => {

            console.log('Status Code:', response.status());
            console.log('URL do Sistema:', response.url());

        });

    })

    test.describe('Listagem por parâmetros', () => {


        test('impedir validação de  categoria por id sem autenticação', async ({ request }) => {
            const response = await request.get('categories/3')
            expect(response.status()).toBe(401);
            console.log('Status Code:', response.status());

        });
    })

})


