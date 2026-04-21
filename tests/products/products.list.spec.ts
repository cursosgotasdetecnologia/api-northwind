import { test, request, expect, APIResponse } from "@playwright/test";
import dotenv from 'dotenv'

dotenv.config();



test.describe('Listagem de Produtos', () => {

    let token: string;

    test.beforeEach(async ({ request }) => {

        const login = await request.post('auth/login', {
            data: {
                email: process.env.EMAIL!,
                password: process.env.PASSWORD!
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

    })

    test('Deve filtrar produtos com todos os parâmetros', async ({ request }) => {

        const response = await request.get('products', {
            headers: {
                Authorization: `Bearer ${token}`
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

    test('Deve exibir categorias de produtos com fornecedores', async ({ request }) => {

        const response = await request.get('products', {
            headers: {
                Authorization: `Bearer ${token}`
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

    test('Deve retornar produtos paginados', async ({ request }) => {

        const response = await request.get('products', {
            headers: {
                Authorization: `Bearer ${token}`
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