const lng = {min: 108.12477340698242,max:108.64123840332031}
const lat = {min: 22.347372244925597,max:22.98692962789286}

const lng_offset = lng.max - lng.min;
const lat_offset = lat.max - lat.min;

const lngmin = [108.1477340698242, 108.23577340698242, 108.33497340698242, 108.264796231544]
const lngmax = [108.364778536224245, 108.39577311256982, 108.4149736258242, 108.4041596231544]

const latmin = [22.747372244925597,22.749472246592597,22.81792224635597,22.739537624492697]
const latmax = [22.827572234925597,22.88692965789286,22.85694962789286,22.84792992889286]
const textArr = ["中山街道","新竹街道","新阳街道","心杅街道","翠湖街道","江南街道","沙井街道","西乡塘街道","江北街道",
"明秀街道","良凤街道","良庆街道","横岭街道","那洪街道","新江街道"];
const textCor = [[108.34898114204407,22.79286870367229], [108.34184646606445,22.819542217480794],
[
  108.30845832824706,
  22.818751087183244
],[
  108.26923370361328,
  22.86502447526246
],[
  108.2651138305664,
  22.802927516201063
],[
  108.2936954498291,
  22.782274992634736
],[
  108.27069282531738,
  22.782749798416805
],[
  108.28125,
  22.825396438821492
],[
  108.31369400024413,
  22.799920829957472
],[
  108.3145523071289,
  22.857036519062568
],[
  108.31609725952148,
  22.765101739713344
],[
  108.3969497680664,
  22.841850199020886
],[
  108.21361541748047,
  22.77887216950448
],[
  108.27532768249512,
  22.74927194371657
],[
  108.22610378265381,
  22.83255565109441
]
]

let text_index = 0,text_index2 = 0;

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
              // let random = Math.random()
              // let random2 = Math.random()
              // return (lng.min + lng_offset*random) + ":" + (lat.min + lat_offset*random2)+ ':250'
              let random = Math.random()
              let random2 = Math.random()
              let _in1 = Math.floor(random * 4), _in2 = Math.floor(random2 * 4);

              let random3 = Math.random()
              let random4 = Math.random()

              return (lng.min + (lngmax[_in1] - lngmin[_in2])*random3) + ":" + (lat.min + (latmax[_in2] - latmin[_in1])*random4)+ ':250'
            },
            count: function() {
              return Math.ceil(Math.random()*58000)
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
              let _in1 = Math.floor(random * 3), _in2 = Math.floor(random2 * 3);

              let random3 = Math.random()
              let random4 = Math.random()

              return (lng.min + (lngmax[_in1] - lngmin[_in2])*random3) + ":" + (lat.min + (latmax[_in2] - latmin[_in1])*random4)
            }
          }
        ]
      }
    },
    {
      path: '/api/v1/devices/response',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data': [
          {
            response: 8936,
            nonresponse: 1231
          }
        ]
      }
    },
    {
      path: '/api/v1/devices/runstatus',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data': [
          {
            on: function() {
              return Math.floor(Math.random() * 856) + Math.floor(Math.random() * 2963)
            },
            off:  function() {
              return Math.floor(Math.random() * 152) + Math.floor(Math.random() * 256)
            }
          }
        ]
      }
    },
    {
      path: '/api/v1/devices/alarmstatus',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data': [
          {
            total: function() {
              return Math.floor(Math.random() * 213) + Math.floor(Math.random() * 2000)
            },
            notfixed:  function() {
              return Math.floor(Math.random() * 99) + Math.floor(Math.random() * 322)
            }
          }
        ]
      }
    },
    {
      path: '/api/v1/netcoms',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data': [
          { "name": '一般单位',"count": Math.floor(Math.random() * 39598 + 233), type: 2},
          { "name": '高危单位',"count":  Math.floor(Math.random() * 3598 + 36), type: 4},
          { "name": '三小单位',"count":  Math.floor(Math.random() * 10598), type: 3},
          { "name": '重点单位',"count":  Math.floor(Math.random() * 3558 + 632), type: 5}
        ]
      }
    },
    {
      path: '/api/v1/devnets',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data': {gateWay: 2638,probes:8752, videos: 3156}
      }
    },
    {
      path: '/api/v1/devices/response/details',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data|1250-9000': [
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
      path: '/api/v1/devices/runstatus/details',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data|5250-9015': [
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
      path: '/api/v1/devices/alarmstatus/details',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data|2639-6521': [
          {
            coordinates: function() {
              let random = Math.random()
              let random2 = Math.random()
              return (lng.min + lng_offset*random) + ":" + (lat.min + lat_offset*random2) + ':250'
            },
          }
        ]
      }
    },
    {
      path: '/api/v1/grid/street',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data|15': [
          {
            coordinates: function() {
              if (text_index >= textCor.length)
                  text_index = 0;
                  let cor = textCor[text_index][0]+ ":" +textCor[text_index][1] + ':600';
                  text_index++;
                  return cor
            },
            name: function() {
              if (text_index2 >= textArr.length)
                text_index2 = 0;
                return textArr[text_index2++]
            },
            id: text_index2
          }
        ]
      }
    },
    {
      path: '/api/v1/netcoms/details',
      method: 'get',
      delay: 10,
      status: 200,
      data: {
        code: 200,
        msg: '获取数据成功',
        'data|5250-9015': [
          {
            coordinates: function() {
              let random = Math.random()
              let random2 = Math.random()
              return (lng.min + lng_offset*random) + ":" + (lat.min + lat_offset*random2) + ':300'
            }
          }
        ]
      }
    },
  ]