const baseUrl = 'https://dev.admin.motive.fm'
const pagePaths = {ensembles: '/ensembles', series: '/series', projects: '/projects', playlists: '/playlists', audio: '/audio', video: '/video', images: '/images', articles: '/articles', bundles: '/bundles', users: '/users', roles: '/roles', edit: "/edit"}
const itemTitles = {home: 'Dashboard', ensembles: 'Ensembles', series: 'Series', projects: 'Projects', playlists: 'Playlists', audio: 'Audio', video: 'Video', images: 'Images', articles: 'Articles', bundles: 'Bundles', users: 'Users', roles: 'Roles'}
const textFieldEdit = 'Test'


describe ("Test Ensembles tab in Admin", function () {
    it("Ensembles tab is visible, can be clicked and routes to Ensembles page", function () {
      cy.visit(baseUrl)
        .contains(itemTitles.home)
        .get('i.v-icon.notranslate.mdi.mdi-menu.theme--light')
        .should('be.visible') 
        .get('div.v-list-item__title')
        .should('be.visible')
        .contains(itemTitles.ensembles)
        .click()
        .wait(3000)
        .get('div.container.pl-5.align-start')
        .children('div')
        .children('div')
        .children('h1')
        .contains(itemTitles.ensembles)
        .url().should('eq', baseUrl + pagePaths.ensembles)
    })
    it("Table contains data", function () {
      cy.get('tbody>tr')
        .get('td.text-left') // make selector. this is the data content of each cell in table body (i.e. does not including the checkboxes in first column)
        .children('a') // make selector. these are the data links in the Name column (note: for articles this would be ID column)
        // .get('td.text-left')
        // .children('div').children('a') - make selector. these are the data links in subsequent columns
        .should('be.visible')
    })
    it("Clicking data link in table routes to profile", function() {
      cy.get('tbody>tr') // make selector? this is getting all table rows in table body
        .children('.text-left') // make selector. this is the text content of each cell in table body (i.e. does not including the checkboxes in first column)
        .children('a') // make selector. these are the links in the Name column (note: for articles this would be ID column)
        // .get('td.text-left')
        // .children('div').children('a') - make selector. these are the data links in subsequent columns
        .eq(0).click()
        .wait(3000)
        .url().then(url => {
          const ensembleIdString = url.split('/').slice(-1)[0]
          const ensembleIdInteger = parseInt(ensembleIdString)
          cy.location().should((loc) => {
            expect(loc.origin).to.eq(baseUrl)
            expect(loc.pathname).to.eq(pagePaths.ensembles + "/" + ensembleIdInteger)
        })
      }) 
    })
    it("Profile page contains data", function () {
      cy.get('div.v-content__wrap') // make selector? this is the content wrapper
        .children('.container.pl-5.align-start') // make selector? this is the container
        .children('div') //see comment in last line of test suite
        .children()
        .children('div.row')
        .children('div.col')
        .children('div.row')
        .children('div.col').not('div.font-weight-black.col-md-4.col')
        .children().should('be.visible') // all code above gets the Description, Genres...Release Date fields with the exception of Location. This is because they have the same selector as the column names which I excluded with the { .not('div.font-weight-black.col-md-4.col') } command.
    })
    it("Edit button is visible, can be clicked and routes to edit page", function () {
      cy.get('span.v-btn__content') // make selector - this is the Edit button
      .contains('Edit')
      .should('be.visible')
      .click()
      .wait(3000)
      .url().then(url => {
        const ensembleIdString = url.split('/').slice(-2)[0]
        const ensembleIdInteger = parseInt(ensembleIdString)
        cy.location().should((loc) => {
          expect(loc.origin).to.eq(baseUrl)
          expect(loc.pathname).to.eq(pagePaths.ensembles + "/" + ensembleIdInteger + pagePaths.edit) 
      })
    }) 
  })
    it("Edit name, click Save button and confirm that it returns to profile page and edit has rendered", function () {
      cy.get('div.v-text-field__slot').children('input').first() // make selector? this gets the first text input - the Name field in this instance
      .clear()
      .type(textFieldEdit) //put a selector for the form it self (profile form as the class for example). selector could be ".profile-form.name"
      .get('button.float-right.blue.darken-2.white--text.mt-2.v-btn.v-btn--contained.theme--light.v-size--default') // make selector. this is the Save button
      .should('be.visible')
      .contains('Save')
      .click()
      .wait(3000)
      .get('div.pl-0.pr-10.col-lg-10.col-xl-10.col') // make selector. this is the content wrapper
      .children('h1').contains(textFieldEdit) // this is the item header - the ensemble name in this instance
      .url().then(url => {
        const ensembleIdString = url.split('/').slice(-2)[0]
        const ensembleIdInteger = parseInt(ensembleIdString)
        cy.location().should((loc) => {
          expect(loc.origin).to.eq(baseUrl)
          expect(loc.pathname).to.eq(pagePaths.ensembles + "/" + ensembleIdInteger + "/")
      })
    }) 
  })
})
