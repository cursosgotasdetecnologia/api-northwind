import { test, expect } from '../../fixtures/auth.fixture';

test.describe('GET - Suppliers by ID', () => {

    test('Deve retornar supplier com ID válido', async ({ request, authToken }) => {

        const supplierId = 2;

        const response = await request.get(`suppliers/${supplierId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log('Supplier retornado:', body);

        // Validação básica de estrutura
        
        expect(body.data).toHaveProperty('id');
        expect(body.data.id).toBe(supplierId);
        expect(body.data).toHaveProperty('company_name');
    });

    test('Deve retornar erro ao buscar supplier com ID inexistente', async ({ request, authToken }) => {

        const supplierId = 999999;

        const response = await request.get(`suppliers/${supplierId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        expect(response.status()).toBe(404);

        const body = await response.json();
        console.log('Erro retornado:', body);
    });

    test('Deve retornar erro ao enviar ID inválido (string)', async ({ request, authToken }) => {

        const supplierId = 'abc';

        const response = await request.get(`suppliers/${supplierId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        expect([400, 404]).toContain(response.status());

        const body = await response.json();
        console.log('Resposta inválida:', body);
    });

    // test('Deve retornar erro ao enviar ID vazio', async ({ request, authToken }) => {

    //     const response = await request.get(`suppliers/`, {
    //         headers: {
    //             Authorization: `Bearer ${authToken}`
    //         }
    //     });

    //    expect([400, 404]).toContain(response.status());
      

    //     const body = await response.json();
    //     console.log('Resposta ID vazio:', body);
    // });

    test('Deve retornar erro ao enviar ID nulo', async ({ request, authToken }) => {

        const supplierId = null;

        const response = await request.get(`suppliers/${supplierId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        expect([400, 404]).toContain(response.status());

        const body = await response.json();
        console.log('Resposta ID nulo:', body);
    });

});