![image](https://github.com/user-attachments/assets/6fab3b1d-4653-40b5-9a88-4c6772cbd8a0)# CloudPaste - 在线剪贴板 📋

![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange?style=flat-square&logo=cloudflare)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-green?style=flat-square&logo=vue.js)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

一个基于 Cloudflare Workers 的在线剪贴板和文件分享服务。支持 Markdown、密码保护、文件上传等功能。

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/8c2b0ac0-75ca-430d-a9fb-c2b94e00bf3c" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/313e54c5-d686-4cff-8985-e18c6d92dda1" width="400"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/f2cf3243-d01a-4e4b-9073-da88973eea10" width="400"/></td>
    <td><img src="https://github.com/user-attachments/assets/abcf4219-ebde-4630-8666-f7de1834a28d" width="400"/></td>
  </tr>
</table>


## ✨ 功能特点

### 📝 文本分享
- 支持普通文本和 Markdown 格式
- Markdown 实时预览和同步滚动
- 完整的 Markdown 样式支持
  - 优化的列表嵌套显示
  - 美化的表格样式
  - 代码块实时语法高亮
  - 标准的任务列表样式
  - 优化的引用块样式
- 编辑器支持双向拉伸调整大小
- 支持密码保护
- 自定义过期时间
- 自定义分享链接后缀
- 同步滚动预览

### 📁 文件分享
- 支持拖拽上传
- 多文件上传
- 文件大小限制（25MB，自定义不超R2限制就行）
- 密码保护
- 自定义过期时间
- 上传进度显示

### 👨‍💻 管理功能
- 管理员登录
- 查看所有分享链接
- 分类过滤（文本/文件）
- 删除分享（带确认提示）
- 复制分享链接
- 查看分享统计

### 🛡️ 安全特性
- 密码加密存储
- 自动过期清理 （每当有请求访问时，检查当前时间，如果是整点（分钟为0），触发清理操作）
- 访问权限控制
- CORS 安全配置

### 🎨 界面优化
- 响应式布局设计
- 优化的移动端适配
- 美化的滚动条样式
- 平滑的动画过渡效果
- 优化的代码块显示
- 完整的中文标点符号对齐
- 列表项完美对齐

## 🚀 部署步骤

### 1. 准备工作
1. 注册 [Cloudflare](https://dash.cloudflare.com) 账号
2. 进入 Cloudflare 控制台

### 2. 创建存储资源
1. 创建 KV 命名空间
   - 名称：`PASTE_STORE`
   - 用于存储文本内容

2. 创建 R2 存储桶
   - 名称：`cloudpaste-files`
   - 用于存储上传的文件

### 3. 创建 Worker
1. 创建新的 Worker
2. 配置环境变量：
   ```env
   ADMIN_USERNAME=你的管理员用户名
   ADMIN_PASSWORD=你的管理员密码
   ```

3. 绑定存储：
   - KV 绑定：
     ```toml
     变量名：PASTE_STORE
     选择创建的 KV 命名空间
     ```
   - R2 绑定：
     ```toml
     变量名：FILE_STORE
     选择创建的 R2 存储桶
     ```

### 4. 部署代码
1. 复制 `worker.js` 的完整代码
2. 粘贴到 Worker 的编辑器中
3. 保存并部署

## 🔧 代码结构说明

### 主要组件
1. `worker.js`
   - 主要的 Worker 代码
   - 包含路由处理和 API 实现

2. 工具函数
   - `generateId`: 生成随机ID
   - `hashPassword`: 密码加密
   - `verifyPassword`: 密码验证
   - `calculateExpiryTime`: 计算过期时间
   - `isExpired`: 检查是否过期

3. 前端组件
   - Vue 3 应用
   - Markdown 渲染
   - 代码高亮
   - 文件上传界面

### 📡 API 端点
1. 文本相关
   ```http
   POST /api/paste     # 创建文本分享
   GET  /api/paste/:id # 获取文本内容
   ```

2. 文件相关
   ```http
   POST /api/file      # 上传文件
   GET  /api/file/:id  # 下载文件
   ```

3. 管理相关
   ```http
   POST   /api/admin/login      # 管理员登录
   GET    /api/admin/shares     # 获取分享列表
   DELETE /api/admin/paste/:id  # 删除文本分享
   DELETE /api/admin/file/:id   # 删除文件分享
   ```

## 🔄 自动化功能

### 过期内容清理
- 自动检测过期内容
- 定时清理过期文件和文本
- 释放存储空间
- 每整点自动触发清理

## ⚠️ 使用限制
- 文件大小上限：25MB
- 支持的过期时间：1小时、1天、7天、30天，永不过期
- 并发请求受 Worker 限制

## 📝 注意事项
1. 确保正确配置环境变量
2. 定期检查存储使用量
3. 监控错误日志
4. 注意 Worker 使用配额

## 🛠️ 使用
- Cloudflare Workers
- Cloudflare KV
- Cloudflare R2
- Vue 3
- Marked (Markdown 渲染)
- Highlight.js (代码高亮)

## 📱 浏览器支持
- Chrome (推荐)
- Firefox
- Safari
- Edge
- 移动端浏览器

## 📄 许可证
MIT License

## 🔗 相关链接
- [Cloudflare Workers 文档](https://developers.cloudflare.com/workers/)
- [Vue 3 文档](https://v3.vuejs.org/)
- [Marked 文档](https://marked.js.org/)
