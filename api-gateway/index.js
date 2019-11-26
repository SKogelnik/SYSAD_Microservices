const express = require('express')
const bodyParser = require('body-parser')
const cote = require('cote')

const app = express()

app.use(bodyParser.json())


// cote Requester
const poiRequester = new cote.Requester({ name: 'poi requester', key: 'pois' })
const tripRequester = new cote.Requester({ name: 'trip requester', key: 'trips' })


// Request Handler
app.get('/poi', async (req, res) => {
    console.log("GET /poi")
    const pois = await poiRequester.send({ type: 'list'})
    res.send(pois);
})

app.post('/poi', async (req, res) => {
    console.log("POST /poi")
    const poi = await poiRequester.send({ type: 'create poi', poi: req.body })
    res.send(poi);
})

app.get('/trip', async (req, res) => {
    const trips = await tripRequester.send({ type: 'list'})
    res.send(trips);
})

app.post('/trip', async (req, res) => {
    const trip = await tripRequester.send({ type: 'create trip', trip: req.body })
    res.send(trip);
})

app.get('*', async (req, res) => {
    console.log("GET", req.url)
})

app.listen(3000, () => console.log('listening'))
