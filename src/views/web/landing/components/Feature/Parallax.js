/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import clsx from 'clsx'
import React from 'react'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'

import useStyles from './feature-style'

export default function ParallaxDeco() {
	const classes = useStyles()
	return (
		<div className={classes.parallaxWrap}>
			<ParallaxProvider>
				<div className={classes.bannerParallaxWrap}>
					<Parallax
						y={[-40, 40]}
						tagOuter='figure'>
						<svg
							fill='#cccccc'
							width={845}
							height={1099}
							className={
								clsx(
									classes.parallaxVertical,
									classes.parallaxDot
								)
							}>
							<use xlinkHref='/images/decoration/dot-deco.svg#dot' />
						</svg>
					</Parallax>

					<Parallax
						y={[-50, 50]}
						tagOuter='figure'>
						<svg
							fill='#cccccc'
							width={902}
							height={1042}
							className={
								clsx(
									classes.parallaxVertical,
									classes.parallaxTriangle
								)
							}>
							<use xlinkHref='/images/decoration/triangle-deco.svg#triangle' />
						</svg>
					</Parallax>

					<Parallax
						y={[-50, 30]}
						tagOuter='figure'>
						<svg
							fill='#cccccc'
							width={600}
							height={570}
							className={
								clsx(
									classes.parallaxVertical,
									classes.parallaxCircle
								)
							}>
							<use xlinkHref='/images/decoration/circle-deco.svg#circle' />
						</svg>
					</Parallax>
				</div>
			</ParallaxProvider>
		</div>
	)
}