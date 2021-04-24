
/**
 * 党政生活相关请求模块
 **/
import request from '@/utils/request'



/**
 * 获取投票列表
 */
export const getvotes = actid => {
  return request({
    method: 'GET',
    url: `http://localhost:9007/ordz/vote/getVote/${actid}`,
  })
}

/**
* 添加投票
*/
export const addvotes = data => {
  return request(
    {
      method: 'POST',
      url: 'http://localhost:9007/ordz/vote/voteadd',
      data
    }
  )
}
/**
 * 获取投票和选项信息
 */
export const getVoteDetill = tid => {
  return request({
    method: 'GET',
    url: `http://localhost:9007/ordz/vote/getVoteDetill/${tid}`,
  })
}
/**
 * 获取用户和投票之间的关系
 */
export const getidtp = tid => {
  return request({
    method: 'GET',
    url: `http://localhost:9007/ordz/vote/getidtp/${tid}`,
  })
}

/**
* 添加投票
*/
export const addmenvervote = data => {
  return request(
    {
      method: 'POST',
      url: 'http://localhost:9007/ordz/vote/addmenvervote',
      data
    }
  )
}
//获取自己支部的信息
export const getMemberbranchinfo = params => {
  return request({
    method: 'GET',
    url: 'http://localhost:9003/orpersonnel/member/getMemberbranchinfo',
    params
  })
}

/**
 * 获取自己党费缴纳信息
 */
export const isjiana = () => {
  return request({
    method: 'GET',
    url: 'http://localhost:9003/orpersonnel/payment/isjiana',
  })
}

