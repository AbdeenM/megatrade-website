import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Avatar, Typography, colors } from '@material-ui/core'

import getInitials from 'helpers/getInitials'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		minHeight: 'fit-content'
	},
	avatar: {
		width: 60,
		height: 60,
		backgroundColor: colors.blue[500]
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
				to='/account'
				component={RouterLink}
				src={profileState.avatar}
				className={classes.avatar}>
				{getInitials(profileState.firstName + ' ' + profileState.lastName)}
			</Avatar>

			<Typography
				variant='h6'
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