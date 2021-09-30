const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const formatDate = (date) => {
    let d = new Date(date);
    let month = monthNames[d.getMonth()];

    return `${month} ${d.getDay()}, ${d.getFullYear()}`
}
