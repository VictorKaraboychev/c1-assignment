import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { SxProps, Theme, Box } from '@mui/material'

export type DateFieldProps = {
	sx?: SxProps<Theme>,
	label?: string,
	defaultValue?: Date,
	value?: Date,
	errorHelper?: string,
	size?: 'small' | 'medium',
	helper?: string,
	debounceMS?: number,
	validator?: (text: Date) => boolean,
	onSubmit?: (date: Date) => void,
	onChange?: (date: Date) => void,
}

const DateField = (props: DateFieldProps) => {
	const [value, setValue] = useState(props.defaultValue)
	const [error, setError] = useState(false)
	const debounceRef = useRef<number>()

	const handleChange = (text: string | null) => {
		if (!text) return
		const date = new Date(Date.parse(text))
		setValue(date)

		if (debounceRef.current) clearTimeout(debounceRef.current)
		debounceRef.current = setTimeout(() => {
			if (!text) return
			const valid = props.validator?.(date) ?? true

			setError(!valid)

			if (valid) props.onSubmit?.(date)
		}, props.debounceMS ?? 200)
	}

	return (
		<Box
			component={'div'}
			sx={props.sx}
		>
			<LocalizationProvider
				dateAdapter={AdapterDateFns}
			>
				<DatePicker
					label={props.label ?? 'Date'}
					value={props.value ?? value}
					onChange={handleChange}
					renderInput={(params) =>
						<TextField
							{...params}
							size={props.size}
							error={error}
							helperText={props.helper || (error && props.errorHelper)}
							fullWidth={true}
						/>
					}
				/>
			</LocalizationProvider>
		</Box>
	)
}

export default DateField