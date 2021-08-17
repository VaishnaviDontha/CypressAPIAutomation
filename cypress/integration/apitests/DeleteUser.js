/// <reference types ="Cypress" />

describe('Delete User Request', () => {

    let accessToken = '680d8baaa857b1e8f53ea0aeac48b2e933734d97b1959818dba6de08a40462cd'

    it('Create User Test', () => {

        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v1/users',
            headers: {
                'Authorization': "Bearer " + accessToken
            },
            body: {
                "name": "Test User updated 10000",
                "email": "testEmailupdatedagaintests@gmail.com",
                "gender": "male",
                "status": "active"
            }

        }).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body.data).has.property('email', 'testEmailupdatedagaintests@gmail.com')
            expect(res.body.data).has.property('name', 'Test User updated 10000')
            expect(res.body.data).has.property('status', 'active')
            expect(res.body.data).has.property('gender', 'male')
        }).then((res) => {

            const userID = res.body.data.id

            cy.request({
                method: 'DELETE',
                url: 'https://gorest.co.in/public/v1/users/' + userID,
                headers: {
                    'Authorization': "Bearer " + accessToken
                }

            }).then((res) => {
                expect(res.status).to.eq(204)
            })
        })
    })
})