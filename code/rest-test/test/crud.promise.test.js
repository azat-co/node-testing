const axios = require('axios')
const {expect} = require('chai')
const app = require('../server.js')
const port = 3002

before(()=>{
  return new Promise((resolve, reject) => {
    app.listen(port, resolve)
  })
})

describe('express rest api server', () => {
  let id

  it('posts an object', () => {
    return axios
      .post(`http://localhost:${port}/collections/test`, { name: 'John', email: 'john@rpjs.co'})
      .then(response=>response.data)
      .then((body) => {
        expect(body.length).to.eql(1)
        expect(body[0]._id.length).to.eql(24)
        id = body[0]._id
      })
  })

  it('retrieves an object', () => {
    return axios.get(`http://localhost:${port}/collections/test/${id}`)
      .then(response=>response.data)
      .then((body) => {
        // console.log(body)
        expect(typeof body).to.eql('object')
        expect(body._id.length).to.eql(24)
        expect(body._id).to.eql(id)
        expect(body.name).to.eql('John')
      })
  })

  it('retrieves a collection', () => {
    return axios.get(`http://localhost:${port}/collections/test`)
      .then(response=>response.data)
      .then((body) => {
        // console.log(body)
        expect(body.length).to.be.above(0)
        expect(body.map((item) => {return item._id})).to.contain(id)
      })
  })

  it('updates an object', () => {
    return axios
      .put(`http://localhost:${port}/collections/test/${id}`, {name: 'Peter', email: 'peter@yahoo.com'})
      .then(response=>response.data)      
      .then((body) =>{
        // console.log(body, e)
        expect(typeof body).to.eql('object')
        expect(body).to.eql({ msg: 'success' })
      })
  })

  it('checks an updated object', () => {
    return axios.get(`http://localhost:${port}/collections/test/${id}`)
      .then(response=>response.data)
      .then((body) => {
        // console.log(body)
        expect(typeof body).to.eql('object')
        expect(body._id.length).to.eql(24)
        expect(body._id).to.eql(id)
        expect(body.name).to.eql('Peter')
      })
  })
  it('removes an object', () => {
    return axios.delete(`http://localhost:${port}/collections/test/${id}`)
      .then(response=>response.data)
      .then((body) => {
        // console.log(body)
        expect(typeof body).to.eql('object')
        expect(body).to.eql({ msg: 'success' })
      })
  })
  it('checks an removed object', () => {
    return axios.get(`http://localhost:${port}/collections/test/`)
      .then(response=>response.data)
      .then((body) => {
        // console.log(body)
        expect(body.map(item=>item._id)).not.to.eql(id)
      })
  })  
})
