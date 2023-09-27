export const getTwitterHandler = (twitterLink: string) => {
  const myRe = /^https?:\/\/(www\.)?twitter\.com\/(#!\/)?([^\/]+)(\/\w+)*$/
  const myArray = myRe.exec(twitterLink)

  return (myArray && myArray[3]) || twitterLink
}

export const titleCase = (str?: string) => {
  if (!str) {
    return ''
  }
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
