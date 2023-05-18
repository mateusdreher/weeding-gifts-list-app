const BASE_URL = process.env.API_URL || 'http://localhost:3003';

export function listGifts() {
  return fetch(`${BASE_URL}/gifts/list`)
	.then((response) => {
		if (!response.ok) {
			throw new Error('Network response was not ok' + response.status, response.message);
		}

		return response.json();
	})
	.then((data) => data.data)
}

export function listGiftsByStatus(status) {
	  return fetch(`${BASE_URL}/gifts/status/${status}`)
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