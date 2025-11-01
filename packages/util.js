/*
 * @Author: zhanghan
 * @Date: 2023-01-09 21:22:17
 * @LastEditors: zhanghan
 * @LastEditTime: 2023-01-13 11:59:23
 * @Descripttion:
 */
import { atob } from './pollify'
import renders from './renders'

/**
 * 文件对象转文件流
 * @param {object} file 文件对象
 */
export async function readBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (loadEvent) => resolve(loadEvent.target.result)
    reader.onerror = (e) => reject(e)
    reader.readAsArrayBuffer(file)
  })
}

/**
 * 文件流转base64
 * @param {object} buffer 文件流
 */
export async function readDataURL(buffer) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (loadEvent) => resolve(loadEvent.target.result)
    reader.onerror = (e) => reject(e)
    reader.readAsDataURL(new Blob([buffer]))
  })
}

/**
 * 文件流转utf8文本
 * @param {object} buffer 文件流
 */
export async function readText(buffer) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (loadEvent) => resolve(loadEvent.target.result)
    reader.onerror = (e) => reject(e)
    reader.readAsText(new Blob([buffer]), 'utf-8')
  })
}

/**
 * 获取文件后缀
 * @param {string} name 文件名
 */
export function getExtend(name) {
  // 移除 URL 参数和哈希片段
  const cleanName = name.split('?')[0].split('#')[0]
  const dot = cleanName.lastIndexOf('.')
  return dot === -1 ? '' : cleanName.substring(dot + 1)
}

/**
 * 文件下载函数
 * @param {string | blob} file 文件，支持传入url/blob/base64格式
 * @param {string} name 文件名称，需要带后缀如：abc.jpg（为url可不传入，会自动获取文件名）
 */
export function fileDownload(file, name) {
  if (!file) {
    throw new Error('文件不能为空')
  }

  // file是url
  if (typeof file === 'string' && file.indexOf('http') > -1) {
    name = name ? name : getUrlFileName(file)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = file
    link.target = '_blank'
    link.setAttribute('download', name) // 自定义下载文件名（如exemple.txt）
    document.body.appendChild(link)
    link.click()
    return
  }

  if (!name) {
    throw new Error('文件名不能为空')
  }

  // file是base64先转blob
  if (typeof file === 'string') {
    file = base64toBlob(file)
  }

  // file是blob
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveOrOpenBlob(file, name)
  } else {
    const url = window.URL.createObjectURL(new Blob([file]))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.target = '_blank'
    link.setAttribute('download', name) // 自定义下载文件名（如exemple.txt）
    document.body.appendChild(link)
    link.click()
  }
}

/**
 * Base64 转 Blob
 * @param {string} base64String Blob格式数据
 */
export function base64toBlob(base64String) {
  var arr = base64String.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime
  })
}

/**
 * 获取链接文件名+后缀
 * @param {string} url 文件地址
 */
export function getUrlFileName(url) {
  if (!url) return ''
  const file = url.split('/')
  return file[file.length - 1] || ''
}

/**
 * 根据文件类型渲染对应容器
 * @param {buffer} buffer 文件流
 * @param {buffer} target 渲染目标元素
 * @param {buffer} type 文件类型
 * @param {buffer} name 文件名称
 **/
export async function render(buffer, target, type, name) {
  const handler = renders[type]
  if (handler) {
    return handler(...arguments)
  }
  return renders.error(...arguments)
}

/**
 * 使用时间戳为Blob文件生成文件名
 * @param {Blob} blob 文件
 **/
export function generateFilenameFromBlob(blob) {
  // MIME类型与扩展名映射表
  const mimes = {
    // 富文本文档
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/pdf': 'pdf',

    // 图片
    'image/gif': 'gif',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/bmp': 'bmp',
    'image/tiff': 'tiff',
    'image/tif': 'tif',
    'image/svg+xml': 'svg',

    // 文本与代码
    'text/plain': 'txt',
    'application/json': 'json',
    'text/javascript': 'js',
    'application/javascript': 'js',
    'text/css': 'css',
    'text/html': 'html',
    'text/markdown': 'md',
    'application/xml': 'xml',
    'text/xml': 'xml',
    'text/x-java-source': 'java',
    'text/x-python': 'py',
    'text/typescript': 'ts',
    'text/tsx': 'tsx',
    'text/jsx': 'jsx',
    'text/x-log': 'log',

    // 视频
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'video/ogg': 'ogv',

    // 音频
    'audio/mpeg': 'mp3',
    'audio/mp3': 'mp3',
    'audio/wav': 'wav',
    'audio/ogg': 'ogg',
  }

  // 取出扩展名，如果找不到则用 bin 作为默认
  const ext = mimes[blob.type]

  if (!ext) {
    throw new Error('不支持该类型的文件')
  }

  // 格式化时间戳（YYYYMMDD_HHmmss）
  const timestamp = new Date().toISOString()
    .replace(/[-:T]/g, '')    // 去掉 - : T
    .split('.')[0]            // 去掉毫秒
    .replace('Z', '')

  // 拼出文件名
  return `${timestamp}.${ext}`
}
