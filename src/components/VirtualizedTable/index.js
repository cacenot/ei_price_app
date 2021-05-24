import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { AutoSizer, Column, Table, InfiniteLoader } from 'react-virtualized'

import { makeStyles } from '@material-ui/core/styles'
import {
    TableCell,
    TableSortLabel,
} from '@material-ui/core'

import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    table: {
        '& .ReactVirtualized__Grid': {
            '&:focus': {
                outline: 0
            },
        },
        '& .ReactVirtualized__Table__headerRow': {
            flip: false,
            paddingRight: theme.direction === 'rtl' ? '0px !important' : undefined,
        },
    },
    buttonCell: {
        display: 'none'
    },
    buttonCellContainer: {
        padding: theme.spacing(0, 1),
    },
    tableRow: {
        '&:focus': {
            outline: 0
        },
        '&:hover > .ReactVirtualized__Table__rowColumn > .MuiTableCell-root > .MuiButtonBase-root': {
            display: 'flex'
        },
    },
    tableRowHover: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    tableCell: {
        flex: 1,
    },
    noClick: {
        cursor: 'initial',
    },
    skeleton: {
        width: `${Math.floor(Math.random() * (80 - 25 + 1) + 25)}%`
    }
}))

function VirtualizedTable({
    columns,
    onRowClick,
    headerHeight,
    rowHeight,
    sortBy,
    sortDirection,
    sortHandler,
    data,
    loadNextPage,
    hasNextPage,
    isNextPageLoading,
    ...tableProps
}) {
    const classes = useStyles()

    const getRowClassName = ({ index }) => classNames(classes.tableRow, classes.flexContainer, {
        [classes.tableRowHover]: index !== -1 && onRowClick != null,
    })

    const cellRenderer = (cellProps) => {
        const { cellData, columnIndex, rowData } = cellProps
        return (
            <TableCell
                onClick={onRowClick}
                component="div"
                className={classNames(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null,
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
                padding={typeof cellData === 'string' ? 'default' : 'checkbox'}
            >
                {rowData ? cellData : (
                    <>
                        {!columns[columnIndex].isButton && (
                            <div
                                style={{ 
                                    padding: 16,
                                    width: `${Math.floor(Math.random() * (80 - 25 + 1) + 25)}%`
                                }}
                            >
                                <Skeleton variant="text" animation="wave" />
                            </div>
                        )}
                    </>
                )}
            </TableCell>
        )
    }

    const headerRenderer = (headerProps) => {
        const { label, columnIndex, disableSort, dataKey } = headerProps
        return (
            <TableCell
                component="div"
                className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? 'right' : 'left'}
            >
                {disableSort ? (
                    <span>{label}</span>
                ) : (
                    <TableSortLabel
                        active={dataKey === sortBy}
                        direction={sortDirection}
                        onClick={() => sortHandler(dataKey)}
                    >
                        {label}
                    </TableSortLabel>
                )}
            </TableCell>
        )
    }

    const rowCount = hasNextPage ? data.length + 50 : data.length
    const loadMoreRows = isNextPageLoading ? () => { } : loadNextPage
    const isRowLoaded = ({ index }) => !hasNextPage || index < data.length
    const rowGetter = ({ index }) => {
        if (isRowLoaded({ index })) {
            return data[index]
        }
        return ''
    }

    return (
        <AutoSizer>
            {({ height, width }) => (
                <InfiniteLoader
                    isRowLoaded={isRowLoaded}
                    loadMoreRows={loadMoreRows}
                    rowCount={rowCount}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <Table
                            {...tableProps}
                            rowCount={rowCount}
                            onRowsRendered={onRowsRendered}
                            ref={registerChild}
                            height={height}
                            width={width}
                            rowHeight={rowHeight}
                            headerHeight={headerHeight}
                            className={classes.table}
                            rowClassName={getRowClassName}
                            gridStyle={{
                                direction: 'inherit',
                            }}
                            rowGetter={rowGetter}
                        >
                            {columns.map(({ dataKey, isButton, disableSort, ...other }, index) => (
                                <Column
                                    {...other}
                                    className={classes.flexContainer}
                                    flexGrow={isButton ? 0 : 1}
                                    key={dataKey}
                                    dataKey={dataKey}
                                    disableSort={disableSort || isButton}
                                    cellRenderer={cellRenderer}
                                    headerRenderer={(headerProps) => headerRenderer({
                                        ...headerProps,
                                        columnIndex: index,
                                    })}
                                />
                            ))}
                        </Table>
                    )}
                </InfiniteLoader>
            )}
        </AutoSizer>
    )
}

VirtualizedTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataKey: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
            numeric: PropTypes.bool,
            isButton: PropTypes.bool,
            disableSort: PropTypes.bool
        }),
    ).isRequired,
    data: PropTypes.array.isRequired,
    loadNextPage: PropTypes.func.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    isNextPageLoading: PropTypes.bool.isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowHeight: PropTypes.number,
    sortHandler: PropTypes.func,
    sortBy: PropTypes.string,
    sortDirection: PropTypes.oneOf(['asc', 'desc'])
}

VirtualizedTable.defaultProps = {
    onRowClick: null,
    headerHeight: 48,
    rowHeight: 48,
    sortHandler: null,
    sortBy: null,
    sortDirection: null
}

export default VirtualizedTable
