/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { CssBaseline, Hidden, makeStyles, Container } from '@material-ui/core'

import FAQ from './components/FAQ'
import Header from './components/Header'
import Footer from './components/Footer'
import Counter from './components/Counter'
import Contact from './components/Contact'
import Feature from './components/Feature'
import PageNav from './components/PageNav'
import Pricing from './components/Pricing'
import Subscribe from './components/Subscribe'
import Testimonials from './components/Testimonials'
import AnimateSlider from './components/AnimateSlider'
import Disclaimer from './components/Disclaimer/Disclaimer'

const sectionMargin = margin => (margin * 15)
const useStyles = makeStyles(theme => ({
	mainWrap: {
		position: 'relative',
		width: '100%',
		overflow: 'hidden',
	},
	spaceBottom: {
		marginBottom: sectionMargin(theme.spacing())
	},
	spaceTop: {
		paddingTop: sectionMargin(theme.spacing())
	},
	containerWrap: {
		marginTop: theme.spacing(15)
	}
}))

const Landing = props => {
	const classes = useStyles()

	return (
		<Fragment>
			<CssBaseline />

			<section id='home' />

			<div className={classes.mainWrap}>
				<Header {...props} />

				<main className={classes.containerWrap}>
					<section>
						<Container fixed>
							<AnimateSlider />
						</Container>
					</section>

					<section className={clsx(classes.spaceTop, classes.spaceBottom)} id='feature'>
						<Container fixed>
							<Feature />
						</Container>
					</section>

					<section className={classes.pageSection}>
						<Counter />
					</section>

					<section className={classes.spaceTop} id='testimonials'>
						<Testimonials />
					</section>

					<section className={classes.spaceTop} id='pricing'>
						<Pricing />
					</section>

					<section className={classes.spaceTop} id='faq'>
						<FAQ />
					</section>

					<section className={classes.spaceTop} id='subscribe'>
						<Subscribe />
					</section>

					<section className={classes.spaceTop} id='contact'>
						<Contact />
					</section>

					<section className={classes.spaceTop} id='contact'>
						<Disclaimer />
					</section>
				</main>

				<Hidden mdDown>
					<PageNav />
				</Hidden>

				<Footer {...props} />
			</div>
		</Fragment>
	)
}

Landing.getInitialProps = async () => ({
	namespacesRequired: ['common']
})

Landing.propTypes = {
	onToggleDir: PropTypes.func.isRequired,
	onToggleDark: PropTypes.func.isRequired,
}

export default Landing