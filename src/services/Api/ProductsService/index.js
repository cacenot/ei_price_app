import BaseService from '../BaseService'

class ProductService extends BaseService {

    pagination({ storeId, ean, category, limit, offset }) {
        let params = {}
        if (storeId) params = { store_id: storeId }
        if (ean) params = { ...params, ean }
        if (category) params = { ...params, category }
        if (limit) params = { ...params, limit }
        if (offset) params = { ...params, offset }
        return this.get({ path: '/products', params })
    }
}

export default ProductService 