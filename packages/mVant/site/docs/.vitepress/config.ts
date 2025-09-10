export default {
  base: process.env.NODE_ENV === 'production' ? '/ev-docs/' : '/',
  themeConfig: {
    siteTitle: 'ElongVant',
    nav: [
      { text: '指南', link: '/guild/' },
      { text: '组件', link: '/components/input' }
    ],
    sidebar: {
      '/guild/': [
        {
          text: '基础',
          items: [
            {
              text: '安装',
              link: '/guild/installation'
            },
            {
              text: '快速开始',
              link: '/guild/quickstart'
            }
          ]
        },
        {
          text: '进阶',
          items: [
            {
              text: 'xx',
              link: '/xx'
            }
          ]
        }
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            {
              text: 'EvInput 输入框',
              link: '/components/input'
            }
          ]
        }
      ]
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/qddidi/easyest' }]
  },
  vite: {
    // <=== insert this section
    ssr: {
      noExternal: ['vant', 'dayjs']
    }
  }
};
