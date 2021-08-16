/// <reference types ="Cypress" />

describe('get api user', () =>{

    let accessToken = '680d8baaa857b1e8f53ea0aeac48b2e933734d97b1959818dba6de08a40462cd'
    
    it.only('get users test', ()=>{
        cy.request({

            method : 'GET',
            url : 'https://gorest.co.in/public/v1/users',
            headers: {
                'authorization' : "Bearer " + accessToken
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.meta.pagination.limit).to.eq(20)
        })
    })

    it('get users by ID', ()=>{
        cy.request({

            method : 'GET',
            url : 'https://gorest.co.in/public/v1/users/2',
            headers: {
                'authorization' : "Bearer " + accessToken
            }
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.data.name).to.eq('Sen. Suma Pandey')
        })
    })



})