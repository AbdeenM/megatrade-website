/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Typography, Link } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(4)
	}
}))

const Footer = props => {
	const { className, ...rest } = props

	const classes = useStyles()

	return (
		<div
			{...rest}
			className={clsx(classes.root, className)}>
			<Typography variant='body1'>
				&copy{' '}
				<Link
					component='a'
					target='_blank'
					href='https://devias.io/'>
					Devias IO
					</Link>
				. 2019
			</Typography>

			<Typography variant='caption'>
				Created with love for the environment. By designers and developers who
				love to work together in offices!
			</Typography>
		</div>
	)
}

Footer.propTypes = {
	className: PropTypes.string
}

export default Footer