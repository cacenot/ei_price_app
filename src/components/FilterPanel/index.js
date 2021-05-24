import React, { useState, useMemo } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    TextField,
    Button,
    MenuItem,
    Chip,
    Divider,
    Typography
} from '@material-ui/core'

import StoresAutocompleteInput from '../StoresAutocompleteField'
import { useProducts } from '../../entities/Product/hooks'

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    chip: {
        marginRight: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}))

function FilterPanel() {
    const styles = useStyles()
    const [store, setStore] = useState('')
    const [typestore, setTypestore] = useState('')
    const { setFilters, filters, productsCount, promotionsCount, categoriesCount } = useProducts()
    const { ean, category } = filters    

    const onChangeStore = (e, value) => {
        setStore(value)
        if (value) {
            const { id } = value
            setFilters({ ...filters, storeId: id })
        } else {
            setFilters({ ...filters, storeId: null })
        }
    }

    const handleSubmit = (e) => {
        let productFilters = {}
        if (e.target.ean.value) productFilters = { ean: e.target.ean.value }
        if (e.target.category.value) productFilters = { ...productFilters, category: e.target.category.value }
        setFilters({ ...filters, ...productFilters })
        e.preventDefault()
    }

    const handleDeleteFilter = (filterName) => {
        setFilters({ ...filters, [filterName]: null })
    }

    return (
        <div className={styles.root}>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={4}>
                    <TextField
                        id="standard-select-currency"
                        select
                        label="Segmento"
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={typestore}
                        onChange={(e) => setTypestore(e.target.value)}
                        helperText={' '}
                    >
                        <MenuItem value="5f34642a745b8c52cf710746">
                            Supermercados
                        </MenuItem>
                        <MenuItem value="5f346d48745b8c52cf72d510">
                            Farmácias 24h
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={4}>
                    <StoresAutocompleteInput
                        value={store}
                        onChange={onChangeStore}
                        fullWidth
                        typestore={typestore}
                        disabled={!typestore}
                    />
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={4}>
                        <TextField
                            label="Ean"
                            fullWidth
                            variant="outlined"
                            size="small"
                            name="ean"
                            disabled={Boolean(ean)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            label="Category"
                            fullWidth
                            variant="outlined"
                            size="small"
                            name="category"
                            disabled={Boolean(category)}
                        />
                    </Grid>
                    <Grid item xs={4} >
                        <Button variant="contained" color="primary" type="submit" disabled={Boolean(ean && category)}>
                            Filtrar
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {Boolean(ean || category) && (
                <Divider className={styles.divider} />
            )}
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Grid item >
                    {ean && (
                        <Chip
                            className={styles.chip}
                            label={`ean: ${ean}`}
                            onDelete={() => handleDeleteFilter('ean')}
                        />
                    )}
                    {category && (
                        <Chip
                            className={styles.chip}
                            label={`category: ${category}`}
                            onDelete={() => handleDeleteFilter('category')}
                        />
                    )}
                </Grid>
            </Grid>
            <Divider className={styles.divider} />
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={4}>
                    <Typography variant="subtitle2" gutterBottom>Quantidade produtos</Typography>
                    <Typography variant="body1" gutterBottom>{productsCount}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle2" gutterBottom>Quantidade categorias</Typography>
                    <Typography variant="body1" gutterBottom>{categoriesCount}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="subtitle2" gutterBottom>Quantidade promoções</Typography>
                    <Typography variant="body1" gutterBottom>{promotionsCount}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default FilterPanel