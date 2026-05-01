import { expect, APIResponse } from '@playwright/test';

export function validarStatusEMensagem(
    response: APIResponse,
    body: any,
    esperado: any
) {
    expect(response.status()).toBe(esperado.status);
    expect(body.mensagens).toContain(esperado.mensagem);
}


export function validarContentTypeJson(response: APIResponse) {
    const headers = response.headers();

    expect(headers['content-type']).toBeDefined();
    expect(headers['content-type']).toContain('application/json');
}

export function validarStatus(response: APIResponse, status: number) {
    expect(response.status()).toBe(status);
}

export function validarErroConflito(
    response: APIResponse,
    body: any,
    mensagem: string
) {
    expect(response.status()).toBe(409);
    expect(body.mensagens).toContain(mensagem);
}