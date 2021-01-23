/**
 * 用户相关请求模块
 **/
import request from '@/utils/request'

/**
 * 登录
 */
export const login = data => {
    return request(
        {
            method: 'POST',
            url: 'http://localhost:9003/orpersonnel/member/login',
            data
        }
    )
}
/**
 * 短信验证码
 */
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `http://localhost:9002/ormsm/msm/send/${mobile}`
    })
}
/**
 * 注册
 */
export const register = data => {
    return request(
        {
            method: 'POST',
            url: 'http://localhost:9003/orpersonnel/member/register',
            data
        }
    )
}
/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return request({
      method: 'POST',
      url: 'http://localhost:9003/orpersonnel/member/getMemberInfo',
      // 发送请求头数据
    //   headers: {
    //     // 注意：该接口需要授权才能访问
    //     //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
    //     Authorization: `Bearer ${store.state.user.token}`
    //   }
    })
  }

  