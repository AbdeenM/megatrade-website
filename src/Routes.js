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

import Login from './views/web/auth/Login'
import Terms from './views/web/terms/Terms'
import Policy from './views/web/policy/Policy'
import Register from './views/web/auth/Register'
import Landing from './views/web/landing/Landing'
import NotFound from './views/web/notFound/NotFound'
import ResetPassword from './views/web/resetPassword/ResetPassword'

import MarketUser from './views/user/market/Market'
import AccountUser from './views/user/account/Account'
import SupportUser from './views/user/support/Support'
import GroupChatUser from 'views/user/groupChat/GroupChat'
import ContactUsUser from './views/user/contactUs/ContactUs'
import DashboardUser from './views/user/dashboard/Dashboard'
//import EducationUser from './views/user/education/Education'
import ViewSignalsUser from './views/user/viewSignals/ViewSignals'
import SubscriptionsUser from './views/user/subscriptions/Subscriptions'

import LogsAdmin from './views/admin/logs/Logs'
import UsersAdmin from './views/admin/users/Users'
import LoginAdmin from './views/admin/signIn/SignIn'
import SocialAdmin from './views/admin/social/Social'
import MarketAdmin from './views/admin/market/Market'
import AccountAdmin from './views/admin/account/Account'
import SignalsAdmin from './views/admin/signals/Signals'
import SupportAdmin from './views/admin/support/Support'
import SponsorAdmin from './views/admin/sponsor/Sponsor'
import GroupChatAdmin from 'views/admin/groupChat/GroupChat'
import DashboardAdmin from './views/admin/dashboard/Dashboard'
import EducationAdmin from './views/admin/education/Education'
import QuestionsAdmin from './views/admin/questions/Questions'
import SubscriptionsAdmin from './views/admin/subscriptions/Subscriptions'
import UserDashboardAdmin from './views/admin/userDashboard/UserDashboard'

const Routes = props => {
	return (
		<Switch>
			<RouteWithLayout
				exact
				path='/'
				layout={WebLayout}
				component={() => (<Landing {...props} />)} />

			<RouteWithLayout
				layout={WebLayout}
				path='/reset/:token?'
				component={({ match }) => (<ResetPassword match={match} />)} />

			<RouteWithLayout
				exact
				layout={WebLayout}
				path='/admin/sign-in'
				component={() => (<LoginAdmin {...props} />)} />

			<RouteWithLayout
				exact
				path='/register'
				layout={WebLayout}
				component={() => (<Register {...props} />)} />

			<RouteWithLayout
				exact
				path='/login'
				layout={WebLayout}
				component={() => (<Login {...props} />)} />

			<RouteWithLayout
				exact
				path='/terms'
				layout={WebLayout}
				component={() => (<Terms {...props} />)} />

			<RouteWithLayout
				exact
				path='/policy'
				layout={WebLayout}
				component={() => (<Policy {...props} />)} />

			<RouteWithLayout
				exact
				path='/not-found'
				layout={WebLayout}
				component={() => (<NotFound {...props} />)} />

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
				component={() => (<AccountUser {...props} />)} />

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
				layout={MainLayout}
				path='/group-chat'
				component={GroupChatUser} />

			<AuthRouteWithLayout
				exact
				path='/support'
				layout={MainLayout}
				component={SupportUser} />

			<AuthRouteWithLayout
				exact
				path='/contact-us'
				layout={MainLayout}
				component={ContactUsUser} />

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
				layout={AdminLayout}
				path='/admin/market'
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

			<AuthAdminRouteWithLayout
				exact
				layout={AdminLayout}
				path='/admin/group-chat'
				component={GroupChatAdmin} />

			<AuthAdminRouteWithLayout
				exact
				layout={AdminLayout}
				path='/admin/education'
				component={EducationAdmin} />

			<AuthAdminRouteWithLayout
				exact
				layout={AdminLayout}
				path='/admin/account'
				component={() => (<AccountAdmin {...props} />)} />

			<AuthAdminRouteWithLayout
				exact
				layout={AdminLayout}
				path='/admin/social'
				component={SocialAdmin} />

			<AuthAdminRouteWithLayout
				exact
				layout={AdminLayout}
				path='/admin/sponsor'
				component={SponsorAdmin} />

			<AuthAdminRouteWithLayout
				exact
				layout={AdminLayout}
				path='/admin/questions'
				component={QuestionsAdmin} />

			<AuthAdminRouteWithLayout
				exact
				path='/admin/users'
				layout={AdminLayout}
				component={UsersAdmin} />

			<AuthAdminRouteWithLayout
				exact
				path='/admin/logs'
				layout={AdminLayout}
				component={LogsAdmin} />

			<Redirect to='/not-found' />
		</Switch>
	)
}

export default Routes