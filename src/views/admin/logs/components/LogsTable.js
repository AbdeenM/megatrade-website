import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import RefreshIcon from '@material-ui/icons/Refresh'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Card, CardActions, CardContent, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Button, TextField, IconButton, CardHeader, Divider, Dialog, DialogContent, CircularProgress } from '@material-ui/core'

import { AdminApi } from 'config/Api'

const adminApi = new AdminApi()

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

const LogsTable = props => {
	const { className, logs, onRefreshLogs, reloadData, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const [page, setPage] = useState(0)
	const [allLogs, setAllLogs] = useState([])
	const [listedLogs, setListedLogs] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [searchState, setSearchState] = useState('')
	const [selectedLogs, setSelectedLogs] = useState([])

	useEffect(() => {
		setAllLogs(logs)
		setListedLogs(logs)
	}, [logs])

	const onChangeSearch = event => {
		setSearchState(event.target.value)

		const searchTerm = event.target.value.toLowerCase()

		setListedLogs(allLogs.filter(log => log.name.toLowerCase().includes(searchTerm)))
	}

	const onSelectAll = event => {
		const { logs } = props

		let selectedLogs

		if (event.target.checked)
			selectedLogs = logs.map(log => log._id)
		else
			selectedLogs = []

		setSelectedLogs(selectedLogs)
	}

	const onSelectOne = (event, id) => {
		const selectedIndex = selectedLogs.indexOf(id)
		let newSelectedLogs = []

		if (selectedIndex === -1)
			newSelectedLogs = newSelectedLogs.concat(selectedLogs, id)
		else if (selectedIndex === 0)
			newSelectedLogs = newSelectedLogs.concat(selectedLogs.slice(1))
		else if (selectedIndex === selectedLogs.length - 1)
			newSelectedLogs = newSelectedLogs.concat(selectedLogs.slice(0, -1))
		else if (selectedIndex > 0) {
			newSelectedLogs = newSelectedLogs.concat(
				selectedLogs.slice(0, selectedIndex),
				selectedLogs.slice(selectedIndex + 1)
			)
		}

		setSelectedLogs(newSelectedLogs)
	}

	const onPageChange = (event, page) => {
		setPage(page)
	}

	const onRowsPerPageChange = event => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const onDeleteLogs = async () => {
		setIsLoading(true)
		const deleteResult = await adminApi.deleteLogs({
			adminId,
			logs: selectedLogs
		})

		if (deleteResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(deleteResult.message, { variant: 'error' })
		}

		enqueueSnackbar(deleteResult.message, { variant: 'success' })
		setIsLoading(false)
		reloadData()
	}

	if (isLoading)
		return (
			<Dialog open={isLoading}>
				<DialogContent>
					<CircularProgress />
				</DialogContent>
			</Dialog>
		)

	return (
		<div
			{...rest}
			className={clsx(classes.root, className)}>
			<div>
				<div className={classes.row}>
					<TextField
						name='Logs'
						margin='normal'
						variant='outlined'
						value={searchState}
						label='Search Logs'
						className={classes.searchInput}
						onChange={onChangeSearch} />

					<span className={classes.spacer} />

					<Button
						color='secondary'
						variant='contained'
						onClick={onDeleteLogs}
						className={classes.deleteButton}
						disabled={selectedLogs.length < 1}>DELETE</Button>

				</div>

				<div className={classes.row} />
			</div>

			<Card>
				<CardHeader
					title='Log Reports'
					subheader='List of all our the logs for our system'
					action={
						<IconButton
							size='medium'
							onClick={onRefreshLogs}>
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
												checked={selectedLogs.length === logs.length}
												indeterminate={selectedLogs.length > 0 && selectedLogs.length < logs.length} />
										</TableCell>

										<TableCell>Name</TableCell>

										<TableCell>Event</TableCell>

										<TableCell>Summary</TableCell>

										<TableCell>Date</TableCell>

										<TableCell>Function</TableCell>

										<TableCell>Description</TableCell>

										<TableCell>Note</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{
										listedLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((log, i) => (
											<TableRow
												hover
												key={i}
												selected={selectedLogs.indexOf(log._id) !== -1}>
												<TableCell padding='checkbox'>
													<Checkbox
														value='true'
														color='primary'
														checked={selectedLogs.indexOf(log._id) !== -1}
														onChange={event => onSelectOne(event, log._id)} />
												</TableCell>

												<TableCell>{log.name}</TableCell>

												<TableCell>{log.event}</TableCell>

												<TableCell>{log.summary}</TableCell>

												<TableCell>{log.createdAt}</TableCell>

												<TableCell>{log.function}</TableCell>

												<TableCell>{log.description}</TableCell>

												<TableCell>{log.note}</TableCell>
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
						count={logs.length}
						rowsPerPage={rowsPerPage}
						onChangePage={onPageChange}
						rowsPerPageOptions={[10, 50, 100, 300]}
						onChangeRowsPerPage={onRowsPerPageChange} />
				</CardActions>
			</Card>
		</div>
	)
}

LogsTable.propTypes = {
	className: PropTypes.string,
	logs: PropTypes.array.isRequired
}

export default LogsTable