const supertest = require('supertest')
const {expect} = require('chai')
const app = require('../server.js')


describe('express rest api server', () => {
  let id

  it('posts an object', (done) => {
    supertest(app).post(`/collections/test`)
      .send({ name: 'John'
        , email: 'john@rpjs.co'
      })
      .expect(200)
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
    supertest(app).get(`/collections/test/${id}`)
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
    supertest(app).get(`/collections/test`)
      .end((e, res) => {
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.length).to.be.above(0)
        expect(res.body.map((item) => {return item._id})).to.contain(id)
        done()
      })
  })

  it('updates an object', (done) => {
    supertest(app).put(`/collections/test/${id}`)
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
    supertest(app).get(`/collections/test/${id}`)
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
    supertest(app).del(`/collections/test/${id}`)
      .end((e, res) => {
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body).to.eql({ msg: 'success' })
        done()
      })
  })
  it('checks an removed object', (done) => {
    supertest(app).get(`/collections/test/`)
      .end((e, res) => {
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(res.body.map(item=>item._id)).not.to.eql(id)
        done()
      })
  })
})
