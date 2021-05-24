import { useContext } from 'react'

import ProductsContext from '../context'

export function useProducts() {
    const state = useContext(ProductsContext)
    return state
}