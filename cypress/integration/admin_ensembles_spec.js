const baseUrl = 'https://dev.admin.motive.fm'
const pagePaths = {newItem: '/new', ensembles: '/ensembles', series: '/series', projects: '/projects', playlists: '/playlists', audio: '/audio', video: '/video', images: '/images', articles: '/articles', bundles: '/bundles', users: '/users', roles: '/roles', edit: "/edit"}
const itemTitles = {home: 'Dashboard', newEnsemble: 'New Ensemble', newSeries: 'New Series', newProject: 'New Project', ensembles: 'Ensembles', series: 'Series', projects: 'Projects', playlists: 'Playlists', audio: 'Audio', video: 'Video', images: 'Images', articles: 'Articles', bundles: 'Bundles', users: 'Users', roles: 'Roles'}
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
        .url().should('eq', baseUrl + pagePaths.ensembles)
        .get('div.container.pl-5.align-start')
        .children('div')
        .children('div')
        .children('h1')
        .should('be.visible')
        .contains(itemTitles.ensembles)

    })
    it("Add Ensemble button can be clicked, reroutes to New Ensembles page. Edits can canceled (and return to Ensembles page) or be saved (and are rendered).", function () {
      cy.get('span.v-btn__content')
        .should('be.visible')
        .contains('Add Ensemble')
        .click()
        .wait(3000)
        .url().then(url => {
          const ensembleIdString = url.split('/').slice(-1)[0]
          const ensembleIdInteger = parseInt(ensembleIdString)
          cy.location().should((loc) => {
            expect(loc.origin).to.eq(baseUrl)
            expect(loc.pathname).to.eq(pagePaths.ensembles + pagePaths.newItem)
        })
        .get('div.pl-0.pr-10.col-lg-8.col-xl-6.col')
        .children('h1')
        .should('be.visible')
        .contains('New Ensemble')
        .get('button.mr-3.v-btn--contained.theme--light.v-size--default')
        .click()
        .wait(3000)
        .url().should('eq', baseUrl + pagePaths.ensembles)
        .get('div.container.pl-5.align-start')
        .children('div')
        .children('div')
        .children('h1')
        .should('be.visible')
        .contains(itemTitles.ensembles)
        .get('span.v-btn__content')
        .should('be.visible')
        .contains('Add Ensemble')
        .click()
        .wait(3000)
        .url().then(url => {
          const ensembleIdString = url.split('/').slice(-1)[0]
          const ensembleIdInteger = parseInt(ensembleIdString)
          cy.location().should((loc) => {
            expect(loc.origin).to.eq(baseUrl)
            expect(loc.pathname).to.eq(pagePaths.ensembles + pagePaths.newItem)
        })
        .get('div.pl-0.pr-10.col-lg-8.col-xl-6.col')
        .children('h1')
        .should('be.visible')
        .contains('New Ensemble')
        })
      })
    })
    it("Ensembles table contains data", function () {
      cy.get('tbody>tr')
        .get('td.text-left')
        .children('a')
        // .get('td.text-left')
        // .children('div').children('a')
        .should('be.visible')
    })
    it("Clicking data link in table routes to profile", function() {
      cy.get('tbody>tr') 
        .children('.text-left') 
        .children('a') 
        // .get('td.text-left')
        // .children('div').children('a') 
        .eq(3).click()
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
      cy.get('div.pl-0.pr-10.col-lg-10.col-xl-10.col') 
        .children('div') 
        .children('div.row')
        .children('div.col')
        .children('div.row')
        .children('div.col').not('div.font-weight-black.col-md-4.col')
        .children().should('be.visible') 
    })
    it("Edit button is visible, can be clicked and routes to edit page", function () {
      cy.get('span.v-btn__content') 
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
    it("Make an edit, click Save, confirm page returns to profile and the edit has rendered then return original data to profile and confirm it has rendered", function () {
      cy.get('div.v-text-field__slot').children('input').first()
        .invoke('val').as('originalName')
        .get('div.v-text-field__slot').children('input').first()
        .clear()
        .type(textFieldEdit) 
        .get('button.float-right.blue.darken-2.white--text.mt-2.v-btn.v-btn--contained.theme--light.v-size--default') 
        .should('be.visible')
        .contains('Save')
        .click()
        .wait(3000)
        .url().then(url => {
            const ensembleIdString = url.split('/').slice(-2)[0]
            const ensembleIdInteger = parseInt(ensembleIdString)
            cy.location().should((loc) => {
            expect(loc.origin).to.eq(baseUrl)
            expect(loc.pathname).to.eq(pagePaths.ensembles + "/" + ensembleIdInteger + "/")
        })
        .get('div.pl-0.pr-10.col-lg-10.col-xl-10.col') 
        .children('h1').contains(textFieldEdit) 
        })
        .get('span.v-btn__content')
        .should('be.visible')
        .contains('Edit')
        .click()
        .wait(3000)
        .url().then(url => {
          const ensembleIdString = url.split('/').slice(-2)[0]
          const ensembleIdInteger = parseInt(ensembleIdString)
          cy.location().should((loc) => {
            expect(loc.origin).to.eq(baseUrl)
            expect(loc.pathname).to.eq(pagePaths.ensembles + "/" + ensembleIdInteger + pagePaths.edit) 
        })
        .get('div.v-text-field__slot').children('input').first()
        .clear()
        .type(this.originalName)
        .get('button.float-right.blue.darken-2.white--text.mt-2.v-btn.v-btn--contained.theme--light.v-size--default') 
        .should('be.visible')
        .contains('Save')
        .click()
        .wait(3000)
        .url().then(url => {
            const ensembleIdString = url.split('/').slice(-2)[0]
            const ensembleIdInteger = parseInt(ensembleIdString)
            cy.location().should((loc) => {
            expect(loc.origin).to.eq(baseUrl)
            expect(loc.pathname).to.eq(pagePaths.ensembles + "/" + ensembleIdInteger + "/")
        })
        .get('div.pl-0.pr-10.col-lg-10.col-xl-10.col')
        .children('h1') 
        .contains(this.originalName)
        })       
      })
    }) 
  })