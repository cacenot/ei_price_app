import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Typography,
} from '@material-ui/core'

import VirtualizedTable from '../../components/VirtualizedTable'
import FilterPanel from '../../components/FilterPanel'
import { useProducts } from '../../entities/Product/hooks'

const useStyles = makeStyles((theme) => ({
    main: {
        paddingTop: theme.spacing(2),

    },
    tableContainer: {
        height: 750
    }

}))

function MainPage() {
    const styles = useStyles()
    const {
        loading,
        products,
        getProducts,
        hasNextPage,
    } = useProducts()

    return (
        <div className={styles.main}>
            <Typography variant="h4">
                Ei price test
            </Typography>
            <FilterPanel />
            <div className={styles.tableContainer}>
                <VirtualizedTable
                    hasNextPage={hasNextPage}
                    isNextPageLoading={loading}
                    loadNextPage={getProducts}
                    data={products}
                    columns={[
                        {
                            width: 100,
                            label: 'Typestore Name',
                            dataKey: 'typestorename',
                            isButton: false,
                            disableSort: true
                        },
                        {
                            width: 200,
                            label: 'Name',
                            dataKey: 'name',
                            isButton: false,
                            disableSort: true
                        },
                        {
                            width: 100,
                            label: 'ean',
                            dataKey: 'ean',
                            isButton: false,
                            disableSort: true
                        },
                        {
                            width: 150,
                            label: 'Category',
                            dataKey: 'category',
                            isButton: false,
                            disableSort: true
                        },
                        {
                            width: 50,
                            label: 'Real Price',
                            dataKey: 'real_price',
                            isButton: false,
                            disableSort: true
                        },
                        {
                            width: 50,
                            label: 'Price',
                            dataKey: 'price',
                            isButton: false,
                            disableSort: true
                        },
                        {
                            width: 50,
                            label: 'Desconto',
                            dataKey: 'desconto',
                            isButton: false,
                            disableSort: true
                        },
                        {
                            width: 50,
                            label: 'Quantity',
                            dataKey: 'quantity',
                            isButton: false,
                            disableSort: true
                        },
                        {
                            width: 100,
                            label: 'Sale Type',
                            dataKey: 'sale_type',
                            isButton: false,
                            disableSort: true
                        },
                        {
                            width: 50,
                            label: 'Unit Type',
                            dataKey: 'unit_type',
                            isButton: false,
                            disableSort: true
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default MainPage