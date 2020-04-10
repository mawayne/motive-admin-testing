describe ("Test Ensembles tab in Admin", function () {
    it("Ensembles tab is visible, can be clicked and routes to Ensembles page", function () {
      cy.visit('https://staging.admin.motive.fm/')
        .contains('Dashboard')
        .get('div.v-list-item__title')
        .should('be.visible')
        .contains('Ensembles')
        .click()
        .wait(3000)
        .url().should('include', '/ensembles')
    })
    it("Table contains data", function () {
      cy.get('tbody>tr')
        .children('.text-left')
        .children() // might need to add a line or two to make more thorough
        .should('be.visible')
    })
    it("Clicking data link in table routes to profile", function() {
      cy.get('tbody>tr')
        .children('.text-left')
        .children() 
        .eq(0).click() // see if there's a way to make sure all links work
        .wait(3000)
        .url().should('include', '/ensembles') // see if there's a way to say "should('include, '/ensembles/{some number}"
    })
    it("Profile page contains data", function () {
      cy.get('div.v-content__wrap')
        .children('.container.pl-5.align-start')
        .children('div')
        .children()
        .children('div.row')
        .children('div.col')
        .children('div.row')
        .children('div.col').not('div.font-weight-black.col-md-4.col')
        .children().should('be.visible')
       // this maybe would be written as an if statement in the event that eventually there should be some sort of data in the Members/Projects section - in that case you could add elif/else statement to make sure there is data in at least one part of the profile.
    })
    it("Edit button is visible, can be clicked and routes to edit page", function () {
      cy.get('span.v-btn__content')
        .should('be.visible')
        .contains('Edit')
        .click()
        .wait(3000)
        .url().should('include', '/edit') // see if there's a way to say "should('include, '/ensembles/{some number}/edit)"
    })
    it("Save button is visible, can be clicked and returns to profile page", function () {
      cy.get('button.float-right.blue.darken-2.white--text.mt-2.v-btn.v-btn--contained.theme--light.v-size--default')
        .should('be.visible')
        .contains('Save')
        .click()
        .wait(3000)
        .url().should('include', '/ensembles') // see if there's a way to confirm that it returned to correct page
    })
})
