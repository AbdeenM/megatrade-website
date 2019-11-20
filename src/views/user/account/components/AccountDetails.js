/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
	Card,
	Grid,
	Button,
	Divider,
	TextField,
	CardHeader,
	CardActions,
	CardContent
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
	root: {}
}))

const AccountDetails = props => {
	const { className, ...rest } = props

	const classes = useStyles()

	const [values, setValues] = useState({
		country: 'Sudan',
		state: 'Khartoum',
		lastName: 'Mohamed',
		firstName: 'Abdeen',
		phone: '+249125570888',
		email: 'abdeen.mohamed@outlook.com'
	})

	const handleChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		})
	}

	const states = [
		{
			value: 'alabama',
			label: 'Alabama'
		},
		{
			value: 'new-york',
			label: 'New York'
		},
		{
			value: 'san-francisco',
			label: 'San Francisco'
		}
	]

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<form
				noValidate
				autoComplete='off'>
				<CardHeader
					title='Profile'
					subheader='The information can be edited' />

				<Divider />

				<CardContent>
					<Grid
						container
						spacing={3}>
						<Grid
							item
							md={6}
							xs={12}>
							<TextField
								required
								fullWidth
								margin='dense'
								name='firstName'
								label='First name'
								variant='outlined'
								onChange={handleChange}
								value={values.firstName}
								helperText='Please specify the first name' />
						</Grid>

						<Grid
							item
							md={6}
							xs={12}>
							<TextField
								required
								fullWidth
								margin='dense'
								name='lastName'
								label='Last name'
								variant='outlined'
								value={values.lastName}
								onChange={handleChange} />
						</Grid>

						<Grid
							item
							md={6}
							xs={12}>
							<TextField
								required
								fullWidth
								name='email'
								margin='dense'
								variant='outlined'
								value={values.email}
								label='Email Address'
								onChange={handleChange} />
						</Grid>

						<Grid
							item
							md={6}
							xs={12}>
							<TextField
								fullWidth
								name='phone'
								type='number'
								margin='dense'
								variant='outlined'
								value={values.phone}
								label='Phone Number'
								onChange={handleChange} />
						</Grid>

						<Grid
							item
							md={6}
							xs={12}>
							<TextField
								select
								required
								fullWidth
								name='state'
								margin='dense'
								variant='outlined'
								label='Select State'
								value={values.state}
								onChange={handleChange}
								SelectProps={{ native: true }}>
								{
									states.map(option => (
										<option
											key={option.value}
											value={option.value}>
											{option.label}
										</option>
									))}
							</TextField>
						</Grid>

						<Grid
							item
							md={6}
							xs={12}>
							<TextField
								required
								fullWidth
								name='country'
								margin='dense'
								label='Country'
								variant='outlined'
								value={values.country}
								onChange={handleChange} />
						</Grid>
					</Grid>

				</CardContent>

				<Divider />

				<CardActions>
					<Button
						color='primary'
						variant='contained'>
						Save details
          			</Button>
				</CardActions>
			</form>
		</Card>
	)
}

AccountDetails.propTypes = {
	className: PropTypes.string
}

export default AccountDetails