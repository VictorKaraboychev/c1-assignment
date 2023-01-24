import { RecoilState } from 'recoil'

export type CustomAtom<T> = {
	state: RecoilState<T>
	initial: T
}

export type FirestoreAtom<T> = {
	state: RecoilState<T | undefined>
	path: string
}