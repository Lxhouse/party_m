
/**
 * 文章相关请求模块
 **/
import request from '@/utils/request'


/**
 * 获取用户频道列表
 */
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: 'http://localhost:9005/orarticle/tabdata/channels'
    })
}


/**
 * 获取文章列表
 */
export const getArticles = params => {
    return request({
        method: 'GET',
        url: 'http://localhost:9005/orarticle/alist/articles',
        params
    })
}

/**
 * 获取所有频道
 */
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: 'http://localhost:9005/orarticle/tabdata/channels/getall'
    })
}

/**
* 添加用户频道
*/
export const addUserChannel = id => {
    return request(
        {
            method: 'POST',
            url: 'http://localhost:9005/orarticle/usertab/channel/addtab/' + id,
        }
    )
}
/**
* 删除用户指定频道
*/
export const deleteUserChannel = id => {
    return request(
        {
            method: 'DELETE',
            url: 'http://localhost:9005/orarticle/usertab/channel/delete/' + id,
        }
    )
}

/**
 * 获取搜索联想建议
 */
export const getSearchSuggestions = sugges => {
    return request({
        method: 'GET',
        url: `http://localhost:9005/orarticle/alist/suggestion/${sugges}`,

    })
}

/**
 * 获取搜索结果
 */
export const getSearchResult = params => {
    return request({
        method: 'GET',
        url: `http://localhost:9005/orarticle/alist/search`,
        params
    })
}
/**
 * 获取文章详情
 */
export const getArticlesbyid = articleId => {
    return request({
        method: 'GET',
        url: `http://localhost:9005/orarticle/alist/getarticlebyid/${articleId}`,
    })
}
/**
*关注接口
*/
export const getsetFollow = Aid => {
    return request(
        {
            method: 'POST',
            url: 'http://localhost:9005/orarticle/followed/followings/' + Aid,
        }
    )
}
/**
*收藏接口
*/
export const getsetCollections = artId => {
    return request(
        {
            method: 'POST',
            url: 'http://localhost:9005/orarticle/dzsc/collections/' + artId,
        }
    )
}
/**
*点赞接口
*/
export const getsetLikings = artId => {
    return request(
        {
            method: 'POST',
            url: 'http://localhost:9005/orarticle/dzsc/likings/' + artId,
        }
    )
}

/**
 * 获取评论接口
 */
export const getComments = params => {
    return request({
        method: 'GET',
        url: 'http://localhost:9005/orarticle/comment/comments',
        params
    })
}

/**
 * 评论的点赞接口
 */
export const CommentLike = data => {
    return request({
        method: 'POST',
        url: 'http://localhost:9005/orarticle/comment/likings',
        data
    })
}
/**
 * 添加评论或者评论回复
 */
export const commentsreply = data => {
    return request({
        method: 'POST',
        url: 'http://localhost:9005/orarticle/comment/comments/reply',
        data
    })
}