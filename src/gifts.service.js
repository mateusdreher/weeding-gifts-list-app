const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3003';
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

export function selectGift(giftId, personWhoBoughtIt, byLink = false, otherInfos, email) {
	  return fetch(`${BASE_URL}/gifts/select`, {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({ giftId, personWhoBoughtIt, byLink, otherInfos, email }),
		}).then((response) => response.json());
}

export function getIpInfo() {
		return fetch('http://ip-api.com/json', {
			method: 'GET',
			headers: {
			'Content-Type': 'application/json',
			},
		})
		.then((response) => response.json())
		.then((data) => {
			return data;

			// return fetch(`https://ipapi.co/${ip}/json/`, {
			// 	method: 'GET',
			// 	headers: {
			// 	'Content-Type': 'application/json',
			// 	},
			// }).then((response) => response.json());
		})
		.catch((error) => {
			console.log('Error:', error);
		})
}
