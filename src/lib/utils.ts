export const getTwitterHandler = (twitterLink: string) => {
  console.log('twitterLink', twitterLink)
  const myRe = /(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?@?([^\/\?\s]*)/
  const myArray = myRe.exec(twitterLink)

  console.log('twitterLink formated', myArray)

  return myArray && myArray[1]
}
