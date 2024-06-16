import request from './request'

export const login = (data) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

export const logout = () => {
  return request({
    url: '/user/logout',
    method: 'POST'
  })
}

export const getInfo = () => {
  return request({
    url: '/user/current',
    method: 'GET'
  })
}

export const register = (data) => {
  return request({
    url: '/user/register',
    method: 'POST',
    data
  })
}

export const profileUpdate = (data) => {
  return request({
    url: '/user/profileUpdate',
    method: 'POST',
    data
  })
}

export const getUserNum = () => {
  return request({
    url: '/user/getUserNum',
    method: 'GET'
  })
}

export const getsubscribedMeetings = () => {
  return request({
    url: '/user/getsubscribedMeetings',
    method: 'GET'
  })
}