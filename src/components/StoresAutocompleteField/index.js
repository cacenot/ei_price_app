import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import {
    TextField,
} from '@material-ui/core'
import {
    Autocomplete
} from '@material-ui/lab'

import StoreService from '../../services/Api/StoreService'

const useStyles = makeStyles(() => ({
    autoCompleteListBox: {
        maxHeight: 224
    },
}))

function StoresAutocompleteInput({ typestore, ...others }) {
    const classes = useStyles()

    const [stores, setStores] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    useEffect(() => {
        const getStores = async () => {
            setLoading(true)
            try {
                const service = new StoreService()
                const { data: { data } } = await service.searchStores({ searchQuery: search, typestore })
                setLoading(false)
                setStores(data)
            } catch (error) {
                setLoading(false)
                setStores([])
            }
        }
        if (open && typestore) {
            getStores()
        }
    }, [search, typestore, open])

    return (
        <Autocomplete
            {...others}
            getOptionLabel={(option) => option.name || ''}
            options={stores}
            loading={loading}
            loadingText="Carregando..."
            noOptionsText="Loja não encontrado"
            fullWidth
            autoComplete
            autoHighlight
            onInputChange={(e, v) => setSearch(v)}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            classes={{
                listbox: classes.autoCompleteListBox
            }}
            renderInput={params => (
                <TextField
                    {...params}
                    variant="outlined"
                    size="small"
                    label="Selecione a loja"
                    helperText={!typestore && 'Primeiro selecione o segmento'}
                    InputProps={{
                        ...params.InputProps,
                        inputProps: {
                            ...params.inputProps,
                            autoComplete: 'new-password'
                        },
                    }}
                />
            )}
        />
    )
}

StoresAutocompleteInput.propTypes = {
    typestore: PropTypes.string
}

StoresAutocompleteInput.defaultProps = {
    typestore: null
}

export default StoresAutocompleteInput
