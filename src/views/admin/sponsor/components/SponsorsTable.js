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
import { Card, CardActions, CardContent, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Menu, MenuItem } from '@material-ui/core'

import { AdminApi } from 'config/Api'

const adminApi = new AdminApi()

const schema = {
	code: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 64
		}
	},
	duration: {
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
		backgroundColor: theme.palette.background.paper
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
	avatar: {
		marginRight: theme.spacing(2)
	},
	actions: {
		justifyContent: 'flex-end'
	},
	image: {
		width: 150,
		height: 150
	},
	imageContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: theme.spacing(2)
	},
	checkboxes: {
		marginTop: theme.spacing(5)
	},
	rowDuration: {
		display: 'flex',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
	},
	rowSponsorDuration: {
		marginLeft: 'auto'
	},
	duration: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}))

const SponsorsTable = props => {
	const { className, sponsors, reloadData, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const anchorRef = useRef(null)
	const anchorRefCreate = useRef(null)

	const [page, setPage] = useState(0)
	const [isLoading, setIsLoading] = useState(false)
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [searchState, setSearchState] = useState('')
	const [allSponsors, setAllSponsors] = useState([])
	const [listedSponsors, setListedSponsors] = useState([])
	const [selectedSponsors, setSelectedSponsors] = useState([])
	const [showDurationMenu, setShowDurationMenu] = useState(false)
	const [showEditSponsorDialog, setEditSponsorDialog] = useState(false)
	const [showCreateSponsorDialog, setCreateSponsorDialog] = useState(false)
	const [showCreateDurationMenu, setShowCreateDurationMenu] = useState(false)
	const [sponsorState, setSponsorState] = useState({
		errors: {},
		values: {
			code: '',
			duration: '',
			createdAt: '',
			sponsorId: '',
			durationPick: 'DAY'
		},
		touched: {},
		isValid: false,
		isChanged: false
	})

	useEffect(() => {
		setAllSponsors(sponsors)
		setListedSponsors(sponsors)
	}, [sponsors])

	useEffect(() => {
		const errors = Validate(sponsorState.values, schema)

		setSponsorState(sponsorState => ({
			...sponsorState,
			isValid: errors ? false : true,
			errors: errors || {}
		}))
	}, [sponsorState.values])

	const onChangeText = event => {
		event.persist()

		setSponsorState(sponsorState => ({
			...sponsorState,
			values: {
				...sponsorState.values,
				[event.target.name]: event.target.value
			},
			touched: {
				...sponsorState.touched,
				[event.target.name]: true
			},
			isChanged: true
		}))
	}

	const onChangeSearch = event => {
		setSearchState(event.target.value)

		const searchTerm = event.target.value.toLowerCase()

		setListedSponsors(allSponsors.filter(sponsor => sponsor.code.toLowerCase().includes(searchTerm) || sponsor.duration.toLowerCase().includes(searchTerm)))
	}

	const onSelectAll = event => {
		const { sponsors } = props

		let selectedSponsors

		if (event.target.checked)
			selectedSponsors = sponsors.map(sponsor => sponsor._id)
		else
			selectedSponsors = []

		setSelectedSponsors(selectedSponsors)
	}

	const onSelectOne = (event, id) => {
		const selectedIndex = selectedSponsors.indexOf(id)
		let newSelectedSponsors = []

		if (selectedIndex === -1)
			newSelectedSponsors = newSelectedSponsors.concat(selectedSponsors, id)
		else if (selectedIndex === 0)
			newSelectedSponsors = newSelectedSponsors.concat(selectedSponsors.slice(1))
		else if (selectedIndex === selectedSponsors.length - 1)
			newSelectedSponsors = newSelectedSponsors.concat(selectedSponsors.slice(0, -1))
		else if (selectedIndex > 0) {
			newSelectedSponsors = newSelectedSponsors.concat(
				selectedSponsors.slice(0, selectedIndex),
				selectedSponsors.slice(selectedIndex + 1)
			)
		}

		setSelectedSponsors(newSelectedSponsors)
	}

	const onPageChange = (event, page) => {
		setPage(page)
	}

	const onRowsPerPageChange = event => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const onSelectDuration = durationPick => {
		setSponsorState(sponsorState => ({
			...sponsorState,
			errors: {},
			values: {
				...sponsorState.values,
				durationPick,
			},
			touched: {},
			isValid: false,
			isChanged: true
		}))

		setShowDurationMenu(false)
	}

	const onSelectCreateDuration = durationPick => {
		setSponsorState(sponsorState => ({
			...sponsorState,
			errors: {},
			values: {
				...sponsorState.values,
				durationPick,
			},
			touched: {},
			isValid: false,
			isChanged: true
		}))

		setShowCreateDurationMenu(false)
	}

	const onEditSponsorClick = () => {
		let sponsorDetails = allSponsors.filter(sponsor => sponsor._id === selectedSponsors[0])[0]

		setSponsorState(sponsorState => ({
			...sponsorState,
			errors: {},
			values: {
				...sponsorState.values,
				code: sponsorDetails.code,
				sponsorId: sponsorDetails._id,
				duration: sponsorDetails.duration,
				createdAt: sponsorDetails.createdAt,
				durationPick: sponsorDetails.durationPick
			},
			touched: {},
			isValid: false,
			isChanged: false
		}))

		setEditSponsorDialog(true)
	}

	const onEditSponsor = async () => {
		setIsLoading(true)
		const editSponsorResult = await adminApi.editSponsors({
			adminId,
			duration: sponsorState.values.duration,
			sponsorId: sponsorState.values.sponsorId,
			code: sponsorState.values.code.toUpperCase(),
			durationPick: sponsorState.values.durationPick
		})

		if (editSponsorResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(editSponsorResult.message, { variant: 'error' })
		}

		setIsLoading(false)
		setEditSponsorDialog(false)
		enqueueSnackbar(editSponsorResult.message, { variant: 'success' })
		reloadData()
	}

	const onCreateSponsorClick = () => {
		setSponsorState(sponsorState => ({
			...sponsorState,
			errors: {},
			values: {
				...sponsorState.values,
				code: '',
				duration: '',
				createdAt: '',
				durationPick: 'DAY'
			},
			touched: {},
			isValid: false,
			isChanged: false
		}))

		setCreateSponsorDialog(true)
	}

	const onCreateSponsor = async () => {
		setIsLoading(true)
		const createSponsorResult = await adminApi.createSponsors({
			adminId,
			duration: sponsorState.values.duration,
			code: sponsorState.values.code.toUpperCase(),
			durationPick: sponsorState.values.durationPick
		})

		if (createSponsorResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(createSponsorResult.message, { variant: 'error' })
		}

		setIsLoading(false)
		setCreateSponsorDialog(false)
		enqueueSnackbar(createSponsorResult.message, { variant: 'success' })
		reloadData()
	}

	const onDeleteSponsors = async () => {
		setIsLoading(true)
		const deleteSponsorsResult = await adminApi.deleteSponsors({
			adminId,
			sponsors: selectedSponsors
		})

		if (deleteSponsorsResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(deleteSponsorsResult.message, { variant: 'error' })
		}

		setIsLoading(false)
		enqueueSnackbar(deleteSponsorsResult.message, { variant: 'success' })
		reloadData()
	}

	const hasError = field =>
		sponsorState.touched[field] && sponsorState.errors[field] ? true : false

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
						margin='normal'
						name='sponsors'
						variant='outlined'
						value={searchState}
						label='Search Sponsors'
						onChange={onChangeSearch}
						className={classes.searchInput} />

					<span className={classes.spacer} />


					<Button
						color='secondary'
						variant='contained'
						onClick={onDeleteSponsors}
						className={classes.deleteButton}
						disabled={selectedSponsors.length < 1}>DELETE</Button>

					<Button
						color='default'
						variant='contained'
						onClick={onEditSponsorClick}
						className={classes.editButton}
						disabled={selectedSponsors.length > 1 || selectedSponsors.length < 1}>EDIT</Button>

					<Button
						color='primary'
						variant='contained'
						onClick={onCreateSponsorClick}>
						CREATE CODE
        			</Button>
				</div>

				<div className={classes.row} />
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
												checked={selectedSponsors.length === sponsors.length}
												indeterminate={selectedSponsors.length > 0 && selectedSponsors.length < sponsors.length} />
										</TableCell>

										<TableCell>Code</TableCell>

										<TableCell>Duration</TableCell>

										<TableCell>Created At</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{
										listedSponsors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sponsor, i) => (
											<TableRow
												hover
												key={i}
												selected={selectedSponsors.indexOf(sponsor._id) !== -1}>
												<TableCell padding='checkbox'>
													<Checkbox
														value='true'
														color='primary'
														onChange={event => onSelectOne(event, sponsor._id)}
														checked={selectedSponsors.indexOf(sponsor._id) !== -1} />
												</TableCell>

												<TableCell>{sponsor.code}</TableCell>

												<TableCell>{sponsor.duration} {sponsor.durationPick}</TableCell>

												<TableCell>{moment(sponsor.createdAt).format('DD/MM/YYYY')}</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</div>
					</PerfectScrollbar>
				</CardContent>

				<CardActions className={classes.actions}>
					<TablePagination
						page={page}
						component='div'
						count={sponsors.length}
						rowsPerPage={rowsPerPage}
						onChangePage={onPageChange}
						rowsPerPageOptions={[10, 50, 100, 300]}
						onChangeRowsPerPage={onRowsPerPageChange} />
				</CardActions>
			</Card>

			<Dialog
				open={showEditSponsorDialog}
				onClose={() => setEditSponsorDialog(false)}>
				<DialogTitle>Edit Sponsor Code</DialogTitle>

				<DialogContent>
					<DialogContentText>
						Edit the sponsor code here.
          			</DialogContentText>

					<TextField
						disabled
						fullWidth
						name='id'
						margin='normal'
						label='Sponsor Id'
						variant='outlined'
						value={sponsorState.values.sponsorId} />

					<TextField
						disabled
						fullWidth
						margin='normal'
						name='createdAt'
						label='Created At'
						variant='outlined'
						value={moment(sponsorState.values.createdAt).format('DD/MM/YYYY HH:mm')} />

					<TextField
						required
						fullWidth
						name='code'
						label='Code'
						margin='normal'
						variant='outlined'
						onChange={onChangeText}
						error={hasError('code')}
						value={sponsorState.values.code}
						inputProps={{ style: { textTransform: 'uppercase' } }}
						helperText={
							hasError('code') ? sponsorState.errors.code[0] : null
						} />

					<div className={classes.rowDuration}>
						<TextField
							required
							fullWidth
							margin='normal'
							name='duration'
							label='Duration'
							variant='outlined'
							onChange={onChangeText}
							error={hasError('duration')}
							value={sponsorState.values.duration}
							helperText={
								hasError('duration') ? sponsorState.errors.duration[0] : null
							} />

						<Button
							ref={anchorRef}
							aria-haspopup='true'
							aria-controls='simple-menu'
							className={classes.rowSponsorDuration}
							onClick={() => setShowDurationMenu(!showDurationMenu)}>
							{sponsorState.values.durationPick}
						</Button>
					</div>

					<Menu
						keepMounted
						id='simple-menu'
						open={showDurationMenu}
						anchorEl={anchorRef.current}
						onClose={() => setShowDurationMenu(false)}>
						<MenuItem onClick={() => onSelectDuration('DAY')}>DAY</MenuItem>
						<MenuItem onClick={() => onSelectDuration('WEEK')}>WEEK</MenuItem>
						<MenuItem onClick={() => onSelectDuration('MONTH')}>MONTH</MenuItem>
					</Menu>
				</DialogContent>

				<DialogActions>
					<Button
						color='secondary'
						onClick={() => setEditSponsorDialog(false)}>
						CANCEL
         			 </Button>

					<Button
						color='primary'
						variant='contained'
						onClick={onEditSponsor}
						disabled={!sponsorState.isChanged || hasError('code') || sponsorState.values.code.length < 1 || hasError('duration') || sponsorState.values.duration.length < 1 || sponsorState.values.durationPick.length < 1}>
						EDIT SPONSOR CODE
         			 </Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={showCreateSponsorDialog}
				onClose={() => setCreateSponsorDialog(false)}>
				<DialogTitle>Create Sponsor Code</DialogTitle>

				<DialogContent>
					<DialogContentText>
						Create the sponsor code here.
          			</DialogContentText>

					<TextField
						required
						fullWidth
						name='code'
						label='Code'
						margin='normal'
						variant='outlined'
						onChange={onChangeText}
						error={hasError('code')}
						value={sponsorState.values.code}
						inputProps={{ style: { textTransform: 'uppercase' } }}
						helperText={
							hasError('code') ? sponsorState.errors.code[0] : null
						} />

					<div className={classes.rowDuration}>
						<TextField
							required
							fullWidth
							margin='normal'
							name='duration'
							label='Duration'
							variant='outlined'
							onChange={onChangeText}
							error={hasError('duration')}
							value={sponsorState.values.duration}
							helperText={
								hasError('duration') ? sponsorState.errors.duration[0] : null
							} />

						<Button
							aria-haspopup='true'
							ref={anchorRefCreate}
							aria-controls='simple-menu'
							className={classes.rowSponsorDuration}
							onClick={() => setShowCreateDurationMenu(!showCreateDurationMenu)}>
							{sponsorState.values.durationPick}
						</Button>
					</div>

					<Menu
						keepMounted
						id='simple-menu'
						open={showCreateDurationMenu}
						anchorEl={anchorRefCreate.current}
						onClose={() => setShowCreateDurationMenu(false)}>
						<MenuItem onClick={() => onSelectCreateDuration('DAY')}>DAY</MenuItem>
						<MenuItem onClick={() => onSelectCreateDuration('WEEK')}>WEEK</MenuItem>
						<MenuItem onClick={() => onSelectCreateDuration('MONTH')}>MONTH</MenuItem>
					</Menu>
				</DialogContent>

				<DialogActions>
					<Button
						color='secondary'
						onClick={() => setCreateSponsorDialog(false)}>
						CANCEL
         			 </Button>

					<Button
						color='primary'
						variant='contained'
						onClick={onCreateSponsor}
						disabled={!sponsorState.isChanged || hasError('code') || sponsorState.values.code.length < 1 || hasError('duration') || sponsorState.values.duration.length < 1 || sponsorState.values.durationPick.length < 1}>
						CREATE SPONSOR CODE
         			 </Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

SponsorsTable.propTypes = {
	className: PropTypes.string,
	sponsors: PropTypes.array.isRequired
}

export default SponsorsTable