const cote = require('cote')

// Trip list
let trips = [{
    id: 1,
    name: 'Trip 1',
    pois: [1,2]

}]
let idCounter = 1

// cote Responder
const tripsResponder = new cote.Responder({ name: 'trips responder', key: 'trips' })

// Request handler
tripsResponder.on(req => req.type && console.log(req))

tripsResponder.on('list', req => Promise.resolve(trips))

tripsResponder.on('create trip', req => 
{
    const trip = {id: ++idCounter, name: req.trip.name, pois: req.trip.pois }

    deliveries.push(trip)
    return Promise.resolve(trip)
})

tripsResponder.on('remove poi', req => 
{
    const poiId = parseInt(req.poiId)
    trips = trips.map(trip =>( {
            ...trip,
            pois:trip.pois.filter(poiId => poiId !== this.poiId)
        })
    )
    
    console.log("trips",trips)
    return Promise.resolve();
})
