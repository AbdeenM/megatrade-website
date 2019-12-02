/* **************************************************************************
 * Copyright(C) Mega Trade Website, Inc - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Abdeen Mohamed < abdeen.mohamed@outlook.com>, September 2019
 ************************************************************************** */

import Palette from '../../../../../theme/Palette'

export const data = {
	labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug'],
	datasets: [
		{
			label: 'This year',
			backgroundColor: Palette.primary.main,
			data: [18, 5, 19, 27, 29, 19, 20]
		},
		{
			label: 'Last year',
			backgroundColor: Palette.neutral,
			data: [11, 20, 12, 29, 30, 25, 13]
		}
	]
}

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	animation: false,
	legend: { display: false },
	cornerRadius: 20,
	tooltips: {
		enabled: true,
		mode: 'index',
		intersect: false,
		borderWidth: 1,
		borderColor: Palette.divider,
		backgroundColor: Palette.white,
		titleFontColor: Palette.text.primary,
		bodyFontColor: Palette.text.secondary,
		footerFontColor: Palette.text.secondary
	},
	layout: { padding: 0 },
	scales: {
		xAxes: [
			{
				barThickness: 12,
				maxBarThickness: 10,
				barPercentage: 0.5,
				categoryPercentage: 0.5,
				ticks: {
					fontColor: Palette.text.secondary
				},
				gridLines: {
					display: false,
					drawBorder: false
				}
			}
		],
		yAxes: [
			{
				ticks: {
					fontColor: Palette.text.secondary,
					beginAtZero: true,
					min: 0
				},
				gridLines: {
					borderDash: [2],
					borderDashOffset: [2],
					color: Palette.divider,
					drawBorder: false,
					zeroLineBorderDash: [2],
					zeroLineBorderDashOffset: [2],
					zeroLineColor: Palette.divider
				}
			}
		]
	}
}