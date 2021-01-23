/**本地存储封装模块 */

export const getItem = name => {
    const data = window.localStorage.getItem(name);
    try {
        return JSON.parse(data)
    } catch (err) {
        //加入data不是json格式字符串，就直接输出
        return data
    }
}

export const setItem = (name, value) => {
    //如果value是对象，就转化为JSON格式的
    if (typeof value == 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)
}

export const removeItem = name => {
    window.localStorage.removeItem(name)
}