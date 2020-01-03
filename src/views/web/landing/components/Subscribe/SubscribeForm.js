/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React, { useState } from 'react'
import SendIcon from '@material-ui/icons/Send'
import { Paper, Typography, TextField, Button, Grid } from '@material-ui/core'

import useStyles from './subscribe-style'

export default function Pricing() {
	const classes = useStyles()
	const [values, setValues] = useState({
		email: '',
	})

	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value })
	}

	return (
		<div className={classes.subscribeWrap}>
			<Paper className={classes.paper}>
				<Typography align='center' variant='h5'>Subscribe Our Newsletter</Typography>

				<form className={classes.container} noValidate autoComplete='off'>
					<Grid container spacing={3} alignItems='flex-end'>
						<Grid item md={9} xs={12}>
							<TextField
								fullWidth
								margin='normal'
								label='Your Email'
								id='standard-email'
								value={values.email}
								className={classes.textField}
								onChange={handleChange('email')} />
						</Grid>

						<Grid item md={3} xs={12}>
							<Button variant='contained' color='primary' className={classes.button}>
								Send <SendIcon className={classes.rightIcon} />
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</div>
	)
}
