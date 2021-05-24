import { createContext } from 'react'

const productsContext = createContext({ products: [], loading: false, filters: { storeId: null, ean: null, category: null } })

export default productsContext