/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import PropTypes from 'prop-types'
import Validate from 'validate.js'
import { useSnackbar } from 'notistack'
import GoogleLogin from 'react-google-login'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import Visibility from '@material-ui/icons/Visibility'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import { Link as RouterLink, withRouter, Redirect } from 'react-router-dom'
import {
	Grid,
	Link,
	Button,
	TextField,
	IconButton,
	Typography
} from '@material-ui/core'

import { UserApi } from '../../../config/Api'
import GoogleIcon from './components/GoogleIcon'
import Constants from '../../../config/Constants'
import FacebookIcon from './components/FacebookIcon'

const userApi = new UserApi()

const schema = {
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
		color: theme.palette.text,
		marginTop: theme.spacing(3)
	},
	bio: {
		color: theme.palette.text
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
	socialButtons: {
		marginTop: theme.spacing(3)
	},
	socialIcon: {
		marginRight: theme.spacing(1)
	},
	sugestion: {
		marginTop: theme.spacing(2)
	},
	textField: {
		marginTop: theme.spacing(2)
	},
	signInButton: {
		margin: theme.spacing(2, 0)
	}
}))

const SignIn = props => {
	const { history } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const [isLogged, setLogged] = useState(false)
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

	const onBack = () => {
		history.goBack()
	}

	const onShowPassword = () => {
		setFormState({
			...formState,
			showPassword: !formState.showPassword
		})
	}

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

	const onSignIn = async event => {
		event.preventDefault()

		const signInResult = await userApi.login({
			email: formState.values.email,
			password: formState.values.password
		})

		if (signInResult.error)
			return enqueueSnackbar(signInResult.message, { variant: 'error' })

		enqueueSnackbar(signInResult.message, { variant: 'success' })
		localStorage.setItem('userId', signInResult.data._id)
		setLogged(true)
	}

	const onFacebookLogin = async response => {
		if (response.status === 'unknown')
			return enqueueSnackbar('Your login attempt with facebook failed', { variant: 'info' })


		const socialSignInResult = await userApi.socialLogin({
			email: response.email,
			lastName: response.name.split(' ')[1],
			firstName: response.name.split(' ')[0]
		})

		if (socialSignInResult.error)
			return enqueueSnackbar(socialSignInResult.message, { variant: 'error' })

		enqueueSnackbar(socialSignInResult.message, { variant: 'success' })
		localStorage.setItem('userId', socialSignInResult.data._id)
		setLogged(true)
	}

	const onGoogleLogin = async response => {
		if (response.error)
			return enqueueSnackbar('Your login attempt with google failed', { variant: 'info' })

		const socialSignInResult = await userApi.socialLogin({
			email: response.profileObj.email,
			avatar: response.profileObj.imageUrl,
			lastName: response.profileObj.familyName,
			firstName: response.profileObj.givenName
		})

		if (socialSignInResult.error)
			return enqueueSnackbar(socialSignInResult.message, { variant: 'error' })

		enqueueSnackbar(socialSignInResult.message, { variant: 'success' })
		localStorage.setItem('userId', socialSignInResult.data._id)
		setLogged(true)

	}

	const hasError = field =>
		formState.touched[field] && formState.errors[field] ? true : false


	if (isLogged)
		return <Redirect to='/dashboard' />

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
								onSubmit={onSignIn}
								className={classes.form}>
								<Typography
									variant='h2'
									className={classes.title}>
									Sign in
                				</Typography>

								<Typography
									gutterBottom
									color='textSecondary'>
									Sign in with social media
                				</Typography>

								<Grid
									container
									spacing={2}
									className={classes.socialButtons}>
									<Grid item>
										<FacebookLogin
											callback={onFacebookLogin}
											onFailure={onFacebookLogin}
											fields='name,email,picture'
											appId={Constants.FACEBOOK_APP_ID}
											render={renderProps => <Button
												size='large'
												color='primary'
												variant='contained'
												onClick={renderProps.onClick}>
												<FacebookIcon className={classes.socialIcon} />
												Login with Facebook
                    					</Button>} />
									</Grid>

									<Grid item>
										<GoogleLogin
											onSuccess={onGoogleLogin}
											onFailure={onGoogleLogin}
											clientId={Constants.GOOGLE_CLIENT_ID}
											cookiePolicy={'single_host_origin'}
											render={renderProps => <Button
												size='large'
												variant='contained'
												onClick={renderProps.onClick}>
												<GoogleIcon className={classes.socialIcon} />
												Login with Google
                    					</Button>} />
									</Grid>
								</Grid>

								<Typography
									align='center'
									variant='body1'
									color='textSecondary'
									className={classes.sugestion}>
									or login with email address
				                </Typography>

								<TextField
									fullWidth
									type='text'
									name='email'
									variant='outlined'
									onChange={onChange}
									label='Email address'
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

								<Button
									fullWidth
									size='large'
									type='submit'
									color='primary'
									variant='contained'
									disabled={!formState.isValid}
									className={classes.signInButton}>
									Sign in now
                				</Button>

								<Typography
									variant='body1'
									color='textSecondary'>
									Don't have an account?{' '}
									<Link
										variant='h6'
										to='/sign-up'
										component={RouterLink}>
										Sign up
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

SignIn.propTypes = {
	history: PropTypes.object
}

export default withRouter(SignIn)