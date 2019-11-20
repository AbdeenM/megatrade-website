/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import {
	Card,
	Avatar,
	Button,
	Divider,
	Typography,
	CardActions,
	CardContent,
	LinearProgress
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {},
	details: {
		display: 'flex'
	},
	avatar: {
		width: 100,
		height: 110,
		flexGrow: 0,
		flexShrink: 0,
		marginLeft: 'auto'
	},
	progress: {
		marginTop: theme.spacing(2)
	},
	uploadButton: {
		marginRight: theme.spacing(2)
	}
}))

const AccountProfile = props => {
	const { className, ...rest } = props

	const classes = useStyles()

	const user = {
		country: 'USA',
		name: 'Shen Zhi',
		timezone: 'GTM-7',
		city: 'Los Angeles',
		avatar: '/images/avatars/avatar_11.png'
	}

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<CardContent>
				<div className={classes.details}>
					<div>
						<Typography
							variant='h2'
							gutterBottom>
							John Doe
            			</Typography>

						<Typography
							variant='body1'
							color='textSecondary'
							className={classes.locationText}>
							{user.city}, {user.country}
						</Typography>

						<Typography
							variant='body1'
							color='textSecondary'
							className={classes.dateText}>
							{moment().format('hh:mm A')} ({user.timezone})
            			</Typography>
					</div>

					<Avatar
						src={user.avatar}
						className={classes.avatar} />
				</div>

				<div className={classes.progress}>
					<Typography variant='body1'>Profile Completeness: 70%</Typography>

					<LinearProgress
						value={70}
						variant='determinate' />
				</div>
			</CardContent>

			<Divider />

			<CardActions>
				<Button
					variant='text'
					color='primary'
					className={classes.uploadButton}>
					Upload picture
        		</Button>

				<Button variant='text'>Remove picture</Button>
			</CardActions>
		</Card>
	)
}

AccountProfile.propTypes = {
	className: PropTypes.string
}

export default AccountProfile