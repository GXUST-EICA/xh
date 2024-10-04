const video = document.getElementById('camera-view');

// 获取摄像头的访问权限
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error('Error accessing the camera: ', err);
    });

// 初始化Three.js场景
const canvas = document.getElementById('ar-content');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// 创建简单的3D箭头模型
const arrowGeometry = new THREE.ConeGeometry(0.1, 0.3, 32);
const arrowMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);

// 将箭头添加到场景中
scene.add(arrow);

// 将箭头位置调整到用户面前
arrow.position.z = -1;

// 使箭头始终面朝摄像头
function updateArrow() {
    arrow.lookAt(camera.position);
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    updateArrow();
    renderer.render(scene, camera);
}

// 启动动画
animate();

// 处理窗口大小变化
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
