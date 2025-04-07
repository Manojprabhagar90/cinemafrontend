import instance from "./instance"

const cityServices = {
    getAllcity : (data)=>{
        return instance.get('/city/getallcity',data)
    }
}

export default cityServices;