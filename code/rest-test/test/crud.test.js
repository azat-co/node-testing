const superagent = require('superagent')
const {expect} = require('chai')
const app = require('../server.js')
const port = 3002
before((done)=>{
  app.listen(port, done)
})

describe('express rest api server', () => {
  var id

  it('posts an object', (done) => {
    superagent.post(`http://localhost:${port}/collections/test`)
      .send({ name: 'John'
        , email: 'john@rpjs.co'
      })
      .end((e, res) => {
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.eql(1)
        expect(res.body[0]._id.length).to.eql(24)
        id = res.body[0]._id
        done()
      })
  })

  it('retrieves an object', (done) => {
    superagent.get(`http://localhost:${port}/collections/test/${id}`)
      .end((e, res) => {
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)
        expect(res.body._id).to.eql(id)
        expect(res.body.name).to.eql('John')
        done()
      })
  })

  it('retrieves a collection', (done) => {
    superagent.get(`http://localhost:${port}/collections/test`)
      .end((e, res) => {
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.be.above(0)
        expect(res.body.map((item) => {return item._id})).to.contain(id)
        done()
      })
  })

  it('updates an object', (done) => {
    superagent.put(`http://localhost:${port}/collections/test/${id}`)
      .send({name: 'Peter'
        , email: 'peter@yahoo.com'})
      .end((e, res) =>{
        // console.log(res.body, e)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body).to.eql({ msg: 'success' })
        done()
      })
  })

  it('checks an updated object', (done) => {
    superagent.get(`http://localhost:${port}/collections/test/${id}`)
      .end((e, res) => {
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)
        expect(res.body._id).to.eql(id)
        expect(res.body.name).to.eql('Peter')
        done()
      })
  })
  it('removes an object', (done) => {
    superagent.del(`http://localhost:${port}/collections/test/${id}`)
      .end((e, res) => {
        console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body).to.eql({ msg: 'success' })
        done()
      })
  })
  it('checks an removed object', (done) => {
    superagent.get(`http://localhost:${port}/collections/test/`)
      .end((e, res) => {
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.map(item=>item._id)).not.to.eql(id)
        done()
      })
  })
})
