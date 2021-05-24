import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api'

const client = axios.create()
client.defaults.baseURL = BASE_URL

class BaseService {
    get({ path, params }) {
        return client.get(path, { params })
    }

    post({ path, params, data }) {
        return client.post(path, { params, data })
    }

    put({ path, params, data }) {
        return client.put(path, { params, data })
    }

    delete({ path, params }) {
        return client.delete(path, { params })
    }
}

export default BaseService
