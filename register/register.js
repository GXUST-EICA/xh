document.getElementById('registerForm').addEventListener('submit', function(e) {
	e.preventDefault();
	
	const name = document.getElementById('name').value.trim();
	const component = document.getElementById('component').value.trim();
	const action = document.getElementById('action').value;
	const date = document.getElementById('date').value;
	const remark = document.getElementById('remark').value.trim();
	
	// 创建新的记录行
	const newRecord = `| ${name} | ${component} | ${action} | ${date} | ${remark} |\n`;
	
	// 使用fetch API将数据发送到服务器端处理
	fetch('save_record.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: name,
			component: component,
			action: action,
			date: date,
			remark: remark
		})
	})
	.then(response => response.json())
	.then(data => {
		if (data.success) {
			document.getElementById('successMsg').classList.remove('d-none');
			document.getElementById('successMsg').textContent = '登记成功！记录已保存到records.md文件';
			this.reset();
		} else {
			alert('保存失败：' + data.message);
		}
	})
	.catch(error => {
		console.error('Error:', error);
		alert('保存失败，请检查网络连接');
	});
}); 