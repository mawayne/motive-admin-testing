const baseUrl = 'https://dev.admin.motive.fm'
const pagePaths = {ensembles: '/ensembles', series: '/series', projects: '/projects', playlists: '/playlists', audio: '/audio', video: '/video', images: '/images', articles: '/articles', bundles: '/bundles', users: '/users', roles: '/roles', edit: "/edit"}
const itemTitles = {home: 'Dashboard', ensembles: 'Ensembles', series: 'Series', projects: 'Projects', playlists: 'Playlists', audio: 'Audio', video: 'Video', images: 'Images', articles: 'Articles', bundles: 'Bundles', users: 'Users', roles: 'Roles'}
const textFieldEdit = 'Test'


describe ("Navigate to profile page and confirm there is data", function () {
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
      cy.get('div.pl-0.pr-10.col-lg-10.col-xl-10.col') 
        .children('div') 
        .children('div.row')
        .children('div.col')
        .children('div.row')
        .children('div.col').not('div.font-weight-black.col-md-4.col')
        .children().should('be.visible') 
      })
    })
describe ("Edit profile, save update, confirm saving returns to profile page and update has rendered", function () {
    it("Edit button is visible, can be clicked and routes to edit page", function () {
      cy.get('span.v-btn__content').contains('Edit')
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
    it("Edit name, click Save button and confirm that it returns to profile page and edit has rendered", function () {
      cy.get('div.v-text-field__slot').children('input').first()
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
            expect(loc.pathname).to.eq(pagePaths.ensembles + "/" + ensembleIdInteger + "/")
        })
        .get('div.pl-0.pr-10.col-lg-10.col-xl-10.col')
        .children('h1').contains(textFieldEdit)
      })
    })
  })
})
describe ("Return profile to original state", function () {
    before(function () {
      cy.get('div.v-text-field__slot').children('input').first()
      .invoke('text').as('text')
    })
    it("Reverse the changes made in previous edit, save and confirm changes", function () {
      cy.get('span.v-btn__content').contains('Edit')
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
        .type(this.text)
        .get('button.float-right.blue.darken-2.white--text.mt-2.v-btn.v-btn--contained.theme--light.v-size--default') 
        .click()
        .wait(3000)
        .url().then(url => {
          const ensembleIdString = url.split('/').slice(-2)[0]
          const ensembleIdInteger = parseInt(ensembleIdString)         
          cy.location().should((loc) => {
            expect(loc.origin).to.eq(baseUrl)
            expect(loc.pathname).to.eq(pagePaths.ensembles + "/" + ensembleIdInteger + "/")
        })
        .get('div.pl-0.pr-10.col-lg-10.col-xl-10.col')
        .children('h1').contains(this.text)  
        }) 
      })
    })
  })
