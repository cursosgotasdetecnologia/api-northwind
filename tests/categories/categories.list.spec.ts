import { test, request, expect } from "@playwright/test";


test.describe('Listagem Categorias', () => {

    test.describe('Listagem completa', () => {

        test('não permite listar categorias sem autenticação', async ({ request }) => {
            const response = await request.get('https://northwind-test-platform.vercel.app/api/v1/categories')
            //console.log(response.status());
            expect(response.status()).toBe(401);

        });

        test('explorando responses - verificando status code', async ({ request }) => {
            const response = await request.get('https://northwind-test-platform.vercel.app/api/v1/categories')
            console.log('Status Code:', response.status());

        });

        test('explorando responses', async ({ request }) => {
            const response = await request.get('https://northwind-test-platform.vercel.app/api/v1/categories')
            console.log('Status Code:', response.status());
            console.log('URL do Sistema:', response.url());

        });

    })

    test.describe('Listagem por parâmetros', () => {


        test('impedir validação de  categoria por id sem autenticação', async ({ request }) => {
            const response = await request.get('https://northwind-test-platform.vercel.app/api/v1/categories/3')
            expect(response.status()).toBe(401);
            console.log('Status Code:', response.status());

        });
    })

})


