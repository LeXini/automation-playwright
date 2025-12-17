import { test, expect } from '@playwright/test';

export function validateResponseUsuario(data: any): boolean {

    expect(data.nome).toBe('Fulano da Silva')
    expect(data.email).toBe('fulano@qa.com')
    expect(data.password).toBe('teste')
    expect(data.administrador).toBe('true')
    expect(data._id).toBe('0uxuPY0cbmQhpEz1')

    return true as boolean;
}