<?php
header('Content-Type: application/json');

// 允许跨域请求（如果需要）
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// 只允许POST请求
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => '只允许POST请求']);
    exit;
}

// 获取POST数据
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(['success' => false, 'message' => '无效的输入数据']);
    exit;
}

// 验证必需字段
$required_fields = ['name', 'component', 'action', 'date'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        echo json_encode(['success' => false, 'message' => "缺少必需字段: $field"]);
        exit;
    }
}

// 清理和验证数据
$name = htmlspecialchars(trim($input['name']));
$component = htmlspecialchars(trim($input['component']));
$action = htmlspecialchars(trim($input['action']));
$date = htmlspecialchars(trim($input['date']));
$remark = htmlspecialchars(trim($input['remark'] ?? ''));

// 验证日期格式
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
    echo json_encode(['success' => false, 'message' => '日期格式无效']);
    exit;
}

// 验证操作类型
if (!in_array($action, ['借用', '归还'])) {
    echo json_encode(['success' => false, 'message' => '操作类型无效']);
    exit;
}

// 创建新的记录行
$newRecord = "| $name | $component | $action | $date | $remark |\n";

// 文件路径
$recordsFile = 'records.md';

try {
    // 检查文件是否存在，如果不存在则创建表头
    if (!file_exists($recordsFile)) {
        $header = "# 嵌入式智控协会元器件使用登记表\n\n";
        $header .= "| 姓名 | 元器件名称 | 操作类型 | 日期 | 备注 |\n";
        $header .= "|---|---|---|---|---|\n";
        file_put_contents($recordsFile, $header);
    }
    
    // 追加新记录到文件
    if (file_put_contents($recordsFile, $newRecord, FILE_APPEND | LOCK_EX) !== false) {
        echo json_encode(['success' => true, 'message' => '记录保存成功']);
    } else {
        echo json_encode(['success' => false, 'message' => '写入文件失败']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => '服务器错误: ' . $e->getMessage()]);
}
?> 