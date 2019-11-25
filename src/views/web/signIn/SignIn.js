/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import PropTypes from 'prop-types'
import Validate from 'validate.js'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import {
	Grid,
	Link,
	Button,
	TextField,
	IconButton,
	Typography
} from '@material-ui/core'

import GoogleIcon from './components/GoogleIcon'
import FacebookIcon from './components/FacebookIcon'

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
		backgroundImage: 'url(/images/auth-background.jpg)'
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

	const [formState, setFormState] = useState({
		errors: {},
		values: {},
		touched: {},
		isValid: false
	})

	useEffect(() => {
		const errors = Validate(formState.values, schema)

		setFormState(formState => ({
			...formState,
			isValid: errors ? false : true,
			errors: errors || {}
		}))
	}, [formState.values])

	const handleBack = () => {
		history.goBack()
	}

	const handleChange = event => {
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

	const handleSignIn = event => {
		event.preventDefault()
		history.push('/')
	}

	const hasError = field =>
		formState.touched[field] && formState.errors[field] ? true : false

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
							<IconButton onClick={handleBack}>
								<ArrowBackIcon />
							</IconButton>
						</div>

						<div className={classes.contentBody}>
							<form
								onSubmit={handleSignIn}
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
										<Button
											size='large'
											color='primary'
											variant='contained'
											onClick={handleSignIn}>
											<FacebookIcon className={classes.socialIcon} />
											Login with Facebook
                    					</Button>
									</Grid>

									<Grid item>
										<Button
											size='large'
											variant='contained'
											onClick={handleSignIn}>
											<GoogleIcon className={classes.socialIcon} />
											Login with Google
                    					</Button>
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
									label='Email address'
									onChange={handleChange}
									error={hasError('email')}
									className={classes.textField}
									value={formState.values.email || ''}
									helperText={
										hasError('email') ? formState.errors.email[0] : null
									} />

								<TextField
									fullWidth
									name='password'
									type='password'
									label='Password'
									variant='outlined'
									onChange={handleChange}
									error={hasError('password')}
									className={classes.textField}
									value={formState.values.password || ''}
									helperText={
										hasError('password') ? formState.errors.password[0] : null
									} />

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