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

export const getJournalNum = () => {
  return request({
    url: '/paper/getJournalNum',
    method: 'GET'
  })
}

export const getConferenceNum = () => {
  return request({
    url: '/paper/getConferenceNum',
    method: 'GET'
  })
}
