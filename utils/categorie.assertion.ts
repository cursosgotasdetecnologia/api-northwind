import { expect, APIResponse } from '@playwright/test';

export function validarCategoriaCriada(body: any) {

    // estrutura
    expect(body.data).toHaveProperty('name');
    expect(body.data).toHaveProperty('description');

      // tipos
    expect(typeof body.data.name).toBe('string');
    expect(typeof body.data.description).toBe('string');
    
}

export function validarCategoriaPersistida(body: any, dadosEnviados: any) {

    expect(body.data.name).toBe(dadosEnviados.name);
    expect(body.data.description).toBe(dadosEnviados.description);
}