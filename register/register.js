// GitHub 配置
const config = {
	owner: 'jn', // 替换为你的 GitHub 用户名
	repo: 'xh',  // 替换为你的仓库名
	path: 'register/records.md',
	branch: 'main' // 或者 'master'，取决于你的默认分支
};

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
		// 1. 获取 GitHub Token
		const token = localStorage.getItem('github_token');
		if (!token) {
			const newToken = prompt('请输入 GitHub Personal Access Token\n（需要有 repo 权限，访问 https://github.com/settings/tokens 创建）');
			if (!newToken) {
				throw new Error('需要 GitHub Token 才能保存记录');
			}
			localStorage.setItem('github_token', newToken);
		}

		// 2. 获取现有文件内容和 SHA
		const fileResponse = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}`, {
			headers: {
				'Authorization': `token ${localStorage.getItem('github_token')}`,
				'Accept': 'application/vnd.github.v3+json'
			}
		});

		let content = '';
		let sha = '';

		if (fileResponse.ok) {
			const fileData = await fileResponse.json();
			content = atob(fileData.content);
			sha = fileData.sha;
		} else if (fileResponse.status === 404) {
			// 文件不存在，创建新的内容
			content = "# 嵌入式智控协会元器件使用登记表\n\n| 姓名 | 元器件名称 | 操作类型 | 日期 | 备注 |\n|---|---|---|---|---|\n";
		} else {
			throw new Error('获取文件失败：' + fileResponse.statusText);
		}

		// 3. 添加新记录
		const newRecord = `| ${formData.name} | ${formData.component} | ${formData.action} | ${formData.date} | ${formData.remark} |\n`;
		const updatedContent = content + newRecord;

		// 4. 提交更新
		const updateResponse = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/contents/${config.path}`, {
			method: 'PUT',
			headers: {
				'Authorization': `token ${localStorage.getItem('github_token')}`,
				'Accept': 'application/vnd.github.v3+json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message: `添加登记记录：${formData.name} ${formData.action}${formData.component}`,
				content: btoa(updatedContent),
				sha: sha || undefined,
				branch: config.branch
			})
		});

		if (!updateResponse.ok) {
			const errorData = await updateResponse.json();
			throw new Error(errorData.message || '提交失败');
		}

		// 显示成功消息
		successMsg.classList.remove('d-none', 'alert-danger');
		successMsg.classList.add('alert-success');
		successMsg.innerHTML = `
			<div>登记成功！记录已保存到 GitHub 仓库。</div>
			<div class="mt-2 small">
				<a href="https://github.com/${config.owner}/${config.repo}/blob/${config.branch}/${config.path}" target="_blank">
					点击查看记录文件 <i class="fas fa-external-link-alt"></i>
				</a>
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
				${error.message.includes('token') ? 
					'<button class="btn btn-sm btn-outline-danger" onclick="localStorage.removeItem(\'github_token\'); window.location.reload();">重置 Token</button>' : 
					'<strong>提示：</strong> 请确保 GitHub Token 具有正确的权限。'}
			</div>
		`;
	} finally {
		// 恢复按钮状态
		submitBtn.disabled = false;
		submitBtn.innerHTML = originalBtnText;
	}
}); 