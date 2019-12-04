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
import {
	Card,
	Button,
	Divider,
	TextField,
	CardHeader,
	CardContent,
	CardActions
} from '@material-ui/core'

import { UserApi } from '../../../../config/Api'

const userApi = new UserApi()

const useStyles = makeStyles(() => ({
	root: {}
}))

const Password = props => {
	const { className, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const userId = localStorage.getItem('userId')

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

		const saveResult = await userApi.updateAccount({
			userId,
			password: profileState.password
		})

		if (saveResult.error)
			return enqueueSnackbar(saveResult.message, { variant: 'error' })

		enqueueSnackbar(saveResult.message, { variant: 'success' })
		window.location.reload()
	}

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