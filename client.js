const axios = require('axios')

async function main() {
    const pois = await axios.get('http://localhost:3000/poi')
    console.log("POIS Data:")
    console.log(pois.data)

    const poiToCreate = {
    name:"Cafe Pucher",
    type:"Cafe"
    }

    const poiCreateResponse = await axios.post('http://localhost:3000/poi', poiToCreate)
    console.log("Created POI:")
    console.log(poiCreateResponse.data)

    // const deletedPoi = await axios.delete('http://localhost:3000/poi/1')
    // console.log("Deleted POI")
    // console.log(deletedPoi.data)
}

main()