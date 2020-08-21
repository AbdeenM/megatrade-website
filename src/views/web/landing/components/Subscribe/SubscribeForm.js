import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import SendIcon from '@material-ui/icons/Send'
import { Paper, Typography, TextField, Button, Grid } from '@material-ui/core'

import useStyles from './subscribe-style'
import { MiscellaneousApi } from 'config/Api'

const miscellaneousApi = new MiscellaneousApi()

const Pricing = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const [values, setValues] = useState({
		email: '',
	})

	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value })
	}

	const onSubscribePress = async () => {
		const subscribeResult = await miscellaneousApi.newsLetter({ email: values.email })
		if (subscribeResult.error)
			enqueueSnackbar(subscribeResult.message, { variant: 'error' })
		else
			enqueueSnackbar(subscribeResult.message, { variant: 'success' })
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
							<Button onClick={onSubscribePress} variant='contained' color='primary' className={classes.button}>
								Send <SendIcon className={classes.rightIcon} />
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</div>
	)
}

export default Pricing