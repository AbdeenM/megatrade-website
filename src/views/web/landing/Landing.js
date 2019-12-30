/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import PropTypes from 'prop-types'

import FAQ from './components/faq/FAQ'
import Banner from './components/banner/Banner'
import Offers from './components/offers/Offers'
import Footer from './components/footer/Footer'
import Pricing from './components/pricing/Pricing'
import Features from './components/features/Features'
import Disclaimer from './components/disclaimer/Disclaimer'

const Landing = () => {
	return (
		<section>
			<Banner />

			<Features />

			<Pricing />

			<FAQ />

			<Offers />

			<Disclaimer />

			<Footer />
		</section>
	)
}

Landing.propTypes = {
	history: PropTypes.object
}

export default Landing