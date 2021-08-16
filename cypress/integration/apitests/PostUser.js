/// <reference types ="Cypress" />

describe('Post User Request', () => {

let accessToken = '680d8baaa857b1e8f53ea0aeac48b2e933734d97b1959818dba6de08a40462cd'
let randomText = ""
let testEmail = ""

const dataJson = require('../../fixtures/createUser')
    it('Create User Test', () => {

        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for ( var i =0 ; i<10 ; i++){
            randomText+= pattern.charAt(Math.floor(Math.random() * pattern.length));
            testEmail = randomText + '@gmail.com'
        }


        cy.request({
            method : 'POST',
            url : 'https://gorest.co.in/public/v1/users',
            headers: {
                'Authorization' : "Bearer " + accessToken
            },
            body : {
                    "name": dataJson.name,
                    "email": testEmail,
                    "gender": dataJson.gender,
                    "status": dataJson.status
            }

        }).then((res)=>{
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('email', testEmail)
            expect(res.body.data).has.property('name',dataJson.name )
            expect(res.body.data).has.property('status', dataJson.status)
            expect(res.body.data).has.property('gender', dataJson.gender)
        }).then((res)=>{
            
            const userId = res.body.data.id
            cy.request({
                method : 'GET',
                url : 'https://gorest.co.in/public/v1/users/'+userId,
                headers: {
                    'Authorization' : "Bearer " + accessToken
                },

            }).then((res)=> {
                expect(res.status).to.eq(200)
                expect(res.body.data).has.property('email', testEmail)
                expect(res.body.data).has.property('name',dataJson.name )
                expect(res.body.data).has.property('status', dataJson.status)
                expect(res.body.data).has.property('gender', dataJson.gender)
                expect(res.body.data).has.property('id', userId)
            })
        })
    })
}) 