/// <reference types="cypress" />
const credenciais = require('../fixtures/perfil.json')
import produtosPO from '../support/page_objects/produto.page'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
    cy.visit('/minha-conta')
  });

  describe('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações

    it('Deve acessar o site da loja EBAC, fazer um pedido de 4 produtos, adicionar ao carrinho, preencher checkout e validar a compra', () => {
      cy.fixture('produtos').then(dados => {
        produtosPO.procuraProduto(dados[0].nomeProduto)
        produtosPO.adicionaProdutoCarrinho(
          dados[0].tamanho,
          dados[0].cor,
          dados[0].quantidade
        )
        produtosPO.procuraProduto(dados[1].nomeProduto)
        produtosPO.adicionaProdutoCarrinho(
          dados[1].tamanho,
          dados[1].cor,
          dados[1].quantidade
        )
      })

      cy.get('.woocommerce-message > .button').click()
      cy.get('.checkout-button').click()
      cy.get('.page-title').should('have.text', 'Checkout')
      cy.get('[name="billing_country"]').select('Brasil', { force: true })
      cy.get('#billing_first_name').type('Nome teste')
      cy.get('#billing_last_name').type('Sobrenome teste')
      cy.get('#billing_company').type('Empresa teste')
      cy.get('#billing_address_1').type('Rua teste, n°100')
      cy.get('#billing_address_2').type('Casa')
      cy.get('#billing_city').type('Cidade teste')
      cy.get('#billing_postcode').type('89400000')
      cy.get('[data-label="Estado"]').select('Roraima', { force: true })
      cy.get('#billing_phone').type('11999999999')
      cy.get('#billing_email').type('testeebacamana@gmail.com')
      cy.get('#payment_method_cheque').click()
      cy.get('#terms').click()
      cy.get('#place_order').click()
      cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')

      
    });
  });
})