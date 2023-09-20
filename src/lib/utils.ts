export const getTwitterHandler = (twitterLink: string) => {
  console.log('twitterLink', twitterLink)
  const myRe = /(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?@?([^\/\?\s]*)/
  const myArray = myRe.exec(twitterLink)

  console.log('twitterLink formated', myArray)

  return myArray && myArray[1]
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
