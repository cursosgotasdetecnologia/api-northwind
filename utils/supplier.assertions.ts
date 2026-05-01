import { expect, APIResponse } from '@playwright/test';


export function validarFornecedorCriado(body: any) {

    // estrutura
    expect(body.data).toHaveProperty('company_name');
    expect(body.data).toHaveProperty('contact_name');
    expect(body.data).toHaveProperty('email');
    expect(body.data).toHaveProperty('phone');
    expect(body.data).toHaveProperty('cnpj');
    


      // tipos
    expect(typeof body.data.id).toBe('number');
    expect(typeof body.data.company_name).toBe('string');
    expect(typeof body.data.email).toBe('string');
    expect(typeof body.data.cnpj).toBe('string');
    expect(typeof body.data.country).toBe('string');
    expect(typeof body.data.contact_name).toBe('string');
    
}

export function validarFornecedorPersistido(body: any, dadosEnviados: any) {

    expect(body.data.company_name).toBe(dadosEnviados.name);
    expect(body.data.contact_name).toBe(dadosEnviados.price);
    expect(body.data.email).toBe(dadosEnviados.sku);

}