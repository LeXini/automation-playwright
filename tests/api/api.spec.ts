import { test, expect } from '@playwright/test';

test.describe('Cadastro De Usuário', () => {
  test('Deve poder cadastrar um novo usuário', async ({ request }) => {
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

  test.only('Deve poder remover um usuário', async ({ request }) => {
    const cadastro = await request.post('/usuarios',{
      data: {
        "nome": "Gremio",
        "email": "gremio@teste.com",
        "password": "gremio123",
        "administrador": "true"
      }
    });
    
    const bodyCadastro = await cadastro.json();
    const usuario = bodyCadastro._id

    const deleteUsuario = await request.delete(`/usuarios/${usuario}`)
    
    expect(deleteUsuario.status()).toBe(200);

    const body = await deleteUsuario.json();
    expect(body.message).toBe('Registro excluído com sucesso')
  })
})