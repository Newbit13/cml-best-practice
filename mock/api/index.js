const apiWhiteList = require('./white-list')
const { sendRequest } = require('./util')
const domain = 'https://www.chameleon.com'
const controllers = []
for (const key in apiWhiteList) {
  const element = apiWhiteList[key]
  controllers.push({
    method: ['get', 'post'],
    path: key,
    controller (req, res, next) {
      const data = require(element) //这里是各个mock模块的引用路径，注意
      // 如果有映射 请求本地  没有则请求线上
      if (data && element) {
        res.json(data)
      } else {
        sendRequest(req, res, domain + req.url)
      }
    }
  })
}

module.exports = controllers