/// <reference types ="Cypress" />

describe('Checking Weather Information', () => {

    it('GET call for a country via Query Param', () => {
        
        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=san',
        }).then((res) => {
            expect(res.status).to.eq(200)
            const cityname = res.body[0].title
            return cityname
        }).then((cityname) => {
            // Passing data as an individual value
            cy.request({
                method: 'GET',
                url: 'https://www.metaweather.com/api/location/search/?query=' + cityname,
            }).then((res) => {
                expect(res.status).to.eq(200)
                expect(res.body[0].title).eq(cityname)
                expect(res.body[0]).to.have.property('title', cityname)
            })
        })
    })

    it.only('GET call for a country via Query Param',()=>{
        
        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=am'
        }).then((res)=>{
            expect(res.status).to.eq(200)
            const location = res.body
            return location
        })
            .then((location) => {
                // Passing data as an Array
                for(let i=0; i<location.length ; i++){
                    cy.request({
                        method: 'GET',
                        url: 'https://www.metaweather.com/api/location/search/?query=' +location[i].title,
                    })
                        .then((res) => {
                            expect(res.status).to.eq(200)
                            expect(res.body[0].title).eq(location[i].title)
                            expect(res.body[0]).to.have.property('title', location[i].title)
                    })
                }
            
        })

    })
})
