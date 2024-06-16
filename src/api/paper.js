import request from './request'

export const listPartern = (data) => {
  return request({
    url: '/paper/search',
    method: 'POST',
    data
  })
}

export const listAll = () => {
  return request({
    url: '/paper',
    method: 'GET'
  })
}

export const getPaperNum = () => {
  return request({
    url: '/paper/getPaperNum',
    method: 'GET'
  })
}
