module.exports = [
    {
      path: '/api/v1/test/post',
      method: 'post',
      delay: 1000,
      status: 200,
      data: {
        code: 200,
        msg: '测试test数据成功',
        'data|5-10': [
          {
            id: '@fake(uuid)',  // use method of faker.js
            month: '@fake(date.month)',
          }
        ]
      }
    },
    {
      path: '/user/:id',
      method: 'get',
      delay: 1000,
      status: 200,
      data: {
        count: 10,
        'result|5-10': [
          {
            id: '@fake(uuid)',  // use method of faker.js
            month: '@fake(date.month)',
            'name|101-103': 2,    // or use method of mockjs itself
            'fl|102-103.14-15': 102.33
          }
        ]
      }
    },
    {
      path: '/oauth/token',
      method: 'post',
      delay: 10,
      status: 200,
      data: {
        count: 111,
        'result|5-10': [
          {
            id: '@fake(uuid)',  // use method of faker.js
            month: '@fake(date.month)',
            'name|101-103': 2,    // or use method of mockjs itself
            'fl|102-103.14-15': 102.33
          }
        ]
      }
    },
    {
      path: '/api/v1/dangers',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data|10000': [
          {
            'no|0-36.5-15': 108.22, 
            'to|0-22.5-15': 22.33,
            coordinates: function() {
             return (this.no / 100 + 108.20) + ":" + (this.to / 100 + 22.70)
            }
          }
        ]
      }
    }
  ]