const BASE_URL = process.env.API_URL || 'http://localhost:3003';

export function listGifts() {
  return fetch(`${BASE_URL}/gifts/list`)
	.then((response) => response.json())
	.then((data) => data.data);
}

export function listGiftsByStatus(status) {
	  return fetch(`${BASE_URL}/gifts/list/status/${status}`)
	.then((response) => response.json())
	.then((data) => data.data);
}

export function selectGift(giftId, personWhoBoughtIt, byLink = false) {
	  return fetch(`${BASE_URL}/gifts/select`, {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({ giftId, personWhoBoughtIt, byLink }),
		}).then((response) => response.json());
}