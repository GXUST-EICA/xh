# 🍊 香橙派Zero3配置指南

### 🔧 硬件概览
**开发板核心参数**  
🚀 全志H618芯片开发板特性：

| 参数类型       | 规格说明                  | 官方资源                  |
|----------------|---------------------------|---------------------------|
| **芯片架构**   | 全志H618四核Cortex-A53    | [🍊 官网详情](#)          |
| **网络接口**   | 千兆网口 + 蓝牙5.0        | [📥 数据手册](#)         |
| **扩展接口**   | 40pin GPIO + USB3.0       | [🔌 引脚图](#)            |

---

### 📀 镜像配置流程
**三步完成系统部署**  
🛠️ 协会预配置Ubuntu22.04镜像特性：

1. **基础环境** → ✅ Miniconda + Python3.10虚拟环境
2. **视觉工具链** → 🎯 OpenCV+YOLOv8+ONNX预装
3. **开发辅助** → ⚡ Jupyter + 阿里云pip源

---

### 🔥 烧录指南
| 步骤 | 操作说明                  | 工具/资源                  |
|------|---------------------------|---------------------------|
| 1️⃣   | 下载32GB高速镜像          | 📥 实验室电脑D盘    |
| 2️⃣   | 使用Win32DiskImager写入   | [⚡ 下载工具]([#](https://www.eica.fun/download/win32.html))          |
| 3️⃣   | Type-C 15W+电源供电       | 🔌 自备手机充电器         |

---

### 🌐 连接与使用
**Jupyter访问指南**  
🔗 连接成功后执行以下操作：

1. **连接成功之后，我们在下面看到我这个香橙派的ip地址是192.168.137.115，我们打开jupyter需要知道orangepi的ip地址，在浏览器输入192.168.137.115:8888就可以看到jupyter的界面了,如果需要密码的话，**jupyter默认密码是12345678**。
2. **这个就需要我们自己去学jupyter的基本用法了**: [Jupyter Notebook + OpenCV 完美组合](https://blog.csdn.net/weixin_44155966/article/details/112688909) | [15个应该掌握的Jupyter Notebook 使用技巧](https://zhuanlan.zhihu.com/p/256039090) | [一文弄懂Jupyter的配置与使用](https://blog.csdn.net/weixin_38556197/article/details/139426996) | [良心总结！Jupyter Notebook 从小白到高手](https://blog.csdn.net/cainiao_python/article/details/125567913)

**学习资源速递**：
资源类型 | 内容推荐 | 直达链接
:---:|:---:|:---:
📖 基础教程 | Jupyter+OpenCV实战 | [![CSDN](https://img.shields.io/badge/查看指南-FF9800?style=flat-square)](https://blog.csdn.net/weixin_44155966/article/details/112688909)
🎓 进阶技巧 | Jupyter高效用法 | [![知乎](https://img.shields.io/badge/深度解析-0084FF?style=flat-square)](https://zhuanlan.zhihu.com/p/256039090)
🛠️ 故障排查 | 常见问题解决方案 | [![CSDN](https://img.shields.io/badge/问题排查-FF5722?style=flat-square)](https://blog.csdn.net/weixin_38556197/article/details/139426996)

<p align="center">
👨💻 文档维护：自231班 黄海东<br/>
📅 版本追踪：v2.1.3 (2025.04.13)<br/>
📧 技术支持：<a href="mailto:jnjnjnn@163.com">jnjnjnn@163.com</a>
</p>