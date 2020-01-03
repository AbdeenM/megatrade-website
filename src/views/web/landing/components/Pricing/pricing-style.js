/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	pricingWrap: {
		marginTop: theme.spacing(5)
	},
	cardHeader: {
		backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[200],
	},
	cardPricing: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'baseline',
		marginBottom: theme.spacing(2),
	}
}))

export default useStyles
