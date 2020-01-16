/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Card, CardHeader, CardContent, Divider, List, ListItemText, ListItemAvatar, ListItem, Avatar, colors, Dialog, DialogContent, CircularProgress } from '@material-ui/core'
import getInitials from 'helpers/getInitials'

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		maxHeight: window.innerHeight * 0.9
	},
	avatar: {
		marginRight: theme.spacing(2),
		backgroundColor: colors.blue[500]
	},
	content: {
		width: '100%',
		padding: '2%',
		overflow: 'auto',
		position: 'relative',
		maxHeight: window.innerHeight * 0.65,
		backgroundColor: theme.palette.background.paper
	}
}))

const GroupChatMembers = props => {
	const { className, users, profile, ...rest } = props

	const classes = useStyles()

	return (
		<Card
			{...rest}
			className={classes.root}>
			<CardHeader
				title='Online Members'
				subheader='You can see all members online now here' />

			<Divider />

			<CardContent>
				<List className={classes.content}>
					<ListItem>
						<ListItemAvatar>
							<Avatar
								src={profile.avatar}
								className={classes.avatar}>
								{getInitials(profile.fullName)}
							</Avatar>
						</ListItemAvatar>

						<ListItemText primary={profile.fullName} />
					</ListItem>

					<Divider variant='inset' component='li' />

					{users.map((user, i) => (
						<React.Fragment key={i}>
							<ListItem>
								<ListItemAvatar>
									<Avatar
										src={user.avatar}
										className={classes.avatar}>
										{getInitials(user.fullName)}
									</Avatar>
								</ListItemAvatar>

								<ListItemText primary={user.fullName} />
							</ListItem>

							<Divider variant='inset' component='li' />
						</React.Fragment>
					))}
				</List>
			</CardContent>
		</Card>
	)
}

GroupChatMembers.propTypes = {
	className: PropTypes.string
}

export default GroupChatMembers