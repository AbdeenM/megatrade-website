/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import PropTypes from 'prop-types'
import Validate from 'validate.js'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import Visibility from '@material-ui/icons/Visibility'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Link as RouterLink, withRouter, Redirect } from 'react-router-dom'
import { Grid, Link, Button, Checkbox, TextField, IconButton, Typography, FormHelperText, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import { UserApi } from 'config/Api'

const userApi = new UserApi()

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
	password: {
		presence: { allowEmpty: false, message: 'is required' },
		length: {
			maximum: 128
		}
	},
	policy: {
		presence: { allowEmpty: false, message: 'is required' },
		checked: true
	}
}

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		backgroundColor: theme.palette.background.default
	},
	grid: {
		height: '100%'
	},
	imageContainer: {
		[theme.breakpoints.down('md')]: {
			display: 'none'
		}
	},
	image: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		backgroundSize: 'cover',
		justifyContent: 'center',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundColor: theme.palette.neutral,
		backgroundImage: 'url(/images/auth-background.png)'
	},
	name: {
		color: theme.palette.white,
		marginTop: theme.spacing(3)
	},
	bio: {
		color: theme.palette.white
	},
	contentContainer: {},
	content: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column'
	},
	contentHeader: {
		display: 'flex',
		alignItems: 'center',
		paddingTop: theme.spacing(5),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingBototm: theme.spacing(2)
	},
	logoImage: {
		marginLeft: theme.spacing(4)
	},
	contentBody: {
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
		[theme.breakpoints.down('md')]: {
			justifyContent: 'center'
		}
	},
	form: {
		flexBasis: 700,
		paddingLeft: 100,
		paddingRight: 100,
		paddingBottom: 125,
		[theme.breakpoints.down('sm')]: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2)
		}
	},
	title: {
		marginTop: theme.spacing(3)
	},
	textField: {
		marginTop: theme.spacing(2)
	},
	policy: {
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(1)
	},
	policyCheckbox: {
		marginLeft: '-14px'
	},
	signUpButton: {
		margin: theme.spacing(2, 0)
	}
}))

const SignUp = props => {
	const { history } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const [isLoading, setIsLoading] = useState(false)
	const [isRegisted, setRegister] = useState(false)
	const [formState, setFormState] = useState({
		errors: {},
		values: {},
		touched: {},
		isValid: false,
		showPassword: false
	})

	useEffect(() => {
		const errors = Validate(formState.values, schema)

		setFormState(formState => ({
			...formState,
			isValid: errors ? false : true,
			errors: errors || {}
		}))
	}, [formState.values])

	const onChange = event => {
		event.persist()

		setFormState(formState => ({
			...formState,
			values: {
				...formState.values,
				[event.target.name]:
					event.target.type === 'checkbox'
						? event.target.checked
						: event.target.value
			},
			touched: {
				...formState.touched,
				[event.target.name]: true
			}
		}))
	}

	const onBack = () => {
		history.goBack()
	}

	const onShowPassword = () => {
		setFormState({
			...formState,
			showPassword: !formState.showPassword
		});
	}

	const onSignUp = async event => {
		event.preventDefault()

		setIsLoading(true)
		const signUpResult = await userApi.register({
			email: formState.values.email,
			lastName: formState.values.lastName,
			password: formState.values.password,
			firstName: formState.values.firstName
		})

		if (signUpResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(signUpResult.message, { variant: 'error' })
		}

		enqueueSnackbar(signUpResult.message, { variant: 'success' })
		localStorage.setItem('userId', signUpResult.data._id)
		setRegister(true)
		setIsLoading(false)
	}

	const hasError = field =>
		formState.touched[field] && formState.errors[field] ? true : false

	if (isRegisted)
		return <Redirect to='/dashboard' />

	if (isLoading)
		return (
			<Dialog open={isLoading}>
				<DialogContent>
					<CircularProgress />
				</DialogContent>
			</Dialog>
		)

	return (
		<div className={classes.root}>
			<Grid
				container
				className={classes.grid}>
				<Grid
					item
					lg={5}
					className={classes.imageContainer}>
					<div className={classes.image} />
				</Grid>

				<Grid
					item
					lg={7}
					xs={12}
					className={classes.content}>
					<div className={classes.content}>
						<div className={classes.contentHeader}>
							<IconButton onClick={onBack}>
								<ArrowBackIcon />
							</IconButton>
						</div>

						<div className={classes.contentBody}>
							<form
								onSubmit={onSignUp}
								className={classes.form}>
								<Typography
									variant='h2'
									className={classes.title}>
									Create new account
                				</Typography>

								<Typography
									gutterBottom
									color='textSecondary'>
									Use your email to create new account
                				</Typography>

								<TextField
									fullWidth
									type='text'
									name='firstName'
									label='First name'
									variant='outlined'
									onChange={onChange}
									error={hasError('firstName')}
									className={classes.textField}
									value={formState.values.firstName || ''}
									helperText={
										hasError('firstName') ? formState.errors.firstName[0] : null
									} />

								<TextField
									fullWidth
									type='text'
									name='lastName'
									label='Last name'
									variant='outlined'
									onChange={onChange}
									error={hasError('lastName')}
									className={classes.textField}
									value={formState.values.lastName || ''}
									helperText={
										hasError('lastName') ? formState.errors.lastName[0] : null
									} />

								<TextField
									fullWidth
									type='text'
									name='email'
									variant='outlined'
									label='Email address'
									onChange={onChange}
									error={hasError('email')}
									className={classes.textField}
									value={formState.values.email || ''}
									helperText={
										hasError('email') ? formState.errors.email[0] : null
									} />

								<TextField
									fullWidth
									name='password'
									label='Password'
									variant='outlined'
									onChange={onChange}
									error={hasError('password')}
									className={classes.textField}
									value={formState.values.password || ''}
									type={formState.showPassword ? 'text' : 'password'}
									helperText={
										hasError('password') ? formState.errors.password[0] : null
									}
									InputProps={{
										endAdornment: formState.showPassword
											? <VisibilityOff
												onClick={onShowPassword} />
											: <Visibility
												onClick={onShowPassword} />
									}} />

								<div className={classes.policy}>
									<Checkbox
										name='policy'
										color='primary'
										onChange={onChange}
										className={classes.policyCheckbox}
										checked={formState.values.policy || false} />

									<Typography
										variant='body1'
										color='textSecondary'
										className={classes.policyText}>
										I have read the{' '}
										<Link
											to='/terms'
											variant='h6'
											color='primary'
											target='_blank'
											underline='always'
											component={RouterLink}>
											Terms and Conditions
                    					</Link>
									</Typography>
								</div>

								{
									hasError('policy') && (
										<FormHelperText error>
											{formState.errors.policy[0]}
										</FormHelperText>
									)
								}

								<Button
									fullWidth
									size='large'
									type='submit'
									color='primary'
									variant='contained'
									disabled={!formState.isValid}
									className={classes.signUpButton}>
									Sign up now
                				</Button>

								<Typography
									variant='body1'
									color='textSecondary'>
									Have an account?{' '}
									<Link
										variant='h6'
										to='/sign-in'
										component={RouterLink}>
										Sign in
                  					</Link>
								</Typography>
							</form>
						</div>
					</div>
				</Grid>
			</Grid>
		</div>
	)
}

SignUp.propTypes = {
	history: PropTypes.object
}

export default withRouter(SignUp)