const cote = require('cote')

// POI List
let pois = [{
    id: 1,
    name: 'Campus Cafe',
    type: 'Cafe'
}, {
    id: 2,
    name: 'FH Joanneum',
    type: 'University'
}]
idCounter = 2

// cote Responder
const poisResponder = new cote.Responder({ name: 'pois responder', key: 'pois' })

const tripRequester = new cote.Requester({ name: 'trip requester (poi)', key: 'trips' })


// Request handler
poisResponder.on(req => req.type && console.log(req))

poisResponder.on('list', req => Promise.resolve(pois))

poisResponder.on('create poi', req => 
{
    const poi = {id: ++idCounter, name: req.poi.name, type: req.poi.type }

    pois.push(poi)
    return Promise.resolve(poi)
})

poisResponder.on('delete poi', async req => 
{
    const poiId = parseInt(req.poiId)
    let deletedPoi;
    pois = pois.filter(poi => {
        if(poi.id != poiId) 
            return true
        else
        {
            deletedPoi = poi;
            return false
        }
    })

    await tripRequester.send({type:'remove poi', poiId:poiId})

    console.log("deletedPoi", deletedPoi) 
    return Promise.resolve(deletedPoi)
})
