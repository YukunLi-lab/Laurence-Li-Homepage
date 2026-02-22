// ===== MEMORIES MODULE =====
// This file contains all the functionality for the "My Precious Memories" section

class MemoriesModule {
    constructor() {
        this.memoryItems = [];
        this.currentYearFilter = 'all';
        this.currentViewerIndex = 0;
        this.isViewerOpen = false;
        
        // Initialize
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.bindEvents();
        this.setupIntersectionObserver();
        this.loadMemories();
    }
    
    cacheElements() {
        // Year filter buttons
        this.yearButtons = document.querySelectorAll('.year-btn');
        this.memoryItemsElements = document.querySelectorAll('.memory-item');
        
        // Upload area
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.uploadBtn = document.querySelector('.upload-btn');
        
        // Fullscreen viewer
        this.fullscreenViewer = document.getElementById('fullscreenViewer');
        this.viewerClose = document.querySelector('.viewer-close');
        this.viewerMedia = document.querySelector('.viewer-media');
        this.viewerDate = document.getElementById('viewerDate');
        this.viewerPrev = document.querySelector('.viewer-prev');
        this.viewerNext = document.querySelector('.viewer-next');
        
        // Memories grid
        this.memoriesGrid = document.querySelector('.memories-grid');
    }
    
    bindEvents() {
        // Year filter buttons
        this.yearButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleYearFilter(e));
        });
        
        // Upload area events
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        this.uploadBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.fileInput.click();
        });
        
        // Memory item click events
        this.memoryItemsElements.forEach((item, index) => {
            item.addEventListener('click', () => this.openViewer(index));
        });
        
        // Viewer controls
        this.viewerClose.addEventListener('click', () => this.closeViewer());
        this.viewerPrev.addEventListener('click', () => this.navigateViewer(-1));
        this.viewerNext.addEventListener('click', () => this.navigateViewer(1));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Close viewer when clicking outside
        this.fullscreenViewer.addEventListener('click', (e) => {
            if (e.target === this.fullscreenViewer) {
                this.closeViewer();
            }
        });
    }
    
    setupIntersectionObserver() {
        // Setup Intersection Observer for video autoplay
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target.querySelector('video');
                if (video) {
                    if (entry.isIntersecting) {
                        video.play().catch(e => console.log('Video autoplay failed:', e));
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                }
            });
        }, { threshold: 0.5 });
        
        // Observe all memory items with videos
        this.memoryItemsElements.forEach(item => {
            const video = item.querySelector('video');
            if (video) {
                videoObserver.observe(item);
            }
        });
    }
    
    loadMemories() {
        // In a real application, this would load from an API or local storage
        // For now, we'll use the static HTML content
        this.memoryItems = Array.from(this.memoryItemsElements).map((item, index) => ({
            element: item,
            year: item.dataset.year,
            date: item.dataset.date,
            media: item.querySelector('img, video'),
            type: item.querySelector('img') ? 'image' : 'video',
            index: index
        }));
    }
    
    handleYearFilter(e) {
        const year = e.target.dataset.year;
        
        // Update active button
        this.yearButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Update current filter
        this.currentYearFilter = year;
        
        // Filter memories
        this.filterMemories();
    }
    
    filterMemories() {
        this.memoryItems.forEach(item => {
            if (this.currentYearFilter === 'all' || item.year === this.currentYearFilter) {
                item.element.style.display = 'block';
                // Add animation
                item.element.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                item.element.style.display = 'none';
            }
        });
        
        // Reapply masonry layout (in a real app, you might use a masonry library)
        setTimeout(() => {
            this.applyMasonryLayout();
        }, 100);
    }
    
    applyMasonryLayout() {
        // Simple masonry layout implementation
        const grid = this.memoriesGrid;
        const items = Array.from(grid.children);
        
        // Reset all positions
        items.forEach(item => {
            item.style.transform = 'translateY(0)';
        });
        
        // Simple column layout (for demo purposes)
        // In production, consider using a library like Masonry.js
        const columns = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
        const columnHeights = new Array(columns).fill(0);
        const gap = 20; // matches CSS gap
        
        items.forEach((item, index) => {
            if (item.style.display !== 'none') {
                const columnIndex = index % columns;
                item.style.transform = `translateY(${columnHeights[columnIndex]}px)`;
                columnHeights[columnIndex] += item.offsetHeight + gap;
            }
        });
        
        // Set grid height
        grid.style.height = `${Math.max(...columnHeights)}px`;
    }
    
    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.style.borderColor = 'var(--primary-color)';
        this.uploadArea.style.background = 'rgba(108, 99, 255, 0.1)';
    }
    
    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.style.borderColor = '';
        this.uploadArea.style.background = '';
    }
    
    handleDrop(e) {
        e.preventDefault();
        this.handleDragLeave(e);
        
        const files = e.dataTransfer.files;
        this.processFiles(files);
    }
    
    handleFileSelect(e) {
        const files = e.target.files;
        this.processFiles(files);
        
        // Reset file input
        e.target.value = '';
    }
    
    processFiles(files) {
        // Validate files
        const validFiles = Array.from(files).filter(file => {
            const validTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/quicktime'];
            return validTypes.includes(file.type);
        });
        
        if (validFiles.length === 0) {
            this.showNotification('Please select valid files (JPG, PNG, MP4, MOV)', 'error');
            return;
        }
        
        // Show loading state
        this.showNotification(`Uploading ${validFiles.length} file(s)...`, 'info');
        
        // In a real application, you would upload to a server here
        // For demo purposes, we'll simulate upload and add placeholder items
        setTimeout(() => {
            validFiles.forEach((file, index) => {
                this.addMemoryItem(file);
            });
            
            this.showNotification(`${validFiles.length} file(s) uploaded successfully!`, 'success');
        }, 1500);
    }
    
    addMemoryItem(file) {
        // Create a new memory item
        const isImage = file.type.startsWith('image/');
        const currentDate = new Date();
        const dateString = `${currentDate.getFullYear()}.${String(currentDate.getMonth() + 1).padStart(2, '0')}.${String(currentDate.getDate()).padStart(2, '0')}`;
        
        const memoryItem = document.createElement('div');
        memoryItem.className = 'memory-item';
        memoryItem.dataset.year = currentDate.getFullYear().toString();
        memoryItem.dataset.date = dateString;
        
        const memoryMedia = document.createElement('div');
        memoryMedia.className = 'memory-media';
        
        if (isImage) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.alt = `Memory ${dateString}`;
            img.loading = 'lazy';
            memoryMedia.appendChild(img);
        } else {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.muted = true;
            video.playsInline = true;
            
            const source = document.createElement('source');
            source.src = URL.createObjectURL(file);
            source.type = file.type;
            video.appendChild(source);
            memoryMedia.appendChild(video);
        }
        
        const memoryDate = document.createElement('div');
        memoryDate.className = 'memory-date';
        memoryDate.textContent = dateString;
        
        const memoryOverlay = document.createElement('div');
        memoryOverlay.className = 'memory-overlay';
        memoryOverlay.innerHTML = `<i class="fas ${isImage ? 'fa-expand' : 'fa-play'}"></i>`;
        
        memoryMedia.appendChild(memoryDate);
        memoryMedia.appendChild(memoryOverlay);
        memoryItem.appendChild(memoryMedia);
        
        // Add to grid
        this.memoriesGrid.appendChild(memoryItem);
        
        // Add click event
        memoryItem.addEventListener('click', () => {
            const index = this.memoryItems.length;
            this.openViewer(index);
        });
        
        // Add to memory items array
        this.memoryItems.push({
            element: memoryItem,
            year: currentDate.getFullYear().toString(),
            date: dateString,
            media: isImage ? memoryItem.querySelector('img') : memoryItem.querySelector('video'),
            type: isImage ? 'image' : 'video',
            index: this.memoryItems.length
        });
        
        // Apply animation
        memoryItem.style.animation = 'fadeInUp 0.6s ease forwards';
        memoryItem.style.opacity = '0';
        
        // Reapply masonry layout
        setTimeout(() => {
            this.applyMasonryLayout();
        }, 100);
    }
    
    openViewer(index) {
        this.currentViewerIndex = index;
        this.isViewerOpen = true;
        
        // Update viewer content
        this.updateViewer();
        
        // Show viewer
        this.fullscreenViewer.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Play video if it's a video
        const currentItem = this.memoryItems[index];
        if (currentItem.type === 'video') {
            const video = this.viewerMedia.querySelector('video');
            if (video) {
                video.play().catch(e => console.log('Video play failed:', e));
            }
        }
    }
    
    closeViewer() {
        this.isViewerOpen = false;
        this.fullscreenViewer.classList.remove('active');
        document.body.style.overflow = '';
        
        // Pause video if playing
        const video = this.viewerMedia.querySelector('video');
        if (video) {
            video.pause();
        }
    }
    
    navigateViewer(direction) {
        // Filter visible items based on current year filter
        const visibleItems = this.memoryItems.filter(item => {
            if (this.currentYearFilter === 'all') return true;
            return item.year === this.currentYearFilter;
        });
        
        if (visibleItems.length === 0) return;
        
        // Find current index in visible items
        const currentVisibleIndex = visibleItems.findIndex(item => 
            item.index === this.currentViewerIndex
        );
        
        // Calculate new index
        let newVisibleIndex = currentVisibleIndex + direction;
        
        // Wrap around
        if (newVisibleIndex < 0) newVisibleIndex = visibleItems.length - 1;
        if (newVisibleIndex >= visibleItems.length) newVisibleIndex = 0;
        
        // Open new item
        this.openViewer(visibleItems[newVisibleIndex].index);
    }
    
    updateViewer() {
        const currentItem = this.memoryItems[this.currentViewerIndex];
        if (!currentItem) return;
        
        // Clear viewer
        this.viewerMedia.innerHTML = '';
        
        // Create new media element
        let mediaElement;
        if (currentItem.type === 'image') {
            mediaElement = document.createElement('img');
            mediaElement.src = currentItem.media.src;
            mediaElement.alt = `Memory ${currentItem.date}`;
        } else {
            mediaElement = document.createElement('video');
            mediaElement.controls = true;
            mediaElement.autoplay = true;
            mediaElement.muted = false;
            
            const source = document.createElement('source');
            source.src = currentItem.media.querySelector('source').src;
            source.type = 'video/mp4';
            mediaElement.appendChild(source);
        }
        
        this.viewerMedia.appendChild(mediaElement);
        this.viewerDate.textContent = currentItem.date;
    }
    
    handleKeyboard(e) {
        if (!this.isViewerOpen) return;
        
        switch (e.key) {
            case 'Escape':
                this.closeViewer();
                break;
            case 'ArrowLeft':
                this.navigateViewer(-1);
                break;
            case 'ArrowRight':
                this.navigateViewer(1);
                break;
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--primary-color)' : 
                        type === 'error' ? 'var(--secondary-color)' : 
                        'var(--accent-color)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        // Add close button styles
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        `;
        
        // Add close functionality
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        document.body.appendChild(notification);
        
        // Add keyframes if not already added
        if (!document.querySelector('#notification-keyframes')) {
            const style = document.createElement('style');
            style.id = 'notification-keyframes';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Utility function to simulate EXIF date extraction
    extractDateFromFile(file) {
        // In a real application, you would extract EXIF data
        // For demo purposes, we'll use the file's last modified date
        const date = new Date(file.lastModified);
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    }
}

// Initialize memories module when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const memoriesModule = new MemoriesModule();
    
    // Make it globally accessible for debugging
    window.memoriesModule = memoriesModule;
    
    console.log('Memories module initialized successfully!');
});

// Export for module usage (if using ES6 modules)
// export default MemoriesModule;