# 🐧 OpenCV与YOLO算法精要

### 🌟 YOLO核心特性
**实时目标检测技术解析**  

| 维度         | 技术优势                  | 典型应用场景          |
|--------------|--------------------------|----------------------|
| **检测速度** | ⚡ 45-150 FPS实时处理      | 自动驾驶/视频监控     |
| **准确率**   | 🎯 COCO数据集60.6% mAP    | 工业质检/安防系统     |
| **架构演进** | 🚀 v1-v8持续优化          | 移动端AI推理         |

---

### 🛠️ YOLOv8部署流程
**四步完成模型部署**  

1. **环境准备** → `conda create -n yolo python=3.10`
2. **安装依赖** → `pip install ultralytics onnxruntime`
3. **模型转换** → `yolo export model=yolov8n.pt format=onnx`
4. **推理测试** → `python detect.py --weights yolov8n.pt`

---

### 📚 学习资源推荐
资源类型 | 推荐内容 | 访问链接
:---:|:---:|:---:
🎥 视频教程 | 从零部署YOLOv8 | [![B站](https://img.shields.io/badge/实战课程-FF69B4?style=flat-square)](https://www.bilibili.com/video/BV1qtHeeMEnC)
📖 官方文档 | Ultralytics指南 | [![查看文档](https://img.shields.io/badge/最新版-00BFFF?style=flat-square)](https://docs.ultralytics.com/zh)
📦 预训练模型 | COCO数据集模型 | [![下载](https://img.shields.io/badge/模型仓库-32CD32?style=flat-square)](https://github.com/ultralytics/ultralytics)

---

### 🔍 性能对比
| 模型版本 | 参数量(M) | mAP50-95 | 推理速度(ms) |
|---------|----------|----------|-------------|
| YOLOv8n | 3.2      | 37.3     | 6.8         |
| YOLOv8s | 11.2     | 44.9     | 10.2        |
| YOLOv8m | 25.9     | 50.2     | 24.7        |

<p align="center">
👨💻 文档维护：自231班 黄海东<br/>
📅 版本追踪：v2.1.3 (2025.04.13)<br/>
📧 技术支持：<a href="mailto:jnjnjnn@163.com">jnjnjnn@163.com</a>
</p>