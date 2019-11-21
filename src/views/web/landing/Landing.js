/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Banner from './components/banner/Banner'
import Features from './components/features/Features'

const Landing = props => {
	return (
		<React.Fragment>
			<Banner />

			<Features />
		</React.Fragment>
	)
}

Landing.propTypes = {
	history: PropTypes.object
}

export default withRouter(Landing)