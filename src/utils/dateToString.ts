import { getLang } from "./getLang";

const dateFormat = new Intl.DateTimeFormat(getLang(), {
	hour: "2-digit",
	minute: "2-digit",
	year: "numeric",
	month: "long",
	day: "numeric",
	hour12: false,
});

export const dateToString = (date: Date) => {
	return dateFormat.format(new Date(date));
};
