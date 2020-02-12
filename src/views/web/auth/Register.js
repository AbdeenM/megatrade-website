/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import ReactGA from 'react-ga'
import { useSnackbar } from 'notistack'
import { Redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Button, FormControlLabel, Checkbox, Grid, Dialog, DialogContent, CircularProgress } from '@material-ui/core'

import { UserApi } from 'config/Api'
import useStyles from './form-style'
import Title from './components/Title/TitleSecondary'
import AuthFrame from './components/AuthFrame/AuthFrame'

const userApi = new UserApi()

const Register = props => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const [isLoading, setIsLoading] = useState(false)
	const [isRegisted, setRegister] = useState(false)
	const [values, setValues] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
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

	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value })
	}

	const handleCheck = event => {
		setCheck(event.target.checked)
	}

	const handleSubmit = async event => {
		event.preventDefault()

		setIsLoading(true)
		const signUpResult = await userApi.register({
			email: values.email,
			password: values.password,
			lastName: values.name.split(' ')[1],
			firstName: values.name.split(' ')[0]
		})

		if (signUpResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(signUpResult.message, { variant: 'error' })
		}

		enqueueSnackbar(signUpResult.message, { variant: 'success' })

		localStorage.setItem('userId', signUpResult.data._id)
		ReactGA.set({ userId: signUpResult.data._id })

		setRegister(true)
		setIsLoading(false)
	}

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
		<AuthFrame title='Nice to meet you :)' subtitle='Just register to join with us'>
			<div>
				<div className={classes.head}>
					<Title align='left'>Register</Title>

					<Button size='small' className={classes.buttonLink} href='/login'>
						<ArrowForwardIcon /> Already Have Account?
					</Button>
				</div>

				<ValidatorForm
					onSubmit={handleSubmit}
					onError={errors => console.log(errors)}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextValidator
								variant='filled'
								className={classes.input}
								label='Full Name'
								onChange={handleChange('name')}
								name='name'
								value={values.name}
								validators={['required']}
								errorMessages={['This field is required']} />
						</Grid>

						<Grid item xs={12}>
							<TextValidator
								variant='filled'
								className={classes.input}
								label='Email Address'
								onChange={handleChange('email')}
								name='email'
								value={values.email}
								validators={['required', 'isEmail']}
								errorMessages={['This field is required', 'Email is not valid']} />
						</Grid>

						<Grid item md={6} xs={12}>
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

						<Grid item md={6} xs={12}>
							<TextValidator
								variant='filled'
								type='password'
								className={classes.input}
								label='Confirm Password'
								validators={['isPasswordMatch', 'required']}
								errorMessages={['Password mismatch', 'this field is required']}
								onChange={handleChange('confirmPassword')}
								name='confirm'
								value={values.confirmPassword} />
						</Grid>
					</Grid>

					<div className={classes.btnArea}>
						<FormControlLabel
							control={(
								<Checkbox
									checked={check}
									onChange={(e) => handleCheck(e)}
									color='secondary'
									value={check}
									className={classes.check}
								/>
							)}
							label={(
								<span>
									I have read and accept the
									&nbsp
                 				 <a href='/terms'>
										Terms of Service
									</a>
								</span>
							)} />

						<Button onClick={handleSubmit} variant='contained' fullWidth type='submit' color='primary' size='large' disabled={!check || !values.email.length || !values.password.length || (values.password !== values.confirmPassword)}>
							Continue
						</Button>
					</div>
				</ValidatorForm>
			</div>
		</AuthFrame>
	)
}

export default Register
