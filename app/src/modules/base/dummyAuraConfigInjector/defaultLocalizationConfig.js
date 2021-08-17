// default implementation of localization service for en-US locale. This covers the current usage of the localizationService in the code base.
// This should be removed when the framework team moves auraLocalizationService to a separate module
import {
    isValidISOTimeString,
    isValidISODateTimeString,
    removeTimeZoneSuffix,
    STANDARD_TIME_FORMAT,
    STANDARD_DATE_FORMAT,
    TIME_SEPARATOR,
} from './iso8601Utils/iso8601Utils';
import Duration from './defaultDurationConfig';
import mediumDateTimeFormat from '@salesforce/i18n/dateTime.mediumDateTimeFormat';
import shortDateFormat from '@salesforce/i18n/dateTime.shortDateFormat';
import mediumDateFormat from '@salesforce/i18n/dateTime.mediumDateFormat';
import longDateFormat from '@salesforce/i18n/dateTime.longDateFormat';
import shortTimeFormat from '@salesforce/i18n/dateTime.shortTimeFormat';
import mediumTimeFormat from '@salesforce/i18n/dateTime.mediumTimeFormat';
import locale from '@salesforce/i18n/locale';
import timeZone from '@salesforce/i18n/timeZone';
import { format as formatFns, parse as parseFns } from 'date-fns';
import { getTimezoneOffset } from 'date-fns-tz';
const DATE_FORMAT = {
    short: shortDateFormat,
    medium: mediumDateFormat,
    long: longDateFormat,
};
const TIME_FORMAT = {
    short: shortTimeFormat,
    medium: mediumTimeFormat,
    long: mediumTimeFormat,
};

// Only works with dates and iso strings
// formats the date object by ignoring the timezone offset
// e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
// formatDate(date, 'YYYY-MM-DD') -> 2019-03-11
function formatDate(value, format) {
    let isUTC = false;
    let dateString = value;
    if (typeof value === 'string') {
        dateString = value.split(TIME_SEPARATOR)[0];
        isUTC = true;
    }
    return formatDateInternal(dateString, format, isUTC);
}

// Only works with date objects.
// formats the date object according to UTC.
// e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
// formatDateUTC(date, 'YYYY-MM-DD') -> 2019-03-10
function formatDateUTC(value, format) {
    return formatDateInternal(value, format, true);
}

// Only works with a date object
function formatTime(date, format) {
    if (!isDateObject(date)) {
        return new Date('');
    }

    switch (format) {
        case STANDARD_TIME_FORMAT:
            // 16:12:32.000
            return formatFns(date, STANDARD_TIME_FORMAT);
        case TIME_FORMAT.short:
            return formatFns(date, shortTimeFormat)
        case TIME_FORMAT.medium:
        case TIME_FORMAT.long:
        default:
            return formatFns(date, mediumTimeFormat);
    }
}

// Only works with a date object
// formats the date object according to UTC.
// e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
// formatDateTimeUTC(date) -> 2019-03-10  1:00:00 PM
function formatDateTimeUTC(value) {
    if (!isDateObject(value)) {
        return new Date('');
    }
    const date = new Date(value.getTime());
    return formatFns(addTimezoneOffset(date), mediumDateTimeFormat);
}

// parses ISO8601 date/time strings. Currently only used to parse ISO time strings without a TZD. Some examples:
// 20:00:00.000             -> Feb 26 2019 20:00:00 GMT-0500
// 2019-03-11               -> Mar 11 2019 00:00:00 GMT-0400
// 2019-03-11T00:00:00.000Z -> Mar 10 2019 20:00:00 GMT-0400
function parseDateTimeISO8601(value) {
    let isoString = null;
    let shouldAddOffset = true;
    if (isValidISOTimeString(value)) {
        isoString = `${getTodayInISO()}T${addTimezoneSuffix(value)}`;
    } else if (isValidISODateTimeString(value)) {
        if (value.indexOf(TIME_SEPARATOR) > 0) {
            isoString = addTimezoneSuffix(value);
            shouldAddOffset = false;
        } else {
            isoString = `${value}T00:00:00.000Z`;
        }
    }

    if (isoString) {
        // Browsers differ on how they treat iso strings without a timezone offset (local vs utc time)
        const parsedDate = new Date(isoString);
        if (shouldAddOffset) {
            addTimezoneOffset(parsedDate);
        }
        return parsedDate;
    }
    return null;
}

// called by the datepicker and calendar for parsing iso and formatted date strings
// called by the timepicker to parse the formatted time string
function parseDateTime(value, format) {
    if (!value) {
        return null;
    }
    if (format === STANDARD_DATE_FORMAT && isValidISODateTimeString(value)) {
        return parseDateTimeISO8601(value);
    }
    const parsedDateTime = parseFns(value, format, new Date(), { locale: locale });
    if (Number.isNaN(parsedDateTime.getTime())) {
        // Invalid Date
        return null;
    } else {
        return parsedDateTime;
    }
}

// The input to this method is always an ISO string with timezone offset.
function parseDateTimeUTC(value) {
    return parseDateTimeISO8601(addTimezoneSuffix(value));
}

function isBefore(date1, date2, unit) {
    const normalizedDate1 = getDate(date1);
    const normalizedDate2 = getDate(date2);
    if (!normalizedDate1 || !normalizedDate2) {
        return false;
    }
    return (
        startOf(normalizedDate1, unit).getTime() <
        startOf(normalizedDate2, unit).getTime()
    );
}

// unit can be millisecond, minute, day
function isAfter(date1, date2, unit) {
    const normalizedDate1 = getDate(date1);
    const normalizedDate2 = getDate(date2);
    if (!normalizedDate1 || !normalizedDate2) {
        return false;
    }
    return (
        startOf(normalizedDate1, unit).getTime() >
        startOf(normalizedDate2, unit).getTime()
    );
}

// We're not doing timezone conversion in the default config. Only converting from UTC to system timezone
function UTCToWallTime(date, timezone, callback) {
    const utcDate = new Date(date.getTime());
    callback(subtractTimezoneOffset(utcDate));
}

// We're not doing timezone conversion in the default config. Only converting from system timezone to UTC
function WallTimeToUTC(date, timezone, callback) {
    const localDate = new Date(date.getTime());
    callback(addTimezoneOffset(localDate));
}

// We're assuming en-US locale so we don't need translation between calendar systems
function translateToOtherCalendar(date) {
    return date;
}

// We're assuming en-US locale so we don't need translation between calendar systems
function translateFromOtherCalendar(date) {
    return date;
}

// We're assuming en-US locale so we don't need translation of digits
function translateToLocalizedDigits(input) {
    return input;
}

// We're assuming en-US locale so we don't need translation of digits
function translateFromLocalizedDigits(input) {
    return input;
}

// This is called from the numberFormat library when the value exceeds the safe length.
// We currently rely on aura to format large numbers
function getNumberFormat() {
    return {
        format: (value) => {
            // eslint-disable-next-line no-console
            console.warn(
                `The current environment does not support large numbers and the original value of ${value} will be returned.`
            );
            return value;
        },
    };
}

// relativeDateTime (currently the only user of duration) uses unit="minutes"
// The default implementation here assumes the unit is always minutes.
function duration(minutes) {
    return new Duration(minutes * 60 * 1000);
}

function displayDuration(value) {
    return value.humanize('en');
}

function formatDateInternal(value, format, isUTC) {
    const date = getDate(value);
    if (!date) {
        // return Invalid Date
        return new Date('');
    }
    if (isUTC && isDateObject(value)) {
        // if value is an ISO string, we already add the timezone offset when parsing the date string.
        addTimezoneOffset(date);
    }

    switch (format) {
        case STANDARD_DATE_FORMAT:
            return formatFns(date, STANDARD_DATE_FORMAT);
        case DATE_FORMAT.short:
            return formatFns(date, DATE_FORMAT.short);
        case DATE_FORMAT.long:
            return formatFns(date, DATE_FORMAT.long);
        case DATE_FORMAT.medium:
        default: {
            return formatFns(date, DATE_FORMAT.medium);
        }
    }
}

// unit can be 'day' or 'minute', otherwise will default to milliseconds. These are the only units that are currently used in the codebase.
function startOf(date, unit) {
    switch (unit) {
        case 'day':
            date.setHours(0);
            date.setMinutes(0);
        // falls through
        case 'minute':
            date.setSeconds(0);
            date.setMilliseconds(0);
            break;
        default:
    }

    return date;
}

function isDateObject(value) {
    return (
        Object.prototype.toString.call(value) === '[object Date]' &&
        !isNaN(value.getTime())
    );
}

function addTimezoneSuffix(value) {
    // first remove TZD if the string has one, and then add Z
    return removeTimeZoneSuffix(value) + 'Z';
}

function addTimezoneOffset(date) {
    const offset = getTimezoneOffset(timeZone, date) / -60000
    date.setMinutes(date.getMinutes() + offset);
    return date;
}

function subtractTimezoneOffset(date) {
    const offset = getTimezoneOffset(timeZone, date) / -60000
    date.setMinutes(date.getMinutes() - offset);
    return date;
}

function getDate(value) {
    if (!value) {
        return null;
    }
    if (isDateObject(value)) {
        return new Date(value.getTime());
    }
    if (
        isFinite(value) &&
        (typeof value === 'number' || typeof value === 'string')
    ) {
        return new Date(parseInt(value, 10));
    }
    if (typeof value === 'string') {
        return parseDateTimeISO8601(value);
    }
    return null;
}

function getTodayInISO() {
    return new Date().toISOString().split('T')[0];
}

function pad(n) {
    return Number(n) < 10 ? '0' + n : n;
}

function doublePad(n) {
    return Number(n) < 10 ? '00' + n : Number(n) < 100 ? '0' + n : n;
}

export default {
    formatDate,
    formatDateUTC,
    formatTime,
    formatDateTimeUTC,
    parseDateTimeISO8601,
    parseDateTime,
    parseDateTimeUTC,
    isBefore,
    isAfter,
    UTCToWallTime,
    WallTimeToUTC,
    translateToOtherCalendar,
    translateFromOtherCalendar,
    translateToLocalizedDigits,
    translateFromLocalizedDigits,
    getNumberFormat,
    duration,
    displayDuration,
};
