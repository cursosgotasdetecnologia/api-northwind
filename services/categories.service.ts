import { APIRequestContext } from '@playwright/test';





// 🔹 GET /categories
export async function listarCategorias(
    request: APIRequestContext,
    authToken: string,
    params?: any
) {
    return await request.get('categories', {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
        params
    });
}

// 🔹 GET /categories/{id}
export async function buscarCategoriaPorId(
    request: APIRequestContext,
    authToken: string,
    id: number
) {
    return await request.get(`categories/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
}

// 🔹 POST /categories
export async function criarCategoria(
    request: APIRequestContext,
    authToken: string,
    data: any
) {
    return await request.post('categories', {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
        data
    });

   

}

// 🔹 PUT /categories/{id}
export async function atualizarCategoriaCompleta(
    request: APIRequestContext,
    authToken: string,
    id: number,
    data: any
) {
    return await request.put(`categories/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
        data
    });
}

// 🔹 PATCH /categories/{id}
export async function atualizarCategoriaParcial(
    request: APIRequestContext,
    authToken: string,
    id: number,
    data: any
) {
    return await request.patch(`categories/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
        data
    });
}

// 🔹 DELETE /categories/{id}
export async function deletarCategoria(
    request: APIRequestContext,
    authToken: string,
    id: number
) {
    return await request.delete(`categories/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
}