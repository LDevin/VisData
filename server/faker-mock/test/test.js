const lng = {min: 108.22477340698242,max:108.44123840332031}
const lat = {min: 22.747372244925597,max:22.88692962789286}
const lng_offset = lng.max - lng.min;
const lat_offset = lat.max - lat.min;

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
        'data|500': [
          {
            coordinates: function() {
              let random = Math.random()
              let random2 = Math.random()
              return (lng.min + lng_offset*random) + ":" + (lat.min + lat_offset*random2)
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
            'name': '青秀区',
            coordinates: '108.29978942871094:22.787260370919913:1500'
          },
          {
            'id': '33',
            'name': '武宁区',
            coordinates: '108.34167480468749:22.820491567770727:1500'
          },
          {
            'id': '33',
            'name': '横县',
            coordinates: '108.30236434936523:22.828560777797613:1500'
          },
          {
            'id': '33',
            'name': 'XX街道',
            coordinates: '108.28983306884766:22.8579856077743647:1500'
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
        'data|800': [
          {
            coordinates: function() {
              let random = Math.random()
              let random2 = Math.random()
              return (lng.min + lng_offset*random) + ":" + (lat.min + lat_offset*random2)+ ':200'
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
        'data|600': [
          {
            coordinates: function() {
              let random = Math.random()
              let random2 = Math.random()
              return (lng.min + lng_offset*random) + ":" + (lat.min + lat_offset*random2)+ ':250'
            }
          }
        ]
      }
    },
    {
      path: '/api/v1/devices',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data|546': [
          {
            coordinates: function() {
              let random = Math.random()
              let random2 = Math.random()
              return (lng.min + lng_offset*random) + ":" + (lat.min + lat_offset*random2)
            }
          }
        ]
      }
    }
  ]