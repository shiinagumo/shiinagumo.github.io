// ==================== 1. 图片放大灯箱效果 ====================
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = imgSrc;
    lightbox.classList.remove('hidden');
    
    // 异步触发动画，确保过渡丝滑
    setTimeout(() => {
        lightbox.classList.remove('opacity-0');
    }, 10);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('opacity-0');
    
    // 等待过渡动画结束后完全隐藏
    setTimeout(() => {
        lightbox.classList.add('hidden');
    }, 300);
}

// 监听键盘 ESC 键关闭大图
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});


// ==================== 2. 摄影作品分类筛选 ====================
function filterGallery(category, button) {
    // 更新按钮激活状态
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active', 'text-stone-900', 'font-medium'));
    button.classList.add('active', 'text-stone-900', 'font-medium');

    // 筛选图片项目
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}