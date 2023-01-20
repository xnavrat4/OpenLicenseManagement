import moment from 'moment';

const getReadableTime = (dateString: string): string => {
	const date = moment(dateString);
	const now = moment();

	const diff = moment.duration(now.diff(date)).asSeconds();

	if (diff < 60) {
		return `${Math.floor(diff)} seconds`;
	}

	const mins = Math.floor(diff / 60);
	if (mins < 60) {
		return `${mins} minutes`;
	}

	const hours = Math.floor(mins / 60);
	if (hours < 24) {
		return `${hours} hours`;
	}

	const days = Math.floor(hours / 24);
	if (days < 30) {
		return `${days} days`;
	}

	const months = Math.floor(days / 30);
	if (months < 12) {
		return `${months} months`;
	}

	return `${Math.floor(months / 12)} years`;
};

export default getReadableTime;
