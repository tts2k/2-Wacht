import * as FileSystem from 'expo-file-system'

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const formatDate = (date) => {
    let d = new Date(date);
    let month = monthNames[d.getMonth()];

    return `${month} ${d.getDay()}, ${d.getFullYear()}`
}

const downloadImageToBase64 = async (url) => {
    let result = await FileSystem.downloadAsync(url, FileSystem.cacheDirectory + "poster.tmp");
    let base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: FileSystem.EncodingType.Base64 });

    return base64;
}

export { formatDate, downloadImageToBase64 };
