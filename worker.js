// worker.js
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { mangle } from 'marked-mangle';

// 配置 marked
marked.use(gfmHeadingId());
marked.use(mangle());
marked.use({
  breaks: true,
  gfm: true
});

// HTML 模板
const htmlTemplate = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CloudPaste - 云剪贴板</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js/styles/github.css">
    <style>
        :root {
            --editor-bg: #ffffff;
            --preview-bg: #ffffff;
            --border-color: #e1e4e8;
            --toolbar-bg: #f6f8fa;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #24292e;
            background: #f6f8fa;
        }

        .container {
            display: flex;
            height: calc(100vh - 50px);
            padding: 20px;
            gap: 20px;
        }

        .editor, .preview {
            flex: 1;
            background: var(--editor-bg);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            overflow: auto;
        }

        .editor textarea {
            width: 100%;
            height: 100%;
            padding: 20px;
            border: none;
            resize: none;
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
            font-size: 14px;
            line-height: 1.6;
            outline: none;
        }

        .preview {
            padding: 20px;
            background: var(--preview-bg);
        }

        .toolbar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50px;
            padding: 0 20px;
            background: var(--toolbar-bg);
            border-top: 1px solid var(--border-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .export-group {
            display: flex;
            gap: 10px;
        }

        select, button {
            padding: 6px 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            background: white;
            cursor: pointer;
        }

        button:hover {
            background: #f1f1f1;
        }

        .toc-panel {
            position: fixed;
            top: 20px;
            right: -300px;
            width: 300px;
            height: calc(100vh - 90px);
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            transition: right 0.3s ease;
            display: flex;
            flex-direction: column;
        }

        .toc-panel.show {
            right: 20px;
        }

        .toc-header {
            padding: 15px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .toc-header h3 {
            margin: 0;
            font-size: 16px;
        }

        .close-btn {
            border: none;
            background: none;
            font-size: 20px;
            cursor: pointer;
            padding: 0 5px;
        }

        .toc-content {
            padding: 15px;
            overflow-y: auto;
            flex-grow: 1;
        }

        .toc-item {
            padding: 4px 0;
            cursor: pointer;
            color: #0366d6;
        }

        .toc-item:hover {
            text-decoration: underline;
        }

        .copy-toast {
            position: fixed;
            bottom: 70px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            transition: transform 0.3s ease;
        }

        .copy-toast.show {
            transform: translateX(-50%) translateY(0);
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --editor-bg: #1f2428;
                --preview-bg: #1f2428;
                --border-color: #30363d;
                --toolbar-bg: #2d333b;
            }

            body {
                color: #c9d1d9;
                background: #22272e;
            }

            .editor textarea {
                color: #c9d1d9;
                background: var(--editor-bg);
            }

            select, button {
                background: #2d333b;
                color: #c9d1d9;
            }

            button:hover {
                background: #444c56;
            }

            .toc-panel {
                background: #2d333b;
            }

            .toc-item {
                color: #58a6ff;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="editor">
            <textarea id="input" spellcheck="false" placeholder="在此输入 Markdown 内容..."></textarea>
        </div>
        <div class="preview markdown-body">
            <div id="output"></div>
        </div>
    </div>

    <div class="toolbar">
        <div class="export-group">
            <select id="exportFormat">
                <option value="pdf">PDF文档</option>
                <option value="image">图片(PNG)</option>
                <option value="hugo">Hugo文章</option>
            </select>
            <button id="exportBtn">导出</button>
        </div>
        <div class="toc-toggle">
            <button id="tocBtn">目录</button>
        </div>
    </div>

    <div class="toc-panel" id="tocPanel">
        <div class="toc-header">
            <h3>目录</h3>
            <button class="close-btn" id="closeTocBtn">&times;</button>
        </div>
        <div class="toc-content" id="toc"></div>
    </div>

    <script>
        const worker = new Worker('worker.js', { type: 'module' });
        const input = document.getElementById('input');
        const output = document.getElementById('output');
        const exportFormat = document.getElementById('exportFormat');
        const exportBtn = document.getElementById('exportBtn');
        const tocBtn = document.getElementById('tocBtn');
        const tocPanel = document.getElementById('tocPanel');
        const closeTocBtn = document.getElementById('closeTocBtn');
        const toc = document.getElementById('toc');

        // 自动保存
        const AUTO_SAVE_KEY = 'cloudpaste-content';
        let autoSaveTimer;

        // 从本地存储加载内容
        const savedContent = localStorage.getItem(AUTO_SAVE_KEY);
        if (savedContent) {
            input.value = savedContent;
            updatePreview();
        }

        // 监听输入
        input.addEventListener('input', () => {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                localStorage.setItem(AUTO_SAVE_KEY, input.value);
            }, 1000);
            updatePreview();
        });

        // 导出按钮点击事件
        exportBtn.addEventListener('click', () => {
            const format = exportFormat.value;
            worker.postMessage({
                type: 'export',
                format,
                content: input.value
            });
        });

        // 目录按钮事件
        tocBtn.addEventListener('click', () => {
            tocPanel.classList.toggle('show');
        });

        closeTocBtn.addEventListener('click', () => {
            tocPanel.classList.remove('show');
        });

        // 更新预览
        function updatePreview() {
            if (!input.value.trim()) {
                output.innerHTML = '<div class="empty">预览区域</div>';
                toc.innerHTML = '';
                return;
            }

            worker.postMessage({
                type: 'parse',
                content: input.value
            });
        }

        // 更新目录
        function updateToc(tocData) {
            toc.innerHTML = tocData
                .map(item => {
                    const indent = '  '.repeat(item.level - 1);
                    return `<div class="toc-item" style="padding-left: ${(item.level - 1) * 20}px" onclick="scrollToHeading('${item.id}')">
                        ${indent}${item.text}
                    </div>`;
                })
                .join('');
        }

        // 滚动到指定标题
        window.scrollToHeading = (id) => {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        };

        // 下载文件
        function downloadFile(data, filename, type) {
            const blob = new Blob([data], { type });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }

        // 显示提示信息
        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'copy-toast';
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => document.body.removeChild(toast), 300);
            }, 2000);
        }

        // 处理 Worker 消息
        worker.onmessage = (e) => {
            const { type, format, data, error, filename } = e.data;

            if (error) {
                console.error(error);
                return;
            }

            switch (type) {
                case 'parse':
                    output.innerHTML = data.html;
                    updateToc(data.toc);
                    break;

                case 'export':
                    switch (format) {
                        case 'hugo':
                            downloadFile(data, filename, 'text/markdown;charset=utf-8');
                            break;

                        case 'pdf':
                            const pdfData = atob(data);
                            downloadFile(pdfData, 'document.pdf', 'application/pdf');
                            break;

                        case 'image':
                            html2canvas(output).then(canvas => {
                                canvas.toBlob(blob => {
                                    downloadFile(blob, 'preview.png', 'image/png');
                                });
                            });
                            break;
                    }
                    showToast('导出成功！');
                    break;
            }
        };

        // 初始更新预览
        updatePreview();
    </script>
</body>
</html>
`;

// 处理主线程发来的消息
self.onmessage = async (e) => {
  const { type, content, format } = e.data;

  try {
    switch (type) {
      case 'parse':
        // Markdown 解析功能
        const tokens = marked.lexer(content);
        const html = marked.parser(tokens);
        
        // 提取标题用于目录
        const toc = tokens
          .filter(token => token.type === 'heading')
          .map(({ text, depth, id }) => ({
            text,
            level: depth,
            id
          }));

        self.postMessage({
          type: 'parse',
          data: {
            html,
            toc
          }
        });
        break;

      case 'export':
        switch (format) {
          case 'pdf':
            try {
              const pdfMakeModule = await import('pdfmake/build/pdfmake');
              const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
              
              const pdfMake = pdfMakeModule.default;
              pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
              
              const docDefinition = {
                content: [
                  {
                    text: content,
                    fontSize: 12
                  }
                ],
                defaultStyle: {
                  font: 'Roboto'
                }
              };
              
              const pdfDocGenerator = pdfMake.createPdf(docDefinition);
              
              pdfDocGenerator.getBase64((base64) => {
                self.postMessage({
                  type: 'export',
                  format: 'pdf',
                  data: base64
                });
              });
            } catch (error) {
              throw new Error(`PDF export failed: ${error.message}`);
            }
            break;

          case 'hugo':
            try {
              const now = new Date();
              const dateStr = now.toISOString().split('T')[0];
              
              const title = content.split('\n')[0].replace(/[#\s]/g, '').substring(0, 50);
              
              const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
              
              const imgMatch = content.match(/!\[.*?\]\((.*?)\)/);
              
              const frontMatter = `+++
title = "${title}"
description = "${title}"
date = "${dateStr}"
tags = ["post"]
categories = [
  "Default"
]
slug = "${slug}"${imgMatch ? `
image = "${imgMatch[1]}"` : ''}
+++

`;
              
              const hugoContent = frontMatter + content;
              
              self.postMessage({
                type: 'export',
                format: 'hugo',
                data: hugoContent,
                filename: `${slug}.md`
              });
            } catch (error) {
              throw new Error(`Hugo export failed: ${error.message}`);
            }
            break;

          case 'image':
            self.postMessage({
              type: 'export',
              format: 'image',
              data: content
            });
            break;

          default:
            throw new Error(`Unknown export format: ${format}`);
        }
        break;

      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error.message
    });
  }
};

// 错误处理
self.onerror = (error) => {
  self.postMessage({
    type: 'error',
    error: error.message
  });
};

self.onunhandledrejection = (event) => {
  self.postMessage({
    type: 'error',
    error: event.reason
  });
};
