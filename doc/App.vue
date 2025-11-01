<template>
  <div id="app">
    <header>
      <h1>vue-file-viewer</h1>
      <div class="description">{{ config.description }}</div>
      <section class="nav">
        <router-link v-for="d in routes" :key="d.path" :to="d.path">
          {{ d.name }}
        </router-link>
        <a href="https://github.com/zyl-ui/vue-file-viewer" target="_blank">
          源码
        </a>
        <a @click="toggleFullscreen">切换全屏</a>
      </section>
      <div
        class="command-container"
        v-if="$route.path === '/' || $route.path === '/home'"
      >
        <div class="command-title">推荐 iframe 引入方式</div>
        <div class="command-steps">
          <div class="step">
            <div class="step-title">STEP 1: 下载最新资源包</div>
            <div class="step-content">
              <a
                href="https://github.com/zyl-ui/vue-file-viewer/releases"
                target="_blank"
                class="download-link"
              >
                点此下载 releases 版本
              </a>
            </div>
          </div>
          <div class="step">
            <div class="step-title">
              STEP 2: 将项目中 public 文件夹下的 file-viewer 文件夹拷贝到您自己的项目公共目录（如Pubilc文件夹下）
            </div>
          </div>
          <div class="step">
            <div class="step-title">STEP 3: iframe 引入</div>
            <div class="step-content code-block">
              <pre>
                <code>&lt;iframe 
                  src="./file-viewer/index.html?fileUrl=/fileTest/pdf.pdf"
                  scrolling="auto"
                  id="file-viewer"
                  style="border:0;height: 500px;width:100%"
                /&gt;</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </header>

    <router-view />

    <section class="more">
      <div>
        (©) 2023 - {{ new Date().getFullYear() }} copy by
        <a href="https://blog.yiwowang.com/" target="_blank">追寻</a>

        提供源码内核思路
      </div>
      <div>
        特别鸣谢
        <a href="https://blog.csdn.net/wybaby168/" target="_blank">
          小爬的老粉丝
        </a>
      </div>
    </section>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import { routes } from './router'
import { config } from './config'

export default {
  data() {
    return {
      routes: routes.filter((route) => route.name),
      config
    }
  },
  created() {
    document.title = config.name + '-demo'
  },
  methods: {
    toggleFullscreen(event) {
      if (screenfull.isEnabled) {
        screenfull.toggle(document.documentElement)
      }
    }
  }
}
</script>

<style lang="scss">
body {
  background: white;
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  background: var.$primary-color;
  padding: 32px 20px 20px;

  .description {
    color: white;
    margin-top: 24px;
  }
}

.command-container {
  max-width: 700px;
  margin: 20px auto;
  background: color.scale(var.$primary-color, $lightness: -20%);
  border-radius: 6px;
  padding: 16px;
  color: white;

  .command-title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 8px;
  }

  .command-steps {
    .step {
      margin-bottom: 14px;

      .step-title {
        font-weight: bold;
        margin-bottom: 8px;
      }

      .step-content {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        padding: 10px;
      }

      .download-link {
        color: #fff;
        text-decoration: underline;

        &:hover {
          color: color.scale(var.$primary-color, $lightness: 80%);
        }
      }

      .code-block {
        pre {
          margin: 0;
          overflow-x: auto;

          code {
            white-space: pre;
            font-family: monospace;
            font-size: 14px;
            line-height: 1.5;
          }
        }
      }
    }
  }
}

.command {
  background: color.scale(var.$primary-color, $lightness: -20%);
  color: white;
  font-family: monospace;
  max-width: 500px;
  margin: 12px auto;
  border-radius: 2px;
  padding: 12px 24px;
  box-sizing: border-box;
  text-align: center;
}

.page-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  word-break: break-word;
}

section .section-content {
  margin: 0;
  box-sizing: border-box;
}

section.nav {
  text-align: center;
  background: var.$primary-color;
  padding: 40px 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

section.nav > * {
  flex: auto 0 0;
}

section.nav a {
  display: inline-block;
  padding: 0 16px;
  height: 36px;
  line-height: 36px;
  color: white;
  background: color.scale(var.$primary-color, $lightness: 20%);
  border-radius: 3px;
}

section.nav a:hover {
  background: color.scale(var.$primary-color, $lightness: 40%);
}

section.nav a:not(:last-child) {
  margin-right: 8px;
}

.collapse .section-content {
  padding: 12px 0 40px 0;
}

h1 {
  margin-top: 0;
  color: white;
  font-weight: normal;
  text-align: center;
}

h2 {
  font-weight: normal;
}

a {
  color: var.$primary-color;
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  color: color.scale(var.$primary-color, $lightness: 20%);
}

.description {
  color: white;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
}

.snippet {
  margin: 16px 0;
}

.plus {
  text-align: center;
  color: var.$primary-color;
  font-size: 32px;
  margin: 12px;
}

.snippets {
  background: #f7f7f7;
  border: 1px solid #f7f7f7;
  margin-bottom: 42px;
  border-radius: 0 0 3px 3px;
}

.demo {
  background: white;
  border: 1px solid #eee;
  border-radius: 3px 3px 0 0;
}

.more {
  font-size: 18px;
  text-align: center;
  background: color.scale(var.$primary-color, $lightness: 85%);
  padding: 10px 0;
}
</style>
