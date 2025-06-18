document.addEventListener('DOMContentLoaded', function() {
	// 自动填充当前日期
	const today = new Date().toISOString().split('T')[0];
	document.getElementById('date').value = today;
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
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

	// 发送数据到服务器
	fetch('save_record.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData)
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('网络响应不正常');
		}
		return response.json();
	})
	.then(data => {
		if (data.success) {
			successMsg.classList.remove('d-none');
			successMsg.classList.remove('alert-danger');
			successMsg.classList.add('alert-success');
			successMsg.textContent = '登记成功！记录已保存';
			this.reset();
			// 重新设置当前日期
			document.getElementById('date').value = new Date().toISOString().split('T')[0];
		} else {
			throw new Error(data.message || '保存失败');
		}
	})
	.catch(error => {
		console.error('Error:', error);
		successMsg.classList.remove('d-none');
		successMsg.classList.remove('alert-success');
		successMsg.classList.add('alert-danger');
		successMsg.textContent = '保存失败：' + error.message;
	})
	.finally(() => {
		// 恢复按钮状态
		submitBtn.disabled = false;
		submitBtn.innerHTML = originalBtnText;
	});
}); 