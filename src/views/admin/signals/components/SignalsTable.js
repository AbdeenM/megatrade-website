/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import moment from 'moment'
import Validate from 'validate.js'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import PerfectScrollbar from 'react-perfect-scrollbar'
import React, { useState, useEffect, useRef } from 'react'
import { Card, CardActions, CardContent, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem, Typography } from '@material-ui/core'

import Palette from '../../../../theme/Palette'
import { AdminApi } from '../../../../config/Api'

const adminApi = new AdminApi()

const schema = {
	name: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 32
		}
	},
	status: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 32
		}
	},
	stopLoss: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 32
		}
	},
	entryPrice: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 64
		}
	}
}

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
	deleteButton: {
		marginRight: theme.spacing(1)
	},
	editButton: {
		marginRight: theme.spacing(9)
	},
	searchInput: {
		marginRight: theme.spacing(1),
		backgroundColor: Palette.background.paper
	},
	content: {
		padding: 0
	},
	inner: {
		minWidth: 1050
	},
	nameContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	actions: {
		justifyContent: 'flex-end'
	},
	rowStatus: {
		display: 'flex',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
	},
	rowSignalStatus: {
		marginLeft: 'auto'
	},
	signalStatus: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}))

const SignalsTable = props => {
	const { className, signals, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const anchorRef = useRef(null)

	const [page, setPage] = useState(0)
	const [allSignals, setAllSignals] = useState([])
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [searchState, setSearchState] = useState('')
	const [listedSignals, setListedSignals] = useState([])
	const [selectedSignals, setSelectedSignals] = useState([])
	const [showStatusMenu, setShowStatusMenu] = useState(false)
	const [showEditSignalDialog, setShowEditSignalsDialog] = useState(false)
	const [showCreateSignalDialog, setShowCreateSignalDialog] = useState(false)
	const [signalsState, setSignalsState] = useState({
		errors: {},
		values: {
			name: '',
			signalId: '',
			stopLoss: '',
			status: 'BUY',
			entryPrice: ''
		},
		touched: {},
		isValid: false,
		isChanged: false
	})

	useEffect(() => {
		setAllSignals(signals)
		setListedSignals(signals)
	}, [signals])

	useEffect(() => {
		const errors = Validate(signalsState.values, schema)

		setSignalsState(signalsState => ({
			...signalsState,
			isValid: errors ? false : true,
			errors: errors || {}
		}))
	}, [signalsState.values])

	const onChangeText = event => {
		event.persist()

		setSignalsState(signalsState => ({
			...signalsState,
			values: {
				...signalsState.values,
				[event.target.name]: event.target.value
			},
			touched: {
				...signalsState.touched,
				[event.target.name]: true
			},
			isChanged: true
		}))
	}

	const onChangeSearch = event => {
		setSearchState(event.target.value)

		const searchTerm = event.target.value.toLowerCase()

		setListedSignals(allSignals.filter(signal => signal.name.toLowerCase().includes(searchTerm)))
	}

	const onSelectAll = event => {
		const { signals } = props

		let selectedSignals

		if (event.target.checked)
			selectedSignals = signals.map(signal => signal._id)
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

	const onSelectStatus = status => {
		setSignalsState(signalsState => ({
			...signalsState,
			errors: {},
			values: {
				...signalsState.values,
				status
			},
			touched: {},
			isValid: false,
			isChanged: true
		}))

		setShowStatusMenu(false)
	}

	const onPageChange = (event, page) => {
		setPage(page)
	}

	const onRowsPerPageChange = event => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const onEditSignalClick = () => {
		let signalDetails = allSignals.filter(signal => signal._id === selectedSignals[0])[0]

		setSignalsState(signalsState => ({
			...signalsState,
			errors: {},
			values: {
				name: signalDetails.name,
				signalId: signalDetails._id,
				status: signalDetails.status,
				stopLoss: signalDetails.stopLoss,
				entryPrice: signalDetails.entryPrice
			},
			touched: {},
			isValid: false,
			isChanged: false
		}))

		setShowStatusMenu(false)
		setShowEditSignalsDialog(true)
	}

	const onEditSignal = async () => {
		const editResult = await adminApi.editSignal({
			adminId,
			stopLoss: signalsState.values.stopLoss,
			signalId: signalsState.values.signalId,
			entryPrice: signalsState.values.entryPrice,
			name: signalsState.values.name.toUpperCase(),
			status: signalsState.values.status.toUpperCase()
		})

		if (editResult.error)
			return enqueueSnackbar(editResult.message, { variant: 'error' })

		enqueueSnackbar(editResult.message, { variant: 'success' })
		window.location.reload()
	}

	const onCreateSignalClick = async () => {
		setSignalsState(signalsState => ({
			...signalsState,
			errors: {},
			values: {
				name: '',
				stopLoss: '',
				signalId: '',
				status: 'BUY',
				entryPrice: ''
			},
			touched: {},
			isValid: false,
			isChanged: false
		}))

		setShowStatusMenu(false)
		setShowCreateSignalDialog(true)
	}

	const onCreateSignal = async () => {
		const createResult = await adminApi.createSignal({
			adminId,
			stopLoss: signalsState.values.stopLoss,
			signalId: signalsState.values.signalId,
			entryPrice: signalsState.values.entryPrice,
			name: signalsState.values.name.toUpperCase(),
			status: signalsState.values.status.toUpperCase()
		})

		if (createResult.error)
			return enqueueSnackbar(createResult.message, { variant: 'error' })

		enqueueSnackbar(createResult.message, { variant: 'success' })
		window.location.reload()
	}

	const onDeleteSignals = async () => {
		const deleteResult = await adminApi.deleteSignals({
			adminId,
			signals: selectedSignals
		})

		if (deleteResult.error)
			return enqueueSnackbar(deleteResult.message, { variant: 'error' })

		enqueueSnackbar(deleteResult.message, { variant: 'success' })
		window.location.reload()
	}

	const hasError = field =>
		signalsState.touched[field] && signalsState.errors[field] ? true : false

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
						onChange={onChangeSearch}
						className={classes.searchInput} />

					<span className={classes.spacer} />

					<Button
						color='secondary'
						variant='contained'
						onClick={onDeleteSignals}
						className={classes.deleteButton}
						disabled={selectedSignals.length < 1}>DELETE</Button>

					<Button
						color='default'
						variant='contained'
						onClick={onEditSignalClick}
						className={classes.editButton}
						disabled={selectedSignals.length > 1 || selectedSignals.length < 1}>EDIT</Button>

					<Button
						color='primary'
						variant='contained'
						onClick={onCreateSignalClick}>
						CREATE SIGNAL
        			</Button>
				</div>

				<div className={classes.row}>
				</div>
			</div>

			<Card>
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

										<TableCell>Name</TableCell>

										<TableCell>Status</TableCell>

										<TableCell>Time</TableCell>

										<TableCell>Date</TableCell>

										<TableCell>Entry Price</TableCell>

										<TableCell>Stop Loss</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{
										listedSignals.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(signal => (
											<TableRow
												className={classes.tableRow}
												hover
												key={signal._id}
												selected={selectedSignals.indexOf(signal._id) !== -1}>
												<TableCell padding='checkbox'>
													<Checkbox
														value='true'
														color='primary'
														checked={selectedSignals.indexOf(signal._id) !== -1}
														onChange={event => onSelectOne(event, signal._id)} />
												</TableCell>

												<TableCell>{signal.name}</TableCell>

												<TableCell>{signal.status}</TableCell>

												<TableCell>
													{moment(signal.createdAt).format('HH:mm')}
												</TableCell>

												<TableCell>
													{moment(signal.createdAt).format('DD/MM/YYYY')}
												</TableCell>

												<TableCell>{signal.entryPrice}</TableCell>

												<TableCell>{signal.stopLoss}</TableCell>
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

			<Dialog
				open={showEditSignalDialog}
				aria-labelledby='form-dialog-title'
				onClose={() => setShowEditSignalsDialog(false)}>
				<DialogTitle id='form-dialog-title'>Edit Signal</DialogTitle>

				<DialogContent>
					<DialogContentText>
						Edit the signal details here.
          			</DialogContentText>

					<TextField
						disabled
						fullWidth
						name='id'
						margin='dense'
						label='Signal ID'
						variant='outlined'
						value={signalsState.values.signalId} />

					<TextField
						required
						fullWidth
						name='name'
						margin='dense'
						variant='outlined'
						label='Signal Name'
						onChange={onChangeText}
						error={hasError('name')}
						value={signalsState.values.name}
						helperText={
							hasError('name') ? signalsState.errors.name[0] : null
						} />

					<div className={classes.rowStatus}>
						<Typography
							variant='body1'
							className={classes.signalStatus}>
							SIGNAL STATUS
							</Typography>

						<Button
							ref={anchorRef}
							aria-haspopup='true'
							className={classes.rowSignalStatus}
							onClick={() => setShowStatusMenu(!showStatusMenu)}
							aria-controls='simple-menu'>
							{signalsState.values.status}
						</Button>
					</div>

					<Menu
						keepMounted
						id='simple-menu'
						open={showStatusMenu}
						anchorEl={anchorRef.current}
						onClose={() => setShowStatusMenu(false)}>
						<MenuItem onClick={() => onSelectStatus('BUY')}>BUY</MenuItem>
						<MenuItem onClick={() => onSelectStatus('SELL')}>SELL</MenuItem>
						<MenuItem onClick={() => onSelectStatus('HOLD')}>HOLD</MenuItem>
						<MenuItem onClick={() => onSelectStatus('CLOSE')}>CLOSE</MenuItem>
						<MenuItem onClick={() => onSelectStatus('BREAK EVEN')}>BREAK EVEN</MenuItem>
						<MenuItem onClick={() => onSelectStatus('TAKE PROFIT')}>TAKE PROFIT</MenuItem>
					</Menu>

					<TextField
						required
						fullWidth
						margin='dense'
						name='stopLoss'
						label='Stop Loss'
						variant='outlined'
						onChange={onChangeText}
						error={hasError('stopLoss')}
						value={signalsState.values.stopLoss}
						helperText={
							hasError('stopLoss') ? signalsState.errors.stopLoss[0] : null
						} />

					<TextField
						fullWidth
						margin='dense'
						name='entryPrice'
						variant='outlined'
						label='Entry Price'
						onChange={onChangeText}
						error={hasError('entryPrice')}
						value={signalsState.values.entryPrice}
						helperText={
							hasError('entryPrice') ? signalsState.errors.entryPrice[0] : null
						} />
				</DialogContent>

				<DialogActions>
					<Button
						color='secondary'
						onClick={() => setShowEditSignalsDialog(false)}>
						CANCEL
         			 </Button>

					<Button
						color='primary'
						variant='contained'
						onClick={onEditSignal}
						disabled={!signalsState.isChanged || hasError('name') || hasError('status') || hasError('stopLoss') || hasError('entryPrice')}>
						EDIT SIGNAL
         			 </Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={showCreateSignalDialog}
				aria-labelledby='form-dialog-title'
				onClose={() => setShowCreateSignalDialog(false)}>
				<DialogTitle id='form-dialog-title'>Create Signal</DialogTitle>

				<DialogContent>
					<DialogContentText>
						Create the signal details here.
          			</DialogContentText>

					<TextField
						required
						fullWidth
						name='name'
						margin='dense'
						variant='outlined'
						label='Signal Name'
						onChange={onChangeText}
						error={hasError('name')}
						value={signalsState.values.name}
						helperText={
							hasError('name') ? signalsState.errors.name[0] : null
						} />

					<div className={classes.rowStatus}>
						<Typography
							variant='body1'
							className={classes.signalStatus}>
							SIGNAL STATUS
							</Typography>

						<Button
							ref={anchorRef}
							aria-haspopup='true'
							className={classes.rowSignalStatus}
							onClick={() => setShowStatusMenu(!showStatusMenu)}
							aria-controls='simple-menu'>
							{signalsState.values.status}
						</Button>
					</div>

					<Menu
						keepMounted
						id='simple-menu'
						open={showStatusMenu}
						anchorEl={anchorRef.current}
						onClose={() => setShowStatusMenu(false)}>
						<MenuItem onClick={() => onSelectStatus('BUY')}>BUY</MenuItem>
						<MenuItem onClick={() => onSelectStatus('SELL')}>SELL</MenuItem>
						<MenuItem onClick={() => onSelectStatus('HOLD')}>HOLD</MenuItem>
						<MenuItem onClick={() => onSelectStatus('CLOSE')}>CLOSE</MenuItem>
						<MenuItem onClick={() => onSelectStatus('BREAK EVEN')}>BREAK EVEN</MenuItem>
						<MenuItem onClick={() => onSelectStatus('TAKE PROFIT')}>TAKE PROFIT</MenuItem>
					</Menu>

					<TextField
						required
						fullWidth
						margin='dense'
						name='stopLoss'
						label='Stop Loss'
						variant='outlined'
						onChange={onChangeText}
						error={hasError('stopLoss')}
						value={signalsState.values.stopLoss}
						helperText={
							hasError('stopLoss') ? signalsState.errors.stopLoss[0] : null
						} />

					<TextField
						fullWidth
						margin='dense'
						name='entryPrice'
						variant='outlined'
						label='Entry Price'
						onChange={onChangeText}
						error={hasError('entryPrice')}
						value={signalsState.values.entryPrice}
						helperText={
							hasError('entryPrice') ? signalsState.errors.entryPrice[0] : null
						} />
				</DialogContent>

				<DialogActions>
					<Button
						color='secondary'
						onClick={() => setShowCreateSignalDialog(false)}>
						CANCEL
         			 </Button>

					<Button
						color='primary'
						variant='contained'
						onClick={onCreateSignal}
						disabled={!signalsState.isChanged || hasError('name') || hasError('status') || hasError('stopLoss') || hasError('entryPrice') || signalsState.values.name.length < 1 || signalsState.values.status.length < 1 || signalsState.values.stopLoss.length < 1 || signalsState.values.entryPrice.length < 1}>
						CREATE SIGNAL
         			 </Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

SignalsTable.propTypes = {
	className: PropTypes.string,
	signals: PropTypes.array.isRequired
}

export default SignalsTable