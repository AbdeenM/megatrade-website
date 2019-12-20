/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import Validate from 'validate.js'
import { useSnackbar } from 'notistack'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, TextField, Button, Container } from '@material-ui/core'

import { UserApi } from 'config/Api'

const userApi = new UserApi()

const schema = {
	email: {
		email: true,
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 64
		}
	}
}

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		overflow: 'hidden',
		backgroundColor: theme.palette.secondary.white
	},
	container: {
		display: 'flex',
		marginTop: theme.spacing(10),
		marginBottom: theme.spacing(10)
	},
	cardWrapper: {
		zIndex: 1
	},
	card: {
		display: 'flex',
		justifyContent: 'center',
		padding: theme.spacing(8, 3),
		backgroundColor: theme.palette.primary.light
	},
	spacing: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
	},
	button: {
		width: '100%'
	}
}))

const Offers = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const [userState, setUserState] = useState({
		errors: {},
		values: {
			email: ''
		},
		touched: {},
		isValid: false
	})

	useEffect(() => {
		const errors = Validate(userState.values, schema)

		setUserState(userState => ({
			...userState,
			isValid: errors ? false : true,
			errors: errors || {}
		}))
	}, [userState.values])

	const onChange = event => {
		event.persist()

		setUserState(userState => ({
			...userState,
			values: {
				...userState.values,
				[event.target.name]: event.target.value
			},
			touched: {
				...userState.touched,
				[event.target.name]: true
			},
			isChanged: true
		}))
	}

	const onClearState = () => {
		setUserState({
			errors: {},
			values: {
				email: ''
			},
			touched: {},
			isValid: false
		})
	}

	const onSubmit = async event => {
		event.preventDefault()

		const offersRegisterResult = await userApi.offersRegister({
			email: userState.email
		})

		if (offersRegisterResult.error)
			return enqueueSnackbar(offersRegisterResult.message, { variant: 'error' })

		enqueueSnackbar(offersRegisterResult.message, { variant: 'success' })
	}

	const hasError = field =>
		userState.touched[field] && userState.errors[field] ? true : false

	return (
		<section className={classes.root}>
			<Container
				component='section'
				className={classes.container}>
				<Grid container>
					<Grid
						item
						md={12}
						xs={12}
						className={classes.cardWrapper}>
						<div className={classes.card}>
							<form onSubmit={onSubmit}>
								<Typography
									gutterBottom
									variant='h2'
									component='h2'>
									Receive Our Offers
              					</Typography>

								<Typography variant='h5'>
									Get Our Latest News & Offers Exclucively!
              					</Typography>

								<div className={classes.spacing}>
									<TextField
										fullWidth
										name='email'
										onChange={onChange}
										label='Email Address'
										error={hasError('email')}
										value={userState.values.email}
										onBlur={userState.values.email.length < 1 ? onClearState : null}
										helperText={
											hasError('email') ? userState.errors.email[0] : null
										} />
								</div>

								<Button
									type='submit'
									color='primary'
									variant='contained'
									className={classes.button}
									disabled={hasError('email') || userState.values.email.length < 1}>
									Keep Me Updated
              				</Button>
							</form>
						</div>
					</Grid>
				</Grid>
			</Container>
		</section>
	)
}

export default Offers