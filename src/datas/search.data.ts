const webSource = ref([
  {
    type: '百度',
    url: 'https://www.baidu.com/s?ie=utf-8&word=%s',
    icon: 'https://www.baidu.com/favicon.ico',
  },
  {
    type: '必应',
    url: 'https://cn.bing.com/useSearchStore?form=QBLH&q=%s',
    icon: 'https://cn.bing.com/favicon.ico',
  },
  {
    type: '谷歌',
    url: 'https://www.google.com/useSearchStore?q=%s',
    icon: 'https://www.google.com/favicon.ico',
  },
  {
    type: '搜狗',
    url: 'https://www.sogou.com/web?query=%s',
    icon: 'https://www.sogou.com/favicon.ico',
  },
])
// 应用搜索源
const appSource = ref([
  {
    type: '百度翻译',
    url: 'https://fanyi.baidu.com/mtpe-individual/transText?query=%s&lang=en2zh#/',
  },
  {
    type: '文心一言',
    url: 'https://chat.baidu.com/useSearchStore?word=%s',
  },

  {
    type: '小红书',
    url: 'https://www.xiaohongshu.com/useSearchStore?keyword=%s',
  },
  {
    type: '抖音',
    url: 'https://www.douyin.com/useSearchStore/%s',
  },
  {
    type: '微博',
    url: 'https://weibo.com/useSearchStore?keyword=%s',
  },
  {
    type: '哔哩哔哩',
    url: 'https://www.bilibili.com/useSearchStore?keyword=%s',
  },
  {
    type: 'github',
    url: 'https://github.com/useSearchStore?q=%s&type=repositories',
  },
  {
    type: '稀土掘金',
    url: 'https://juejin.cn/useSearchStore?query=%s',
  },
])

export { appSource, webSource }
