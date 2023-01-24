import React from 'react'
import { Box, SxProps, Theme } from '@mui/material'
import useGlobalState from '../state/state'
import { DataGrid } from '@mui/x-data-grid'
import { GridColDef, GridSelectionModel, GridValueFormatterParams } from '@mui/x-data-grid/models'
import { fCurrency, fDate } from '../utility/format'

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 90,
		valueFormatter: (params: GridValueFormatterParams<string>) => params.value + 1,
	},
	{
		field: 'merchant_code',
		headerName: 'Merchant',
		width: 250,
		flex: 1,
		valueFormatter: (params: GridValueFormatterParams<string>) => params.value.replaceAll('_', ' ').toUpperCase(),
	},
	{
		field: 'date',
		headerName: 'Date',
		width: 250,
		valueGetter: (params: GridValueFormatterParams<string>) => new Date(params.value).getTime(),
		valueFormatter: (params: GridValueFormatterParams<string>) => fDate(new Date(params.value)),
	},
	{
		field: 'amount_cents',
		headerName: 'Amount ($)',
		width: 150,
		valueFormatter: (params: GridValueFormatterParams<number>) => fCurrency(params.value / 100),
	}
]

export type TransactionListProps = {
	sx?: SxProps<Theme>,
	selections?: GridSelectionModel,
	onSelect?: (ids: GridSelectionModel) => void,
}

const TransactionList = (props: TransactionListProps) => {
	const { value: TRANSACTIONS } = useGlobalState.transactions()


	const rows = TRANSACTIONS.map((transaction, i) => ({
		id: i,
		merchant_code: transaction.merchant_code,
		date: transaction.date,
		amount_cents: transaction.amount_cents,
	})).sort((a, b) => (
		b.id - a.id
	))

	return (
		<Box
			sx={props.sx}
		>
			<DataGrid
				sx={{
					minHeight: '100%',
				}}
				rows={rows}
				columns={columns}
				checkboxSelection={true}
				hideFooter={true}
				selectionModel={props.selections}
				onSelectionModelChange={props.onSelect}
			/>
		</Box>
	)
}

export default TransactionList