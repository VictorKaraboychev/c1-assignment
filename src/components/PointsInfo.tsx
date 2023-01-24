import React from 'react'
import { Box, SxProps, Theme } from '@mui/material'
import useGlobalState from '../state/state'
import { getPoints } from '../utility/transaction'
import Typography from '@mui/material/Typography/Typography'
import Chip from '@mui/material/Chip/Chip'
import { contrast, stringToColor } from '../utility/color'

export type PointsInfoProps = {
	sx?: SxProps<Theme>,
}

const PointsInfo = (props: PointsInfoProps) => {
	const { value: TRANSACTIONS } = useGlobalState.transactions()

	const { points: totalPoints, promotions } = getPoints(TRANSACTIONS)

	return (
		<Box
			sx={props.sx}
		>
			<Typography
				sx={{
					mb: 2,
				}}
				variant={'h6'}
				color={'text.primary'}
			>
				Maximum Total Points: {totalPoints}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				{Object.entries(promotions).map(([key, value]) => {
					const color = stringToColor(`430${key}78`)

					return (
						<Chip
							key={key}
							sx={{
								mr: 1,
								color: contrast(color),
								backgroundColor: color,
								fontWeight: 'bold',
							}}
							label={`Promotion ${key}: ×${value}`}
						/>
					)
				})}
			</Box>
		</Box>
	)
}

export default PointsInfo