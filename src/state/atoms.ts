import { PaletteMode } from '@mui/material'
import { atom } from 'recoil'
import { CustomAtom } from '../types/state'
import { TransactionItemType } from '../types/transaction'
import { TEST_TRANSACTIONS } from '../utility/transaction'

export const customAtom = <T>(label: string, initial: T, mutability?: boolean): CustomAtom<T> => {
	return {
		state: atom({
			key: label,
			default: initial,
			dangerouslyAllowMutability: mutability || false
		}),
		initial
	}
}

const atoms = {
	theme: customAtom<PaletteMode | 'system'>('theme', 'system'),
	transactions: customAtom<TransactionItemType[]>('transactions', TEST_TRANSACTIONS),
}

export default atoms