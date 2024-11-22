// 工具函数
const utils = {
  // 生成随机ID
  generateId(length = 8) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  },

  // 密码加密
  async hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)));
  },

  // 验证密码
  async verifyPassword(password, hash) {
    const inputHash = await utils.hashPassword(password);
    return inputHash === hash;
  },

  // 计算过期时间
  calculateExpiryTime(duration) {
    const now = new Date();
    switch(duration) {
      case '1h': return new Date(now.getTime() + 60 * 60 * 1000);
      case '1d': return new Date(now.getTime() + 24 * 60 * 60 * 1000);
      case '7d': return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case '30d': return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      default: return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }
  },

  // 检查是否过期
  isExpired(expiryTime) {
    return new Date() > new Date(expiryTime);
  }
};

// CSS 样式
const styles = `
/* GitHub 图标样式 */
.github-link {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  color: #333;
  transition: color 0.3s ease;
}

.github-link:hover {
  color: var(--primary-color);
}

.github-icon {
  transition: transform 0.3s ease;
}

.github-link:hover .github-icon {
  transform: scale(1.1);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .card {
    padding: 1rem;
  }

  .editor-container {
    flex-direction: column;
    height: auto;
  }

  .editor, .preview {
    height: 300px;
    width: 100%;
  }

  .settings {
    grid-template-columns: 1fr;
  }

  .file-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .file-item .size {
    margin: 0;
  }

  .admin-panel {
    right: 70px;  
  }

  .admin-content {
    width: 100%;
  }

  .link {
    flex-direction: column;
    gap: 0.5rem;
  }

  .link button {
    width: 100%;
  }

  .github-link {
    top: 10px;
    right: 10px;
  }
}

/* 超小屏幕适配 */
@media (max-width: 480px) {
  .tabs {
    flex-direction: column;
    gap: 0.5rem;
  }

  .tab {
    width: 100%;
    text-align: center;
  }

  .file-drop {
    padding: 1rem;
  }

  .admin-stats {
    grid-template-columns: 1fr;
  }
}

:root {
  --primary-color: #3498db;
  --bg-color: #f5f6fa;
  --border-color: #dcdde1;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: var(--bg-color);
  color: #2d3436;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 2rem;
  margin-bottom: 1rem;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tab {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tab.active {
  border-bottom-color: var(--primary-color);
  color: var(--primary-color);
}


.settings {
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.input-group input, .input-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.9;
}

.file-drop {
  border: 2px dashed var(--border-color);
  border-radius: 4px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
}

.file-drop.dragging {
  border-color: var(--primary-color);
  background: rgba(52, 152, 219, 0.1);
}

.file-list {
  margin-top: 1rem;
}

.file-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.file-item .name {
  flex: 1;
}

.file-item .size {
  color: #7f8c8d;
  margin: 0 1rem;
}

.result {
  margin-top: 1rem;
  padding: 1rem;
  background: #f1f2f6;
  border-radius: 4px;
}

.error {
  color: #e74c3c;
}

.link {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
}

.link a {
  color: var(--primary-color);
  text-decoration: none;
  word-break: break-all;
}

.content {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  line-height: 1.6;
}

.content input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid var(--primary-color);
  border-radius: 3px;
  margin: 0;
  position: relative;
  top: 3px;
  margin-right: 8px;
  cursor: pointer;
  vertical-align: top;
}

.content input[type="checkbox"]:checked {
  background-color: var(--primary-color);
}

.content input[type="checkbox"]:checked::after {
  content: "✓";
  color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  line-height: 1;
}

.content ul {
  list-style: none;
  padding-left: 0;
  margin: 1em 0;
}

.content li {
  display: flex;
  align-items: flex-start;
  margin: 0.5em 0;
  line-height: 1.6;
}

.content li label {
  display: inline-flex;
  align-items: flex-start;
  margin: 0;
  cursor: pointer;
}

.content p {
  margin: 1em 0;
  line-height: 1.6;
}

.expiry-info {
  color: #7f8c8d;
  font-size: 0.9rem;
}

// github链接
.github-link {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  color: #333;
  transition: color 0.3s ease;
}

.github-link:hover {
  color: var(--primary-color);
}

.github-icon {
  transition: transform 0.3s ease;
}

.github-link:hover .github-icon {
  transform: scale(1.1);
}

.admin-panel {
  position: fixed;
  top: 20px;
  right: 70px;  
  z-index: 1000;
}

.admin-login {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
  min-width: 300px;
}

.admin-content {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 350px;
  background: white;
  box-shadow: -2px 0 15px rgba(0,0,0,0.1);
  padding: 1.5rem;
  overflow-y: auto;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.admin-header h3 {
  margin: 0;
  color: #2c3e50;
}

.share-list {
  margin-top: 1rem;
}

.share-item {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
}

.share-item .title {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.share-item .info {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 0.5rem;
}

.share-item .info div {
  margin: 0.25rem 0;
}

.share-item .actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #666;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f1f1f1;
  color: #333;
}

.admin-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

.filter-bar {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
}

.filter-bar select {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: white;
}

.upload-status {
  margin: 1rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  background: #e8f5e9;
  color: #2e7d32;
  text-align: center;
}

.upload-status.error {
  background: #ffebee;
  color: #c62828;
}

/* 在 styles 中添加 */
.password-input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.password-toggle {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 5px;
}

.password-toggle:hover {
  color: var(--primary-color);
}

.admin-login .actions {
  display: flex;
  gap: 1rem;  /* 添加按钮之间的间距 */
  margin-top: 1rem;
}

.admin-login .actions .btn {
  flex: 1;  /* 让按钮平均分配空间 */
}

.admin-login .actions .btn:last-child {
  background: #95a5a6;  /* 取消按钮使用不同的颜色 */
}


/* 添加确认对话框样式 */
.confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.confirm-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
}

.confirm-content h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.confirm-content .warning {
  color: #e74c3c;
  font-weight: 500;
  margin: 1rem 0;
}

.confirm-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.confirm-actions .btn {
  flex: 1;
}

.confirm-actions .btn.cancel {
  background: #95a5a6;
}

.delete-btn {
  background: #e74c3c;
}

.delete-btn:hover {
  background: #c0392b;
}


// markdown复选框对齐
.markdown-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.markdown-toggle input[type="checkbox"] {
  margin: 0;
}

.markdown-toggle label {
  margin: 0;
  cursor: pointer;
}

/* 编辑页滚动优化 */
.editor-container {
  display: flex;
  gap: 1rem;
  height: 400px;
  position: relative;
  will-change: transform;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.editor, .preview {
  flex: 1;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow-y: auto;
  position: relative;
  word-wrap: break-word;
  overflow-wrap: break-word;
  -webkit-overflow-scrolling: touch;
  backface-visibility: hidden;
  transform: translateZ(0);
  perspective: 1000px;
}

.editor textarea {
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  padding: 0;
  margin: 0;
  background: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 优化滚动条样式 */
.editor::-webkit-scrollbar,
.preview::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.editor::-webkit-scrollbar-track,
.preview::-webkit-scrollbar-track {
  background: transparent;
}

.editor::-webkit-scrollbar-thumb,
.preview::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  border: 2px solid transparent;
  background-clip: padding-box;
}

.editor::-webkit-scrollbar-thumb:hover,
.preview::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid transparent;
  background-clip: padding-box;
}

/* 防止文本选择时的闪烁 */
.editor textarea::selection {
  background: rgba(52, 152, 219, 0.2);
}

/* 优化文本渲染 */
.editor, .preview {
  text-rendering: optimizeLegibility;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}


    /* Markdown 内容样式优化 */
.content {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #2c3e50;
  max-width: 100%;
  overflow-x: auto;
}

/* 标题样式 */
.content h1, .content h2, .content h3, .content h4, .content h5, .content h6 {
  margin-top: 1.5em;
  margin-bottom: 1em;
  font-weight: 600;
  line-height: 1.25;
  color: #1a202c;
}

.content h1 { font-size: 2em; border-bottom: 2px solid #eaecef; padding-bottom: 0.3em; }
.content h2 { font-size: 1.5em; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; }
.content h3 { font-size: 1.25em; }
.content h4 { font-size: 1em; }
.content h5 { font-size: 0.875em; }
.content h6 { font-size: 0.85em; color: #6a737d; }

/* 段落和列表样式 */
.content p, .content ul, .content ol {
  margin: 1em 0;
  line-height: 1.7;
}

.content ul, .content ol {
  padding-left: 2em;
}

.content li + li {
  margin-top: 0.25em;
}

/* 代码块样式 */
.content pre {
  margin: 1em 0;
  padding: 1em;
  background: #f6f8fa;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.9em;
  line-height: 1.5;
}

.content code {
  padding: 0.2em 0.4em;
  margin: 0;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.9em;
}

.content pre code {
  padding: 0;
  background: none;
  border-radius: 0;
  font-size: 1em;
}

/* 引用块样式 */
.content blockquote {
  margin: 1em 0;
  padding: 0.5em 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  background: #f6f8fa;
  border-radius: 3px;
}

.content blockquote > :first-child { margin-top: 0; }
.content blockquote > :last-child { margin-bottom: 0; }

/* 表格样式 */
.content table {
  margin: 1em 0;
  border-collapse: collapse;
  width: 100%;
  overflow: auto;
}

.content table th,
.content table td {
  padding: 0.6em 1em;
  border: 1px solid #dfe2e5;
}

.content table th {
  background-color: #f6f8fa;
  font-weight: 600;
}

.content table tr:nth-child(2n) {
  background-color: #f8f9fa;
}

/* 链接样式 */
.content a {
  color: #0366d6;
  text-decoration: none;
}

.content a:hover {
  text-decoration: underline;
}

/* 图片样式 */
.content img {
  max-width: 100%;
  height: auto;
  margin: 1em 0;
  border-radius: 4px;
}

/* 水平线样式 */
.content hr {
  height: 2px;
  margin: 2em 0;
  background-color: #eaecef;
  border: none;
}

/* 任务列表样式 */
.content .task-list {
  list-style: none;
  padding-left: 0;
}

.content .task-list-item {
  display: flex;
  align-items: flex-start;
  margin: 0.5em 0;
}

.content .task-list-item input[type="checkbox"] {
  margin: 0.3em 0.5em 0 0;
  flex-shrink: 0;
}

/* 代码高亮主题优化 */
.content .hljs {
  background: #f6f8fa;
  border-radius: 6px;
  padding: 1em;
  tab-size: 4;
}

/* 管理员页面刷新按钮样式 */
.admin-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.refresh-btn {
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.refresh-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

`;

// Vue 应用代码
const appScript = `
const { createApp, ref, computed, onMounted, nextTick  } = Vue;  // 添加 onMounted

createApp({
  setup() {
    const activeTab = ref('paste');
    const content = ref('');
    const isMarkdown = ref(true);
    const password = ref('');
    const expiresIn = ref('1d');
    const files = ref([]);
    const isDragging = ref(false);
    const result = ref(null);
    const error = ref(null);
    const uploadStatus = ref('');  // 用于显示上传状态
    const uploadProgress = ref(0);  // 用于显示上传进度
    const isUploading = ref(false);  // 添加这行
    const uploadingFiles = ref([]);  // 添加这行
    // 添加管理员相关的状态
    const isAdmin = ref(false);
    const showAdminLogin = ref(false);
    const adminUsername = ref('');
    const adminPassword = ref('');
    const adminError = ref('');
    const shares = ref([]);
    const shareFilter = ref('all');  // 用于过滤分享列表
    const showPassword = ref(false);  // 控制密码显示/隐藏
    const editorRef = ref(null);// 添加编辑器和预览区域的引用
    const previewRef = ref(null);
    let isEditorScrolling = false;
    let isPreviewScrolling = false;
    const showDeleteConfirm = ref(false);//确认删除
    const deleteTarget = ref(null);
    const isRefreshing = ref(false);  // 添加刷新状态

    // 修改刷新函数
    const refreshShares = async () => {
        if (isRefreshing.value) return;
        
        try {
            isRefreshing.value = true;
            await fetchShares();
        } catch (err) {
            adminError.value = err.message;
        } finally {
            isRefreshing.value = false;
        }
    };

    // 修改 onMounted，移除自动刷新
    onMounted(() => {
        const credentials = localStorage.getItem('adminCredentials');
        if (credentials) {
            isAdmin.value = true;
            refreshShares();  // 初始加载一次
        }
    });



    // 确认删除
    const confirmDelete = (share) => {
        deleteTarget.value = share;
        showDeleteConfirm.value = true;
    };

    const executeDelete = async () => {
        if (!deleteTarget.value) return;
        
        try {
            await deleteShare(deleteTarget.value.id, deleteTarget.value.type);
            showDeleteConfirm.value = false;
            deleteTarget.value = null;
        } catch (err) {
            adminError.value = err.message;
        }
    };

    // 在 appScript 中修改滚动处理函数
    const handleEditorScroll = (e) => {
    if (isPreviewScrolling) return;
    
    // 使用 requestAnimationFrame 优化性能
    requestAnimationFrame(() => {
        isEditorScrolling = true;
        
        const editor = e.target;
        const preview = previewRef.value;
        if (!preview) return;

        const percentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight);
        preview.scrollTop = percentage * (preview.scrollHeight - preview.clientHeight);
        
        // 使用 requestAnimationFrame 延迟重置标志
        requestAnimationFrame(() => {
        isEditorScrolling = false;
        });
    });
    };

// 处理预览区域滚动
    const handlePreviewScroll = (e) => {
    if (isEditorScrolling) return;
    
    requestAnimationFrame(() => {
        isPreviewScrolling = true;
        
        const preview = e.target;
        const editor = editorRef.value;
        if (!editor) return;

        const percentage = preview.scrollTop / (preview.scrollHeight - preview.clientHeight);
        editor.scrollTop = percentage * (editor.scrollHeight - editor.clientHeight);
        
        requestAnimationFrame(() => {
        isPreviewScrolling = false;
        });
    });
    };


    // 在 appScript 中添加防抖函数
    const debounce = (fn, delay) => {
    let timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
        fn.apply(this, args);
        }, delay);
    };
    };

    // 使用防抖处理预览内容更新
    const preview = computed(() => {
    if (!content.value) return '';
    if (!isMarkdown.value) return content.value;
    
    // 使用防抖处理代码高亮
    const highlightCode = debounce(() => {
        document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
        });
    }, 200);

    try {
        const rendered = marked.parse(content.value);
        // 延迟执行代码高亮
        nextTick(() => {
        highlightCode();
        });
        return rendered;
    } catch (err) {
        return '渲染出错: ' + err.message;
    }
    });


// 管理员登录
    const adminLogin = async function() {
      try {
        adminError.value = '';
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: adminUsername.value,
            password: adminPassword.value
          })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || '登录失败');
        }

        localStorage.setItem('adminCredentials', btoa(adminUsername.value + ':' + adminPassword.value));
        isAdmin.value = true;
        showAdminLogin.value = false;
        await fetchShares();
      } catch (err) {
        adminError.value = err.message;
      }
    };

    // 获取分享列表
    const fetchShares = async function() {
      try {
        const credentials = localStorage.getItem('adminCredentials');
        if (!credentials) {
          throw new Error('未登录');
        }

        console.log('Fetching shares with credentials');  // 添加调试日志

        const response = await fetch('/api/admin/shares', {
          headers: {
            'Authorization': 'Basic ' + credentials,
            'Content-Type': 'application/json'
          }
        });

        console.log('Shares response status:', response.status);  // 添加调试日志
       
        if (!response.ok) {
          if (response.status === 401) {
            isAdmin.value = false;
            localStorage.removeItem('adminCredentials');
            throw new Error('登录已过期，请重新登录');
          }
          throw new Error('获取分享列表失败');
        }

        const data = await response.json();
        console.log('Shares data:', data);  // 添加调试日志
        shares.value = data.shares;
      } catch (err) {
        console.error('Fetch shares error:', err);  // 添加调试日志
        adminError.value = err.message;
      }
    };

    // 删除分享
    const deleteShare = async function(id, type) {
      try {
        const credentials = localStorage.getItem('adminCredentials');
        if (!credentials) {
          throw new Error('未登录');
        }

        const response = await fetch('/api/admin/' + type + '/' + id, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Basic ' + credentials
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            isAdmin.value = false;
            localStorage.removeItem('adminCredentials');
            throw new Error('登录已过期，请重新登录');
          }
          throw new Error('删除失败');
        }

        shares.value = shares.value.filter(s => s.id !== id);
      } catch (err) {
        adminError.value = err.message;
      }
    };

    // 退出登录
    const adminLogout = function() {
      isAdmin.value = false;
      shares.value = [];
      adminError.value = '';
      localStorage.removeItem('adminCredentials');
    };

    // 检查是否已登录
    onMounted(function() {
    const credentials = localStorage.getItem('adminCredentials');
      if (credentials) {
        isAdmin.value = true;
        fetchShares();
      }
    });

    // 过滤分享列表
    const filteredShares = computed(() => {
      if (shareFilter.value === 'all') return shares.value;
      return shares.value.filter(s => s.type === shareFilter.value);
    });

    // 格式化时间
    const formatDate = function(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleString();
    };


    // 添加 isExpired 函数
    const isExpired = (expiryTime) => {
      return new Date() > new Date(expiryTime);
    };
    // 修改有效分享数量的计算
    const validSharesCount = computed(() => {
      return shares.value.filter(s => !isExpired(s.expiresAt)).length;
    });


    // 格式化文件大小
    const formatSize = (bytes) => {
      const units = ['B', 'KB', 'MB', 'GB'];
      let size = bytes;
      let unitIndex = 0;
      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
      }
      return size.toFixed(1) + ' ' + units[unitIndex];
    };

    // 处理文件拖放
    const handleDrop = (e) => {
      e.preventDefault();
      isDragging.value = false;
      const droppedFiles = Array.from(e.dataTransfer.files);
      files.value = [...files.value, ...droppedFiles];
    };

    // 处理文件选择
    const handleFileSelect = (e) => {
      const selectedFiles = Array.from(e.target.files);
      files.value = [...files.value, ...selectedFiles];
    };

    // 移除文件
    const removeFile = (index) => {
      files.value.splice(index, 1);
    };

    // 提交粘贴内容
    const submitPaste = async () => {
      try {
        error.value = null;
        const response = await fetch('/api/paste', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: content.value,
            password: password.value,
            expiresIn: expiresIn.value,
            isMarkdown: isMarkdown.value,
          }),
        });

        if (!response.ok) throw new Error('提交失败');
        
        const data = await response.json();
        result.value = {
          type: 'paste',
          url: window.location.origin + '/share/paste/' + data.id,
        };
        // 成功后立即刷新分享列表
        if (isAdmin.value) {
          await fetchShares();
        }
      } catch (err) {
        error.value = err.message;
      }
    };


    


    // 上传文件
    const uploadFiles = async () => {
        try {
            error.value = null;
            uploadStatus.value = '正在上传...';
            isUploading.value = true;
            uploadProgress.value = 0;
            
            if (!files.value || files.value.length === 0) {
            error.value = '请选择要上传的文件';
            return;
            }

            // 初始化上传列表
            uploadingFiles.value = files.value.map(file => ({
            name: file.name,
            status: 'loading',
            statusText: '准备上传...'
            }));

            const formData = new FormData();
            files.value.forEach(file => formData.append('files', file));
            
            if (password.value) {
            formData.append('password', password.value);
            }
            formData.append('expiresIn', expiresIn.value);

            const response = await fetch('/api/file', {
            method: 'POST',
            body: formData
            });

            const data = await response.json();
            
            if (!response.ok || data.status === 'error') {
            throw new Error(data.message || '上传失败');
            }

            // 更新上传状态
            data.files.forEach(file => {
            const uploadingFile = uploadingFiles.value.find(f => f.name === file.filename);
            if (uploadingFile) {
                uploadingFile.status = file.status;
                uploadingFile.statusText = file.status === 'success' ? '上传成功' : file.error;
            }
            });

            const successFiles = data.files.filter(f => f.status === 'success');
            

            if (successFiles.length > 0) {
                result.value = {
                    type: 'files',
                    files: successFiles.map(file => ({
                        url: window.location.origin + '/share/file/' + file.fileId,
                        filename: file.filename,
                    }))
                };
            }

            // 成功后立即刷新分享列表
            if (isAdmin.value) {
              await fetchShares();
            }

            if (successFiles.length === 0) {
            throw new Error('没有文件上传成功');
            }
            
            uploadStatus.value = '上传成功！';
            
            result.value = {
                type: 'files',
                files: successFiles.map(file => ({
                    url: window.location.origin + '/share/file/' + file.fileId,
                    filename: file.filename,
                }))
            };

            // 清空文件列表
            setTimeout(() => {
            files.value = [];
            uploadingFiles.value = [];
            uploadStatus.value = '';
            }, 3000);

        } catch (err) {
            error.value = err.message;
            uploadStatus.value = '上传失败: ' + err.message;
        } finally {
            isUploading.value = false;
        }
    };

    // 复制链接
    const copyUrl = async (url) => {
      try {
        await navigator.clipboard.writeText(url);
        alert('链接已复制到剪贴板');
      } catch (err) {
        alert('复制失败，请手动复制');
      }
    };

    return {
      activeTab,
      content,
      isMarkdown,
      password,
      expiresIn,
      files,
      isDragging,
      result,
      error,
      uploadStatus,
      uploadProgress,
      isUploading,
      uploadingFiles,
      isAdmin,
      showAdminLogin,
      adminUsername,
      adminPassword,
      adminError,
      shares,
      shareFilter,
      filteredShares,
      preview,
      formatSize,
      handleDrop,
      handleFileSelect,
      removeFile,
      submitPaste,
      uploadFiles,
      copyUrl,
      adminLogin,
      adminLogout,
      deleteShare,
      formatDate,
      isExpired,  
      validSharesCount,
      showPassword,
      editorRef,
      previewRef,
      handleEditorScroll,
      handlePreviewScroll,
      showDeleteConfirm,
      deleteTarget,
      confirmDelete,
      executeDelete,
      isRefreshing,
      refreshShares,
    };
  },

  template: \`
  <div class="container">

  <a href="https://github.com/ling-drag0n/CloudPaste" 
     target="_blank" 
     class="github-link" 
     title="Visit GitHub">
    <svg height="32" width="32" viewBox="0 0 16 16" class="github-icon">
      <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
    </svg>
  </a>


    <div class="card">
      <!-- 标签页切换 -->
      <div class="tabs">
        <button 
          :class="['tab', activeTab === 'paste' ? 'active' : '']"
          @click="activeTab = 'paste'"
        >文本粘贴</button>
        <button 
          :class="['tab', activeTab === 'file' ? 'active' : '']"
          @click="activeTab = 'file'"
        >文件上传</button>
      </div>

      <!-- 文本粘贴部分 -->
      <div v-if="activeTab === 'paste'">
        <div class="editor-container">
          <!-- 编辑器区域 -->
          <div class="editor">
            <textarea 
              ref="editorRef"
              v-model="content"
              placeholder="在此输入文本内容..."
              @scroll="handleEditorScroll"
            ></textarea>
          </div>
          <!-- Markdown 预览区域 -->
          <div 
            v-if="isMarkdown" 
            class="preview" 
            ref="previewRef"
            @scroll="handlePreviewScroll"
            v-html="preview"
          ></div>
        </div>
        
        <!-- 设置选项 -->
        <div class="settings">
        <div class="markdown-toggle">
            <input type="checkbox" id="markdown-toggle" v-model="isMarkdown">
            <label for="markdown-toggle">启用 Markdown</label>
        </div>
        <div class="input-group">
            <label>密码保护</label>
            <input type="password" v-model="password" placeholder="可选">
        </div>
        <div class="input-group">
            <label>过期时间</label>
            <select v-model="expiresIn">
            <option value="1h">1小时</option>
            <option value="1d">1天</option>
            <option value="7d">7天</option>
            <option value="30d">30天</option>
            </select>
        </div>
        </div>

        <button class="btn" @click="submitPaste">创建分享</button>
      </div>

      <!-- 文件上传部分 -->
      <div v-if="activeTab === 'file'">
        <!-- 文件拖放区域 -->
        <div
          class="file-drop"
          :class="{ dragging: isDragging }"
          @dragenter.prevent="isDragging = true"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
        >
          <input
            type="file"
            multiple
            @change="handleFileSelect"
            style="display: none"
            ref="fileInput"
          >
          <div @click="$refs.fileInput.click()">
            点击或拖放文件到此处上传
          </div>
        </div>

        <!-- 文件列表 -->
        <div class="file-list" v-if="files.length">
          <div v-for="(file, index) in files" :key="index" class="file-item">
            <span class="name">{{ file.name }}</span>
            <span class="size">{{ formatSize(file.size) }}</span>
            <button class="btn" @click="removeFile(index)">移除</button>
          </div>
        </div>

        <!-- 文件上传设置 -->
        <div class="settings">
          <div class="input-group">
            <label>密码保护</label>
            <input type="password" v-model="password" placeholder="可选">
          </div>
          <div class="input-group">
            <label>过期时间</label>
            <select v-model="expiresIn">
              <option value="1h">1小时</option>
              <option value="1d">1天</option>
              <option value="7d">7天</option>
              <option value="30d">30天</option>
            </select>
          </div>
        </div>

        <!-- 上传状态显示 -->
        <div v-if="uploadStatus" class="upload-status" :class="{ error: error }">
          {{ uploadStatus }}
        </div>

        <button class="btn" @click="uploadFiles" :disabled="!files.length">
          上传文件
        </button>
      </div>

      <!-- 结果显示部分 -->
      <div v-if="result" class="result">
        <div v-if="result.type === 'paste'">
          <p>分享链接：</p>
          <div class="link">
            <a :href="result.url" target="_blank">{{ result.url }}</a>
            <button class="btn" @click="copyUrl(result.url)">复制链接</button>
          </div>
        </div>
        <div v-else>
          <p>文件链接：</p>
          <div v-for="file in result.files" :key="file.url" class="link">
            <a :href="file.url" target="_blank">{{ file.filename }}</a>
            <button class="btn" @click="copyUrl(file.url)">复制链接</button>
          </div>
        </div>
      </div>

      <!-- 错误信息显示 -->
      <div v-if="error" class="error">
        {{ error }}
      </div>
    </div>

    <!-- 管理员面板 -->
    <div class="admin-panel">
      <!-- 管理员登录按钮 -->
      <button v-if="!isAdmin && !showAdminLogin" 
              class="btn" 
              @click="showAdminLogin = true">
        管理员登录
      </button>

      <!-- 管理员登录表单 -->
      <div v-if="showAdminLogin" class="admin-login">
        <div class="input-group">
          <label>用户名</label>
          <input type="text" v-model="adminUsername">
        </div>
        <div class="input-group">
          <label>密码</label>
          <div class="password-input-group">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              v-model="adminPassword" 
              @keyup.enter="adminLogin"
            >
            <button 
              class="password-toggle" 
              @click="showPassword = !showPassword"
              type="button"
            >
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
        </div>
        <div v-if="adminError" class="error">{{ adminError }}</div>
        <div class="actions">
          <button class="btn" @click="adminLogin">确定</button>
          <button class="btn" @click="showAdminLogin = false">取消</button>
        </div>
      </div>

      <!-- 管理员内容面板 -->
      <div v-if="isAdmin" class="admin-content">
      <!-- 在管理员内容面板的 header 部分添加刷新按钮 -->
        <div class="admin-header">
        <h3>分享管理</h3>
            <div class="admin-actions">
                <button class="refresh-btn" @click="refreshShares" :disabled="isRefreshing">
                    {{ isRefreshing ? '刷新中...' : '刷新列表' }}
                </button>
                <button class="close-btn" @click="adminLogout">&times;</button>
            </div>
        </div>

        <!-- 统计信息 -->
        <div class="admin-stats">
          <div class="stat-card">
            <div class="stat-value">{{ shares.length }}</div>
            <div class="stat-label">总分享数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">
              {{ shares.filter(s => !isExpired(s.expiresAt)).length }}
            </div>
            <div class="stat-label">有效分享</div>
          </div>
        </div>

        <!-- 分享类型筛选 -->
        <div class="filter-bar">
          <select v-model="shareFilter">
            <option value="all">全部</option>
            <option value="paste">文本</option>
            <option value="file">文件</option>
          </select>
        </div>

        <!-- 分享列表 -->
        <div class="share-list">
            <div v-for="share in filteredShares" :key="share.id" class="share-item">
                <div class="title">
                    {{ share.type === 'paste' ? '文本分享' : '文件分享' }}
                    <span v-if="share.hasPassword" class="badge">密码保护</span>
                </div>
                <div class="info">
                    <div>ID: {{ share.id }}</div>
                    <div>创建时间: {{ formatDate(share.createdAt) }}</div>
                    <div>过期时间: {{ formatDate(share.expiresAt) }}</div>
                    <div v-if="share.type === 'file'">文件名: {{ share.filename }}</div>
                </div>
                <div class="actions">
                    <button class="btn" @click="copyUrl(share.url)">复制链接</button>
                    <button class="btn delete-btn" @click="confirmDelete(share)">删除</button>
                </div>
            </div>
        </div>

        <!-- 添加确认对话框 -->
        <div v-if="showDeleteConfirm" class="confirm-dialog">
            <div class="confirm-content">
                <h3>确认删除</h3>
                <p>确定要删除这个{{ deleteTarget?.type === 'paste' ? '文本' : '文件' }}分享吗？</p>
                <p class="warning">此操作不可恢复！</p>
                <div class="confirm-actions">
                    <button class="btn" @click="executeDelete">确定删除</button>
                    <button class="btn cancel" @click="showDeleteConfirm = false">取消</button>
                </div>
            </div>
        </div>

      </div>
    </div>
  </div>
  \`
}).mount('#app');
`;
   

// 分享页面的 Vue 应用代码
const shareAppScript = `
const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    const content = ref('');
    const isMarkdown = ref(false);
    const needPassword = ref(false);
    const password = ref('');
    const error = ref(null);
    const loading = ref(true);
    const expiresAt = ref(null);
    const isFile = ref(false);  // 添加文件标识
    const uploadProgress = ref(0);
    const isUploading = ref(false);
    const uploadingFiles = ref([]);

    const fetchContent = async () => {
      try {
        error.value = null;
        const pathParts = window.location.pathname.split('/');
        const id = pathParts[pathParts.length - 1];
        const isFilePath = window.location.pathname.includes('/share/file/');
        isFile.value = isFilePath;
        
        // 构建 API URL
        const apiUrl = isFilePath ? '/api/file/' + id : '/api/paste/' + id;
        
        const response = await fetch(apiUrl, {
          headers: password.value ? {
            'X-Password': password.value
          } : {}
        });

        if (response.status === 401) {
          needPassword.value = true;
          loading.value = false;
          error.value = null;
          return;
        }

        if (response.status === 403) {
          needPassword.value = true;
          loading.value = false;
          error.value = '密码错误，请重试';
          password.value = '';
          return;
        }

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || '加载失败');
        }

        if (isFilePath) {
          // 如果是文件，直接触发下载
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = response.headers.get('Content-Disposition')?.split('filename=')[1]?.replace(/"/g, '') || 'download';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          loading.value = false;
          content.value = '文件下载已开始...';
        } else {
          // 如果是文本内容
          const data = await response.json();
          content.value = data.content;
          isMarkdown.value = data.isMarkdown;
          expiresAt.value = new Date(data.expiresAt);
          loading.value = false;
          needPassword.value = false;
        }
      } catch (err) {
        error.value = err.message;
        loading.value = false;
      }
    };

    const submitPassword = async () => {
      if (!password.value) {
        error.value = '请输入密码';
        return;
      }
      loading.value = true;
      await fetchContent();
    };

    const formatExpiryTime = computed(() => {
      if (!expiresAt.value) return '';
      const now = new Date();
      const diff = expiresAt.value - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours < 24) {
        return '将在 ' + hours + ' 小时后过期';
      }
      const days = Math.floor(hours / 24);
      return '将在 ' + days + ' 天后过期';
    });

    const renderedContent = computed(() => {
      if (!content.value) return '';
      if (!isMarkdown.value) return content.value;
      try {
        const rendered = marked.parse(content.value);
        setTimeout(() => {
          document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
          });
        }, 0);
        return rendered;
      } catch (err) {
        return '渲染出错: ' + err.message;
      }
    });

    onMounted(fetchContent);

    return {
      content,
      isMarkdown,
      needPassword,
      password,
      error,
      loading,
      renderedContent,
      formatExpiryTime,
      submitPassword,
      isFile,
    };
  }
}).mount('#app');
`;

// HTML 模板
const html = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CloudPaste - 在线剪贴板</title>
    <script src="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue/3.2.31/vue.global.prod.min.js"></script>
    <script src="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/marked/4.0.2/marked.min.js"></script>
    <link rel="stylesheet" href="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/highlight.js/11.4.0/styles/github.min.css">
    <script src="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/highlight.js/11.4.0/highlight.min.js"></script>
    <style>${styles}</style>
</head>
<body>
    <div id="app">
        <a href="https://github.com/ling-drag0n/CloudPaste" 
            target="_blank" 
            class="github-link" 
            title="Visit GitHub">
            <svg height="32" width="32" viewBox="0 0 16 16" class="github-icon">
                <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
        </a>
    </div>
    <script>${appScript}</script>
</body>
</html>`;

// 分享页面的 HTML 模板
const shareHtml = `<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CloudPaste - 分享内容</title>
    <script src="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue/3.2.31/vue.global.prod.min.js"></script>
    <script src="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/marked/4.0.2/marked.min.js"></script>
    <link rel="stylesheet" href="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/highlight.js/11.4.0/styles/github.min.css">
    <script src="https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/highlight.js/11.4.0/highlight.min.js"></script>
    <style>${styles}</style>
</head>
<body>
    <div id="app">
      <div class="container">
        <div class="card">
          <div v-if="loading">加载中...</div>
          <div v-else-if="needPassword">
            <div class="input-group">
              <label>此内容需要密码访问：</label>
              <input 
                type="password" 
                v-model="password"
                @keyup.enter="submitPassword"
                placeholder="请输入密码"
              >
            </div>
            <div v-if="error" class="error" style="margin: 10px 0;">{{ error }}</div>
            <button class="btn" @click="submitPassword">确认</button>
          </div>
          <div v-else>
            <div v-if="error" class="error">{{ error }}</div>
            <template v-else>
              <div class="content">
                <div v-if="isMarkdown" v-html="renderedContent"></div>
                <pre v-else>{{ content }}</pre>
              </div>
              <div class="expiry-info">
                {{ formatExpiryTime }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <script>${shareAppScript}</script>
</body>
</html>`;

// 文件大小限制 (25MB)
const MAX_FILE_SIZE = 25 * 1024 * 1024;

// 处理粘贴内容
async function handlePaste(request, env) {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const pasteId = pathParts[pathParts.length - 1];
  
  switch (request.method) {
    case 'POST': {
      const data = await request.json();
      const { content, password: inputPassword, expiresIn, isMarkdown = false } = data;

      if (!content) {
        return new Response(JSON.stringify({
          message: 'Content is required',
          status: 'error'
        }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const id = utils.generateId();
      const paste = {
        content,
        isMarkdown,
        createdAt: new Date().toISOString(),
        expiresAt: utils.calculateExpiryTime(expiresIn).toISOString(),
      };

      if (inputPassword) {
        paste.passwordHash = await utils.hashPassword(inputPassword);
      }

      await env.PASTE_STORE.put(id, JSON.stringify(paste));

      return new Response(JSON.stringify({ 
        id,
        status: 'success'
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 201
      });
    }

    case 'GET': {
      if (url.pathname === '/api/paste') {
        return new Response(JSON.stringify({ 
          message: 'Invalid request',
          status: 'error'
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        });
      }

      const storedPaste = await env.PASTE_STORE.get(pasteId);
      if (!storedPaste) {
        return new Response(JSON.stringify({ 
          message: 'Paste not found',
          status: 'error'
        }), {
          status: 404,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        });
      }

      const paste = JSON.parse(storedPaste);

      if (utils.isExpired(paste.expiresAt)) {
        await env.PASTE_STORE.delete(pasteId);
        return new Response(JSON.stringify({ 
          message: 'Paste has expired',
          status: 'error'
        }), {
          status: 404,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        });
      }

      const inputPassword = request.headers.get('X-Password');
      if (paste.passwordHash) {
        if (!inputPassword) {
          return new Response(JSON.stringify({ 
            message: 'Password required',
            status: 'error'
          }), {
            status: 401,
            headers: { 
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store'
            }
          });
        }
        if (!await utils.verifyPassword(inputPassword, paste.passwordHash)) {
          return new Response(JSON.stringify({ 
            message: 'Invalid password',
            status: 'error'
          }), {
            status: 403,
            headers: { 
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store'
            }
          });
        }
      }

      return new Response(JSON.stringify({
        content: paste.content,
        isMarkdown: paste.isMarkdown,
        createdAt: paste.createdAt,
        expiresAt: paste.expiresAt,
        status: 'success'
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      });
    }

    default:
      return new Response(JSON.stringify({
        message: 'Method not allowed',
        status: 'error'
      }), { 
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
  }
}

// 处理文件上传和下载
// 处理文件上传和下载
async function handleFile(request, env) {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const fileId = pathParts[pathParts.length - 1];

  switch (request.method) {
    case 'POST': {
      try {
        console.log('Starting file upload process');
        const formData = await request.formData();
        const files = formData.getAll('files');
        const expiresIn = formData.get('expiresIn') || '1d';
        const inputPassword = formData.get('password');
        
        console.log('Files received:', {
          count: files.length,
          fileInfo: files.map(f => ({
            name: f.name,
            size: f.size,
            type: f.type
          }))
        });

        if (!files || files.length === 0) {
          return new Response(JSON.stringify({
            files: [],
            message: '请选择要上传的文件',
            status: 'error'
          }), { 
            status: 400,
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }

        const uploadResults = [];
        let hasSuccess = false;

        for (const file of files) {
          try {
            if (!file || !(file instanceof File)) {
              console.log('Invalid file object:', file);
              continue;
            }

            console.log('Processing file:', {
              name: file.name,
              size: file.size,
              type: file.type
            });

            if (file.size > MAX_FILE_SIZE) {
              uploadResults.push({
                filename: file.name,
                error: `文件大小超过限制(${MAX_FILE_SIZE / 1024 / 1024}MB)`,
                status: 'error'
              });
              continue;
            }

            // 生成文件ID
            const id = utils.generateId(12);
            
            // 准备元数据
            const metadata = {
              filename: file.name,
              type: file.type || 'application/octet-stream',
              size: file.size,
              uploadedAt: new Date().toISOString(),
              expiresAt: utils.calculateExpiryTime(expiresIn).toISOString(),
            };

            if (inputPassword) {
              metadata.passwordHash = await utils.hashPassword(inputPassword);
            }

            // 读取文件内容
            const arrayBuffer = await file.arrayBuffer();
            
            // 检查文件内容是否有效
            if (!arrayBuffer || arrayBuffer.byteLength === 0) {
              throw new Error('文件内容无效');
            }

            console.log('Uploading file to R2:', {
              id,
              size: arrayBuffer.byteLength,
              metadata
            });

            // 上传到 R2
            await env.FILE_STORE.put(id, arrayBuffer, {
              customMetadata: metadata
            });

            console.log('File uploaded successfully:', id);

            uploadResults.push({
              fileId: id,
              filename: file.name,
              expiresAt: metadata.expiresAt,
              status: 'success'
            });
            hasSuccess = true;

          } catch (uploadError) {
            console.error('File upload error:', {
              filename: file.name,
              error: uploadError.message,
              stack: uploadError.stack
            });
            
            uploadResults.push({
              filename: file.name,
              error: uploadError.message,
              status: 'error'
            });
          }
        }

        // 检查是否有成功上传的文件
        const successCount = uploadResults.filter(r => r.status === 'success').length;
        console.log('Upload complete:', {
          total: files.length,
          success: successCount,
          results: uploadResults
        });

        // 返回结果
        return new Response(JSON.stringify({
          files: uploadResults,
          status: hasSuccess ? 'success' : 'error',
          message: hasSuccess ? '上传成功' : '所有文件上传失败',
          successCount,
          totalCount: files.length
        }), {
          status: hasSuccess ? 201 : 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store'
          }
        });

      } catch (error) {
        console.error('Upload handler error:', {
          message: error.message,
          stack: error.stack
        });
        
        return new Response(JSON.stringify({
          files: [],
          message: '上传失败: ' + error.message,
          status: 'error'
        }), { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-store'
          }
        });
      }
      break;
    }
          
    case 'GET': {
      if (url.pathname === '/api/file') {
        return new Response('Invalid request', { status: 400 });
      }

      try {
        const file = await env.FILE_STORE.get(fileId);
        
        if (!file) {
          return new Response('File not found', { status: 404 });
        }

        const metadata = file.customMetadata;

        if (utils.isExpired(metadata.expiresAt)) {
          await env.FILE_STORE.delete(fileId);
          return new Response('File has expired', { status: 404 });
        }

        const inputPassword = request.headers.get('X-Password');
        if (metadata.passwordHash) {
          if (!inputPassword) {
            return new Response('Password required', { status: 401 });
          }
          if (!await utils.verifyPassword(inputPassword, metadata.passwordHash)) {
            return new Response('Invalid password', { status: 403 });
          }
        }

        return new Response(file.body, {
          headers: {
            'Content-Type': metadata.type || 'application/octet-stream',
            'Content-Disposition': `attachment; filename="${metadata.filename}"`,
            'Content-Length': metadata.size
          }
        });
      } catch (error) {
        return new Response('Download failed: ' + error.message, { status: 500 });
      }
      break;
    }

    default:
      return new Response('Method not allowed', { status: 405 });
  }
}

// 验证管理员权限的辅助函数
async function verifyAdmin(request, env) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      console.log('Missing or invalid Authorization header');
      return false;
    }

    const credentials = atob(authHeader.slice(6));
    const [username, password] = credentials.split(':');
    
    console.log('Verifying admin credentials:', { username });
    
    const isValid = username === env.ADMIN_USERNAME && password === env.ADMIN_PASSWORD;
    console.log('Admin verification result:', isValid);
    
    return isValid;
  } catch (error) {
    console.error('Admin verification error:', error);
    return false;
  }
}


// 添加清理过期内容的函数
async function cleanupExpiredContent(env) {
  try {
    const now = new Date();
    let cleanedCount = 0;

    // 清理过期的文本分享
    const pasteList = await env.PASTE_STORE.list();
    for (const key of pasteList.keys) {
      try {
        const paste = JSON.parse(await env.PASTE_STORE.get(key.name));
        if (new Date(paste.expiresAt) < now) {
          await env.PASTE_STORE.delete(key.name);
          cleanedCount++;
          console.log('Deleted expired paste:', key.name);
        }
      } catch (e) {
        console.error('Error cleaning paste:', key.name, e);
      }
    }

    // 清理过期的文件
    const fileList = await env.FILE_STORE.list();
    for (const object of fileList.objects || []) {
      try {
        const file = await env.FILE_STORE.get(object.key);
        if (!file) continue;

        const metadata = file.customMetadata;
        if (metadata && new Date(metadata.expiresAt) < now) {
          await env.FILE_STORE.delete(object.key);
          cleanedCount++;
          console.log('Deleted expired file:', object.key);
        }
      } catch (e) {
        console.error('Error cleaning file:', object.key, e);
      }
    }

    console.log(`Cleanup completed: ${cleanedCount} items removed`);
    return cleanedCount;
  } catch (e) {
    console.error('Cleanup error:', e);
    return 0;
  }
}



// Worker 导出
// Worker 导出
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
        
    // 获取当前时间
    const now = new Date();    
    // 每小时检查一次过期内容（在整点时执行）
    if (now.getMinutes() === 0) {
      // 使用 waitUntil 确保清理操作在响应返回后继续执行
      ctx.waitUntil(cleanupExpiredContent(env).then(count => {
        console.log(`Cleaned up ${count} expired items at ${now.toISOString()}`);
      }));
    }    

    // 处理管理员 API
    if (url.pathname.startsWith("/api/admin/")) {
    // 处理管理员登录
    if (url.pathname === '/api/admin/login') {
        if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
        }

        const { username, password } = await request.json();
        if (username === env.ADMIN_USERNAME && password === env.ADMIN_PASSWORD) {
        return new Response(JSON.stringify({ 
            status: 'success',
            message: '登录成功',
            credentials: btoa(`${username}:${password}`)  // 添加这行
        }), {
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
        }
        
        return new Response(JSON.stringify({
        status: 'error',
        message: '用户名或密码错误'
        }), {
        status: 401,
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
        });
    }

    // 获取所有分享列表
    if (url.pathname === '/api/admin/shares') {
        if (request.method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
        }

    try {
        // 验证管理员权限
        if (!await verifyAdmin(request, env)) {
        return new Response(JSON.stringify({
            status: 'error',
            message: '未授权访问'
        }), {
            status: 401,
            headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            }
        });
        }

        const shares = [];
        
        try {
        // 获取文本分享
        const pasteList = await env.PASTE_STORE.list();
        for (const key of pasteList.keys) {
            try {
            const paste = JSON.parse(await env.PASTE_STORE.get(key.name));
            shares.push({
                id: key.name,
                type: 'paste',
                content: paste.content?.substring(0, 100) + '...',
                createdAt: paste.createdAt,
                expiresAt: paste.expiresAt,
                hasPassword: !!paste.passwordHash,
                isMarkdown: paste.isMarkdown,
                url: `${url.origin}/share/paste/${key.name}`
            });
            } catch (e) {
            console.error('Error processing paste:', key.name, e);
            continue;
            }
        }
        } catch (e) {
        console.error('Error listing pastes:', e);
        }

        try {
        // 获取文件分享
        const fileList = await env.FILE_STORE.list();  // 获取文件列表
        console.log('R2 file list:', fileList);  // 添加调试日志
        
        // 遍历所有文件，R2 存储桶的列表返回的是 objects 属性
        for (const object of fileList.objects || []) {
            try {
            // 获取文件的完整信息
            const file = await env.FILE_STORE.get(object.key);
            if (!file) {
                console.log('File not found:', object.key);
                continue;
            }

            const metadata = file.customMetadata;
            if (!metadata) {
                console.log('No metadata for file:', object.key);
                continue;
            }

            shares.push({
                id: object.key,
                type: 'file',
                filename: metadata.filename || object.key,
                size: metadata.size || object.size,
                createdAt: metadata.uploadedAt || object.uploaded,
                expiresAt: metadata.expiresAt,
                hasPassword: !!metadata.passwordHash,
                url: `${url.origin}/share/file/${object.key}`
            });

            console.log('Added file share:', object.key);
            } catch (e) {
            console.error('Error processing file:', {
                key: object.key,
                error: e.message,
                stack: e.stack
            });
            }
        }
        } catch (e) {
        console.error('Error listing R2 files:', {
            error: e.message,
            stack: e.stack
        });
        }

        return new Response(JSON.stringify({
        status: 'success',
        shares: shares.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        }), {
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Cache-Control': 'no-store'
        }
        });
    } catch (error) {
        console.error('Get shares error:', error);
        return new Response(JSON.stringify({
        status: 'error',
        message: '获取分享列表失败: ' + error.message
        }), {
        status: 500,
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
        });
    }
    }

      // 删除分享
      if (url.pathname.match(/^\/api\/admin\/(paste|file)\/[a-zA-Z0-9]+$/)) {
        if (request.method !== 'DELETE') {
          return new Response('Method not allowed', { status: 405 });
        }

        // 验证管理员权限
        if (!await verifyAdmin(request, env)) {
          return new Response('Unauthorized', { status: 401 });
        }

        try {
          const pathParts = url.pathname.split('/');
          const type = pathParts[pathParts.length - 2];
          const id = pathParts[pathParts.length - 1];

          if (type === 'paste') {
            await env.PASTE_STORE.delete(id);
          } else {
            await env.FILE_STORE.delete(id);
          }

          return new Response(JSON.stringify({
            status: 'success',
            message: '删除成功'
          }), {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          return new Response(JSON.stringify({
            status: 'error',
            message: '删除失败'
          }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }
    }

    
    // 处理CORS预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Password, Authorization',  // 添加 Authorization
        'Access-Control-Max-Age': '86400',
        }
      });
    }

    // 处理 API 请求 - 移到前面，优先处理
    if (url.pathname.startsWith("/api/")) {
      try {
        let response;
        if (url.pathname.startsWith("/api/paste")) {
          response = await handlePaste(request, env);
        } else if (url.pathname.startsWith("/api/file")) {
          response = await handleFile(request, env);
        } else {
          response = new Response("Not Found", { status: 404 });
        }

        const corsHeaders = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Password',
        };

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: { ...Object.fromEntries(response.headers), ...corsHeaders }
        });
      } catch (err) {
        return new Response(JSON.stringify({
          message: err.message,
          status: 'error'
        }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // 处理分享页面
    if (url.pathname.startsWith("/share/paste/") || url.pathname.startsWith("/share/file/")) {
      return new Response(shareHtml, {
        headers: { 
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*"
        },
      });
    }

    // 重定向 API 直接访问到分享页面
    if (url.pathname.match(/^\/paste\/[a-zA-Z0-9]+$/)) {
      const id = url.pathname.split('/').pop();
      return Response.redirect(`${url.origin}/share/paste/${id}`, 301);
    }

    if (url.pathname.match(/^\/file\/[a-zA-Z0-9]+$/)) {
      const id = url.pathname.split('/').pop();
      return Response.redirect(`${url.origin}/share/file/${id}`, 301);
    }
    
    // 处理主页
    return new Response(html, {
      headers: { 
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*"
      },
    });
  }
};
