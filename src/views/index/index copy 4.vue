<template>
  <div class="font-inter bg-light text-dark overflow-x-hidden">
    <!-- 顶部 Header - 保留原有滚动效果 -->
    <header
      id="navbar"
      class="transition-header fixed top-0 left-0 z-50 box-border flex h-[80px] w-full items-center bg-transparent px-4 md:px-8"
      :style="{ backgroundColor: bgColor }"
    >
      <div class="container mx-auto flex h-full w-full items-center justify-between">
        <!-- Logo -->
        <a href="#" class="flex h-full items-center space-x-2">
          <div
            class="bg-primary/20 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
          >
            <i class="fa fa-code text-primary text-xl"></i>
          </div>
          <span
            id="logoText"
            class="text-shadow text-xl font-bold transition-colors duration-300"
            :class="logoTextColor"
          >
            李明
          </span>
        </a>

        <!-- 导航菜单 - 桌面版 -->
        <nav class="hidden h-full items-center space-x-8 md:flex">
          <a
            href="#home"
            class="nav-link transition-colors duration-300"
            :class="[navTextColor, navHoverColor]"
            @click.prevent="handleNavClick('#home')"
          >
            首页
          </a>
          <a
            href="#about"
            class="nav-link transition-colors duration-300"
            :class="[navTextColor, navHoverColor]"
            @click.prevent="handleNavClick('#about')"
          >
            关于我
          </a>
          <a
            href="#skills"
            class="nav-link transition-colors duration-300"
            :class="[navTextColor, navHoverColor]"
            @click.prevent="handleNavClick('#skills')"
          >
            技能
          </a>
          <a
            href="#projects"
            class="nav-link transition-colors duration-300"
            :class="[navTextColor, navHoverColor]"
            @click.prevent="handleNavClick('#projects')"
          >
            项目
          </a>
          <a
            href="#contact"
            class="nav-link transition-colors duration-300"
            :class="[navTextColor, navHoverColor]"
            @click.prevent="handleNavClick('#contact')"
          >
            联系我
          </a>
        </nav>

        <!-- 简历按钮 -->
        <div class="hidden h-full items-center md:flex">
          <a
            href="#"
            class="bg-primary hover:bg-primary/90 hover:shadow-primary/20 flex-shrink-0 rounded-full px-6 py-2 text-white transition-all hover:shadow-lg"
          >
            下载简历
          </a>
        </div>

        <!-- 移动端菜单按钮 -->
        <button
          id="menuBtn"
          class="flex h-10 w-10 flex-shrink-0 items-center justify-center text-2xl md:hidden"
          :class="menuBtnColor"
          @click="toggleMobileMenu"
        >
          <i :class="mobileMenuOpen ? 'fa fa-times' : 'fa fa-bars'"></i>
        </button>
      </div>

      <!-- 移动端菜单 -->
      <div
        id="mobileMenu"
        class="absolute top-full left-0 w-full rounded-b-xl bg-white px-6 py-4 shadow-lg md:hidden"
        :class="{ hidden: !mobileMenuOpen }"
      >
        <nav class="flex flex-col space-y-4">
          <a
            href="#home"
            class="hover:text-primary border-b border-gray-100 py-2 text-gray-800"
            @click.prevent="handleNavClick('#home')"
          >
            首页
          </a>
          <a
            href="#about"
            class="hover:text-primary border-b border-gray-100 py-2 text-gray-800"
            @click.prevent="handleNavClick('#about')"
          >
            关于我
          </a>
          <a
            href="#skills"
            class="hover:text-primary border-b border-gray-100 py-2 text-gray-800"
            @click.prevent="handleNavClick('#skills')"
          >
            技能
          </a>
          <a
            href="#projects"
            class="hover:text-primary border-b border-gray-100 py-2 text-gray-800"
            @click.prevent="handleNavClick('#projects')"
          >
            项目
          </a>
          <a
            href="#contact"
            class="hover:text-primary py-2 text-gray-800"
            @click.prevent="handleNavClick('#contact')"
          >
            联系我
          </a>
          <a
            href="#"
            class="bg-primary hover:bg-primary/90 mt-2 rounded-full px-6 py-3 text-center text-white transition-all"
          >
            下载简历
          </a>
        </nav>
      </div>
    </header>

    <!-- 英雄区域 - 个人主页头部 -->
    <section id="home" class="relative flex h-screen items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/id/1048/1920/1080"
          alt="背景图片"
          class="h-full w-full object-cover"
        />
        <div class="from-dark/60 to-dark/80 absolute inset-0 bg-gradient-to-b"></div>
      </div>
      <div class="relative z-10 container mx-auto px-4 text-center md:px-8">
        <!-- 头像 -->
        <div
          class="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-white/30 shadow-xl md:h-40 md:w-40"
        >
          <img
            src="https://picsum.photos/id/1012/300/300"
            alt="李明的头像"
            class="h-full w-full object-cover"
          />
        </div>

        <!-- 个人信息 -->
        <h1
          class="text-shadow mb-3 text-[clamp(2rem,5vw,3.5rem)] leading-tight font-bold text-white"
        >
          李明
        </h1>
        <p class="mb-2 text-[clamp(1.1rem,2vw,1.5rem)] font-medium text-white/90">前端开发工程师</p>
        <div class="mb-8 flex items-center justify-center space-x-4 text-white/80">
          <span class="flex items-center"> <i class="fa fa-map-marker mr-2"></i> 上海 · 中国 </span>
          <span class="hidden md:inline-block">|</span>
          <span class="flex items-center">
            <i class="fa fa-envelope mr-2"></i> liming@example.com
          </span>
        </div>

        <!-- 个人签名 -->
        <p class="mx-auto mb-10 max-w-2xl text-[clamp(1rem,2vw,1.25rem)] text-white/90 italic">
          "专注于创造优雅、高效、用户友好的数字体验，让代码变得有温度"
        </p>

        <!-- 社交链接 -->
        <div class="mb-8 flex justify-center space-x-6">
          <a
            href="#"
            class="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all"
          >
            <i class="fa fa-github"></i>
          </a>
          <a
            href="#"
            class="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all"
          >
            <i class="fa fa-linkedin"></i>
          </a>
          <a
            href="#"
            class="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all"
          >
            <i class="fa fa-codepen"></i>
          </a>
          <a
            href="#"
            class="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all"
          >
            <i class="fa fa-weixin"></i>
          </a>
        </div>

        <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#about"
            class="bg-primary hover:bg-primary/90 hover:shadow-primary/30 rounded-full px-8 py-3 text-lg font-medium text-white transition-all hover:shadow-xl"
            @click.prevent="handleNavClick('#about')"
          >
            了解我的故事
          </a>
          <a
            href="#contact"
            class="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-lg font-medium text-white transition-all hover:bg-white/20"
            @click.prevent="handleNavClick('#contact')"
          >
            联系我
          </a>
        </div>
      </div>
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 transform animate-bounce text-white">
        <i class="fa fa-chevron-down text-2xl"></i>
      </div>
    </section>

    <!-- 关于我 -->
    <section id="about" class="bg-white py-20">
      <div class="container mx-auto px-4 md:px-8">
        <div class="mx-auto max-w-4xl">
          <div
            class="scroll-reveal mb-16 text-center"
            :class="{ active: isScrolledToElement('about') }"
          >
            <h2 class="text-dark mb-4 text-3xl font-bold md:text-4xl">关于我</h2>
            <div class="bg-primary mx-auto mb-6 h-1 w-20 rounded-full"></div>
            <p class="mx-auto max-w-2xl text-gray-600">
              热爱技术，追求卓越，致力于成为一名优秀的前端开发工程师
            </p>
          </div>

          <div class="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div
              class="scroll-reveal"
              :class="{ active: isScrolledToElement('about') }"
              style="transition-delay: 0.1s"
            >
              <h3 class="text-dark mb-4 text-2xl font-semibold">我的经历</h3>
              <div class="space-y-6">
                <div class="flex">
                  <div class="mt-1 mr-4">
                    <div class="bg-primary h-3 w-3 rounded-full"></div>
                    <div class="ml-1 h-full w-0.5 bg-gray-200"></div>
                  </div>
                  <div>
                    <h4 class="text-dark text-lg font-bold">高级前端开发工程师</h4>
                    <p class="mb-1 text-gray-500">ABC科技有限公司 | 2021 - 至今</p>
                    <p class="text-gray-600">
                      负责公司核心产品的前端架构设计与实现，主导多个大型项目的前端开发工作
                    </p>
                  </div>
                </div>
                <div class="flex">
                  <div class="mt-1 mr-4">
                    <div class="bg-primary h-3 w-3 rounded-full"></div>
                    <div class="ml-1 h-full w-0.5 bg-gray-200"></div>
                  </div>
                  <div>
                    <h4 class="text-dark text-lg font-bold">前端开发工程师</h4>
                    <p class="mb-1 text-gray-500">XYZ互联网公司 | 2018 - 2021</p>
                    <p class="text-gray-600">
                      参与多个Web项目的前端开发，负责页面实现、交互效果和性能优化
                    </p>
                  </div>
                </div>
                <div class="flex">
                  <div class="mt-1 mr-4">
                    <div class="bg-primary h-3 w-3 rounded-full"></div>
                  </div>
                  <div>
                    <h4 class="text-dark text-lg font-bold">计算机科学与技术学士</h4>
                    <p class="mb-1 text-gray-500">上海交通大学 | 2014 - 2018</p>
                    <p class="text-gray-600">
                      专业排名前10%，多次获得校级奖学金，毕业设计获得优秀论文
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="scroll-reveal"
              :class="{ active: isScrolledToElement('about') }"
              style="transition-delay: 0.2s"
            >
              <h3 class="text-dark mb-4 text-2xl font-semibold">个人简介</h3>
              <p class="mb-6 leading-relaxed text-gray-600">
                拥有6年前端开发经验，擅长HTML5、CSS3、JavaScript及现代前端框架。
                注重代码质量和用户体验，热衷于学习新技术并应用到实际项目中。
              </p>
              <p class="mb-8 leading-relaxed text-gray-600">
                性格开朗，善于沟通，具备良好的团队协作精神和问题解决能力。
                除了编码，我还喜欢设计、摄影和旅行，这些爱好让我能够从不同角度思考问题，
                为产品带来更多创意和灵感。
              </p>

              <!-- 个人标签 -->
              <h4 class="text-dark mb-3 text-lg font-semibold">我的标签</h4>
              <div class="flex flex-wrap gap-3">
                <span class="bg-primary/10 text-primary rounded-full px-4 py-2 text-sm"
                  >前端开发</span
                >
                <span class="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">UI/UX</span>
                <span class="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">React</span>
                <span class="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700">Vue</span>
                <span class="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
                  >TypeScript</span
                >
                <span class="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
                  >性能优化</span
                >
                <span class="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
                  >响应式设计</span
                >
                <span class="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
                  >团队协作</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技能展示 -->
    <section id="skills" class="bg-gray-50 py-20">
      <div class="container mx-auto px-4 md:px-8">
        <div class="mx-auto max-w-4xl">
          <div
            class="scroll-reveal mb-16 text-center"
            :class="{ active: isScrolledToElement('skills') }"
          >
            <h2 class="text-dark mb-4 text-3xl font-bold md:text-4xl">我的技能</h2>
            <div class="bg-primary mx-auto mb-6 h-10 w-20 rounded-full"></div>
            <p class="mx-auto max-w-2xl text-gray-600">
              不断学习和积累，打造全面的技术栈，为项目提供可靠的技术支持
            </p>
          </div>

          <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <!-- 技术技能 -->
            <div
              class="scroll-reveal"
              :class="{ active: isScrolledToElement('skills') }"
              style="transition-delay: 0.1s"
            >
              <h3 class="text-dark mb-6 flex items-center text-2xl font-semibold">
                <i class="fa fa-code text-primary mr-3"></i> 技术技能
              </h3>

              <div class="space-y-6">
                <!-- HTML/CSS -->
                <div>
                  <div class="mb-2 flex justify-between">
                    <span class="font-medium text-gray-800">HTML/CSS/JavaScript</span>
                    <span class="text-gray-600">95%</span>
                  </div>
                  <div class="h-2.5 w-full rounded-full bg-gray-200">
                    <div class="bg-primary h-2.5 rounded-full" style="width: 95%"></div>
                  </div>
                </div>

                <!-- React -->
                <div>
                  <div class="mb-2 flex justify-between">
                    <span class="font-medium text-gray-800">React & React Native</span>
                    <span class="text-gray-600">90%</span>
                  </div>
                  <div class="h-2.5 w-full rounded-full bg-gray-200">
                    <div class="bg-primary h-2.5 rounded-full" style="width: 90%"></div>
                  </div>
                </div>

                <!-- Vue -->
                <div>
                  <div class="mb-2 flex justify-between">
                    <span class="font-medium text-gray-800">Vue.js</span>
                    <span class="text-gray-600">85%</span>
                  </div>
                  <div class="h-2.5 w-full rounded-full bg-gray-200">
                    <div class="bg-primary h-2.5 rounded-full" style="width: 85%"></div>
                  </div>
                </div>

                <!-- TypeScript -->
                <div>
                  <div class="mb-2 flex justify-between">
                    <span class="font-medium text-gray-800">TypeScript</span>
                    <span class="text-gray-600">88%</span>
                  </div>
                  <div class="h-2.5 w-full rounded-full bg-gray-200">
                    <div class="bg-primary h-2.5 rounded-full" style="width: 88%"></div>
                  </div>
                </div>

                <!-- 工程化 -->
                <div>
                  <div class="mb-2 flex justify-between">
                    <span class="font-medium text-gray-800">工程化 & 性能优化</span>
                    <span class="text-gray-600">92%</span>
                  </div>
                  <div class="h-2.5 w-full rounded-full bg-gray-200">
                    <div class="bg-primary h-2.5 rounded-full" style="width: 92%"></div>
                  </div>
                </div>

                <!-- UI/UX -->
                <div>
                  <div class="mb-2 flex justify-between">
                    <span class="font-medium text-gray-800">UI/UX 设计</span>
                    <span class="text-gray-600">75%</span>
                  </div>
                  <div class="h-2.5 w-full rounded-full bg-gray-200">
                    <div class="bg-primary h-2.5 rounded-full" style="width: 75%"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 技能图表 -->
            <div
              class="scroll-reveal"
              :class="{ active: isScrolledToElement('skills') }"
              style="transition-delay: 0.2s"
            >
              <h3 class="text-dark mb-6 flex items-center text-2xl font-semibold">
                <i class="fa fa-pie-chart text-primary mr-3"></i> 技能分布
              </h3>
              <div class="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm">
                <canvas id="skillsChart" height="300"></canvas>

                <!-- 附加技能 -->
                <div class="mt-8">
                  <h4 class="text-dark mb-4 text-lg font-semibold">附加技能</h4>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="flex items-center">
                      <i class="fa fa-check text-primary mr-2"></i>
                      <span class="text-gray-700">Git 版本控制</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fa fa-check text-primary mr-2"></i>
                      <span class="text-gray-700">Node.js 后端开发</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fa fa-check text-primary mr-2"></i>
                      <span class="text-gray-700">RESTful API 设计</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fa fa-check text-primary mr-2"></i>
                      <span class="text-gray-700">GraphQL</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fa fa-check text-primary mr-2"></i>
                      <span class="text-gray-700">WebPack/Vite</span>
                    </div>
                    <div class="flex items-center">
                      <i class="fa fa-check text-primary mr-2"></i>
                      <span class="text-gray-700">英语读写流利</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目经历 -->
    <section id="projects" class="bg-white py-20">
      <div class="container mx-auto px-4 md:px-8">
        <div class="mx-auto max-w-5xl">
          <div
            class="scroll-reveal mb-16 text-center"
            :class="{ active: isScrolledToElement('projects') }"
          >
            <h2 class="text-dark mb-4 text-3xl font-bold md:text-4xl">我的项目</h2>
            <div class="bg-primary mx-auto mb-6 h-1 w-20 rounded-full"></div>
            <p class="mx-auto max-w-2xl text-gray-600">
              精选项目展示，每一个项目都凝聚了我的心血和技术积累
            </p>
          </div>

          <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
            <!-- 项目1 -->
            <div
              class="scroll-reveal overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
              :class="{ active: isScrolledToElement('projects') }"
              style="transition-delay: 0.1s"
            >
              <div class="h-48 overflow-hidden">
                <img
                  src="https://picsum.photos/id/180/800/500"
                  alt="电商平台重构项目"
                  class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div class="p-6">
                <div class="mb-3 flex items-center justify-between">
                  <span class="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs"
                    >React + TypeScript</span
                  >
                  <a href="#" class="hover:text-primary text-gray-400 transition-colors">
                    <i class="fa fa-github text-lg"></i>
                  </a>
                </div>
                <h3 class="text-dark mb-2 text-xl font-bold">电商平台前端重构</h3>
                <p class="mb-4 text-gray-600">
                  对现有电商平台进行全面重构，优化用户体验和性能，提升页面加载速度30%以上。
                </p>
                <div class="mb-4 flex flex-wrap gap-2">
                  <span class="text-sm text-gray-500">React</span>
                  <span class="text-sm text-gray-500">TypeScript</span>
                  <span class="text-sm text-gray-500">Redux</span>
                  <span class="text-sm text-gray-500">Ant Design</span>
                </div>
                <a
                  href="#"
                  class="text-primary hover:text-primary/80 inline-flex items-center font-medium"
                >
                  查看详情 <i class="fa fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

            <!-- 项目2 -->
            <div
              class="scroll-reveal overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
              :class="{ active: isScrolledToElement('projects') }"
              style="transition-delay: 0.2s"
            >
              <div class="h-48 overflow-hidden">
                <img
                  src="https://picsum.photos/id/48/800/500"
                  alt="移动端健康管理APP"
                  class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div class="p-6">
                <div class="mb-3 flex items-center justify-between">
                  <span class="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs"
                    >React Native</span
                  >
                  <a href="#" class="hover:text-primary text-gray-400 transition-colors">
                    <i class="fa fa-github text-lg"></i>
                  </a>
                </div>
                <h3 class="text-dark mb-2 text-xl font-bold">健康管理移动应用</h3>
                <p class="mb-4 text-gray-600">
                  跨平台健康管理APP，支持运动记录、饮食管理、健康数据分析等功能，用户量超10万。
                </p>
                <div class="mb-4 flex flex-wrap gap-2">
                  <span class="text-sm text-gray-500">React Native</span>
                  <span class="text-sm text-gray-500">Redux Toolkit</span>
                  <span class="text-sm text-gray-500">Firebase</span>
                  <span class="text-sm text-gray-500">图表可视化</span>
                </div>
                <a
                  href="#"
                  class="text-primary hover:text-primary/80 inline-flex items-center font-medium"
                >
                  查看详情 <i class="fa fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

            <!-- 项目3 -->
            <div
              class="scroll-reveal overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
              :class="{ active: isScrolledToElement('projects') }"
              style="transition-delay: 0.3s"
            >
              <div class="h-48 overflow-hidden">
                <img
                  src="https://picsum.photos/id/26/800/500"
                  alt="企业管理后台系统"
                  class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div class="p-6">
                <div class="mb-3 flex items-center justify-between">
                  <span class="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs"
                    >Vue 3 + Element Plus</span
                  >
                  <a href="#" class="hover:text-primary text-gray-400 transition-colors">
                    <i class="fa fa-github text-lg"></i>
                  </a>
                </div>
                <h3 class="text-dark mb-2 text-xl font-bold">企业管理后台系统</h3>
                <p class="mb-4 text-gray-600">
                  为大型企业定制开发的管理后台，包含数据统计、用户管理、权限控制等功能模块。
                </p>
                <div class="mb-4 flex flex-wrap gap-2">
                  <span class="text-sm text-gray-500">Vue 3</span>
                  <span class="text-sm text-gray-500">Pinia</span>
                  <span class="text-sm text-gray-500">Element Plus</span>
                  <span class="text-sm text-gray-500">TypeScript</span>
                </div>
                <a
                  href="#"
                  class="text-primary hover:text-primary/80 inline-flex items-center font-medium"
                >
                  查看详情 <i class="fa fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

            <!-- 项目4 -->
            <div
              class="scroll-reveal overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl"
              :class="{ active: isScrolledToElement('projects') }"
              style="transition-delay: 0.4s"
            >
              <div class="h-48 overflow-hidden">
                <img
                  src="https://picsum.photos/id/96/800/500"
                  alt="个人博客系统"
                  class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div class="p-6">
                <div class="mb-3 flex items-center justify-between">
                  <span class="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs"
                    >Next.js + Tailwind CSS</span
                  >
                  <a href="#" class="hover:text-primary text-gray-400 transition-colors">
                    <i class="fa fa-github text-lg"></i>
                  </a>
                </div>
                <h3 class="text-dark mb-2 text-xl font-bold">个人技术博客系统</h3>
                <p class="mb-4 text-gray-600">
                  基于Next.js开发的个人技术博客，支持Markdown文章发布、标签分类、搜索等功能。
                </p>
                <div class="mb-4 flex flex-wrap gap-2">
                  <span class="text-sm text-gray-500">Next.js</span>
                  <span class="text-sm text-gray-500">Tailwind CSS</span>
                  <span class="text-sm text-gray-500">Markdown</span>
                  <span class="text-sm text-gray-500">MongoDB</span>
                </div>
                <a
                  href="#"
                  class="text-primary hover:text-primary/80 inline-flex items-center font-medium"
                >
                  查看详情 <i class="fa fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="mt-12 text-center">
            <a
              href="#"
              class="inline-flex items-center justify-center rounded-full bg-gray-100 px-8 py-3 font-medium text-gray-800 transition-all hover:bg-gray-200"
            >
              查看更多项目 <i class="fa fa-external-link ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我 -->
    <section id="contact" class="bg-gray-50 py-20">
      <div class="container mx-auto px-4 md:px-8">
        <div class="mx-auto max-w-4xl">
          <div
            class="scroll-reveal mb-16 text-center"
            :class="{ active: isScrolledToElement('contact') }"
          >
            <h2 class="text-dark mb-4 text-3xl font-bold md:text-4xl">联系我</h2>
            <div class="bg-primary mx-auto mb-6 h-1 w-20 rounded-full"></div>
            <p class="mx-auto max-w-2xl text-gray-600">
              无论你是有项目合作、工作机会，还是单纯想交流技术，都欢迎联系我
            </p>
          </div>

          <div class="grid grid-cols-1 gap-12 md:grid-cols-2">
            <!-- 联系信息 -->
            <div
              class="scroll-reveal"
              :class="{ active: isScrolledToElement('contact') }"
              style="transition-delay: 0.1s"
            >
              <h3 class="text-dark mb-6 text-2xl font-semibold">联系方式</h3>
              <div class="space-y-6">
                <div class="flex items-start">
                  <div
                    class="bg-primary/10 text-primary mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                  >
                    <i class="fa fa-envelope"></i>
                  </div>
                  <div>
                    <h4 class="mb-1 font-medium text-gray-900">电子邮箱</h4>
                    <p class="text-gray-600">liming@example.com</p>
                    <a
                      href="mailto:liming@example.com"
                      class="text-primary mt-1 inline-block hover:underline"
                      >发送邮件</a
                    >
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="bg-primary/10 text-primary mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                  >
                    <i class="fa fa-phone"></i>
                  </div>
                  <div>
                    <h4 class="mb-1 font-medium text-gray-900">电话</h4>
                    <p class="text-gray-600">+86 138 **** 8888</p>
                    <a href="tel:13800008888" class="text-primary mt-1 inline-block hover:underline"
                      >拨打电话</a
                    >
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="bg-primary/10 text-primary mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                  >
                    <i class="fa fa-map-marker"></i>
                  </div>
                  <div>
                    <h4 class="mb-1 font-medium text-gray-900">所在地</h4>
                    <p class="text-gray-600">上海市浦东新区</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="bg-primary/10 text-primary mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                  >
                    <i class="fa fa-weixin"></i>
                  </div>
                  <div>
                    <h4 class="mb-1 font-medium text-gray-900">微信</h4>
                    <p class="text-gray-600">liming_dev</p>
                    <div class="mt-2 flex h-32 w-32 items-center justify-center bg-gray-100">
                      <span class="text-sm text-gray-400">微信二维码</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 社交账号 -->
              <div class="mt-10">
                <h4 class="text-dark mb-4 text-lg font-semibold">社交账号</h4>
                <div class="flex space-x-4">
                  <a
                    href="#"
                    class="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-all hover:text-white"
                  >
                    <i class="fa fa-github"></i>
                  </a>
                  <a
                    href="#"
                    class="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-all hover:text-white"
                  >
                    <i class="fa fa-linkedin"></i>
                  </a>
                  <a
                    href="#"
                    class="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-all hover:text-white"
                  >
                    <i class="fa fa-codepen"></i>
                  </a>
                  <a
                    href="#"
                    class="hover:bg-primary flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-all hover:text-white"
                  >
                    <i class="fa fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>

            <!-- 联系表单 -->
            <div
              class="scroll-reveal"
              :class="{ active: isScrolledToElement('contact') }"
              style="transition-delay: 0.2s"
            >
              <h3 class="text-dark mb-6 text-2xl font-semibold">发送消息</h3>
              <form class="rounded-xl bg-white p-6 shadow-sm" @submit.prevent="handleFormSubmit">
                <div class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label for="name" class="mb-2 block text-gray-700">姓名</label>
                    <input
                      type="text"
                      id="name"
                      v-model="formData.name"
                      class="focus:ring-primary/50 focus:border-primary w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:ring-2 focus:outline-none"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  <div>
                    <label for="email" class="mb-2 block text-gray-700">邮箱</label>
                    <input
                      type="email"
                      id="email"
                      v-model="formData.email"
                      class="focus:ring-primary/50 focus:border-primary w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:ring-2 focus:outline-none"
                      placeholder="请输入您的邮箱"
                    />
                  </div>
                </div>

                <div class="mb-4">
                  <label for="subject" class="mb-2 block text-gray-700">主题</label>
                  <input
                    type="text"
                    id="subject"
                    v-model="formData.subject"
                    class="focus:ring-primary/50 focus:border-primary w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:ring-2 focus:outline-none"
                    placeholder="请输入消息主题"
                  />
                </div>

                <div class="mb-6">
                  <label for="message" class="mb-2 block text-gray-700">消息内容</label>
                  <textarea
                    id="message"
                    rows="5"
                    v-model="formData.message"
                    class="focus:ring-primary/50 focus:border-primary w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:ring-2 focus:outline-none"
                    placeholder="请输入您的消息内容"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  class="bg-primary hover:bg-primary/90 hover:shadow-primary/20 w-full rounded-lg py-3 font-medium text-white transition-all hover:shadow-lg"
                >
                  发送消息
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="bg-dark py-12 text-white">
      <div class="container mx-auto px-4 md:px-8">
        <div class="mx-auto max-w-4xl">
          <div class="mb-8 flex flex-col items-center justify-between md:flex-row">
            <div class="mb-6 flex items-center md:mb-0">
              <div
                class="bg-primary/20 mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
              >
                <i class="fa fa-code text-primary text-xl"></i>
              </div>
              <span class="text-xl font-bold">李明</span>
            </div>

            <div class="flex space-x-6">
              <a
                href="#home"
                class="text-gray-400 transition-colors hover:text-white"
                @click.prevent="handleNavClick('#home')"
              >
                首页
              </a>
              <a
                href="#about"
                class="text-gray-400 transition-colors hover:text-white"
                @click.prevent="handleNavClick('#about')"
              >
                关于我
              </a>
              <a
                href="#skills"
                class="text-gray-400 transition-colors hover:text-white"
                @click.prevent="handleNavClick('#skills')"
              >
                技能
              </a>
              <a
                href="#projects"
                class="text-gray-400 transition-colors hover:text-white"
                @click.prevent="handleNavClick('#projects')"
              >
                项目
              </a>
              <a
                href="#contact"
                class="text-gray-400 transition-colors hover:text-white"
                @click.prevent="handleNavClick('#contact')"
              >
                联系我
              </a>
            </div>
          </div>

          <div class="border-t border-gray-800 pt-8 text-center">
            <p class="mb-4 text-gray-400">© 2025 李明. 保留所有权利.</p>
            <p class="text-sm text-gray-500">设计与开发 by 李明 | 基于 Tailwind CSS 构建</p>
          </div>
        </div>
      </div>
    </footer>

    <!-- 回到顶部按钮 -->
    <button
      id="backToTop"
      class="bg-primary fixed right-8 bottom-8 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all"
      :class="{ 'invisible opacity-0': !showBackToTop, 'visible opacity-100': showBackToTop }"
      @click="scrollToTop"
    >
      <i class="fa fa-arrow-up"></i>
    </button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

// 响应式数据
const scrollPosition = ref(0)
const mobileMenuOpen = ref(false)
const showBackToTop = ref(false)
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

// 计算属性相关的响应式数据
const bgColor = ref('rgba(255, 255, 255, 0)')
const logoTextColor = ref('text-white')
const navTextColor = ref('text-white')
const navHoverColor = ref('hover:text-secondary')
const menuBtnColor = ref('text-white')

// 滚动事件处理
const handleScroll = () => {
  scrollPosition.value = window.scrollY
  const solidThreshold = 300

  // 计算透明度
  const opacity = Math.min(scrollPosition.value / solidThreshold, 1)
  bgColor.value = `rgba(255, 255, 255, ${opacity})`

  // 文字颜色判断
  const isDarkText = opacity > 0.5
  logoTextColor.value = isDarkText ? 'text-primary' : 'text-white'
  navTextColor.value = isDarkText ? 'text-gray-800' : 'text-white'
  navHoverColor.value = isDarkText ? 'hover:text-primary' : 'hover:text-secondary'
  menuBtnColor.value = isDarkText ? 'text-gray-800' : 'text-white'

  // 回到顶部按钮显示/隐藏
  showBackToTop.value = scrollPosition.value > 500

  // 触发滚动动画
  triggerScrollReveal()
}

// 移动端菜单切换
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// 导航点击处理
const handleNavClick = (targetId) => {
  const targetElement = document.querySelector(targetId)
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth',
    })
  }

  // 关闭移动端菜单
  mobileMenuOpen.value = false
}

// 回到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// 表单提交处理
const handleFormSubmit = () => {
  // 这里可以添加表单验证和提交逻辑
  console.log('表单提交:', formData.value)
  // 提交成功后重置表单
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: '',
  }
  alert('消息发送成功！我会尽快回复你。')
}

// 滚动动画触发
const triggerScrollReveal = () => {
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal')
  scrollRevealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('active')
    }
  })
}

// 检查元素是否在视口中
const isScrolledToElement = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (!element) return false

  const elementTop = element.getBoundingClientRect().top
  const elementVisible = 150
  return elementTop < window.innerHeight - elementVisible
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 初始化时触发一次滚动事件
  handleScroll()
  // 初始化图表
  // 初始化滚动动画
  triggerScrollReveal()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 导入外部资源 */
@import url('https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css');

/* 自定义工具类 */
@layer utilities {
  .transition-header {
    transition:
      background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .animate-fade-in {
    animation: fadeIn 0.8s ease forwards;
  }
  .scroll-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }
  .scroll-reveal.active {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 自定义动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 全局样式 */
:root {
  --color-primary: #165dff;
  --color-secondary: #36cffb;
  --color-dark: #1e293b;
  --color-light: #f8fafc;
}

/* 覆盖Tailwind颜色 */
.bg-primary {
  background-color: var(--color-primary);
}
.text-primary {
  color: var(--color-primary);
}
.border-primary {
  border-color: var(--color-primary);
}
.hover\:bg-primary:hover {
  background-color: var(--color-primary);
}
.hover\:text-primary:hover {
  color: var(--color-primary);
}
.focus\:ring-primary\/50:focus {
  --tw-ring-color: rgba(22, 93, 255, 0.5);
}
.focus\:border-primary:focus {
  border-color: var(--color-primary);
}

.bg-secondary {
  background-color: var(--color-secondary);
}
.text-secondary {
  color: var(--color-secondary);
}
.hover\:text-secondary:hover {
  color: var(--color-secondary);
}

.bg-dark {
  background-color: var(--color-dark);
}
.text-dark {
  color: var(--color-dark);
}

.bg-light {
  background-color: var(--color-light);
}
.text-light {
  color: var(--color-light);
}

/* 确保Chart.js容器有高度 */
#skillsChart {
  height: 300px !important;
}
</style>
