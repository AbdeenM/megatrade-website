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
import { Grid, Hidden, Typography, TextField, Button, Container } from '@material-ui/core'

import { UserApi } from '../../../../../config/Api'

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
	offerContainer: {
		display: 'flex',
		marginBottom: 0,
		marginTop: theme.spacing(10)
	},
	questionContainer: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		marginTop: theme.spacing(9),
		marginBottom: theme.spacing(9)
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
	cardContent: {
		maxWidth: 400
	},
	textField: {
		width: '100%',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2)
	},
	spacing: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
	},
	button: {
		width: '100%'
	},
	imagesWrapper: {
		position: 'relative'
	},
	imageDots: {
		top: -67,
		right: 0,
		left: -67,
		bottom: 0,
		width: '100%',
		position: 'absolute',
		background: 'url(https://github.com/mui-org/material-ui/blob/master/docs/static/themes/onepirate/productCTAImageDots.png)'
	},
	image: {
		top: -28,
		right: 0,
		left: -28,
		bottom: 0,
		width: '100%',
		maxWidth: 600,
		position: 'absolute'
	},
	label: {
		borderRadius: 0,
		height: 'auto',
		padding: theme.spacing(2, 5),
		border: '4px solid currentColor'
	},
	link: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3)
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
		<div>
			<Container
				component='section'
				className={classes.offerContainer}>
				<Grid container>
					<Grid
						item
						md={6}
						xs={12}
						className={classes.cardWrapper}>
						<div className={classes.card}>
							<form
								onSubmit={onSubmit}
								className={classes.cardContent}>
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

					<Grid
						item
						md={6}
						xs={12}
						className={classes.imagesWrapper}>
						<Hidden smDown>
							<div className={classes.imageDots} />

							<img
								alt='call to action'
								className={classes.image}
								src='https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&w=750&q=80' />
						</Hidden>
					</Grid>
				</Grid>
			</Container>

			<Container
				component='section'
				className={classes.questionContainer}>
				<Button className={classes.label}>
					<Typography
						variant='h4'
						component='span'>
						Got any questions? Need help?
        			</Typography>
				</Button>

				<Typography
					variant='subtitle1'
					className={classes.link}>
					We are here to help. Get in touch!
				</Typography>
			</Container>
		</div>
	)
}

export default Offers