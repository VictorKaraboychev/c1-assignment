import React from 'react'
import { SxProps, Theme, Typography } from '@mui/material'
import ValidatedTextField from './ValidatedTextField'
import { countDecimals, round } from '../../utility/math'

interface CurrencyFieldInterface {
	sx?: SxProps<Theme>,
	label?: string,
	defaultValue?: number,
	symbol?: string,
	suffix?: string,
	size?: 'small' | 'medium',
	helper?: string,
	onSubmit?: (value: number) => void,
	onChange?: (value: number) => void,
}

const CurrencyField = (props: CurrencyFieldInterface) => {

	const handleSubmit = (func?: (value: number) => void) => (text: string) => func?.(round(Number(text), 2))

	return (
		<ValidatedTextField
			sx={props.sx}
			label={props.label}
			helper={props.helper}
			defaultValue={props.defaultValue?.toFixed(2)}
			placeholder={'0.00'}
			size={props.size}
			startComponent={
				props.symbol && (
					<Typography
						color={'text.primary'}
					>
						{props.symbol}
					</Typography>
				)
			}
			endComponent={
				props.suffix && (
					<Typography
						color={'text.primary'}
					>
						{props.suffix}
					</Typography>
				)
			}
			processor={(value: string) => value && !isNaN(Number(value)) && countDecimals(Number(value)) > 2 ? Number(value).toFixed(2) : value}
			filter={(value) => /\d/g.test(value)}
			validator={(value) => !isNaN(Number(value)) && Number(value) >= 0}
			onSubmit={handleSubmit(props.onSubmit)}
			onChange={handleSubmit(props.onChange)}
		/>
	)
}

export default CurrencyField