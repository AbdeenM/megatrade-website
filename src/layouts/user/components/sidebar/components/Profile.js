/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Avatar, Typography } from '@material-ui/core'

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
	const { className, profile, ...rest } = props

	const classes = useStyles()

	const [profileState, setProfileState] = useState({
		avatar: '',
		lastName: '',
		firstName: '',
		membership: ''
	})

	useEffect(() => {
		setProfileState(profileState => ({
			...profileState,
			avatar: profile.avatar,
			lastName: profile.lastName,
			firstName: profile.firstName,
			membership: profile.membership
		}))
	}, [profile])

	return (
		<div
			{...rest}
			className={clsx(classes.root, className)}>
			<Avatar
				alt='person'
				to='/account'
				component={RouterLink}
				className={classes.avatar}
				src={profileState.avatar || '/images/profile-avatar.png'} />

			<Typography
				variant='h4'
				className={classes.name}>
				{profileState.firstName + ' ' + profileState.lastName}
			</Typography>

			<Typography variant='body2'>{profileState.membership}</Typography>
		</div>
	)
}

Profile.propTypes = {
	className: PropTypes.string
}

export default Profile