import clsx from 'clsx'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import RefreshIcon from '@material-ui/icons/Refresh'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Card, CardActions, CardContent, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Button, TextField, IconButton, CardHeader, Divider } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {},
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    spacer: {
        flexGrow: 1
    },
    Input: {
        marginRight: theme.spacing(1),
        backgroundColor: theme.palette.background.paper
    },
    content: {
        padding: 0
    },
    inner: {
        minWidth: 1050
    },
    actions: {
        justifyContent: 'flex-end'
    }
}))

const SignalsTable = props => {
    const { className, signals, onRefreshSignals, ...rest } = props

    const classes = useStyles()

    const [page, setPage] = useState(0)
    const [allSignals, setAllSignals] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [searchState, setSearchState] = useState('')
    const [listedSignals, setListedSignals] = useState([])
    const [selectedSignals, setSelectedSignals] = useState([])

    const statusColors = {
        buy: 'lightgreen',
        hold: 'lightblue',
        close: 'lightgrey',
        sell: 'lightcoral',
        'stop loss': 'red',
        'break even': 'lightyellow',
        'take profit': 'lightseagreen'
    }

    useEffect(() => {
        setAllSignals(signals)
        setListedSignals(signals)
    }, [signals])

    const onChangeSearch = event => {
        setSearchState(event.target.value)

        const searchTerm = event.target.value.toLowerCase()

        setListedSignals(allSignals.filter(signals => signals.name.toLowerCase().includes(searchTerm)))
    }

    const onSelectAll = event => {
        const { signals } = props

        let selectedSignals

        if (event.target.checked)
            selectedSignals = signals.map(signals => signals._id)
        else
            selectedSignals = []

        setSelectedSignals(selectedSignals)
    }

    const onSelectOne = (event, id) => {
        const selectedIndex = selectedSignals.indexOf(id)
        let newSelectedSignals = []

        if (selectedIndex === -1)
            newSelectedSignals = newSelectedSignals.concat(selectedSignals, id)
        else if (selectedIndex === 0)
            newSelectedSignals = newSelectedSignals.concat(selectedSignals.slice(1))
        else if (selectedIndex === selectedSignals.length - 1)
            newSelectedSignals = newSelectedSignals.concat(selectedSignals.slice(0, -1))
        else if (selectedIndex > 0) {
            newSelectedSignals = newSelectedSignals.concat(
                selectedSignals.slice(0, selectedIndex),
                selectedSignals.slice(selectedIndex + 1)
            )
        }

        setSelectedSignals(newSelectedSignals)
    }

    const onPageChange = (event, page) => {
        setPage(page)
    }

    const onRowsPerPageChange = event => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}>
            <div>
                <div className={classes.row}>
                    <TextField
                        name='signals'
                        margin='normal'
                        variant='outlined'
                        value={searchState}
                        label='Search Signals'
                        className={classes.searchInput}
                        onChange={onChangeSearch} />
                </div>

                <div className={classes.row} />
            </div>

            <Card>
                <CardHeader
                    title='Signal Alerts'
                    subheader='List of all our latest signals including time and date published'
                    action={
                        <IconButton
                            size='medium'
                            onClick={onRefreshSignals}>
                            <RefreshIcon />
                        </IconButton>
                    } />

                <Divider />

                <CardContent className={classes.content}>

                    <PerfectScrollbar>
                        <div className={classes.inner}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding='checkbox'>
                                            <Checkbox
                                                color='primary'
                                                onChange={onSelectAll}
                                                checked={selectedSignals.length === signals.length}
                                                indeterminate={selectedSignals.length > 0 && selectedSignals.length < signals.length} />
                                        </TableCell>

                                        <TableCell>Signal</TableCell>

                                        <TableCell>Status</TableCell>

                                        <TableCell>Time</TableCell>

                                        <TableCell>Date</TableCell>

                                        <TableCell>Entry Price</TableCell>

                                        <TableCell>Stop Loss</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {
                                        listedSignals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((signals, i) => (
                                            <TableRow
                                                hover
                                                key={i}
                                                selected={selectedSignals.indexOf(signals._id) !== -1}>
                                                <TableCell padding='checkbox'>
                                                    <Checkbox
                                                        value='true'
                                                        color='primary'
                                                        onChange={event => onSelectOne(event, signals._id)}
                                                        checked={selectedSignals.indexOf(signals._id) !== -1} />
                                                </TableCell>

                                                <TableCell>{signals.name}</TableCell>

                                                <TableCell>
                                                    {signals.status
                                                        ? <Button
                                                            variant='contained'
                                                            style={{ backgroundColor: statusColors[signals.status.toLowerCase()] }}>
                                                            {signals.status}
                                                        </Button>
                                                        : <Button
                                                            color='primary'
                                                            component={Link}
                                                            to='/subscriptions'
                                                            variant='contained'>
                                                            SUBSCRIBE NOW
													</Button>}
                                                </TableCell>

                                                <TableCell>
                                                    {moment(signals.createdAt).format('HH:mm')}
                                                </TableCell>

                                                <TableCell>
                                                    {moment(signals.createdAt).format('DD/MM/YYYY')}
                                                </TableCell>

                                                <TableCell>
                                                    {signals.entryPrice || 'PREMIUM SIGNAL'}
                                                </TableCell>

                                                <TableCell>
                                                    {signals.stopLoss || 'PREMIUM SIGNAL'}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    </PerfectScrollbar>
                </CardContent>

                <CardActions className={classes.actions}>
                    <TablePagination
                        page={page}
                        component='div'
                        count={signals.length}
                        rowsPerPage={rowsPerPage}
                        onChangePage={onPageChange}
                        rowsPerPageOptions={[10, 50, 100, 300]}
                        onChangeRowsPerPage={onRowsPerPageChange} />
                </CardActions>
            </Card>
        </div>
    )
}

SignalsTable.propTypes = {
    className: PropTypes.string,
    signals: PropTypes.array.isRequired
}

export default SignalsTable