<!--
 * @Author: zhanghan
 * @Date: 2023-01-10 14:28:29
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-16 00:26:29
 * @Descripttion: 快速上手
-->
<template>
  <div class="page-container">
    <div class="doc-section">
      <h2 class="section-title">属性配置</h2>
      <div class="property-card">
        <div class="property-item">
          <div class="property-name">fileUrl</div>
          <div class="property-type">string</div>
          <div class="property-desc">上传的地址（必传）</div>
        </div>
        <div class="property-item">
          <div class="property-name">useOfficeMicroOnline</div>
          <div class="property-type">boolean</div>
          <div class="property-desc">是否开启使用微软提供的office文件在线访问接口（仅office文件格式有效: [docx, pptx, xlsx], 内网使用无效，可选，默认false）</div>
        </div>
        <div class="property-item">
          <div class="property-name">showCtrolBtn</div>
          <div class="property-type">boolean</div>
          <div class="property-desc">v1.3.2 是否显示控制工具按钮块（可选，默认true）</div>
        </div>
        <div class="property-item">
          <div class="property-name">showScaleBtn</div>
          <div class="property-type">boolean</div>
          <div class="property-desc">v1.3.2 是否显示放大缩小按钮（可选，默认true）</div>
        </div>
        <div class="property-item">
          <div class="property-name">showDownLoadBtn</div>
          <div class="property-type">boolean</div>
          <div class="property-desc">v1.3.2 是否显示下载按钮（可选，默认true）</div>
        </div>
      </div>

      <h3 class="sub-section-title">事件</h3>
      <div class="property-card">
        <div class="property-item">
          <div class="property-name">fileLoaded</div>
          <div class="property-type">function</div>
          <div class="property-desc">
            文档加载完成的回调函数 
            <label class="note">（iframe请使用window.addEventListener('message', (event) => {})接收事件回调，查阅示例代码）</label>
          </div>
        </div>
      </div>

      <h3 class="sub-section-title">注意事项</h3>
      <div class="notes-card">
        <ul class="note-list">
          <li>被浏览的文件链接必须同源或本身支持跨域才能访问和下载文件。</li>
          <li>
            若发布生产的项目不在服务器域名根目录，记得配置打包的前缀路径，打包后资源才能被正常引用。（以vue-cli为例，配置
            <code>vue.config.js</code>
            的
            <code>publicPath: './'</code>
            ； 其他框架请自行选择合适的配置文件进行配置）
          </li>
          <li>
            由于office系列格式的文件解析微软不开源，无法保证百分百还原文档效果，若实际需求没有严格要求百分百还原一致，您可以使用纯前端渲染office文件的这种方式，否则建议通过后端统一转为PDF或者图片格式进行浏览，PDF和图片格式的文件浏览效果最佳，内核渲染方案也较为成熟。
          </li>
          <li>
            或者您也可以通过iframe或者组件形式传递
            <code>useOfficeMicroOnline = true</code>
            这个属性开启office系列文件使用内置的微软文档在线访问接口，浏览效果会比纯前端渲染好。
          </li>
        </ul>
      </div>
    </div>

    <div class="tabs-container">
      <div class="tabs-header">
        <div 
          v-for="(tab, index) in tabs" 
          :key="index" 
          :class="['tab-item', { active: activeTab === index }]"
          @click="activeTab = index"
        >
          {{ tab.title }}
        </div>
      </div>
      
      <div class="tab-content">
        <!-- Tab 1: iframe引入方式 -->
        <div v-show="activeTab === 0" class="tab-pane">
          <div class="usage-card">
            <h3 class="sub-section-title">使用说明</h3>
            <div class="usage-desc">
              <p>
                推荐直接部署本项目最新版本的独立构建产物
                <a
                  href="https://github.com/zyl-ui/vue-file-viewer/tree/master/public/file-viewer"
                  target="_blank"
                  class="link"
                >
                  file-viewer
                </a>
                ，并使用iframe方式引入以减少引入构建代价，提升构建效率。
              </p>
              <p>此种方式支持跨框架使用。</p>
            </div>

            <h3 class="sub-section-title">使用步骤</h3>
            <ol class="step-list">
              <li>
                需要自行前往本项目源码处下载编译构建后的产物
                <a
                  href="https://github.com/zyl-ui/vue-file-viewer/tree/master/public/file-viewer"
                  target="_blank"
                  class="link"
                >
                  file-viewer
                </a>
                。
              </li>
              <li>
                将下载后的 file-viewer
                文件夹整个放在项目公共文件夹中作为外部公共资源使用。 （以 vue-cli
                为例，放置在项目 public 文件夹下；其他框架自行选择合适的公共路径放置）
              </li>
            </ol>

            <h3 class="sub-section-title">使用示例</h3>
            <div class="example-container">
              <div class="example-preview">
                <iframe
                  src="./file-viewer/index.html?fileUrl=/fileTest/pdf.pdf"
                  scrolling="auto"
                  id="file-viewer"
                  class="preview-iframe"
                />
              </div>
              <div class="example-code">
                <Collapse>
                  <div class="code-container">
                    <CodeSnippet class="snippet" :code="iframeSnippet" lang="html" />
                    <div class="code-plus">+</div>
                    <CodeSnippet class="snippet" :code="iframeSnippet2" lang="js" />
                  </div>
                </Collapse>
              </div>
            </div>

            <div class="usage-note">
              <h4 class="note-title">微软文档在线访问</h4>
              <p>
                可通过
                <code>useOfficeMicroOnline = true</code>
                开启微软文档在线访问接口，该接口兼容不带后缀x的低版本文档，如：doc或者docx；
                开启后属于office的文件会通过微软提供的api接口进行访问
                <code>http://view.officeapps.live.com/op/view.aspx?src=文件地址</code>
                （隐私文件不推荐开启，该选项内网无联网时不可用）
              </p>
              <p class="warning">
                注意事项：若手机端通过iframe访问微软文档，整个父页面会被重定向，自
                <code>v1.2.1</code>
                版本开始，手机端访问时需要用户手动点击跳转查看，pc端可正常访问。
              </p>
            </div>

            <div class="example-container">
              <div class="example-preview">
                <iframe
                  src="./file-viewer/index.html?useOfficeMicroOnline=true&fileUrl=/fileTest/word.docx"
                  scrolling="auto"
                  class="preview-iframe"
                />
              </div>
              <div class="example-code">
                <Collapse>
                  <div class="code-container">
                    <CodeSnippet
                      class="snippet"
                      :code="useOfficeMicroOnlineSnippet"
                      lang="html"
                    />
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Tab 2: 组件引入方式 -->
        <div v-show="activeTab === 1" class="tab-pane">
          <div class="usage-card">
            <h3 class="sub-section-title">安装</h3>
            <div class="install-steps">
              <CodeSnippet class="snippet" :code="installSnippet1" lang="js" />
              <CodeSnippet class="snippet" :code="installSnippet2" lang="js" />
              <div class="import-note">或者页面内按需引入：</div>
              <CodeSnippet class="snippet" :code="installSnippet3" lang="js" />
            </div>

            <h3 class="sub-section-title">使用示例</h3>
            <div class="example-container">
              <div class="example-preview">
                <vue-file-viewer
                  :fileUrl="file"
                  class="preview-component"
                  @fileLoaded="fileLoaded"
                />
              </div>
              <div class="example-code">
                <Collapse>
                  <div class="code-container">
                    <CodeSnippet class="snippet" :code="componentSnippet1" lang="html" />
                    <div class="code-plus">+</div>
                    <CodeSnippet class="snippet" :code="componentSnippet2" lang="js" />
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Tab 3: blob二进制流方式 -->
        <div v-show="activeTab === 2" class="tab-pane">
          <div class="usage-card">
            <h3 class="sub-section-title">注意事项</h3>
            <ul class="note-list">
              <li>
                若为node环境，且发布生产的项目不在服务器域名根目录，这将导致生产和开发环境的引用路径不一致（由于动态赋值的路径只会被编译器原样解析，需要特别注意通过配置打包的前缀路径也不会对此次生效，例如
                <code>vue-cli</code>
                的
                <code>publicPath</code>
                ），可通过
                <code>process.env.NODE_ENV</code>
                进行手动判断。
              </li>
              <li>若为浏览器环境，若有需要可在前面配置统一前缀路径即可。</li>
            </ul>

            <div class="example-container">
              <div class="example-preview" id="blobIframe" style="height: 500px"></div>
              <div class="example-code">
                <Collapse>
                  <div class="code-container">
                    <CodeSnippet class="snippet" :code="blobIframeSnippet1" lang="html" />
                    <div class="code-plus">+</div>
                    <CodeSnippet class="snippet" :code="blobIframeSnippet2" lang="js" />
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CodeSnippet from '../components/CodeSnippet.vue'
import Collapse from '../components/Collapse.vue'
import { config } from '../config'

const iframeSnippet = `
<iframe
  src="./file-viewer/index.html?fileUrl=/fileTest/pdf.pdf"
  scrolling="auto"
  style="border:0;height: 500px;width:100%"
/>
`

const iframeSnippet2 = `
// 添加消息事件监听器来处理iframe发来的消息
window.addEventListener('message', (event) => {
  // 处理 fileLoaded 类型的消息
  if (event.data.type === 'fileLoaded') {
    console.log('文件加载完成：', event.data.data)
  }
})
`

const useOfficeMicroOnlineSnippet = `
<iframe
  src="./file-viewer/index.html?useOfficeMicroOnline=true&fileUrl=/fileTest/word.docx"
  scrolling="auto"
  style="border:0;height: 500px;width:100%"
/>
`

const blobIframeSnippet1 = `
<div id="blobIframe" style="height: 500px"></div>
`

const blobIframeSnippet2 = `
import axios from 'axios'
export default {
  data() {
    return {
      context: {
        // 查看器的地址
        // 自己项目内部署需要将编译后的产物file-viewer放在public文件夹中使用,编译后的产物需要下载，下载链接在文档上
        // 若为node环境，且发布生产的项目不在服务器域名根目录，这将导致生产和开发环境的引用路径不一致（由于动态赋值的路径只会被编译器原样解析，需要特别注意通过配置打包的前缀路径也不会对此次生效，例如vue-cli的publicPath），可通过process.env.NODE_ENV进行手动判断
        // origin: location.origin + process.env.NODE_ENV === 'production'
            ? '/你的前缀路径（没有可去除）/file-viewer/index.html'
            : '/file-viewer/index.html',
        // 若为浏览器环境，若有需要可在/file-viewer前面配置统一前缀路径即可
        origin: location.origin + '/你的前缀路径（没有可去除）/file-viewer/index.html',
        // 目标frame
        frame: null,
        // 浏览的文件url
        url: window.location.origin + '/fileTest/pic.png'
      }
    }
  },
  mounted() {
    this.loadFromUrl()
  },
  methods: {
    // 获取文件二进制流
    loadFromUrl() {
      // 要预览的文件地址
      var url = this.context.url
      // 取得文件名
      var filename = url.substring(url.lastIndexOf('/') + 1)
      // 拼接iframe请求url
      var src =
        this.context.origin +
        '?name=' +
        encodeURIComponent(filename) +
        '&from=' +
        encodeURIComponent(location.origin)
      // 拼接frame
      var frame = this.appendFrame(src)
      // 绑定事件
      frame.onload = () => {
        axios({
          url,
          method: 'get',
          responseType: 'blob'
        }).then((data) => {
          if (!data) {
            console.error('文件下载失败')
          }
          console.log(data)
          // 最重要的一步，可以推送流到iframe
          frame.contentWindow.postMessage(data.data, this.context.origin)
        })
      }
    },
    // 插入iframe
    appendFrame(src) {
      var blobIframe = document.getElementById('blobIframe')
      if (this.context.frame) {
        blobIframe.removeChild(this.context.frame)
      }
      // 构建frame
      var frame = (this.context.frame = document.createElement('iframe'))
      frame.src = src
      frame.style = 'border:0;height: 100%;width:100%'
      return blobIframe.appendChild(frame)
    }
  }
`

const installSnippet1 = `npm install --save '${config.name}'`

const installSnippet2 = `
import Vue from 'vue'
import App from './App.vue'
import VueFileViewer from '${config.name}'

Vue.use(VueFileViewer)

new Vue({
  el: '#app',
  render: h => h(App)
});
`

const installSnippet3 = `
import { VueFileViewer } from '${config.name}'

export default {
  components: {
    VueFileViewer
  }
}
`

const componentSnippet2 = `
data () {
  return {
    file: window.location.origin + '/fileTest/word.docx' // or 原生 File 文件对象也可以被接收
  }
},
methods: {
  // 文件加载完成：回调
  fileLoaded(e) {
    console.log('文件加载完成：', e)
  }
}
`

const componentSnippet1 = `
<vue-file-viewer :fileUrl="file"  style="height: 500px;" @fileLoaded="fileLoaded"/>
`
export default {
  name: 'Start',
  components: {
    CodeSnippet,
    Collapse
  },

  data() {
    return {
      config,
      iframeSnippet,
      iframeSnippet2,
      useOfficeMicroOnlineSnippet,
      blobIframeSnippet1,
      blobIframeSnippet2,
      installSnippet1,
      installSnippet2,
      installSnippet3,
      componentSnippet2,
      componentSnippet1,
      file: window.location.origin + '/fileTest/word.docx',
      context: {
        // 查看器的地址
        // 自己项目内部署需要将编译后的产物file-viewer放在public文件夹中使用,编译后的产物需要下载，下载链接在文档上
        // 若为node环境，且发布生产的项目不在服务器域名根目录，这将导致生产和开发环境的引用路径不一致（由于动态赋值的路径只会被编译器原样解析，需要特别注意通过配置打包的前缀路径也不会对此次生效，例如vue-cli的publicPath），可通过process.env.NODE_ENV进行手动判断
        origin:
          location.origin +
          (process.env.NODE_ENV === 'production'
            ? '/file-viewer/index.html'
            : '/file-viewer/index.html'),
        // 目标frame
        frame: null,
        // 浏览的文件url
        url: window.location.origin + '/fileTest/pic.png'
      },
      // Tab相关数据
      activeTab: 0,
      tabs: [
        { title: '1、iframe引入方式（推荐）' },
        { title: '2、组件引入方式' },
        { title: '3、blob二进制流方式' }
      ]
    }
  },
  mounted() {
    this.loadFromUrl()
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)

    // 添加消息事件监听器来处理iframe发来的消息
    window.addEventListener('message', (event) => {
      // 处理 fileLoaded 类型的消息
      if (event.data.type === 'fileLoaded') {
        console.log('文件加载完成：', event.data.data)
      }
    })
  },
  methods: {
    // 获取文件二进制流
    loadFromUrl() {
      // 要预览的文件地址
      var url = this.context.url
      // 取得文件名
      var filename = url.substring(url.lastIndexOf('/') + 1)
      // 拼接iframe请求url
      var src =
        this.context.origin +
        '?name=' +
        encodeURIComponent(filename) +
        '&from=' +
        encodeURIComponent(location.origin)
      // 拼接frame
      var frame = this.appendFrame(src)
      // 绑定事件
      frame.onload = () => {
        axios({
          url,
          method: 'get',
          responseType: 'blob'
        }).then((data) => {
          if (!data) {
            console.error('文件下载失败')
          }
          console.log(data)
          // 最重要的一步，可以推送流到iframe
          frame.contentWindow.postMessage(data.data, this.context.origin)
        })
      }
    },
    // 插入iframe
    appendFrame(src) {
      var blobIframe = document.getElementById('blobIframe')
      if (this.context.frame) {
        blobIframe.removeChild(this.context.frame)
      }
      // 构建frame
      var frame = (this.context.frame = document.createElement('iframe'))
      frame.src = src
      frame.style = 'border:0;height: 100%;width:100%'
      return blobIframe.appendChild(frame)
    },
    // 文件加载完成：回调
    fileLoaded(e) {
      console.log('文件加载完成：', e)
    }
  }
}
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #2c3e50;
  line-height: 1.6;
}

.doc-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
}

.doc-header h1 {
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #1a1a1a;
}

.doc-description {
  font-size: 18px;
  color: #666;
}

.doc-section {
  margin-bottom: 50px;
}

.section-title {
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #409eff;
  color: #1a1a1a;
}

.sub-section-title {
  font-size: 22px;
  font-weight: 500;
  margin: 25px 0 15px;
  color: #333;
}

.property-card, .notes-card, .usage-card {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 15px;
}

.property-item {
  display: flex;
  flex-wrap: wrap;
  padding: 12px 0;
  border-bottom: 1px solid #eaeaea;
}

.property-item:last-child {
  border-bottom: none;
}

.property-name {
  font-weight: 600;
  color: #409eff;
  flex: 0 0 200px;
}

.property-type {
  font-family: monospace;
  padding: 2px 6px;
  border-radius: 3px;
  background-color: #f0f9ff;
  color: #409eff;
  margin-right: 10px;
  font-size: 14px;
  height: fit-content;
}

.property-desc {
  flex: 1;
  min-width: 300px;
}

.note-list, .step-list {
  padding-left: 20px;
  margin: 0;
}

.note-list li, .step-list li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.note {
  font-style: italic;
  color: #666;
  font-size: 14px;
}

.link {
  color: #409eff;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

.example-container {
  background-color: #f9f9f9;
  border-radius: 6px;
  overflow: hidden;
  margin: 20px 0;
}

.example-preview {
  border-bottom: 1px solid #eaeaea;
}

.preview-iframe, .preview-component {
  width: 100%;
  height: 500px!important;
  border: 0;
}

.example-code {
  padding: 10px;
}

.code-container {
  display: flex;
  flex-direction: column;
}

.code-plus {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 24px;
  color: #909399;
}

.install-steps {
  margin: 15px 0;
}

.import-note {
  margin: 15px 0 5px;
  font-size: 14px;
  color: #666;
}

.usage-note {
  background-color: #f0f9ff;
  border-left: 4px solid #409eff;
  padding: 15px;
  margin: 20px 0;
  border-radius: 0 4px 4px 0;
  word-break: break-word;
}

.note-title {
  margin-top: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.warning {
  color: #e6a23c;
  font-weight: 500;
}

code {
  background-color: #f0f0f0;
  padding: 2px 5px;
  border-radius: 3px;
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  font-size: 14px;
  color: #c7254e;
}

@media (max-width: 768px) {
  .property-name, .property-desc {
    flex: 0 0 100%;
  }
  
  .property-type {
    margin-bottom: 5px;
  }
  
  .doc-header h1 {
    font-size: 28px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .sub-section-title {
    font-size: 20px;
  }
}

.tabs-container {
  margin-top: 30px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.tabs-header {
  display: flex;
  background-color: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}

.tab-item {
  padding: 15px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  font-weight: 500;
  color: #606266;
}

.tab-item:hover {
  color: #409eff;
}

.tab-item.active {
  color: #409eff;
  background-color: #fff;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #409eff;
}

.tab-content {
  padding: 20px;
}

.tab-pane {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 适配移动端的tab样式 */
@media (max-width: 768px) {
  .tabs-header {
    flex-direction: column;
  }
  
  .tab-item {
    padding: 12px 15px;
    text-align: center;
  }
  
  .tab-item.active::after {
    width: 100%;
  }
}
</style>
