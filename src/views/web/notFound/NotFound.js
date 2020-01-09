/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { Button, Grid, Container, Typography } from '@material-ui/core'

import useStyles from './notFound-style'

const NotFound = () => {
	const classes = useStyles()

	return (
		<div className={classes.errorWrap}>
			<Container maxWidth='md'>
				<Grid container>
					<Grid item md={5} xs={12}>
						<div className={classes.flex}>
							<div className={classes.deco}>
								<img
									alt='logo'
									src='/images/sidebar-logo.png' />

								<Typography variant='h3'>
									404
								</Typography>
							</div>
						</div>
					</Grid>

					<Grid item md={7} xs={12}>
						<div className={classes.text}>
							<Typography variant='h4'>This page could not be found.</Typography>

							<Typography>
								You can either stay and chill here, or go back to the beginning.
							</Typography>

							<Button variant='outlined' color='primary' href='/' size='large' className={classes.button}>
								Back Home
							</Button>
						</div>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default NotFound
