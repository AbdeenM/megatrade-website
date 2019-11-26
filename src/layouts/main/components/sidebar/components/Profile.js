/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Avatar, Typography } from '@material-ui/core'
import AccountIcon from '@material-ui//icons/AccountCircle'

import { UserApi } from '../../../../../config/Api'

const userApi = new UserApi()

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		minHeight: 'fit-content'
	},
	avatar: {
		width: 60,
		height: 60
	},
	name: {
		marginTop: theme.spacing(1)
	}
}))

const Profile = props => {
	const { className, ...rest } = props

	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const userId = localStorage.getItem('userId')
	const [profile, setProfile] = useState({
		email: '',
		avatar: '',
		lastName: '',
		password: '',
		firstName: '',
		membership: ''
	})

	useEffect(() => {
		async function fetchProfileDetails() {
			const fetchAccountResult = await userApi.fetchAccount({ userId })
			if (fetchAccountResult.error)
				return enqueueSnackbar(fetchAccountResult.message, { variant: 'error' })

			setProfile({
				...profile,
				email: fetchAccountResult.data.email,
				avatar: fetchAccountResult.data.avatar,
				lastName: fetchAccountResult.data.lastName,
				password: fetchAccountResult.data.password,
				firstName: fetchAccountResult.data.firstName,
				membership: fetchAccountResult.data.membership
			})
		}

		fetchProfileDetails()
	}, [])



	return (
		<div
			{...rest}
			className={clsx(classes.root, className)}>
			<Avatar
				alt='person'
				to='/settings'
				component={RouterLink}
				className={classes.avatar}
				src={profile.avatar || '/images/profile-avatar.png'} />

			<Typography
				variant='h4'
				className={classes.name}>
				{profile.firstName + ' ' + profile.lastName}
			</Typography>

			<Typography variant='body2'>{profile.membership}</Typography>
		</div>
	)
}

Profile.propTypes = {
	className: PropTypes.string
}

export default Profile