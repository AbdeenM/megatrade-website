/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Container, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex'
	},
	cardWrapper: {
		zIndex: 1
	}
}))

const Disclaimer = () => {
	const classes = useStyles()

	return (
		<Container className={classes.container}>
			<Grid container>
				<Grid
					item
					md={12}
					xs={12}
					className={classes.cardWrapper}>
					<Typography
						gutterBottom
						variant='h5'>
						RISK DISCLAIMER:
                    </Typography>

					<Typography variant='body1'>
						Trading foreiegn exchange, commodities, crypto currencies, shares, bonds, indices carries high level of risk and may not suitable for every investor. Whole capital is at risk and entire amount of investment may be lost in short period of time.
                    </Typography>

					<Typography variant='body1'>
						Megatrade.world will not accept any liability for loss of capital, damage, loss of profit which may arise directly or indirectly from use of or reliance on Megatrade.world service/products. The possibility exists that loss could sustain to all or some of your initial investment.
                    </Typography>

					<Typography variant='body1'>
						Past performance displayed on Megatrade.world is not indicative of future results. No representation is being made that anyone is likely to achieve profits or losses similar to those shown on Megatrade.world before getting involved in trading you should carefully consider your objectives, risks, level of your experience. If you have any doubts you should seek advice from independent financial advisor.
                    </Typography>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Disclaimer 