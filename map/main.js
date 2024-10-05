// 基本变量设置
let scene, camera, renderer, controls;

function init() {
    // 创建场景
    scene = new THREE.Scene();
    
    // 设置相机
    camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    camera.position.set(0, 2, 5);
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // 控制器（用于移动和旋转场景）
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    // 灯光
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // 环境光
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    
    // 地面
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = - Math.PI / 2;
    scene.add(floor);

    // 创建房间
    createRoom();

    // 添加导航路径
    createPath();

    // 添加家具
    createFurniture();

    // 渲染场景
    animate();
}

// 创建房间
function createRoom() {
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

    // 四面墙
    const wall1 = new THREE.Mesh(new THREE.BoxGeometry(20, 5, 0.5), wallMaterial);
    wall1.position.set(0, 2.5, -10);
    scene.add(wall1);

    const wall2 = new THREE.Mesh(new THREE.BoxGeometry(20, 5, 0.5), wallMaterial);
    wall2.position.set(0, 2.5, 10);
    scene.add(wall2);

    const wall3 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 5, 20), wallMaterial);
    wall3.position.set(-10, 2.5, 0);
    scene.add(wall3);

    const wall4 = new THREE.Mesh(new THREE.BoxGeometry(0.5, 5, 20), wallMaterial);
    wall4.position.set(10, 2.5, 0);
    scene.add(wall4);
}

// 创建导航路径
function createPath() {
    const pathMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const points = [];

    // 路线的几个点
    points.push(new THREE.Vector3(-9, 0.1, -9));
    points.push(new THREE.Vector3(-5, 0.1, -5));
    points.push(new THREE.Vector3(0, 0.1, 0));
    points.push(new THREE.Vector3(5, 0.1, 5));
    points.push(new THREE.Vector3(9, 0.1, 9));

    const pathGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const pathLine = new THREE.Line(pathGeometry, pathMaterial);

    scene.add(pathLine);
}

// 添加家具
function createFurniture() {
    // 桌子
    const tableGeometry = new THREE.BoxGeometry(1, 0.1, 2);
    const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.set(0, 0.6, 0);
    scene.add(table);

    // 椅子
    const chairGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const chairMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    const chair = new THREE.Mesh(chairGeometry, chairMaterial);
    chair.position.set(1.5, 0.25, 0);
    scene.add(chair);
}

// 动画渲染循环
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// 窗口调整大小自适应
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// 初始化场景
init();
