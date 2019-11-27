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
	Button,
	Divider,
	TextField,
	CardHeader,
	CardContent,
	CardActions
} from '@material-ui/core'

const useStyles = makeStyles(() => ({
	root: {}
}))

const Password = props => {
	const { className, ...rest } = props

	const classes = useStyles()

	const [values, setValues] = useState({
		confirm: '',
		password: ''
	})

	const onChange = event => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		})
	}

	return (
		<Card
			{...rest}
			className={clsx(classes.root, className)}>
			<form>
				<CardHeader
					title='Password'
					subheader='Update password' />

				<Divider />

				<CardContent>
					<TextField
						fullWidth
						type='password'
						name='password'
						label='Password'
						variant='outlined'
						value={values.password}
						onChange={onChange} />

					<TextField
						fullWidth
						name='confirm'
						type='password'
						variant='outlined'
						value={values.confirm}
						onChange={onChange}
						label='Confirm password'
						style={{ marginTop: '1rem' }} />
				</CardContent>

				<Divider />

				<CardActions>
					<Button
						color='primary'
						variant='outlined'>
						Update
          			</Button>
				</CardActions>
			</form>
		</Card>
	)
}

Password.propTypes = {
	className: PropTypes.string
}

export default Password