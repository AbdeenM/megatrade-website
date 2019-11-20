/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import validate from 'validate.js'
import { Chart } from 'react-chartjs-2'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { ThemeProvider } from '@material-ui/styles'

import theme from './theme'
import Routes from './Routes'
import './assets/scss/index.scss'
import chartjs from './helpers/chartjs'
import validators from './common/validators'
import 'react-perfect-scrollbar/dist/css/styles.css'

const browserHistory = createBrowserHistory()

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
	draw: chartjs.draw
})

validate.validators = {
	...validate.validators,
	...validators
}

export default class App extends React.Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<Router history={browserHistory}>
					<Routes />
				</Router>
			</ThemeProvider>
		)
	}
}