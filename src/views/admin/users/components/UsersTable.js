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
import React, { useState, useEffect } from 'react'
import Visibility from '@material-ui/icons/Visibility'
import PerfectScrollbar from 'react-perfect-scrollbar'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Card, CardActions, CardContent, Avatar, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography, TablePagination, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel } from '@material-ui/core'

import Palette from '../../../../theme/Palette'
import { AdminApi } from '../../../../config/Api'
import getInitials from '../../../../helpers/getInitials'

const adminApi = new AdminApi()

const schema = {
	membership: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 32
		}
	},
	firstName: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 32
		}
	},
	lastName: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 32
		}
	},
	email: {
		email: true,
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 64
		}
	},
	password: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 32
		}
	},
	number: {
		numericality: { onlyInteger: true, message: 'entered is not valid' },
		presence: { allowEmpty: true },
		length: {
			maximum: 128
		}
	},
	city: {
		presence: { allowEmpty: true },
		length: {
			maximum: 32
		}
	},
	country: {
		presence: { allowEmpty: true },
		length: {
			maximum: 32
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
	}
}))

const UsersTable = props => {
	const { className, users, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const [page, setPage] = useState(0)
	const [allUsers, setAllUsers] = useState([])
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [searchState, setSearchState] = useState('')
	const [listedUsers, setListedUsers] = useState([])
	const [selectedUsers, setSelectedUsers] = useState([])
	const [showEditUserDialog, setShowEditUserDialog] = useState(false)
	const [showCreateUserDialog, setShowCreateUserDialog] = useState(false)
	const [userProfileState, setUserProfileState] = useState({
		errors: {},
		values: {
			city: '',
			email: '',
			avatar: {
				isBase64: false,
				image: ''
			},
			number: '',
			status: '',
			userId: '',
			country: '',
			membership: '',
			lastName: '',
			password: '',
			firstName: '',
			notifications: {
				alerts: {
					email: false,
					dashboard: false,
					phoneCalls: false,
					textMessages: false
				},
				promotions: {
					email: false,
					dashboard: false,
					phoneCalls: false,
					textMessages: false
				},
				partnerPromotions: {
					email: false,
					dashboard: false,
					phoneCalls: false,
					textMessages: false
				}
			}
		},
		touched: {},
		isValid: false,
		isChanged: false,
		showPassword: false
	})

	useEffect(() => {
		setAllUsers(users)
		setListedUsers(users)
	}, [users])

	useEffect(() => {
		const errors = Validate(userProfileState.values, schema)

		setUserProfileState(userProfileState => ({
			...userProfileState,
			isValid: errors ? false : true,
			errors: errors || {}
		}))
	}, [userProfileState.values])

	const onShowPassword = () => {
		setUserProfileState(userProfileState => ({
			...userProfileState,
			showPassword: !userProfileState.showPassword
		}))
	}

	const onChangeText = event => {
		event.persist()

		setUserProfileState(userProfileState => ({
			...userProfileState,
			values: {
				...userProfileState.values,
				[event.target.name]: event.target.value
			},
			touched: {
				...userProfileState.touched,
				[event.target.name]: true
			},
			isChanged: true
		}))
	}

	const onChangeSearch = event => {
		setSearchState(event.target.value)

		const searchTerm = event.target.value.toLowerCase()

		setListedUsers(allUsers.filter(user => user.firstName.toLowerCase().includes(searchTerm) || user.lastName.toLowerCase().includes(searchTerm)))
	}

	const onChangeAlerts = event => {
		event.persist()

		setUserProfileState(userProfileState => ({
			...userProfileState,
			values: {
				...userProfileState.values,
				notifications: {
					...userProfileState.values.notifications,
					alerts: {
						...userProfileState.values.notifications.alerts,
						[event.target.name]: event.target.checked
					}
				}
			},
			isChanged: true
		}))
	}

	const onChangePromotions = event => {
		event.persist()

		setUserProfileState(userProfileState => ({
			...userProfileState,
			values: {
				...userProfileState.values,
				notifications: {
					...userProfileState.values.notifications,
					promotions: {
						...userProfileState.values.notifications.promotions,
						[event.target.name]: event.target.checked
					}
				}
			},
			isChanged: true
		}))
	}

	const onChangePartnerPromotions = event => {
		event.persist()

		setUserProfileState(userProfileState => ({
			...userProfileState,
			values: {
				...userProfileState.values,
				notifications: {
					...userProfileState.values.notifications,
					partnerPromotions: {
						...userProfileState.values.notifications.partnerPromotions,
						[event.target.name]: event.target.checked
					}
				}
			},
			isChanged: true
		}))
	}

	const toBase64 = file => {
		return new Promise(resolve => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => { resolve(reader.result) }
			reader.onerror = () => { return enqueueSnackbar('Error while uploading your picture, please try again', { variant: 'error' }) }
		})
	}

	const onUploadPicture = async event => {
		event.persist()

		const imageBase64 = await toBase64(event.target.files[0])

		setUserProfileState(userProfileState => ({
			...userProfileState,
			values: {
				...userProfileState.values,
				avatar: {
					isBase64: true,
					image: imageBase64
				}
			},
			isChanged: true
		}))
	}

	const onSelectAll = event => {
		const { users } = props

		let selectedUsers

		if (event.target.checked)
			selectedUsers = users.map(user => user._id)
		else
			selectedUsers = []

		setSelectedUsers(selectedUsers)
	}

	const onSelectOne = (event, id) => {
		const selectedIndex = selectedUsers.indexOf(id)
		let newSelectedUsers = []

		if (selectedIndex === -1)
			newSelectedUsers = newSelectedUsers.concat(selectedUsers, id)
		else if (selectedIndex === 0)
			newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1))
		else if (selectedIndex === selectedUsers.length - 1)
			newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1))
		else if (selectedIndex > 0) {
			newSelectedUsers = newSelectedUsers.concat(
				selectedUsers.slice(0, selectedIndex),
				selectedUsers.slice(selectedIndex + 1)
			)
		}

		setSelectedUsers(newSelectedUsers)
	}

	const onPageChange = (event, page) => {
		setPage(page)
	}

	const onRowsPerPageChange = event => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const onEditUserClick = () => {
		let userDetails = allUsers.filter(user => user._id === selectedUsers[0])[0]

		setUserProfileState(userProfileState => ({
			...userProfileState,
			errors: {},
			values: {
				...userProfileState.values,
				city: userDetails.city,
				userId: userDetails._id,
				email: userDetails.email,
				avatar: {
					isBase64: false,
					image: userDetails.avatar
				},
				number: userDetails.number,
				status: userDetails.status,
				country: userDetails.country,
				membership: userDetails.membership,
				lastName: userDetails.lastName,
				firstName: userDetails.firstName,
				notifications: {
					alerts: {
						email: userDetails.notifications.alerts.email,
						dashboard: userDetails.notifications.alerts.dashboard,
						phoneCalls: userDetails.notifications.alerts.phoneCalls,
						textMessages: userDetails.notifications.alerts.textMessages
					},
					promotions: {
						email: userDetails.notifications.promotions.email,
						dashboard: userDetails.notifications.promotions.dashboard,
						phoneCalls: userDetails.notifications.promotions.phoneCalls,
						textMessages: userDetails.notifications.promotions.textMessages
					},
					partnerPromotions: {
						email: userDetails.notifications.partnerPromotions.email,
						dashboard: userDetails.notifications.partnerPromotions.dashboard,
						phoneCalls: userDetails.notifications.partnerPromotions.phoneCalls,
						textMessages: userDetails.notifications.partnerPromotions.textMessages
					}
				}
			},
			touched: {},
			isValid: false,
			isChanged: false
		}))

		setShowEditUserDialog(true)
	}

	const onEditUser = async () => {
		const editResult = await adminApi.editUser({
			adminId,
			city: userProfileState.values.city,
			email: userProfileState.values.email,
			avatar: userProfileState.values.avatar,
			number: userProfileState.values.number,
			status: userProfileState.values.status,
			userId: userProfileState.values.userId,
			country: userProfileState.values.country,
			membership: userProfileState.values.membership,
			lastName: userProfileState.values.lastName,
			password: userProfileState.values.password,
			firstName: userProfileState.values.firstName,
			notifications: {
				alerts: {
					email: userProfileState.values.notifications.alerts.email,
					dashboard: userProfileState.values.notifications.alerts.dashboard,
					phoneCalls: userProfileState.values.notifications.alerts.phoneCalls,
					textMessages: userProfileState.values.notifications.alerts.textMessages
				},
				promotions: {
					email: userProfileState.values.notifications.promotions.email,
					dashboard: userProfileState.values.notifications.promotions.dashboard,
					phoneCalls: userProfileState.values.notifications.promotions.phoneCalls,
					textMessages: userProfileState.values.notifications.promotions.textMessages
				},
				partnerPromotions: {
					email: userProfileState.values.notifications.partnerPromotions.email,
					dashboard: userProfileState.values.notifications.partnerPromotions.dashboard,
					phoneCalls: userProfileState.values.notifications.partnerPromotions.phoneCalls,
					textMessages: userProfileState.values.notifications.partnerPromotions.textMessages
				}
			}
		})

		if (editResult.error)
			return enqueueSnackbar(editResult.message, { variant: 'error' })

		enqueueSnackbar(editResult.message, { variant: 'success' })
		window.location.reload()
	}

	const onCreateUserClick = async () => {
		setUserProfileState(userProfileState => ({
			errors: {},
			values: {
				city: '',
				email: '',
				avatar: {
					isBase64: false,
					image: ''
				},
				number: '',
				status: '',
				userId: '',
				country: '',
				lastName: '',
				password: '',
				firstName: '',
				membership: '',
				notifications: {
					alerts: {
						email: false,
						dashboard: false,
						phoneCalls: false,
						textMessages: false
					},
					promotions: {
						email: false,
						dashboard: false,
						phoneCalls: false,
						textMessages: false
					},
					partnerPromotions: {
						email: false,
						dashboard: false,
						phoneCalls: false,
						textMessages: false
					}
				}
			},
			touched: {},
			isValid: false,
			isChanged: false
		}))

		setShowCreateUserDialog(true)
	}

	const onCreateUser = async () => {
		const createResult = await adminApi.createUser({
			adminId,
			city: userProfileState.values.city,
			email: userProfileState.values.email,
			avatar: userProfileState.values.avatar,
			number: userProfileState.values.number,
			country: userProfileState.values.country,
			membership: userProfileState.values.membership,
			lastName: userProfileState.values.lastName,
			password: userProfileState.values.password,
			firstName: userProfileState.values.firstName,
			notifications: {
				alerts: {
					email: userProfileState.values.notifications.alerts.email,
					dashboard: userProfileState.values.notifications.alerts.dashboard,
					phoneCalls: userProfileState.values.notifications.alerts.phoneCalls,
					textMessages: userProfileState.values.notifications.alerts.textMessages
				},
				promotions: {
					email: userProfileState.values.notifications.promotions.email,
					dashboard: userProfileState.values.notifications.promotions.dashboard,
					phoneCalls: userProfileState.values.notifications.promotions.phoneCalls,
					textMessages: userProfileState.values.notifications.promotions.textMessages
				},
				partnerPromotions: {
					email: userProfileState.values.notifications.partnerPromotions.email,
					dashboard: userProfileState.values.notifications.partnerPromotions.dashboard,
					phoneCalls: userProfileState.values.notifications.partnerPromotions.phoneCalls,
					textMessages: userProfileState.values.notifications.partnerPromotions.textMessages
				}
			}
		})

		if (createResult.error)
			return enqueueSnackbar(createResult.message, { variant: 'error' })

		enqueueSnackbar(createResult.message, { variant: 'success' })
		window.location.reload()
	}

	const onDeleteUsers = async () => {
		const deleteResult = await adminApi.deleteUsers({
			adminId,
			users: selectedUsers
		})

		if (deleteResult.error)
			return enqueueSnackbar(deleteResult.message, { variant: 'error' })

		enqueueSnackbar(deleteResult.message, { variant: 'success' })
		window.location.reload()
	}

	const hasError = field =>
		userProfileState.touched[field] && userProfileState.errors[field] ? true : false

	return (
		<div
			{...rest}
			className={clsx(classes.root, className)}>
			<div>
				<div className={classes.row}>
					<TextField
						name='users'
						margin='normal'
						variant='outlined'
						value={searchState}
						label='Search Users'
						className={classes.searchInput}
						onChange={onChangeSearch} />

					<span className={classes.spacer} />

					<Button
						color='secondary'
						variant='contained'
						onClick={onDeleteUsers}
						className={classes.deleteButton}
						disabled={selectedUsers.length < 1}>DELETE</Button>

					<Button
						color='default'
						variant='contained'
						onClick={onEditUserClick}
						className={classes.editButton}
						disabled={selectedUsers.length > 1 || selectedUsers.length < 1}>EDIT</Button>

					<Button
						color='primary'
						variant='contained'
						onClick={onCreateUserClick}>
						CREATE USER
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
												checked={selectedUsers.length === users.length}
												indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length} />
										</TableCell>

										<TableCell>Name</TableCell>

										<TableCell>Membership</TableCell>

										<TableCell>Email</TableCell>

										<TableCell>Location</TableCell>

										<TableCell>Phone</TableCell>

										<TableCell>Registration date</TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{
										listedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
											<TableRow
												className={classes.tableRow}
												hover
												key={user._id}
												selected={selectedUsers.indexOf(user._id) !== -1}>
												<TableCell padding='checkbox'>
													<Checkbox
														value='true'
														color='primary'
														checked={selectedUsers.indexOf(user._id) !== -1}
														onChange={event => onSelectOne(event, user._id)} />
												</TableCell>

												<TableCell>
													<div className={classes.nameContainer}>
														<Avatar
															src={user.avatar}
															className={classes.avatar}>
															{getInitials(user.firstName + ' ' + user.lastName)}
														</Avatar>

														<Typography variant='body1'>{user.firstName + ' ' + user.lastName}</Typography>
													</div>
												</TableCell>

												<TableCell>{user.membership}</TableCell>

												<TableCell>{user.email}</TableCell>

												<TableCell>
													{user.city}, {user.country}
												</TableCell>

												<TableCell>{user.number}</TableCell>

												<TableCell>
													{moment(user.joinedAt).format('DD/MM/YYYY')}
												</TableCell>
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
						count={users.length}
						rowsPerPage={rowsPerPage}
						onChangePage={onPageChange}
						rowsPerPageOptions={[10, 50, 100, 300]}
						onChangeRowsPerPage={onRowsPerPageChange} />
				</CardActions>
			</Card>

			<Dialog
				open={showEditUserDialog}
				aria-labelledby='form-dialog-title'
				onClose={() => setShowEditUserDialog(false)}>
				<DialogTitle id='form-dialog-title'>Edit User Profile</DialogTitle>

				<DialogContent>
					<DialogContentText>
						Edit the user details here.
          			</DialogContentText>

					<div className={classes.imageContainer}>
						<Avatar
							className={classes.image}
							src={userProfileState.values.avatar.image || '/images/profile-avatar.png'} />
					</div>

					<TextField
						disabled
						fullWidth
						name='id'
						margin='dense'
						label='User ID'
						variant='outlined'
						value={userProfileState.values.userId} />

					<TextField
						disabled
						fullWidth
						margin='dense'
						name='membership'
						label='Membership'
						variant='outlined'
						value={userProfileState.values.membership} />

					<TextField
						disabled
						fullWidth
						name='status'
						margin='dense'
						variant='outlined'
						label='Profile Status'
						value={userProfileState.values.status + ' %'} />

					<TextField
						required
						fullWidth
						margin='dense'
						name='firstName'
						label='First name'
						variant='outlined'
						onChange={onChangeText}
						error={hasError('firstName')}
						value={userProfileState.values.firstName}
						helperText={
							hasError('firstName') ? userProfileState.errors.firstName[0] : null
						} />


					<TextField
						required
						fullWidth
						margin='dense'
						name='lastName'
						label='Last name'
						variant='outlined'
						onChange={onChangeText}
						error={hasError('lastName')}
						value={userProfileState.values.lastName}
						helperText={
							hasError('lastName') ? userProfileState.errors.lastName[0] : null
						} />

					<TextField
						required
						fullWidth
						name='email'
						margin='dense'
						variant='outlined'
						label='Email Address'
						onChange={onChangeText}
						error={hasError('email')}
						value={userProfileState.values.email}
						helperText={
							hasError('email') ? userProfileState.errors.email[0] : null
						} />

					<TextField
						fullWidth
						name='password'
						label='Password'
						variant='outlined'
						onChange={onChangeText}
						value={userProfileState.values.password}
						type={userProfileState.showPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: userProfileState.showPassword
								? <VisibilityOff
									onClick={onShowPassword} />
								: <Visibility
									onClick={onShowPassword} />
						}} />

					<TextField
						fullWidth
						name='number'
						margin='dense'
						variant='outlined'
						label='Phone Number'
						onChange={onChangeText}
						error={hasError('number')}
						value={userProfileState.values.number}
						helperText={
							hasError('number') ? userProfileState.errors.number[0] : null
						} />

					<TextField
						fullWidth
						name='city'
						label='City'
						margin='dense'
						variant='outlined'
						onChange={onChangeText}
						error={hasError('city')}
						value={userProfileState.values.city}
						helperText={
							hasError('city') ? userProfileState.errors.city[0] : null
						} />

					<TextField
						fullWidth
						name='country'
						margin='dense'
						label='Country'
						variant='outlined'
						onChange={onChangeText}
						error={hasError('country')}
						value={userProfileState.values.country}
						helperText={
							hasError('country') ? userProfileState.errors.country[0] : null
						} />

					<div className={classes.checkboxes}>
						<Typography
							variant='h6'
							gutterBottom>
							Signal Alerts
						</Typography>

						<FormControlLabel
							name='dashboard'
							label='Dashboard'
							control={
								<Checkbox
									color='primary'
									onChange={onChangeAlerts}
									checked={userProfileState.values.notifications.alerts.dashboard} />
							} />

						<FormControlLabel
							name='email'
							label='Email'
							control={
								<Checkbox
									color='primary'
									onChange={onChangeAlerts}
									checked={userProfileState.values.notifications.alerts.email} />
							} />

						<FormControlLabel
							name='textMessages'
							label='Text Messages'
							control={
								<Checkbox
									color='primary'
									onChange={onChangeAlerts}
									checked={userProfileState.values.notifications.alerts.textMessages} />
							} />

						<FormControlLabel
							name='phoneCalls'
							label='Phone Calls'
							control={
								<Checkbox
									color='primary'
									onChange={onChangeAlerts}
									checked={userProfileState.values.notifications.alerts.phoneCalls} />
							} />
					</div>

					<div className={classes.checkboxes}>
						<Typography
							variant='h6'
							gutterBottom>
							MegaTrade Promotions
						</Typography>

						<FormControlLabel
							name='dashboard'
							label='Dashboard'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePromotions}
									checked={userProfileState.values.notifications.promotions.dashboard} />
							} />

						<FormControlLabel
							name='email'
							label='Email'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePromotions}
									checked={userProfileState.values.notifications.promotions.email} />
							} />

						<FormControlLabel
							name='textMessages'
							label='Text Messages'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePromotions}
									checked={userProfileState.values.notifications.promotions.textMessages} />
							} />

						<FormControlLabel
							name='phoneCalls'
							label='Phone Calls'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePromotions}
									checked={userProfileState.values.notifications.promotions.phoneCalls} />
							} />
					</div>

					<div className={classes.checkboxes}>
						<Typography
							variant='h6'
							gutterBottom>
							Our Partner Promotions
              				</Typography>

						<FormControlLabel
							name='dashboard'
							label='Dashboard'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePartnerPromotions}
									checked={userProfileState.values.notifications.partnerPromotions.dashboard} />
							} />

						<FormControlLabel
							name='email'
							label='Email'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePartnerPromotions}
									checked={userProfileState.values.notifications.partnerPromotions.email} />
							} />

						<FormControlLabel
							name='textMessages'
							label='Text Messages'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePartnerPromotions}
									checked={userProfileState.values.notifications.partnerPromotions.textMessages} />
							} />

						<FormControlLabel
							name='phoneCalls'
							label='Phone Calls'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePartnerPromotions}
									checked={userProfileState.values.notifications.partnerPromotions.phoneCalls} />
							} />
					</div>
				</DialogContent>

				<DialogActions>
					<input
						type='file'
						accept='image/*'
						id='upload-image'
						onChange={onUploadPicture}
						style={{ display: 'none' }} />

					<label htmlFor='upload-image'>
						<Button
							variant='text'
							color='primary'
							component='span'>
							UPLOAD PROFILE PICUTRE
						</Button>
					</label>

					<span className={classes.spacer} />

					<Button
						color='secondary'
						onClick={() => setShowEditUserDialog(false)}>
						CANCEL
         			 </Button>

					<Button
						color='primary'
						variant='contained'
						onClick={onEditUser}
						disabled={!userProfileState.isChanged || hasError('firstName') || hasError('lastName') || hasError('email') || hasError('number') || hasError('city') || hasError('country')}>
						EDIT USER
         			 </Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={showCreateUserDialog}
				aria-labelledby='form-dialog-title'
				onClose={() => setShowCreateUserDialog(false)}>
				<DialogTitle id='form-dialog-title'>Create User Profile</DialogTitle>

				<DialogContent>
					<DialogContentText>
						Create the user details here.
          			</DialogContentText>

					<div className={classes.imageContainer}>
						<Avatar
							className={classes.image}
							src={userProfileState.values.avatar.image || '/images/profile-avatar.png'} />
					</div>

					<TextField
						required
						fullWidth
						name='membership'
						margin='dense'
						label='Membership'
						variant='outlined'
						onChange={onChangeText}
						error={hasError('membership')}
						value={userProfileState.values.membership}
						helperText={
							hasError('membership') ? userProfileState.errors.firstName[0] : null
						} />

					<TextField
						required
						fullWidth
						margin='dense'
						name='firstName'
						label='First name'
						variant='outlined'
						onChange={onChangeText}
						error={hasError('firstName')}
						value={userProfileState.values.firstName}
						helperText={
							hasError('firstName') ? userProfileState.errors.firstName[0] : null
						} />


					<TextField
						required
						fullWidth
						margin='dense'
						name='lastName'
						label='Last name'
						variant='outlined'
						onChange={onChangeText}
						error={hasError('lastName')}
						value={userProfileState.values.lastName}
						helperText={
							hasError('lastName') ? userProfileState.errors.lastName[0] : null
						} />

					<TextField
						required
						fullWidth
						name='email'
						margin='dense'
						variant='outlined'
						label='Email Address'
						onChange={onChangeText}
						error={hasError('email')}
						value={userProfileState.values.email}
						helperText={
							hasError('email') ? userProfileState.errors.email[0] : null
						} />

					<TextField
						fullWidth
						name='password'
						label='Password'
						variant='outlined'
						onChange={onChangeText}
						value={userProfileState.values.password}
						type={userProfileState.showPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: userProfileState.showPassword
								? <VisibilityOff
									onClick={onShowPassword} />
								: <Visibility
									onClick={onShowPassword} />
						}} />

					<TextField
						fullWidth
						name='number'
						margin='dense'
						variant='outlined'
						label='Phone Number'
						onChange={onChangeText}
						error={hasError('number')}
						value={userProfileState.values.number}
						helperText={
							hasError('number') ? userProfileState.errors.number[0] : null
						} />

					<TextField
						fullWidth
						name='city'
						label='City'
						margin='dense'
						variant='outlined'
						onChange={onChangeText}
						error={hasError('city')}
						value={userProfileState.values.city}
						helperText={
							hasError('city') ? userProfileState.errors.city[0] : null
						} />

					<TextField
						fullWidth
						name='country'
						margin='dense'
						label='Country'
						variant='outlined'
						onChange={onChangeText}
						error={hasError('country')}
						value={userProfileState.values.country}
						helperText={
							hasError('country') ? userProfileState.errors.country[0] : null
						} />

					<div className={classes.checkboxes}>
						<Typography
							variant='h6'
							gutterBottom>
							Signal Alerts
						</Typography>

						<FormControlLabel
							name='dashboard'
							label='Dashboard'
							control={
								<Checkbox
									color='primary'
									onChange={onChangeAlerts}
									checked={userProfileState.values.notifications.alerts.dashboard} />
							} />

						<FormControlLabel
							name='email'
							label='Email'
							control={
								<Checkbox
									color='primary'
									onChange={onChangeAlerts}
									checked={userProfileState.values.notifications.alerts.email} />
							} />

						<FormControlLabel
							name='textMessages'
							label='Text Messages'
							control={
								<Checkbox
									color='primary'
									onChange={onChangeAlerts}
									checked={userProfileState.values.notifications.alerts.textMessages} />
							} />

						<FormControlLabel
							name='phoneCalls'
							label='Phone Calls'
							control={
								<Checkbox
									color='primary'
									onChange={onChangeAlerts}
									checked={userProfileState.values.notifications.alerts.phoneCalls} />
							} />
					</div>

					<div className={classes.checkboxes}>
						<Typography
							variant='h6'
							gutterBottom>
							MegaTrade Promotions
						</Typography>

						<FormControlLabel
							name='dashboard'
							label='Dashboard'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePromotions}
									checked={userProfileState.values.notifications.promotions.dashboard} />
							} />

						<FormControlLabel
							name='email'
							label='Email'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePromotions}
									checked={userProfileState.values.notifications.promotions.email} />
							} />

						<FormControlLabel
							name='textMessages'
							label='Text Messages'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePromotions}
									checked={userProfileState.values.notifications.promotions.textMessages} />
							} />

						<FormControlLabel
							name='phoneCalls'
							label='Phone Calls'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePromotions}
									checked={userProfileState.values.notifications.promotions.phoneCalls} />
							} />
					</div>

					<div className={classes.checkboxes}>
						<Typography
							variant='h6'
							gutterBottom>
							Our Partner Promotions
              				</Typography>

						<FormControlLabel
							name='dashboard'
							label='Dashboard'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePartnerPromotions}
									checked={userProfileState.values.notifications.partnerPromotions.dashboard} />
							} />

						<FormControlLabel
							name='email'
							label='Email'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePartnerPromotions}
									checked={userProfileState.values.notifications.partnerPromotions.email} />
							} />

						<FormControlLabel
							name='textMessages'
							label='Text Messages'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePartnerPromotions}
									checked={userProfileState.values.notifications.partnerPromotions.textMessages} />
							} />

						<FormControlLabel
							name='phoneCalls'
							label='Phone Calls'
							control={
								<Checkbox
									color='primary'
									onChange={onChangePartnerPromotions}
									checked={userProfileState.values.notifications.partnerPromotions.phoneCalls} />
							} />
					</div>
				</DialogContent>

				<DialogActions>
					<input
						type='file'
						accept='image/*'
						id='upload-image'
						onChange={onUploadPicture}
						style={{ display: 'none' }} />

					<label htmlFor='upload-image'>
						<Button
							variant='text'
							color='primary'
							component='span'>
							UPLOAD PROFILE PICUTRE
						</Button>
					</label>

					<span className={classes.spacer} />

					<Button
						color='secondary'
						onClick={() => setShowCreateUserDialog(false)}>
						CANCEL
         			 </Button>

					<Button
						color='primary'
						variant='contained'
						onClick={onCreateUser}
						disabled={!userProfileState.isChanged || hasError('membership') || hasError('firstName') || hasError('lastName') || hasError('email') || hasError('number') || hasError('city') || hasError('country') || userProfileState.values.membership.length < 1 || userProfileState.values.firstName.length < 1 || userProfileState.values.lastName.length < 1 || userProfileState.values.email.length < 1 || userProfileState.values.password.length < 1}>
						CREATE USER
         			 </Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

UsersTable.propTypes = {
	className: PropTypes.string,
	users: PropTypes.array.isRequired
}

export default UsersTable