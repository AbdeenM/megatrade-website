import moment from 'moment'
import PropTypes from 'prop-types'
import SendIcon from '@material-ui/icons/Send'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardActions, TextField, Typography, InputAdornment, IconButton, Paper, ListItem, List, ListItemText, ListItemAvatar, Avatar, colors, Chip } from '@material-ui/core'

import UpgradePlan from './UpgradePlan'
import getInitials from 'helpers/getInitials'

const useStyles = makeStyles(theme => ({
	root: {},
	paperUpgrade: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		height: window.innerHeight * 0.7,
		backgroundColor: theme.palette.background.default
	},
	paper: {
		width: '100%',
		height: window.innerHeight * 0.7,
		backgroundColor: theme.palette.background.default
	},
	content: {
		width: '100%',
		padding: '2%',
		overflow: 'auto',
		position: 'relative',
		maxHeight: window.innerHeight * 0.7
	},
	avatar: {
		marginRight: theme.spacing(2),
		backgroundColor: colors.blue[500]
	}
}))

const GroupChatLive = props => {
	const { className, isPaid, chats, profile, socket, ...rest } = props

	const classes = useStyles()

	const userId = localStorage.getItem('userId')

	const chatContainerRef = useRef()
	const [messageState, setMessageState] = useState('')

	useEffect(() => {
		if (isPaid)
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
	}, [chats])

	const onSendMessage = () => {
		socket.emit('message', {
			userId,
			message: messageState,
			avatar: profile.avatar,
			fullName: profile.fullName
		})

		setMessageState('')
	}

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
					<List
						ref={chatContainerRef}
						className={classes.content}>
						{chats.map((chat, i) => (
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
													primaryTypographyProps={{ align: 'right', display: 'block' }}
													primary={<Chip
														color='primary'
														label={<Typography variant='body1'>{chat.message}</Typography>} />} />
											</ListItem>
											: <ListItem alignItems='center'>
												{i + 1 !== chats.length && chats[i + 1].userId === chat.userId
													? null
													: <ListItemAvatar>
														<Avatar
															src={chat.avatar}
															className={classes.avatar}>
															{getInitials(chat.fullName)}
														</Avatar>
													</ListItemAvatar>}

												<ListItemText
													inset={i + 1 !== chats.length && chats[i + 1].userId === chat.userId ? true : false}
													secondary={i + 1 !== chats.length && chats[i + 1].userId === chat.userId ? null : (chat.isAdmin ? chat.fullName + `- Admin at ${moment(chat.createdAt).format('HH:mm DD/MM/YYYY')}` : `${chat.fullName} at ${moment(chat.createdAt).format('HH:mm DD/MM/YYYY')}`)}
													primary={<Chip
														label={<Typography variant='body1'>{chat.message}</Typography>}
														color={chat.userId === userId ? 'primary' : (chat.isAdmin ? 'secondary' : 'default')} />} />
											</ListItem>}
									</React.Fragment>}
							</React.Fragment>
						))}
					</List>
				</Paper>
			</CardContent>

			<CardActions>
				<TextField
					fullWidth
					name='message'
					label='Message'
					margin='normal'
					variant='outlined'
					value={messageState}
					onChange={event => setMessageState(event.target.value)}
					onKeyDown={event => { if (event.keyCode === 13 && messageState.length > 0) return onSendMessage() }}
					InputProps={{
						endAdornment: <InputAdornment position='end'>
							<IconButton
								edge='end'
								color='primary'
								onClick={onSendMessage}
								disabled={messageState.length < 1}>
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