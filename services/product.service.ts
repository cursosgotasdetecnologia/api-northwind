import { APIRequestContext } from '@playwright/test';

export async function criarProduto( 
    request: APIRequestContext, 
    authToken: string,
    data: any
) {
    return await request.post('products', {
        headers: { Authorization: `Bearer ${authToken}` },
        data
    });
}



export async function listarProdutos(
    request: APIRequestContext,
    authToken: string,
    params?: any
) {
    return await request.get('products', {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
        params
    });
}