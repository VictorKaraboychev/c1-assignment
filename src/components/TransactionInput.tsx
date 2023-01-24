import React, { useState } from 'react'
import { Box, SxProps, Theme } from '@mui/material'
import DateField from './common/DateField'
import Button from '@mui/material/Button'
import ValidatedTextField from './common/ValidatedTextField'
import CurrencyField from './common/CurrencyField'
import useGlobalState from '../state/state'
import { TransactionItemType } from '../types/transaction'
import { GridSelectionModel } from '@mui/x-data-grid'

export type TransactionInputProps = {
	sx?: SxProps<Theme>,
	selections?: GridSelectionModel,
	onSelect?: (ids: GridSelectionModel) => void,
}

const TransactionInput = (props: TransactionInputProps) => {
	const { value: TRANSACTIONS, set: setTransactions } = useGlobalState.transactions()

	const [merchant, setMerchant] = useState<string>('')
	const [date, setDate] = useState<Date>(new Date())
	const [amountCents, setAmountCents] = useState<number>(0)

	const canAdd = merchant && date && amountCents > 0

	const handleAdd = () => {
		if (!canAdd) return

		setTransactions([
			...TRANSACTIONS,
			{
				merchant_code: merchant.toLowerCase().replaceAll(' ', '_'),
				date: date!.toISOString(),
				amount_cents: amountCents,
			},
		])
	}

	const handleRemove = () => {
		if (!props.selections) return

		const newTransactions: TransactionItemType[] = []

		console.log(props.selections)

		TRANSACTIONS.forEach((transaction, i) => {
			if (!props.selections?.includes(i + 1)) {
				newTransactions.push(transaction)
			}
		})

		setTransactions(newTransactions)
		props.onSelect?.([])
	}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				...props.sx,
			}}
		>
			<ValidatedTextField
				sx={{
					width: 150,
					mr: 2,
				}}
				label={'Transaction ID'}
				value={(TRANSACTIONS.length + 1).toString()}
				size={'small'}
				disabled={true}
			/>
			<ValidatedTextField
				sx={{
					flex: 1,
					mr: 2,
				}}
				label={'Merchant'}
				placeholder={'SportChek'}
				size={'small'}
				onSubmit={(value) => setMerchant(value)}
			/>
			<DateField
				sx={{
					width: 200,
					mr: 2,
				}}
				size={'small'}
				onSubmit={(value) => setDate(value)}
			/>
			<CurrencyField
				sx={{
					width: 200,
					mr: 4,
				}}
				size={'small'}
				label={'Amount'}
				symbol={'$'}
				suffix={'USD'}
				onSubmit={(value) => setAmountCents(Math.floor(value * 100))}
			/>
			<Button
				sx={{
					width: 100,
					mr: 2,
				}}
				variant={'contained'}
				size={'large'}
				disabled={!canAdd}
				onClick={handleAdd}
			>
				Add
			</Button>
			<Button
				sx={{
					width: 100,
				}}
				variant={'contained'}
				size={'large'}
				color={'error'}
				disabled={props.selections?.length === 0}
				onClick={handleRemove}
			>
				Remove
			</Button>
		</Box>
	)
}

export default TransactionInput