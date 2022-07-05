import React from 'react'

const parseFilter = (filter) => {
  console.log(filter)
  let filterObject
  switch(filter) {
    case "ASC":
      filterObject = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: "ASC"
      }
      break

    case "DESC":
      filterObject = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: "DESC"
      }
      break
    default:
      filterObject = {}
      break
  }
  return filterObject
}

export default parseFilter