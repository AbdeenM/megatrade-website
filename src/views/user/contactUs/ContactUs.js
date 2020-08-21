import React, { useState } from 'react'
import { useSnackbar } from 'notistack'
import SendIcon from '@material-ui/icons/Send'
import { Grid, Typography, Container, Button } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import useStyles from './form-style'
import { MiscellaneousApi } from 'config/Api'

const miscellaneousApi = new MiscellaneousApi()

const Contact = () => {
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()

	const [isSent, setIsSent] = useState(false)
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
		const questionResult = await miscellaneousApi.question({
			name: values.name,
			email: values.email,
			phone: values.phone,
			company: values.company,
			message: values.message
		})

		if (questionResult.error)
			return enqueueSnackbar(questionResult.message, { variant: 'error' })

		setIsSent(true)
		return enqueueSnackbar(questionResult.message, { variant: 'success' })
	}

	return (
		<div className={classes.formWrap}>
			<Typography variant='h3' align='center' gutterBottom>
				Got any Questions?
				</Typography>

			<Typography className={classes.desc}>
				Feel free to drop us a message anytime. (Keep an eye for your junk mail, your mailbox may send our reply there)
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
						<Button disabled={isSent || values.name.length < 1 || values.email.length < 1 || values.message.length < 1} onClick={handleSubmit} variant='outlined' color='primary' size='large'>
							{isSent ? 'Sent!' : 'Send'} <SendIcon className={classes.rightIcon} />
						</Button>
					</div>
				</ValidatorForm>
			</div>
		</div>
	)
}

export default Contact