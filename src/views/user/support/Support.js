import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import SupportLive from './components/SupportLive'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3)
	}
}))

const Support = () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Grid
				item
				lg={12}
				xl={12}
				md={12}
				xs={12}>
				<SupportLive
				//socket={socket}
				//isPaid={isPaid}
				//profile={profileState}
				//chats={groupChatHistoryState}
				/>
			</Grid>
		</div>
	)
}

export default Support