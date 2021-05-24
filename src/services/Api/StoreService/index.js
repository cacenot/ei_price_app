import BaseService from '../BaseService'

class StoreService extends BaseService {

    searchStores({ searchQuery, typestore }) {
        let params = {}
        if (searchQuery) params = { searchQuery }
        if (typestore) params = { typestore }
        return this.get({ path: '/stores', params })
    }
}

export default StoreService