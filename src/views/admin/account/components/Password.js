import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Card, Button, Divider, TextField, CardHeader, CardContent, CardActions, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import { AdminApi } from 'config/Api'

const adminApi = new AdminApi()

const useStyles = makeStyles(() => ({
	root: {}
}))

const Password = props => {
	const { className, reloadData, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const adminId = localStorage.getItem('adminId')

	const [isLoading, setIsLoading] = useState(false)
	const [profileState, setProfileState] = useState({
		confirm: '',
		password: '',
		showPassword: false
	})

	const onShowPassword = () => {
		setProfileState({
			...profileState,
			showPassword: !profileState.showPassword
		});
	}

	const onChange = event => {
		setProfileState({
			...profileState,
			[event.target.name]: event.target.value
		})
	}

	const onUpdatePassword = async () => {
		if (profileState.password !== profileState.confirm)
			return enqueueSnackbar('Your password and confirmed password does not match, please try again', { variant: 'info' })

		setIsLoading(true)
		const saveResult = await adminApi.updateAccount({
			adminId,
			password: profileState.password
		})

		if (saveResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(saveResult.message, { variant: 'error' })
		}

		enqueueSnackbar(saveResult.message, { variant: 'success' })
		setIsLoading(false)
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
						value={profileState.password}
						type={profileState.showPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: profileState.showPassword
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
						value={profileState.confirm}
						style={{ marginTop: '1rem' }} />
				</CardContent>

				<Divider />

				<CardActions>
					<Button
						color='primary'
						variant='contained'
						onClick={onUpdatePassword}
						disabled={(profileState.password.length <= 3 || profileState.confirm.length <= 3) || (profileState.password.length !== profileState.confirm.length)}>
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