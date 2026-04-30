import { APIRequestContext } from '@playwright/test';

export async function criarSupplier(
    request: APIRequestContext,
    authToken: string,
    data: any
) {
    return await request.post('suppliers', {
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            accept: 'application/json'
        },
        data
    });
}

export async function listarSuppliers(
    request: APIRequestContext,
    authToken: string,
    params?: any
) {
    return await request.get('suppliers', {
        headers: {
            Authorization: `Bearer ${authToken}`,
            accept: 'application/json'
        },
        params
    });
}

export async function buscarSupplierPorId(
    request: APIRequestContext,
    authToken: string,
    supplierId: number
) {
    return await request.get(`suppliers/${supplierId}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
            accept: 'application/json'
        }
    });
}



export async function atualizarSupplier(
    request: APIRequestContext,
    authToken: string,
    supplierId: number,
    data: any
) {
    return await request.put(`suppliers/${supplierId}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            accept: 'application/json'
        },
        data
    });
}


export async function deletarSupplier(
    request: APIRequestContext,
    authToken: string,
    supplierId: number
) {
    return await request.delete(`suppliers/${supplierId}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
            accept: 'application/json'
        }
    });
}



export async function listarProdutosDoSupplier(
    request: APIRequestContext,
    authToken: string,
    supplierId: number
) {
    return await request.get(`suppliers/${supplierId}/products`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
            accept: 'application/json'
        }
    });
}