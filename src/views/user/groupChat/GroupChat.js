/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import IO from 'socket.io-client'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { Grid, Dialog, CircularProgress, DialogContent } from '@material-ui/core'

import { UserApi } from 'config/Api'
import Constants from 'config/Constants'

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

	const userId = localStorage.getItem('userId')

	const [isLoading, setIsLoading] = useState(true)
	const [profileState, setProfileState] = useState({
		avatar: '',
		fullName: '',
		membership: '',
		chatRoomName: 'Group Chat'
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
			membership: fetchAccountResult.data.membership || '',
			fullName: fetchAccountResult.data.firstName + ' ' + fetchAccountResult.data.firstName || ''
		}))

		setIsLoading(false)
	}

	const socket = IO.connect(Constants.SERVER_URL)

	const registerHandler = onMessageRecieved => socket.on('message', onMessageRecieved)

	const unRegisterHandler = () => socket.off('message')

	const register = (name, callback) => socket.emit('register', name, callback)

	const join = (chatRoomName, callback) => socket.emit('join', chatRoomName, callback)

	const leave = (chatRoomName, callback) => socket.emit('leave', chatRoomName, callback)

	const message = (chatRoomName, msg, callback) => socket.emit('message', {
		chatRoomName,
		message: msg
	}, callback)

	const getAvailableUsers = callback => socket.emit('availableUsers', null, callback)

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
				<Grid
					item
					lg={12}
					xs={12}>

				</Grid>
			</Grid>
		</div>
	)
}

export default GroupChat