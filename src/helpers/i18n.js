import Typograf from 'typograf';
import en from "../locales/en";
import ru from "../locales/ru";

const tp = new Typograf({ locale: ['ru', 'en-US'] });

const LANGUAGES = {
	EN: 'en',
	RU: 'ru',
};

const TRANSLATORS = {
	[LANGUAGES.EN]: en,
	[LANGUAGES.RU]: ru,
};

const lang = (
	process.env.LANG &&
	Object.values(LANGUAGES).find(lang => lang.toLowerCase() === process.env.LANG.toLowerCase())
) || LANGUAGES.RU;

const translate = TRANSLATORS[lang];


export default function (text) {
	return tp.execute(translate(text) || TRANSLATORS[LANGUAGES.EN](text) || text);
};
