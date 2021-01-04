const util = require('../../utils/util.js')
const WxValidate = require('../../utils/WxValidate.js')
import Toast from '@vant/weapp/toast/toast'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    date: '',
    time: '',
    ageArr: ['18-25岁', '25-30岁',
      '30-35岁',
      '35-40岁',
      '40-45岁',
      '45-50岁',
      '50岁以上'
    ],
    ageIndex: 0,
    telNum: '',
    isRepeat: false,
    categoryArr: [
      /**上衣分类 */
      [{
          id: 0,
          name: 'T恤'
        },
        {
          id: 1,
          name: '吊带'
        },
        {
          id: 2,
          name: '打底'
        },
        {
          id: 3,
          name: '卫衣'
        },
        {
          id: 4,
          name: '毛衣'
        },
        {
          id: 5,
          name: '马甲'
        },
        {
          id: 6,
          name: '外套'
        },
        {
          id: 7,
          name: '风衣'
        },
        {
          id: 8,
          name: '大衣'
        },
        {
          id: 9,
          name: '羽绒服'
        }
      ],
      /**下衣分类 */
      [{
          id: 0,
          name: '长裤'
        },
        {
          id: 1,
          name: '短裤'
        },
        {
          id: 2,
          name: '半裙'
        },
        {
          id: 3,
          name: '长裙'
        }
      ],
      /**丝巾分类 */
      [{
          id: 0,
          name: '真丝围巾'
        },
        {
          id: 1,
          name: '羊绒围巾'
        }
      ],
      /**披肩分类 */
      [{
        id: 0,
        name: '披肩'
      }],
      /**套装分类 */
      [{
        id: 0,
        name: '套装'
      }],
    ],
    objectCategoryArr: [
      [{
          id: 0,
          name: '上衣'
        },
        {
          id: 1,
          name: '下衣'
        },
        {
          id: 2,
          name: '丝巾'
        },
        {
          id: 3,
          name: '披肩'
        },
        {
          id: 4,
          name: '套装'
        }
      ],
      [{
          id: 0,
          name: 'T恤'
        },
        {
          id: 1,
          name: '吊带'
        },
        {
          id: 2,
          name: '打底'
        },
        {
          id: 3,
          name: '卫衣'
        },
        {
          id: 4,
          name: '毛衣'
        },
        {
          id: 5,
          name: '马甲'
        },
        {
          id: 6,
          name: '外套'
        },
        {
          id: 7,
          name: '风衣'
        },
        {
          id: 8,
          name: '大衣'
        },
        {
          id: 9,
          name: '羽绒服'
        }
      ]
    ],
    categoryIndex: [0, 0],
    objectColorArr: [{
        value: '0',
        name: '黑色'
      },
      {
        value: '1',
        name: '白色'
      },
      {
        value: '2',
        name: '灰色'
      },
      {
        value: '3',
        name: '红色'
      },
      {
        value: '4',
        name: '绿色'
      },
      {
        value: '6',
        name: '蓝色'
      },
      {
        value: '7',
        name: '黄色'
      },
      {
        value: '8',
        name: '紫色'
      },
      {
        value: '9',
        name: '卡其色'
      },
      {
        value: '10',
        name: '咖啡色'
      },
      {
        value: '11',
        name: '拼接色'
      },
      {
        value: '12',
        name: '其他颜色'
      }
    ],
    colorIndex: 0,
    number: 1,
    isInputNumberDecrease: true,
    formData: {

    },
    rules: [{
      name: 'price',
      rules: {
        required: true,
        message: '请输入商品单价'
      },
    }],
    files: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const date = util.formatDate(new Date())
    const time = util.formatTime(new Date())

    this.setData({
      date: date,
      time: time,
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 日期选择器
   * @param {*} e 
   */
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      [`formData.date`]: e.detail.value
    })
  },

  /**
   * 时间选择器
   * @param {*} e 
   */
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  onConfirm(event) {
    const {
      value,
      index
    } = event.detail;

    console.log(event);
    Toast(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      show: false
    });
  },

  onCancel() {
    // Toast('取消');
    this.setData({
      show: false
    });
  },

  /**
   * 顾客年龄选择
   * @param {*} e 
   */
  bindAgeChange(e) {
    this.setData({
      ageIndex: e.detail.value
    })
  },

  /**
   * 是否回头客切换
   * @param {*} e 
   */
  bindIsRepeatChange(e) {
    this.setData({
      isRepeat: e.detail.value
    })
  },

  /**
   * 商品颜色选择
   * @param {*} e 
   */
  bindColorChange(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      colorIndex: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      categoryIndex: e.detail.value
    })
  },

  /**
   * 商品分类picker列变化时的回调
   * @param {*} e 
   */
  bindCategoryPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);

    if (e.detail.column === 0) {
      let data = this.data.objectCategoryArr
      data[1] = this.data.categoryArr[e.detail.value]
      this.setData({
        objectCategoryArr: data
      })
    }
  },

  /**
   * 商品数量减1
   * @param {*} e 
   */
  bindDecreaseNumber(e) {
    this.data.number -= 1;
    if (this.data.number === 1) {
      this.setData({
        isInputNumberDecrease: true
      })
    }
    this.setData({
      number: this.data.number
    })
  },

  /**
   * 商品数量加1
   * @param {*} e 
   */
  bindIncreaseNumber(e) {
    this.data.number += 1;
    if (this.data.number > 1) {
      this.setData({
        isInputNumberDecrease: false
      })
    }
    this.setData({
      number: this.data.number
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      [`formData.radio`]: e.detail.value
    });
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems,
      [`formData.checkbox`]: e.detail.value
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      [`formData.date`]: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindCountryCodeChange: function (e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {

        console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    return new Promise((resolve, reject) => {

      const tempFilePaths = files.tempFilePaths;
      //上传返回值
      const that = this;
      const object = {};
      for (var i = 0; i < tempFilePaths.length; i++) {
        let filePath = '',
          cloudPath = ''
        filePath = tempFilePaths[i]
        // 上传图片
        // cloudPath 最好按时间 遍历的index来排序，避免文件名重复
        cloudPath = 'goods-' + new Date().getTime() + '-' + i + filePath.match(/\.[^.]+?$/)[0]

        console.log(filePath)
        console.log(cloudPath)
        wx.cloud.uploadFile({
          filePath,
          cloudPath,
          success: function (res) {
            console.log(res)
            // 可能会有好几个200+的返回码，表示成功
            if (res.statusCode === 200 || res.statusCode === 204 || res.statusCode === 205) {
              const url = res.fileID
              that.data.files.push(url)
              if (that.data.files.length === tempFilePaths.length) {
                object.urls = that.data.files;
                resolve(object) //这就是判断是不是最后一张已经上传了，用来返回，
              }

              const db = wx.cloud.database();
              db.collection("images").add({
                data: {
                  goodImage: res.fileID
                },
                success: function (e) {
                  console.log(1111);
                  console.log(e);

                },
                fail: function () {
                  wx.showToast({
                    title: '图片存储失败',
                    icon: 'none',
                    duration: 3000
                  })
                }
              });
            } else {
              reject('error')
            }
          },
          fail: function (err) {
            console.log(err)
          },
          conplete: () => {}
        })
      }
    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {

    console.log(e);
    console.log('upload success', e.detail)
  },

  /**
   * 输入商品单价
   * @param {*} e 
   */
  bindPriceInput(e) {
    this.setData({
      ['formData.price']: e.detail.value
    })
  },

  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        wx.showToast({
          title: '校验通过'
        })
      }
    })
  }
})