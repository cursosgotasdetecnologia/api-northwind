import { test, request, expect } from "@playwright/test";

test('não permite listar categorias sem autenticação', async({ request }) => {
    const response = await request.get('https://northwind-test-platform.vercel.app/api/v1/categories')
    //console.log(response.status());
    expect(response.status()).toBe(401);
    
});


