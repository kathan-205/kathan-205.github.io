// Aurora Borealis Animation
class Aurora {
    constructor() {
        this.canvas = document.getElementById('auroraCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.waves = [];
        this.time = 0;
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        // Create multiple aurora waves
        const colors = [
            { r: 0, g: 240, b: 255 },      // Cyan
            { r: 168, g: 85, b: 247 },     // Purple
            { r: 102, g: 126, b: 234 },    // Blue-purple
            { r: 34, g: 211, b: 238 },     // Light cyan
            { r: 139, g: 92, b: 246 }      // Deep purple
        ];

        for (let i = 0; i < 5; i++) {
            this.waves.push({
                color: colors[i],
                offset: Math.random() * Math.PI * 2,
                speed: 0.0005 + Math.random() * 0.001,
                amplitude: 100 + Math.random() * 100,
                frequency: 0.001 + Math.random() * 0.002,
                y: this.canvas.height * (0.2 + i * 0.15)
            });
        }
    }

    drawWave(wave, opacity) {
        const { color, offset, amplitude, frequency, y } = wave;
        const points = 100;
        
        this.ctx.beginPath();
        
        for (let i = 0; i <= points; i++) {
            const x = (this.canvas.width / points) * i;
            const angle = (x * frequency) + (this.time * wave.speed) + offset;
            const waveY = y + Math.sin(angle) * amplitude;
            
            if (i === 0) {
                this.ctx.moveTo(x, waveY);
            } else {
                this.ctx.lineTo(x, waveY);
            }
        }
        
        // Complete the path for gradient fill
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.closePath();
        
        // Create gradient
        const gradient = this.ctx.createLinearGradient(0, y - amplitude, 0, y + amplitude);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }

    animate() {
        // Check theme
        const isLightTheme = document.documentElement.getAttribute('data-theme') === 'light';
        const baseOpacity = isLightTheme ? 0.15 : 0.12;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw all waves
        this.waves.forEach((wave, index) => {
            const opacity = baseOpacity * (1 - index * 0.15);
            this.drawWave(wave, opacity);
        });
        
        this.time++;
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize aurora when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Aurora();
});