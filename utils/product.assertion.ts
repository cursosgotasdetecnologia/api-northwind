import { expect, APIResponse } from '@playwright/test';

export function validarProdutoCriado(body: any) {

    // 🔹 estrutura
    expect(body.data).toHaveProperty('name');
    expect(body.data).toHaveProperty('price');
    expect(body.data).toHaveProperty('stock_quantity');
    expect(body.data).toHaveProperty('sku');

    // 🔹 tipos
    expect(typeof body.data.id).toBe('number');
    expect(typeof body.data.name).toBe('string');
    expect(typeof body.data.price).toBe('number');

    // 🔹 regras de negócio
    expect(body.data.price).toBeGreaterThan(0);
    expect(body.data.stock_quantity).toBeGreaterThanOrEqual(0);
    expect(body.data.name.length).toBeGreaterThan(0);
}

export function validarProdutoPersistido(body: any, dadosEnviados: any) {

    expect(body.data.name).toBe(dadosEnviados.name);
    expect(body.data.price).toBe(dadosEnviados.price);
    expect(body.data.sku).toBe(dadosEnviados.sku);
    expect(body.data.category_id).toBe(dadosEnviados.category_id);
    expect(body.data.supplier_id).toBe(dadosEnviados.supplier_id);

}