before(() => {
  cy.setupMetamask('lawn sheriff burst few list scale crash dynamic orient fetch useless spot', 'kovan', 'd.I$-R#Mxa8')
})

describe('Start donation', () => {
  it('login', () => {
    cy.visit('/')
    cy.get('input[type=password]').type('2wasdsdd')
    cy.contains('Submit').click()
    cy.wait(500)
    cy.contains('Donate').click()
    cy.contains('Polygon').click()
    cy.contains('Continue').click()
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
