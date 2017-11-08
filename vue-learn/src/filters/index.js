export function filterDate (val) {
  let d = new Date(val)
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  month = month < 10 ? '0' + month : month
  let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
  return year + '-' + month + '-' + day
}
