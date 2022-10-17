before(() => {
  cy.setupMetamask('lawn sheriff burst few list scale crash dynamic orient fetch useless spot', 'kovan', 'd.I$-R#Mxa8')
})

describe('Start donation', () => {
  it('login', () => {
    const randomId = Math.floor(Math.random() * 100000)
    const userId = `manolor.campos.sourza`
    cy.visit('/')
    cy.get('input[type=password]')
      .type('2wasdsdd')
      .invoke('val')
      .then(value => cy.log('value password ==== ', value))
    cy.wait(100)
    cy.get('input[type=password]')
      .invoke('attr', 'value')
      .should('match', /^2wasdsdd/)
    cy.wait(200)
    cy.contains('Submit').click()
    cy.wait(1000)
    cy.contains('Donate').click()
    cy.contains('Polygon').click()
    cy.contains('Continue').click()
    cy.log('new user   ', `${userId}`)
    cy.get('input[placeholder="e.g. René"]').type('manolo')
    cy.get('input[placeholder="e.g. Zellweger"]').type('manolo')
    const userEmail = `${userId}@email.ghostinspector.com`
    cy.log('userEmail ==   ', userEmail)
    cy.get('input[placeholder="e.g. rene@artizen.fund"]').type(userEmail)

    cy.get('input[placeholder="e.g. rene@artizen.fund')
      .invoke('val')
      .then(value => {
        cy.log('value email ---')
        cy.log(value)
        cy.log('---------')
      })
    cy.wait(150)
    cy.contains('Sign In / Sign Up').click()
    cy.wait(4000)
    cy.origin(`https://email.ghostinspector.com/${userId}`, () => {
      // Inside callback baseUrl is https://lab.artizen.fund/
      cy.wait(2000)
      cy.visit('/')
      cy.contains('Log in to Artizen_dev').click()
      cy.wait(500)
      // cy.get('.login-button').click()

      cy.get('.login-button').invoke('attr', 'href')
    }).then(hrefValue => {
      cy.log('hrefValue  :::', hrefValue)

      cy.origin(`https://auth.magic.link`, { args: hrefValue }, _hrefValue => {
        cy.log('going to ', _hrefValue.substring(23))
        cy.visit(_hrefValue.substring(23)).then(returnValue => {
          cy.log('returnValue from magic link ', returnValue)
        })
        cy.wait(4000)
      })
    })

    /*
     cy.log(href.substring(23))
          cy.log('-------')
          cy.origin(`https://auth.magic.link/`, () => {
            cy.visit(href.substring(23))
          })
    */

    cy.visit('/')
    cy.wait(12000)

    // cy.contains('Sign In').click()
    // // cy.contains("Sign").click();
    // // cy.contains("Confirm").click();
    // // cy.contains("Connect Wallet").click();
    // // cy.contains("Metamask").click();
    // // cy.isMetamaskWindowActive();
    // cy.origin("https://lab.artizen.fund/", () => {
    //   // Inside callback baseUrl is https://lab.artizen.fund/
    //   cy.visit("/");
    //   cy.get("h1").contains(
    //     "Please enter the Artizen Frontend Preview password."
    //   );
    //   //   // Commands are executed in secondary origin
    //   //   cy.contains("10Sep2022 No Inertia:");
    //   // Passed in values are accessed via callback args
    // });
    // cy.switchToMetamaskWindow();
    // cy.acceptMetamaskAccess().should("be.true");
    // cy.confirmMetamaskSignatureRequest();
    // cy.switchToCypressWindow();
    // cy.contains('Add Project').should('be.visible');
  })
})
