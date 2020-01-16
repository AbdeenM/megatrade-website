/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(1)
	}
}))

const Footer = props => {
	const { className, ...rest } = props

	const classes = useStyles()

	return (
		<div
			{...rest}
			className={clsx(classes.root, className)}>
			<Typography variant='caption'>© 2020 – Mega Trade, All rights reserved.</Typography>
		</div>
	)
}

Footer.propTypes = {
	className: PropTypes.string
}

export default Footer