document.getElementById('registerForm').addEventListener('submit', function(e) {
	e.preventDefault();
	const name = document.getElementById('name').value.trim();
	const component = document.getElementById('component').value.trim();
	const action = document.getElementById('action').value;
	const date = document.getElementById('date').value;
	const remark = document.getElementById('remark').value.trim();
	const md = `| 姓名 | 元器件名称 | 操作类型 | 日期 | 备注 |\n|---|---|---|---|---|\n| ${name} | ${component} | ${action} | ${date} | ${remark} |\n`;
	// 下载追加到本地md文件
	const blob = new Blob([md], {type: 'text/markdown'});
	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = 'records.md';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	document.getElementById('successMsg').classList.remove('d-none');
	this.reset();
}); 