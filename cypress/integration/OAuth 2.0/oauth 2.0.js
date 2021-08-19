/// <reference types="Cypress" />

describe('Oauth API', () => {

    let userId = '';
    let access_token = '';

    //Before functionality
    before("Generating Access Token and UserID", () => {
        cy.request({
            method: 'POST',
            url: '/token',
            form: true,
            body: {
                "client_id": "CypressAPI",
                "client_secret": "b19f1a9a7641b307c328d5ae0e047747",
                "grant_type": "client_credentials"
            }

        }).then(response=>{
            cy.log(JSON.stringify(response));
            cy.log(response.body.access_token);
            access_token = response.body.access_token;
 
            //get the user id
             cy.request({
                 method: 'GET',
                 url: '/api/me',
                 headers: {
                     'Authorization' : 'Bearer ' + access_token
                 }
             }).then(response=>{
                 userId = response.body.id;
                 cy.log("user id " + userId);
            })
        })
    })

    it("Unlock the Barn", () => {

        cy.request({
            method: 'POST',
            url: '/api/' + userId + '/barn-unlock',
            headers: {
                'Authorisation': 'Bearer' + access_token
            }
        }).then((res) => {
            cy.log(JSON.stringify(res));
            expect(res.status).to.eq(200)
        })

    })

    it("Put the Toilet Seat Down", () => {

        cy.request({
            method: 'POST',
            url: '/api/' + userId + '/toiletseat-down',
            headers: {
                'Authorisation': 'Bearer' + access_token
            }
        }).then((res) => {
            cy.log(JSON.stringify(res));
            expect(res.status).to.eq(200)
        })

    })

})