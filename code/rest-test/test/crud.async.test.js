const axios = require('axios')
const {expect} = require('chai')
const app = require('../server.js')
const port = 3004

before(async function() {
  await app.listen(port, ()=>{console.log('server is running')})
  console.log('code after the server is running')
})

describe('express rest api server', async () => {
  let id

  it('posts an object', async () => {
    const {data: body} = await axios.post(`http://localhost:${port}/collections/test`, { name: 'John', email: 'john@rpjs.co'})
    expect(body.length).to.eql(1)
    expect(body[0]._id.length).to.eql(24)
    id = body[0]._id
  })

  it('retrieves an object', async () => {
    const {data: body} = await axios.get(`http://localhost:${port}/collections/test/${id}`)
    // console.log(body)
    expect(typeof body).to.eql('object')
    expect(body._id.length).to.eql(24)
    expect(body._id).to.eql(id)
    expect(body.name).to.eql('John')
  })

  it('retrieves a collection', async () => {
    const {data: body} = await axios.get(`http://localhost:${port}/collections/test`)
    // console.log(body)
    expect(body.length).to.be.above(0)
    expect(body.map((item) => {return item._id})).to.contain(id)
  })

  it('updates an object', async () => {
    const {data: body} = await axios.put(`http://localhost:${port}/collections/test/${id}`, {name: 'Peter', email: 'peter@yahoo.com'})
    // console.log(body, e)
    expect(typeof body).to.eql('object')
    expect(body).to.eql({ msg: 'success' })
  })

  it('checks an updated object', async () => {
    const {data: body} = await axios.get(`http://localhost:${port}/collections/test/${id}`)
    // console.log(body)
    expect(typeof body).to.eql('object')
    expect(body._id.length).to.eql(24)
    expect(body._id).to.eql(id)
    expect(body.name).to.eql('Peter')
  })
  it('removes an object', async () => {
    const {data: body} = await axios.delete(`http://localhost:${port}/collections/test/${id}`)
    // console.log(body)
    expect(typeof body).to.eql('object')
    expect(body).to.eql({ msg: 'success' })
  })
  it('checks an removed object', async () => {
    const {data: body} = await axios.get(`http://localhost:${port}/collections/test/`)
    // console.log(body)
    expect(body.map(item=>item._id)).not.to.eql(id)
  })
})
