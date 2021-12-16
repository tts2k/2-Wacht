import * as FileSystem from 'expo-file-system'

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const formatDate = (date) => {
    let d = new Date(date);
    let month = monthNames[d.getMonth()];

    return `${month} ${d.getDay()}, ${d.getFullYear()}`
}

const generateDateForExport = () => {
    let d = new Date()
        .toJSON()
        .slice(0,19)
        .replace(/-/g,'')
        .replace(/:/g,'')
        .replace(/T/g,'')
        .toString();
    return d;
}

const downloadImageToBase64 = async (url) => {
    let result = await FileSystem.downloadAsync(url, FileSystem.cacheDirectory + "poster.tmp");
    let base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 });

    return base64;
}

export { formatDate, downloadImageToBase64, generateDateForExport };
