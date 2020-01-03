/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { useSnackbar } from 'notistack'
import { Redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Button, Typography, FormControlLabel, Checkbox, Grid, Dialog, DialogContent, CircularProgress } from '@material-ui/core'

import useStyles from './form-style'
import { UserApi } from 'config/Api'
import Title from './components/Title/TitleSecondary'
import AuthFrame from './components/AuthFrame/AuthFrame'
import SocialAuth from './components/SocialAuth/SocialAuth'

const userApi = new UserApi()

const Login = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const [values, setValues] = useState({
		email: '',
		password: '',
		hasError: false
	})

	useEffect(() => {
		ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
			if (value !== values.password) {
				return false
			}

			return true
		})
	})


	const [check, setCheck] = useState(false)
	const [isLogged, setLogged] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value })
	}

	const handleCheck = event => {
		setCheck(event.target.checked)
	}

	const handleSubmit = async event => {
		event.preventDefault()

		setIsLoading(true)
		const signInResult = await userApi.login({
			email: values.email,
			password: values.password
		})

		if (signInResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(signInResult.message, { variant: 'error' })
		}

		enqueueSnackbar(signInResult.message, { variant: 'success' })
		localStorage.setItem('userId', signInResult.data._id)
		setIsLoading(false)
		setLogged(true)
	}

	const onFacebookLogin = async response => {
		if (response.status === 'unknown')
			return enqueueSnackbar('Your login attempt with facebook failed', { variant: 'info' })


		setIsLoading(true)
		const socialSignInResult = await userApi.socialLogin({
			email: response.email,
			lastName: response.name.split(' ')[1],
			firstName: response.name.split(' ')[0]
		})

		if (socialSignInResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(socialSignInResult.message, { variant: 'error' })
		}

		enqueueSnackbar(socialSignInResult.message, { variant: 'success' })
		localStorage.setItem('userId', socialSignInResult.data._id)
		setIsLoading(false)
		setLogged(true)
	}

	const onGoogleLogin = async response => {
		if (response.error)
			return enqueueSnackbar('Your login attempt with google failed', { variant: 'info' })

		setIsLoading(true)
		const socialSignInResult = await userApi.socialLogin({
			email: response.profileObj.email,
			avatar: response.profileObj.imageUrl,
			lastName: response.profileObj.familyName,
			firstName: response.profileObj.givenName
		})

		if (socialSignInResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(socialSignInResult.message, { variant: 'error' })
		}

		enqueueSnackbar(socialSignInResult.message, { variant: 'success' })
		localStorage.setItem('userId', socialSignInResult.data._id)
		setIsLoading(false)
		setLogged(true)
	}

	if (isLogged)
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
		<AuthFrame title='Welcome back' subtitle='Please login to continue'>
			<div>
				<div className={classes.head}>
					<Title align='left'>
						Login
					</Title>

					<Button size='small' className={classes.buttonLink} href='/register'>
						<ArrowForwardIcon /> Create New Account
					</Button>
				</div>

				<SocialAuth onFacebook={onFacebookLogin} onGoogle={onGoogleLogin} />

				<div className={classes.separator}>
					<Typography>
						Or login with email
					</Typography>
				</div>

				<ValidatorForm
					onSubmit={handleSubmit}
					onError={errors => console.log(errors)}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextValidator
								variant='filled'
								className={classes.input}
								label='Email'
								name='email'
								onChange={handleChange('email')}
								value={values.email}
								validators={['required', 'isEmail']}
								errorMessages={['This field is required', 'Email is not valid']} />
						</Grid>

						<Grid item xs={12}>
							<TextValidator
								variant='filled'
								type='password'
								className={classes.input}
								label='Password'
								validators={['required']}
								onChange={handleChange('password')}
								errorMessages={['This field is required']}
								name='password'
								value={values.password} />
						</Grid>
					</Grid>

					<div className={classes.formHelper}>
						<FormControlLabel
							control={(
								<Checkbox
									checked={check}
									onChange={(e) => handleCheck(e)}
									color='secondary'
									value={check}
									className={classes.check} />
							)}
							label={(
								<span>
									Remember me
								</span>
							)} />

						<Button size='small' className={classes.buttonLink} href='/forgot-password'>
							Forgot Password?
						</Button>
					</div>

					<div className={classes.btnArea}>
						<Button onClick={handleSubmit} variant='contained' fullWidth type='submit' color='primary' size='large' disabled={!values.email.length || !values.password.length}>
							Log In
						</Button>
					</div>
				</ValidatorForm>
			</div>
		</AuthFrame >
	)
}

export default Login