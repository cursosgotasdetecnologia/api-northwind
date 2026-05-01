import { test } from '@playwright/test';


test('Capturar HAR Fornecedores como contexto', async ({ browser }) => {

    const context = await browser.newContext({
        recordHar: {
            path: 'har/fornecedor.har'
        }
    });
    const request = context.request;

    await request.post('https://northwind-test-platform.vercel.app/api/v1/suppliers', {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjlhOThlZTM4LTE0ZGQtNDE4Zi1iNWVmLTQxNGMzOGFiZWEwMyIsImVtYWlsIjoiYWRtaW5AcWF0ZXN0LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NzI0NDI5MCwiZXhwIjoxNzc3ODQ5MDkwfQ.UuoEhX6DFxxcnjJvuj3WSRdrrrO7yZkbDo4ZxffYaZM'
        },

        data: {
            company_name: "Techr Solutionsggg Ltda",
            contact_name: "Joãro Silvggga",
            email: "joaggrgo@techsolutions.com",
            phone: "(11) 98765-4321",
            cnpj: "98795698512548",
            uf: "SP"
        }
    });
    await context.close();
});


test('Capturar HAR Categoria como contexto', async ({ browser }) => {

    const context = await browser.newContext({
        recordHar: {
            path: 'har/categoria.har'
        }
    });
    const request = context.request;

    await request.post('https://northwind-test-platform.vercel.app/api/v1/categories', {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjlhOThlZTM4LTE0ZGQtNDE4Zi1iNWVmLTQxNGMzOGFiZWEwMyIsImVtYWlsIjoiYWRtaW5AcWF0ZXN0LmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NzI0NDI5MCwiZXhwIjoxNzc3ODQ5MDkwfQ.UuoEhX6DFxxcnjJvuj3WSRdrrrO7yZkbDo4ZxffYaZM'
        },

        data: {
            name: "Eletrônicos HAR",
            description: "Produtos eletrônicos variados HAR"
        }
    });
    await context.close();
});