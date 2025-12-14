import { test, expect } from '@playwright/test';

test.describe('cadastro', () => {
  test('deve poder cadastrar um novo usuário', async ({ request }) => {
    const response = await request.post('/usuarios',{
      data: {
        "nome": "Gremio",
        "email": "gremio@teste.com",
        "password": "gremio123",
        "administrador": "true"
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body.message).toBe('Cadastro realizado com sucesso')
  })
})