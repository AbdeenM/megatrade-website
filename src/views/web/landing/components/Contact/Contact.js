/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import SendIcon from '@material-ui/icons/Send'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Grid, Snackbar, Typography, Container, Button } from '@material-ui/core'

import useStyles from './form-style'

const Contact = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const [values, setValues] = useState({
		name: '',
		email: '',
		phone: '',
		company: '',
		message: ''
	})

	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value })
	}

	const handleSubmit = async () => {
		enqueueSnackbar('Thank you for the message, we will get back to you shortly', { variant: 'success' })
	}

	return (
		<div className={classes.formWrap}>
			<Container maxWidth='md'>
				<Typography variant='h3' align='center' gutterBottom>
					Got any Questions?
				</Typography>

				<Typography className={classes.desc}>
					Feel free to drop us a message anytime
				</Typography>

				<div className={classes.form}>
					<ValidatorForm
						onSubmit={handleSubmit}
						onError={errors => console.log(errors)}>
						<Grid container spacing={6}>
							<Grid item sm={6} xs={12}>
								<TextValidator
									className={classes.input}
									label='Name'
									onChange={handleChange('name')}
									name='Name'
									value={values.name}
									validators={['required']}
									errorMessages={['this field is required']} />
							</Grid>

							<Grid item sm={6} xs={12}>
								<TextValidator
									className={classes.input}
									label='Email'
									onChange={handleChange('email')}
									name='Email'
									value={values.email}
									validators={['required', 'isEmail']}
									errorMessages={['this field is required', 'email is not valid']} />
							</Grid>

							<Grid item sm={6} xs={12}>
								<TextValidator
									className={classes.input}
									label='Phone Number'
									onChange={handleChange('phone')}
									name='Phone'
									value={values.phone} />
							</Grid>

							<Grid item sm={6} xs={12}>
								<TextValidator
									className={classes.input}
									label='Company'
									onChange={handleChange('company')}
									name='Company'
									value={values.company}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextValidator
									multiline
									rows='6'
									className={classes.input}
									label='Message'
									onChange={handleChange('message')}
									name='Message'
									value={values.message} />
							</Grid>
						</Grid>

						<div className={classes.btnArea}>
							<Button onClick={handleSubmit} variant='outlined' type='submit' color='primary' size='large'>
								Send <SendIcon className={classes.rightIcon} />
							</Button>
						</div>
					</ValidatorForm>
				</div>
			</Container>
		</div>
	)
}

export default Contact
