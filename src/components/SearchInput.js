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
import { Paper, Input } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
	root: {
		flexBasis: 420,
		display: 'flex',
		borderRadius: '4px',
		alignItems: 'center',
		padding: theme.spacing(1)
	},
	icon: {
		marginRight: theme.spacing(1),
		color: theme.palette.text.secondary
	},
	input: {
		flexGrow: 1,
		fontSize: '14px',
		lineHeight: '16px',
		letterSpacing: '-0.05px'
	}
}))

const SearchInput = props => {
	const { className, onChange, style, ...rest } = props

	const classes = useStyles()

	return (
		<Paper
			{...rest}
			style={style}
			className={clsx(classes.root, className)}>
			<SearchIcon className={classes.icon} />

			<Input
				{...rest}
				disableUnderline
				onChange={onChange}
				className={classes.input} />
		</Paper>
	)
}

SearchInput.propTypes = {
	style: PropTypes.object,
	onChange: PropTypes.func,
	className: PropTypes.string
}

export default SearchInput