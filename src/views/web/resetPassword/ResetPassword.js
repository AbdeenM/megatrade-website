import { useSnackbar } from 'notistack'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Button, Grid, Container, Typography, Dialog, DialogContent, CircularProgress } from '@material-ui/core'

import { UserApi } from 'config/Api'
import useStyles from './resetPassword-style'

const userApi = new UserApi()

const ResetPassword = props => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const [isLoading, setIsLoading] = useState(false)
	const [values, setValues] = useState({
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

	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value })
	}

	const handleSubmit = async event => {
		event.preventDefault()

		setIsLoading(true)
		const resetResult = await userApi.resetPassword({
			password: values.password,
			token: props.match.params.token
		})

		if (resetResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(resetResult.message, { variant: 'error' })
		}

		enqueueSnackbar(resetResult.message, { variant: 'success' })
		setIsLoading(false)
	}

	if (isLoading)
		return (
			<Dialog open={isLoading}>
				<DialogContent>
					<CircularProgress />
				</DialogContent>
			</Dialog>
		)

	return (
		<div className={classes.errorWrap}>
			<Container maxWidth='md'>
				<Grid container>
					<Grid item md={5} xs={12}>
						<div className={classes.flex}>
							<div className={classes.deco}>
								<img
									alt='logo'
									src='/images/sidebar-logo.png' />

								<Typography variant='h3'>
									Reset
								</Typography>
							</div>
						</div>
					</Grid>

					<Grid item md={7} xs={12}>
						<div className={classes.text}>
							<Typography gutterBottom variant='h4'>Reset Password</Typography>

							<Typography gutterBottom>
								Enter your new password below:
							</Typography>

							<ValidatorForm
								onSubmit={handleSubmit}
								onError={errors => console.log(errors)}>
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
							</ValidatorForm>

							<Button onClick={handleSubmit} disabled={values.password !== values.confirmPassword || values.password.length < 1 || values.confirmPassword.length < 1} variant='outlined' color='primary' size='large' className={classes.button}>
								RESET PASSWORD
							</Button>
						</div>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default ResetPassword