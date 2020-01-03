/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { Container } from '@material-ui/core'

import Parallax from './Parallax'
import useStyles from './feature-style'
import MainFeature from './MainFeature'
import MoreFeature from './MoreFeature'

const Feature = () => {
	const classes = useStyles()
	return (
		<div className={classes.featureWrap}>
			<Parallax />

			<Container fixed>
				<MainFeature />
				<MoreFeature />
			</Container>
		</div>
	)
}

export default Feature
