/**
 * 党务相关请求模块
 **/
import request from '@/utils/request'

/**
 * 获取支部成员列表
 */
export const getTeamList = params => {
  return request({
    method: 'GET',
    url: 'http://localhost:9003/orpersonnel/information/getTeamList',
    params
  })
}
/**
 * 获取支部发展成员列表
 */
export const getfzList = params => {
  return request({
    method: 'GET',
    url: 'http://localhost:9003/orpersonnel/information/getfzList',
    params
  })
}
