import { test, expect } from '../../fixtures/auth.fixture';

test.describe('Listagem de Produtos', () => {

    test('Acesso com sucesso ao endpoint de filtro de produtos', async ({ request, authToken }) => {

        const response = await request.get('products?page=1&limit=10', {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
        expect(response.status()).toBe(200);

    })

    test('Deve filtrar produtos com todos os parâmetros', async ({ request, authToken }) => {

        const response = await request.get('products', {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            params: {
                page: 1,
                limit: 3,
                search: 'mochila',
                category_id: 2,
                supplier_id: 7
            }
        });
        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log('Produtos retornados', body.data);
    });

    test('Deve exibir categorias de produtos com fornecedores', async ({ request, authToken }) => {

        const response = await request.get('products', {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            params: {
                category_id: 2,
                supplier_id: 7
            }
        });
        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log('Produtos retornados', body.data);
    });

    test('Deve retornar produtos paginados', async ({ request, authToken }) => {

        const response = await request.get('products', {
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            params: {
                page: 1,
                limit: 5
            }
        });
        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log('Produtos retornados', body.data);
    });

});