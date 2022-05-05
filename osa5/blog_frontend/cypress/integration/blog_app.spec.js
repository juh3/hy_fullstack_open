// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Blog ', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mikko Luukkainen',
      username: 'mluukkai',
      password: 'mluukkai'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('The BLOG')
    cy.contains('Welcome to the site that shows the best blogs online!')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('user can log in', function() {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('mluukkai')
    cy.get('#login-button').click()
    cy.get('.success').contains('Login successful')
    .and('have.css', 'color', 'rgb(0, 128, 0)')

  })

  it('user cant log in with false credentials', function() {
    cy.contains('log in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.get('.failure').contains('wrong credentials')
    .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('html').should('not.contain', 'Mikko Luukkainen logged in')


  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'mluukkai' })
    })

    it('a new note can be created', function() {
      cy.contains('add a new blog').click()
      cy.get('#author').type('cypress')
      cy.get('#title').type('blog created by cypress')
      cy.get('#likes').type(32)
      cy.get('#url').type('http//:www.cypres_on_kone.fi')
      cy.get('#add-blog').click()
      cy.contains('blog created by cypress')
      cy.get('.success').contains('Blog added succesfully')
    })
  
    describe('and a blog exists', function () {
      beforeEach(function() {
        cy.createBlog({
          author: 'testi kaks',
          title: 'testien taikaa',
          url: 'http://ww.testitaika.fi',
          likes: 23
        })
      })

      it('it can be viewed', function() {
        cy.contains('testien taikaa testi kaks')
          .contains('view').click()

      })

      it('it can be liked', function() {
        cy.contains('testien taikaa testi kaks')
          .contains('view').click()
        cy.contains('likes: 23')
        cy.get('#button-like').click()
        cy.get('.success').contains('You liked testien taikaa')
      })

      it('it can be removed', function() {
        cy.contains('testien taikaa testi kaks')
          .contains('view').click()
        cy.get('#delete-button').click()
        cy.get('.success').contains('Successfully deleted testien taikaa')
      })

      it('likes are in order, from high to low', function() {
        cy.createBlog({
          author: 'testi kolme',
          title: 'testien magiaa',
          url: 'http://ww.testitaika.fi',
          likes: 30
        })


        cy.get('[id^=view-button]').should('have.length',2).click({multiple:true})


        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('30')
          cy.wrap(blogs[1]).contains('23')
        })
      })
    })
  })
})