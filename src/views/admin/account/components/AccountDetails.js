/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import Validate from 'validate.js'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import { Card, Grid, Button, Divider, TextField, CardHeader, CardActions, CardContent, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import { AdminApi } from 'config/Api'

const adminApi = new AdminApi()

const schema = {
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

const useStyles = makeStyles(() => ({
	root: {}
}))

const AccountDetails = props => {
	const { className, profile, reloadData, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const [isLoading, setIsLoading] = useState(false)
	const [profileState, setProfileState] = useState({
		errors: {},
		values: {
			city: '',
			email: '',
			number: '',
			country: '',
			lastName: '',
			firstName: ''
		},
		touched: {},
		isValid: false,
		isChanged: false
	})

	useEffect(() => {
		setProfileState(profileState => ({
			...profileState,
			values: {
				city: profile.city,
				email: profile.email,
				number: profile.number,
				country: profile.country,
				lastName: profile.lastName,
				firstName: profile.firstName
			}
		}))
	}, [profile])

	useEffect(() => {
		const errors = Validate(profileState.values, schema)

		setProfileState(profileState => ({
			...profileState,
			isValid: errors ? false : true,
			errors: errors || {}
		}))
	}, [profileState.values])

	const onChange = event => {
		event.persist()

		setProfileState(profileState => ({
			...profileState,
			values: {
				...profileState.values,
				[event.target.name]: event.target.value
			},
			touched: {
				...profileState.touched,
				[event.target.name]: true
			},
			isChanged: true
		}))
	}

	const onSaveDetails = async () => {
		setIsLoading(true)
		const saveResult = await adminApi.updateAccount({
			adminId,
			city: profileState.values.city,
			email: profileState.values.email,
			number: profileState.values.number,
			country: profileState.values.country,
			lastName: profileState.values.lastName,
			firstName: profileState.values.firstName
		})

		if (saveResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(saveResult.message, { variant: 'error' })
		}

		enqueueSnackbar(saveResult.message, { variant: 'success' })
		setIsLoading(false)
		reloadData()
	}

	const hasError = field =>
		profileState.touched[field] && profileState.errors[field] ? true : false

	if (isLoading)
		return (
			<Dialog open={isLoading}>
				<DialogContent>
					<CircularProgress />
				</DialogContent>
			</Dialog>
		)

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<form
				noValidate
				autoComplete='off'>
				<CardHeader
					title='Profile'
					subheader='You can edit your profile details here' />

				<Divider />

				<CardContent>
					<Grid
						container
						spacing={3}>
						<Grid
							item
							md={6}
							xs={12}>
							<TextField
								required
								fullWidth
								margin='normal'
								name='firstName'
								label='First name'
								variant='outlined'
								onChange={onChange}
								error={hasError('firstName')}
								value={profileState.values.firstName}
								helperText={
									hasError('firstName') ? profileState.errors.firstName[0] : null
								} />
						</Grid>

						<Grid
							item
							md={6}
							xs={12}>
							<TextField
								required
								fullWidth
								margin='normal'
								name='lastName'
								label='Last name'
								variant='outlined'
								onChange={onChange}
								error={hasError('lastName')}
								value={profileState.values.lastName}
								helperText={
									hasError('lastName') ? profileState.errors.lastName[0] : null
								} />
						</Grid>

						<Grid
							item
							md={6}
							xs={12}>
							<TextField
								required
								fullWidth
								name='email'
								margin='normal'
								variant='outlined'
								label='Email Address'
								onChange={onChange}
								error={hasError('email')}
								value={profileState.values.email}
								helperText={
									hasError('email') ? profileState.errors.email[0] : null
								} />
						</Grid>

						<Grid
							item
							md={6}
							xs={12}>
							<TextField
								fullWidth
								name='number'
								margin='normal'
								variant='outlined'
								label='Phone Number'
								onChange={onChange}
								error={hasError('number')}
								value={profileState.values.number}
								helperText={
									hasError('number') ? profileState.errors.number[0] : null
								} />
						</Grid>

						<Grid
							item
							md={6}
							xs={12}>
							<TextField
								fullWidth
								name='city'
								label='City'
								margin='normal'
								variant='outlined'
								onChange={onChange}
								error={hasError('city')}
								value={profileState.values.city}
								helperText={
									hasError('city') ? profileState.errors.city[0] : null
								} />
						</Grid>

						<Grid
							item
							md={6}
							xs={12}>
							<TextField
								fullWidth
								name='country'
								margin='normal'
								label='Country'
								variant='outlined'
								onChange={onChange}
								error={hasError('country')}
								value={profileState.values.country}
								helperText={
									hasError('country') ? profileState.errors.country[0] : null
								} />
						</Grid>
					</Grid>
				</CardContent>

				<Divider />

				<CardActions>
					<Button
						color='primary'
						variant='contained'
						onClick={onSaveDetails}
						disabled={!profileState.isChanged || hasError('firstName') || hasError('lastName') || hasError('email') || hasError('number') || hasError('city') || hasError('country')}>
						Save Details
          			</Button>
				</CardActions>
			</form>
		</Card>
	)
}

AccountDetails.propTypes = {
	className: PropTypes.string
}

export default AccountDetails