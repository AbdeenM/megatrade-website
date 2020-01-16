/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import io from 'socket.io-client'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { Grid, Dialog, CircularProgress, DialogContent, Hidden } from '@material-ui/core'

import { UserApi } from 'config/Api'
import Constants from 'config/Constants'
import GroupChatLive from './components/GroupChatLive'
import GroupChatMembers from './components/GroupChatMembers'

const userApi = new UserApi()

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3)
	},
	content: {
		marginTop: 20,
		textAlign: 'center'
	},
	contentInner: {
		marginTop: 20
	},
	image: {
		width: 560,
		marginTop: 50,
		maxWidth: '100%',
		display: 'inline-block'
	}
}))

const GroupChat = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	let socket
	const userId = localStorage.getItem('userId')

	const [isPaid, setIsPaid] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [availableUsersState, setAvailableUsersState] = useState([])
	const [groupChatHistoryState, setGroupChatHistoryState] = useState([])
	const [profileState, setProfileState] = useState({
		avatar: '',
		fullName: ''
	})

	useEffect(() => { fetchProfileDetails() }, [])

	const fetchProfileDetails = async () => {
		const fetchAccountResult = await userApi.fetchAccount({ userId })

		if (fetchAccountResult.error) {
			setIsLoading(false)
			return enqueueSnackbar(fetchAccountResult.message, { variant: 'error' })
		}

		setProfileState(profileState => ({
			...profileState,
			avatar: fetchAccountResult.data.avatar || '',
			fullName: fetchAccountResult.data.firstName + ' ' + fetchAccountResult.data.lastName || ''
		}))

		if (fetchAccountResult.data.membership !== 'Free Membership')
			setIsPaid(true)

		setIsLoading(false)
	}

	useEffect(() => {
		if (isPaid) {
			socket = io.connect(`${Constants.SERVER_URL}/chat-group`)

			socket.emit('sysConnected', {
				id: userId,
				fullName: profileState.fullName
			})

			socket.on('sysMessage', data => {
				setGroupChatHistoryState(groupChatHistoryState => ([...groupChatHistoryState, data]))
			})
		}
	}, [isPaid])

	const onSendMessage = message => {

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
		<div className={classes.root}>
			<Grid
				container
				spacing={4}
				justify='center'>
				<Hidden mdDown>
					<Grid
						item
						lg={3}
						xl={3}
						md={12}
						xs={12}>
						<GroupChatMembers
							isPaid={isPaid}
							profile={profileState}
							users={availableUsersState} />
					</Grid>
				</Hidden>

				<Grid
					item
					lg={9}
					xl={9}
					md={12}
					xs={12}>
					<GroupChatLive
						isPaid={isPaid}
						profile={profileState}
						chats={groupChatHistoryState}
						onSendMessage={onSendMessage} />
				</Grid>
			</Grid>
		</div>
	)
}

export default GroupChat