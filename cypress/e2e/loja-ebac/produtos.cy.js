/// <reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('Funcionalidade: Produtos', () => {

    beforeEach(() => {
        //cy.visit('produtos')
        produtosPage.visitarUrl()
    });

    it('Deve selecionar um produto da lista', () => {
        //cy.get('.products > .row')
          //  .contains('Abominable Hoodie')
          //  .click()
        
          // cy.get('#tab-title-description > a').should('contain', 'Descrição')
        
        produtosPage.buscarProdutoLista('Abominable Hoodie')
            cy.get('#tab-title-description > a').should('contain', 'Descrição')
    });

    it('Deve buscar um produto com sucesso', () => {
        let produto = 'Grayson Crewneck Sweatshirt'
        produtosPage.buscarProduto(produto)
        cy.get('.product_title').should('contain', produto)
    });

    it('Deve visitar a página do produto', () => {
        produtosPage.visitarProduto('Aero Daily Fitness Tee')
        cy.get('.product_title').should('contain', 'Aero Daily Fitness Tee')
    });

    it('Deve adicionar produto ao carrinho', () => {
        let qtd = 7
        produtosPage.buscarProduto('Abominable Hoodie')
        produtosPage.addProdutoCarrinho('L', 'Blue', qtd)

        cy.get('.woocommerce-message').should('contain', qtd + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')
    });

    it.only('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProduto(dados[2].nomeProduto)
            produtosPage.addProdutoCarrinho(
                dados[2].tamanho, 
                dados[2].cor, 
                dados[2].quantidade)
    
            cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto)

        })
        

    });
});