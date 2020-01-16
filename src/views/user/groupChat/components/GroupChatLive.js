/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import PropTypes from 'prop-types'
import React, { useState } from 'react'
import SendIcon from '@material-ui/icons/Send'
import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, CardActions, TextField, InputAdornment, IconButton, Paper, useTheme, ListItem, List, ListItemText, ListItemAvatar, ListItemSecondaryAction, Avatar, colors, Chip } from '@material-ui/core'

import UpgradePlan from './UpgradePlan'
import getInitials from 'helpers/getInitials'

const useStyles = makeStyles(theme => ({
	root: {},
	paperUpgrade: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: window.innerHeight * 0.75,
		backgroundColor: theme.palette.background.default
	},
	paper: {
		width: '100%',
		height: window.innerHeight * 0.75,
		backgroundColor: theme.palette.background.default
	},
	content: {
		width: '100%',
		padding: '2%',
		overflow: 'auto',
		position: 'relative',
		maxHeight: window.innerHeight * 0.75
	},
	avatar: {
		marginRight: theme.spacing(2),
		backgroundColor: colors.blue[500]
	}
}))

const GroupChatLive = props => {
	const { className, isPaid, chats, profile, onSendMessage, ...rest } = props

	const theme = useTheme()
	const classes = useStyles()

	const userId = '1'

	const [messageState, setMessageState] = useState('')

	const sample = [
		{
			userId: '1',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Abdeen Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 1'
		},
		{
			isSystem: true,
			createdAt: new Date(),
			message: 'Testing System message'
		},
		{
			userId: '1',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Abdeen Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 2'
		},
		{
			userId: '2',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Lamese Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 3'
		},
		{
			userId: '2',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Lamese Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 4'
		},
		{
			userId: '2',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Lamese Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 5'
		},
		{
			userId: '2',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Lamese Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 6'
		},
		{
			isSystem: true,
			createdAt: new Date(),
			message: 'Testing System message'
		},
		{
			userId: '3',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Amro Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 7'
		},
		{
			userId: '3',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Amro Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 8'
		},
		{
			userId: '3',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Amro Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 7'
		},
		{
			userId: '1',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Abdeen Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 1'
		},
		{
			isSystem: true,
			createdAt: new Date(),
			message: 'Testing System message'
		},
		{
			userId: '1',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Abdeen Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 2'
		},
		{
			userId: '2',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Lamese Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 3'
		},
		{
			userId: '2',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Lamese Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 4'
		},
		{
			userId: '2',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Lamese Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 5'
		},
		{
			userId: '2',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Lamese Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 6'
		},
		{
			isSystem: true,
			createdAt: new Date(),
			message: 'Testing System message'
		},
		{
			userId: '3',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Amro Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 7'
		},
		{
			userId: '3',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Amro Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 8'
		},
		{
			userId: '3',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Amro Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 7'
		},
		{
			userId: '3',
			isSystem: false,
			createdAt: new Date(),
			fullName: 'Amro Mohamed',
			avatar: 'https://i.pravatar.cc/300',
			message: 'Hi All am just here testing 8'
		}
	]

	if (!isPaid)
		return (
			<Card
				{...rest}
				className={classes.root}>
				<CardContent>
					<Paper className={classes.paperUpgrade}>
						<UpgradePlan />
					</Paper>
				</CardContent>

				<CardActions>
					<TextField
						disabled
						fullWidth
						name='message'
						label='Message'
						margin='normal'
						variant='outlined'
						InputProps={{
							endAdornment: <InputAdornment position='end'>
								<IconButton
									disabled
									edge='end'
									color='primary'>
									<SendIcon />
								</IconButton>
							</InputAdornment>
						}} />
				</CardActions>
			</Card>
		)

	return (
		<Card
			{...rest}
			className={classes.root}>
			<CardContent>
				<Paper className={classes.paper}>
					<List className={classes.content}>
						{sample.map((chat, i) => (
							<React.Fragment key={i}>
								{chat.isSystem
									? <ListItem alignItems='center'>
										<ListItemText primary={chat.message}
											primaryTypographyProps={{ align: 'center', display: 'block', variant: 'subtitle2' }} />
									</ListItem>
									: <React.Fragment>
										{chat.userId === userId
											? <ListItem alignItems='center'>
												<ListItemText
													primary={<Chip color='primary' label={chat.message} />}
													primaryTypographyProps={{ align: 'right', display: 'block' }} />
											</ListItem>
											: <ListItem alignItems='center'>
												{i + 1 !== sample.length && sample[i + 1].userId === chat.userId
													? null
													: <ListItemAvatar>
														<Avatar
															src={chat.avatar}
															className={classes.avatar}>
															{getInitials(chat.fullName)}
														</Avatar>
													</ListItemAvatar>}

												<ListItemText
													primary={<Chip
														label={chat.message}
														color={chat.userId === userId ? 'primary' : 'default'} />}
													inset={i + 1 !== sample.length && sample[i + 1].userId === chat.userId ? true : false}
													secondary={i + 1 !== sample.length && sample[i + 1].userId === chat.userId ? null : chat.fullName} />
											</ListItem>}
									</React.Fragment>}
							</React.Fragment>
						))}
					</List>
				</Paper>
			</CardContent>

			<CardActions>
				<TextField
					multiline
					fullWidth
					name='message'
					label='Message'
					margin='normal'
					variant='outlined'
					value={messageState}
					onChange={event => setMessageState(event.target.value)}
					InputProps={{
						endAdornment: <InputAdornment position='end'>
							<IconButton
								edge='end'
								color='primary'
								disabled={messageState.length < 1}
								onClick={() => {
									onSendMessage(messageState)
									setMessageState('')
								}}>
								<SendIcon />
							</IconButton>
						</InputAdornment>
					}} />
			</CardActions>
		</Card >
	)
}

GroupChatLive.propTypes = {
	className: PropTypes.string
}

export default GroupChatLive