// 页面加载时自动加载记录
document.addEventListener('DOMContentLoaded', function() {
    loadRecords();
});

// 加载记录函数
function loadRecords() {
    const recordsContent = document.getElementById('recordsContent');
    
    // 显示加载状态
    recordsContent.innerHTML = `
        <div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">加载中...</span>
            </div>
            <p class="mt-2">正在加载记录...</p>
        </div>
    `;
    
    // 使用fetch获取records.md文件内容
    fetch('records.md')
        .then(response => {
            if (!response.ok) {
                throw new Error('文件不存在或无法访问');
            }
            return response.text();
        })
        .then(content => {
            displayRecords(content);
        })
        .catch(error => {
            console.error('Error:', error);
            recordsContent.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    <i class="fas fa-exclamation-triangle"></i>
                    无法加载记录文件：${error.message}
                </div>
            `;
        });
}

// 显示记录函数
function displayRecords(content) {
    const recordsContent = document.getElementById('recordsContent');
    
    // 解析markdown表格内容
    const lines = content.trim().split('\n');
    let tableHTML = '<div class="table-responsive"><table class="table table-striped table-hover">';
    
    let isInTable = false;
    let headerProcessed = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // 跳过标题行
        if (line.startsWith('#') || line === '') {
            continue;
        }
        
        // 检测表格开始
        if (line.startsWith('|') && line.endsWith('|')) {
            if (!isInTable) {
                isInTable = true;
                tableHTML += '<thead><tr>';
            }
            
            // 解析表格行
            const cells = line.split('|').slice(1, -1); // 去掉首尾的|
            
            if (!headerProcessed) {
                // 处理表头
                cells.forEach(cell => {
                    const headerText = cell.trim();
                    if (headerText !== '---') {
                        tableHTML += `<th>${headerText}</th>`;
                    }
                });
                tableHTML += '</tr></thead><tbody>';
                headerProcessed = true;
            } else if (line.includes('---')) {
                // 跳过分隔行
                continue;
            } else {
                // 处理数据行
                tableHTML += '<tr>';
                cells.forEach(cell => {
                    const cellText = cell.trim();
                    tableHTML += `<td>${cellText}</td>`;
                });
                tableHTML += '</tr>';
            }
        } else {
            // 表格结束
            if (isInTable) {
                isInTable = false;
                tableHTML += '</tbody></table></div>';
            }
        }
    }
    
    // 如果还在表格中，关闭表格
    if (isInTable) {
        tableHTML += '</tbody></table></div>';
    }
    
    // 检查是否有数据
    if (!headerProcessed) {
        recordsContent.innerHTML = `
            <div class="alert alert-info" role="alert">
                <i class="fas fa-info-circle"></i>
                暂无登记记录，请先添加一些记录。
            </div>
        `;
    } else {
        recordsContent.innerHTML = tableHTML;
    }
} 