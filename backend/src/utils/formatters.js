// Simple method to Convert a String to Slug
export const slugify = (val) => {
  if (!val) return ''
  return String(val)
    .toLowerCase() // convert to lowercase
    .normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/đ/gi, 'd')
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
}

