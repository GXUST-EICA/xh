document.addEventListener('DOMContentLoaded', function() {
	// 自动填充当前日期
	const today = new Date().toISOString().split('T')[0];
	document.getElementById('date').value = today;
});

document.getElementById('registerForm').addEventListener('submit', async function(e) {
	e.preventDefault();
	
	const successMsg = document.getElementById('successMsg');
	successMsg.classList.add('d-none');
	
	// 获取表单数据
	const formData = {
		name: document.getElementById('name').value.trim(),
		component: document.getElementById('component').value.trim(),
		action: document.getElementById('action').value,
		date: document.getElementById('date').value,
		remark: document.getElementById('remark').value.trim()
	};

	// 显示加载状态
	const submitBtn = this.querySelector('button[type="submit"]');
	const originalBtnText = submitBtn.innerHTML;
	submitBtn.disabled = true;
	submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 保存中...';

	try {
		// 1. 首先获取现有文件内容
		const response = await fetch('records.md');
		let content = '';
		
		if (response.ok) {
			content = await response.text();
		} else {
			// 如果文件不存在，创建新的内容
			content = "# 嵌入式智控协会元器件使用登记表\n\n| 姓名 | 元器件名称 | 操作类型 | 日期 | 备注 |\n|---|---|---|---|---|\n";
		}

		// 2. 添加新记录
		const newRecord = `| ${formData.name} | ${formData.component} | ${formData.action} | ${formData.date} | ${formData.remark} |\n`;
		const updatedContent = content + newRecord;

		// 3. 创建 Blob 对象并生成下载
		const blob = new Blob([updatedContent], { type: 'text/markdown' });
		const downloadUrl = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = downloadUrl;
		a.download = 'records.md';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(downloadUrl);

		// 显示成功消息
		successMsg.classList.remove('d-none', 'alert-danger');
		successMsg.classList.add('alert-success');
		successMsg.innerHTML = `
			<div>登记成功！新记录已生成。</div>
			<div class="mt-2 small">
				<strong>注意：</strong> 由于这是静态网站，您需要：
				<ol class="mb-0">
					<li>下载生成的 records.md 文件</li>
					<li>将文件提交到 GitHub 仓库的 register 目录中</li>
				</ol>
			</div>
		`;
		
		// 重置表单
		this.reset();
		document.getElementById('date').value = new Date().toISOString().split('T')[0];
		
	} catch (error) {
		console.error('Error:', error);
		successMsg.classList.remove('d-none', 'alert-success');
		successMsg.classList.add('alert-danger');
		successMsg.innerHTML = `
			<div>保存失败：${error.message}</div>
			<div class="mt-2 small">
				<strong>提示：</strong> 这是一个静态网站，不支持直接保存到服务器。请按照上述步骤手动更新文件。
			</div>
		`;
	} finally {
		// 恢复按钮状态
		submitBtn.disabled = false;
		submitBtn.innerHTML = originalBtnText;
	}
}); 