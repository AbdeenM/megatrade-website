/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { Grid } from '@material-ui/core'
import React, { useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		position: 'relative',
		alignItems: 'center',
		color: theme.palette.common.white
	}
}))

const Banner = () => {
	const classes = useStyles()

	const video = useRef(null)

	useEffect(() => {
		const script = document.createElement('iframe')
		script.frameBorder = 0
		script.width = window.innerWidth / 2.3
		script.height = window.innerHeight / 2
		script.src = 'https://publish.animatron.io/9802025effe1f21c9ff7e411?c=0&w=1080&h=607&r=1&a=1'

		video.current.appendChild(script)

		setInterval(() => {
			script.src = 'https://publish.animatron.io/9802025effe1f21c9ff7e411?c=0&w=1080&h=607&r=1&a=1'
		}, 22000)
	})

	return (
		<section className={classes.root}>
			<Grid
				item
				lg={12}
				sm={12}
				xl={12}
				xs={12}>
				<div ref={video} />
			</Grid>
		</section>
	)
}

export default Banner