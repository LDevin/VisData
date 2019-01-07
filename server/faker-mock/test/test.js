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
    },
    {
      path: '/api/v1/streetlabel',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data': [
          {
            'id': '33',
            'name': 'acb',
            coordinates: '108.156623569:22.8562354698:1200'
          },
          {
            'id': '33',
            'name': 'ddd',
            coordinates: '108.3588623569:22.8162784554698:1200'
          },
          {
            'id': '33',
            'name': 'ccdfds',
            coordinates: '108.4064126559:22.808952354698:1200'
          },
          {
            'id': '33',
            'name': 'cccsadfs',
            coordinates: '108.41685626559:22.80012952354698:1200'
          }
        ]
      }
    },
    {
      path: '/api/v1/checks',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data|5000': [
          {
            'no|0-36.5-15': 108.22, 
            'to|0-22.5-15': 22.33,
            coordinates: function() {
              let random = Math.random() * 0.00051;
              let rando2 = Math.random() * 0.00020122;
             return (this.no / 100 + 108.20 + random) + ":" + (this.to / 100 + 22.70 + rando2 + ':200')
            }
          }
        ]
      }
    },
    {
      path: '/api/v1/units',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data|5000': [
          {
            'no|0-40.10-15': 108.22, 
            'to|0-25.12-15': 22.33,
            coordinates: function() {
              let random = Math.random() * 0.000526;
              let rando2 = Math.random() * 0.0000222;
             return (this.no / 100 + 108.17 + random) + ":" + (this.to / 100 + 22.680 + rando2 + ':250')
            }
          }
        ]
      }
    }
  ]