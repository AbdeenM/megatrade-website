/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
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
	const { className, ...rest } = props

	const classes = useStyles()

	const user = {
		bio: 'Free Member',
		name: 'Abdeen Mohamed',
		avatar: '/images/avatar.png'
	}

	return (
		<div
			{...rest}
			className={clsx(classes.root, className)}>
			<Avatar
				alt='Person'
				to='/settings'
				src={user.avatar}
				component={RouterLink}
				className={classes.avatar} />

			<Typography
				variant='h4'
				className={classes.name}>
				{user.name}
			</Typography>

			<Typography variant='body2'>{user.bio}</Typography>
		</div>
	)
}

Profile.propTypes = {
	className: PropTypes.string
}

export default Profile