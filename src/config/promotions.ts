
// Promotions 3 and 5 are excluded because they are not advantageous in any situations due to them being out competed by promotions 6 and 7.
export const PROMOTIONS = [
	{
		id: 1,
		merchants: [
			{
				merchant_code: 'sportchek',
				amount_cents: 7500,
			},
			{
				merchant_code: 'tim_hortons',
				amount_cents: 2500,
			},
			{
				merchant_code: 'subway',
				amount_cents: 2500,
			},
		],
		points: 500,
	},
	{
		id: 2,
		merchants: [
			{
				merchant_code: 'sportchek',
				amount_cents: 7500,
			},
			{
				merchant_code: 'tim_hortons',
				amount_cents: 2500,
			},
		],
		points: 300,
	},
	{
		id: 4,
		merchants: [
			{
				merchant_code: 'sportchek',
				amount_cents: 2500,
			},
			{
				merchant_code: 'tim_hortons',
				amount_cents: 1000,
			},
			{
				merchant_code: 'subway',
				amount_cents: 1000,
			},
		],
		points: 150,
	},
	{
		id: 6,
		merchants: [
			{
				merchant_code: 'sportchek',
				amount_cents: 2000,
			},
		],
		points: 75,
	},
]