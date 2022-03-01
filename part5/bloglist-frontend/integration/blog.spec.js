import cy from 'cypress'

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.findByText('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.findByTestId('username').type('poop')
      cy.findByTestId('password').type('12345')
      cy.findByText('login').click()
      cy.findByText('logged in')
    })

    it('fails with wrong credentials', function() {
      cy.findByTestId('username').type('wrong')
      cy.findByTestId('password').type('wrong')
      cy.findByText('login').click()
      cy.findByText('wrong username or password')
    })
  })


  describe('When logged in', function() {
    beforeEach(function() {
      cy.findByTestId('username').type('poop')
      cy.findByTestId('password').type('12345')
      cy.findByText('login').click()
    })

    it('A blog can be created', function() {
      cy.findByText('New note').click()
      cy.findByTestId('title').type('new blogpost')
      cy.findByTestId('author').type('some author')
      cy.findByTestId('url').type('someurl.com')
      cy.findByText('create').click()
      cy.findByText('new blogpost')
    })

    it('can like a blog', function() {
      cy.findByText('view').click()
      cy.findByText('like').click()
    })
  })
})