/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import WebLayout from './layouts/web/Main'
import MainLayout from './layouts/user/Main'
import AdminLayout from './layouts/admin/Main'
import RouteWithLayout from './components/RouteWithLayout'
import AuthRouteWithLayout from './components/AuthRouteWithLayout'
import AuthAdminRouteWithLayout from './components/AuthAdminRouteWithLayout'

import Terms from './views/web/terms/Terms'
import Policy from './views/web/policy/Policy'
import SignIn from './views/web/signIn/SignIn'
import SignUp from './views/web/signUp/SignUp'
import Landing from './views/web/landing/Landing'
import NotFound from './views/web/notFound/NotFound'

import MarketUser from './views/user/market/Market'
import AccountUser from './views/user/account/Account'
import SupportUser from './views/user/support/Support'
import DashboardUser from './views/user/dashboard/Dashboard'
import EducationUser from './views/user/education/Education'
import ViewSignalsUser from './views/user/viewSignals/ViewSignals'
import SubscriptionsUser from './views/user/subscriptions/Subscriptions'

import UsersAdmin from './views/admin/users/Users'
import LoginAdmin from './views/admin/signIn/SignIn'
import SocialAdmin from './views/admin/social/Social'
import MarketAdmin from './views/admin/market/Market'
import AccountAdmin from './views/admin/account/Account'
import SignalsAdmin from './views/admin/signals/Signals'
import SupportAdmin from './views/admin/support/Support'
import DashboardAdmin from './views/admin/dashboard/Dashboard'
import EducationAdmin from './views/admin/education/Education'
import SubscriptionsAdmin from './views/admin/subscriptions/Subscriptions'
import UserDashboardAdmin from './views/admin/userDashboard/UserDashboard'

const Routes = () => {
	return (
		<Switch>
			<RouteWithLayout
				exact
				path='/'
				layout={WebLayout}
				component={Landing} />

			<RouteWithLayout
				exact
				layout={WebLayout}
				path='/admin/sign-in'
				component={LoginAdmin} />

			<RouteWithLayout
				exact
				path='/sign-up'
				layout={WebLayout}
				component={SignUp} />

			<RouteWithLayout
				exact
				path='/sign-in'
				layout={WebLayout}
				component={SignIn} />

			<RouteWithLayout
				exact
				path='/terms'
				component={Terms}
				layout={WebLayout} />

			<RouteWithLayout
				exact
				path='/policy'
				layout={WebLayout}
				component={Policy} />

			<RouteWithLayout
				exact
				path='/not-found'
				layout={WebLayout}
				component={NotFound} />

			<AuthRouteWithLayout
				exact
				path='/dashboard'
				layout={MainLayout}
				component={DashboardUser} />

			{/* <AuthRouteWithLayout
				exact
				path='/education'
				layout={MainLayout}
				component={EducationUser} /> */}

			<AuthRouteWithLayout
				exact
				layout={MainLayout}
				path='/view-signals'
				component={ViewSignalsUser} />

			<AuthRouteWithLayout
				exact
				path='/account'
				layout={MainLayout}
				component={AccountUser} />

			<AuthRouteWithLayout
				exact
				path='/market'
				layout={MainLayout}
				component={MarketUser} />

			<AuthRouteWithLayout
				exact
				layout={MainLayout}
				path='/subscriptions'
				component={SubscriptionsUser} />

			<AuthRouteWithLayout
				exact
				path='/support'
				layout={MainLayout}
				component={SupportUser} />

			<Redirect
				exact
				from='/admin'
				to='/admin/dashboard' />

			<AuthAdminRouteWithLayout
				exact
				layout={AdminLayout}
				path='/admin/dashboard'
				component={DashboardAdmin} />

			<AuthAdminRouteWithLayout
				exact
				path='/admin/market'
				layout={AdminLayout}
				component={MarketAdmin} />

			<AuthAdminRouteWithLayout
				exact
				layout={AdminLayout}
				path='/admin/userDashboard'
				component={UserDashboardAdmin} />

			<AuthAdminRouteWithLayout
				exact
				layout={AdminLayout}
				path='/admin/signals'
				component={SignalsAdmin} />

			<AuthAdminRouteWithLayout
				exact
				layout={AdminLayout}
				path='/admin/subscriptions'
				component={SubscriptionsAdmin} />

			<AuthAdminRouteWithLayout
				exact
				layout={AdminLayout}
				path='/admin/support'
				component={SupportAdmin} />

			{/* <AuthAdminRouteWithLayout
				exact
				layout={AdminLayout}
				path='/admin/education'
				component={EducationAdmin} /> */}

			<AuthAdminRouteWithLayout
				exact
				layout={AdminLayout}
				path='/admin/account'
				component={AccountAdmin} />

			<AuthAdminRouteWithLayout
				exact
				path='/admin/social'
				layout={AdminLayout}
				component={SocialAdmin} />

			<AuthAdminRouteWithLayout
				exact
				path='/admin/users'
				layout={AdminLayout}
				component={UsersAdmin} />

			<Redirect to='/not-found' />
		</Switch>
	)
}

export default Routes