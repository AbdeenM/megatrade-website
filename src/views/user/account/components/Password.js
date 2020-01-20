/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Card, Button, Divider, TextField, CardHeader, CardContent, CardActions, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import { UserApi } from 'config/Api'

const userApi = new UserApi()

const useStyles = makeStyles(() => ({
	root: {}
}))

const Password = props => {
	const { className, reloadData, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const userId = localStorage.getItem('userId')

	const [isLoading, setIsLoading] = useState(false)
	const [passwordState, setPasswordState] = useState({
		confirm: '',
		password: '',
		showPassword: false
	})

	const onShowPassword = () => {
		setPasswordState(passwordState => ({
			...passwordState,
			showPassword: !passwordState.showPassword
		}))
	}

	const onChange = event => {
		setPasswordState({
			...passwordState,
			[event.target.name]: event.target.value
		})
	}

	const onUpdatePassword = async () => {
		if (passwordState.password !== passwordState.confirm)
			return enqueueSnackbar('Your password and confirmed password does not match, please try again', { variant: 'info' })

		setIsLoading(false)
		const saveResult = await userApi.updateAccount({
			userId,
			password: passwordState.password
		})

		if (saveResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(saveResult.message, { variant: 'error' })
		}

		setIsLoading(false)
		enqueueSnackbar(saveResult.message, { variant: 'success' })
		reloadData()
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
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<form>
				<CardHeader
					title='Password'
					subheader='Update your account password' />

				<Divider />

				<CardContent>
					<TextField
						fullWidth
						name='password'
						margin='normal'
						label='Password'
						variant='outlined'
						onChange={onChange}
						value={passwordState.password}
						type={passwordState.showPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: passwordState.showPassword
								? <VisibilityOff
									onClick={onShowPassword} />
								: <Visibility
									onClick={onShowPassword} />
						}} />

					<TextField
						fullWidth
						name='confirm'
						type='password'
						margin='normal'
						variant='outlined'
						onChange={onChange}
						label='Confirm Password'
						value={passwordState.confirm}
						style={{ marginTop: '1rem' }} />
				</CardContent>

				<Divider />

				<CardActions>
					<Button
						color='primary'
						variant='contained'
						onClick={onUpdatePassword}
						disabled={(passwordState.password.length <= 3 || passwordState.confirm.length <= 3) || (passwordState.password.length !== passwordState.confirm.length)}>
						Update Password
          			</Button>
				</CardActions>
			</form>
		</Card>
	)
}

Password.propTypes = {
	className: PropTypes.string
}

export default Password