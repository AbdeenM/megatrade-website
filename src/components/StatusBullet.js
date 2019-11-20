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

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 0,
		flexShrink: 0,
		borderRadius: '50%',
		display: 'inline-block'
	},
	sm: {
		width: theme.spacing(1),
		height: theme.spacing(1)
	},
	md: {
		width: theme.spacing(2),
		height: theme.spacing(2)
	},
	lg: {
		width: theme.spacing(3),
		height: theme.spacing(3)
	},
	neutral: {
		backgroundColor: theme.palette.neutral
	},
	primary: {
		backgroundColor: theme.palette.primary.main
	},
	info: {
		backgroundColor: theme.palette.info.main
	},
	warning: {
		backgroundColor: theme.palette.warning.main
	},
	danger: {
		backgroundColor: theme.palette.error.main
	},
	success: {
		backgroundColor: theme.palette.success.main
	}
}))

const StatusBullet = props => {
	const { className, size, color, ...rest } = props

	const classes = useStyles()

	return (
		<span
			{...rest}
			className={clsx(
				{
					[classes.root]: true,
					[classes[size]]: size,
					[classes[color]]: color
				},
				className
			)} />
	)
}

StatusBullet.propTypes = {
	className: PropTypes.string,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	color: PropTypes.oneOf([
		'info',
		'danger',
		'neutral',
		'primary',
		'success',
		'warning'
	])
}

StatusBullet.defaultProps = {
	size: 'md',
	color: 'default'
}

export default StatusBullet