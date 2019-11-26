/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	},
	content: {
		paddingTop: 150,
		textAlign: 'center'
	},
	image: {
		width: 560,
		marginTop: 50,
		maxWidth: '100%',
		display: 'inline-block'
	}
}))

const Terms = () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Grid
				container
				spacing={4}
				justify='center'>
				<Grid
					item
					lg={6}
					xs={12}>
					<div className={classes.content}>
						<Typography variant='h1'>
							404: The page you are looking for isn’t here
            			</Typography>

						<Typography variant='subtitle2'>
							You either tried some shady route or you came here by mistake.
                            Whichever it is, try using the navigation
            			</Typography>

						<img
							alt='Under development'
							className={classes.image}
							src='/images/not_found.png' />
					</div>
				</Grid>
			</Grid>
		</div>
	)
}

export default Terms