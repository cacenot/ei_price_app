import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import ProductsService from '../../../services/Api/ProductsService'
import ProductsContext from '../context'
import usePreviousValue from '../../../hooks/usePreviousValue'

function ProductsProvider({ children }) {
    const PAGE_SIZE = 50
    const [products, setProducts] = useState([])
    const [data, setData] = useState([])
    const [hasNextPage, setHasNextPage] = useState(true)
    const [productsCount, setProductsCount] = useState(0)
    const [categoriesCount, setCategoriesCount] = useState(0)
    const [promotionsCount, setPromotionsCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [offset, setOffset] = useState(0)
    const [filters, setFilters] = useState({ storeId: null, ean: null, category: null })

    const getProducts = async () => {
        setLoading(true)
        try {
            const params = { ...filters, offset, limit: PAGE_SIZE }
            const service = new ProductsService()
            const { data: response } = await service.pagination(params)
            const { data, has_next_page, categories_count, promotions_count, products_count } = response
            setLoading(false)
            setHasNextPage(has_next_page)
            setProductsCount(products_count)
            setCategoriesCount(categories_count)
            setPromotionsCount(promotions_count)
            setData(data)
        } catch (error) {
            setLoading(false)
            if (error.response) {
                console.log(error.response.data)
                setError(error.response.data)
            } else if (error.request) {
                console.log(error.request)
                setError(error.request)
            } else {
                console.log('Error', error.message)
                setError(error.message)
            }
        }
    }

    const previousFilters = usePreviousValue(filters)

    useEffect(() => {
        if (previousFilters !== filters) {
            getProducts()
            setOffset(0)
            setProducts([])
        } else {
            setOffset(PAGE_SIZE + offset)
            setProducts([ ...products, ...data])
        }        
    }, [filters, data])

    return (
        <ProductsContext.Provider
            value={{
                loading,
                error,
                products,
                filters,
                hasNextPage,
                productsCount,
                categoriesCount,
                promotionsCount,
                getProducts,
                setFilters,
            }}
        >
            {children}
        </ProductsContext.Provider>
    )
}

ProductsProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default ProductsProvider