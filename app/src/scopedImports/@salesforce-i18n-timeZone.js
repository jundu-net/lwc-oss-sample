//export default 'Asia/Tokyo';
export default Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Tokyo';