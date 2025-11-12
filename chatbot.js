// AI Chatbot - Simulated Responses (No API Required)
class Chatbot {
    constructor() {
        this.container = document.getElementById('chatbot-container');
        this.toggle = document.getElementById('chatbot-toggle');
        this.window = document.getElementById('chatbot-window');
        this.close = document.getElementById('chatbot-close');
        this.input = document.getElementById('chatbot-input');
        this.send = document.getElementById('chatbot-send');
        this.messages = document.getElementById('chatbot-messages');
        
        // Knowledge base for responses
        this.knowledge = {
            projects: {
                best: "Kathan's best project is the Hands-Free Web Navigator that won 1st place at HackED 2025! 🏆 It's a Chrome extension that lets users control their cursor using head movements with sub-100ms response time. Super innovative accessibility tech!",
                navigator: "The Hands-Free Web Navigator is a Chrome extension enabling cursor control via head movement using face-api.js. It achieved sub-100ms response time and improved navigation success by 35% for first-time users! 🖱️",
                feelink: "Feelink is a location-based Android app for mood sharing! 📱 It uses Google Maps API with 500+ geotagged locations, Firebase real-time database with sub-1 second latency, and emoji-based mood tagging. Pretty cool, right?",
                database: "Kathan built a Database Enterprise System with authentication, paginated feeds, and regex search. It reduced hashtag query time by 60% using strategic indexes and dual-database architecture (SQLite + MongoDB)! 🗄️",
                raytracer: "The Ray Tracer is a 3D renderer built from scratch in C! 🎨 It generates 640x480 photorealistic images with Phong lighting, shadow casting, and 9-sample anti-aliasing. Achieved 90%+ shading accuracy!"
            },
            skills: {
                languages: "Kathan knows Python, Java, C, R, and SQL! 💻 He's used Python extensively for data analysis and Java for Android development like the Feelink app.",
                database: "For databases, Kathan works with SQLite and MongoDB. He's built enterprise systems with both! 🗄️",
                tools: "Kathan uses Git, GitHub, GitLab CI/CD, VS Code, Android Studio, Linux, Google Cloud, and Microsoft Azure. He's also skilled in Agile development and the full SDLC! 🛠️",
                frameworks: "He works with Pandas, NumPy, Scikit-learn, Firebase, and RESTful APIs. Pretty solid full-stack skills! 📚"
            },
            education: "Kathan is studying Computing Science (Honors) at the University of Alberta, graduating in April 2027! 🎓 He's taken courses in Data Structures, Algorithms, Databases, and Software Engineering.",
            contact: {
                email: "You can reach Kathan at shahkathan1010@gmail.com 📧 or use the contact form on this page. He typically responds within 24 hours!",
                linkedin: "Find Kathan on LinkedIn: linkedin.com/in/kathan-shah-b58602285 🔗",
                github: "Check out his GitHub: github.com/kathan-205 💻"
            },
            experience: "Kathan is an External Events Executive at TEDxUAlberta and an Academic Tutor at the University of Alberta, helping students with Calculus, Programming, and Database courses! 👨‍🏫",
            general: "Hey! I'm Kathan's AI assistant. I can tell you about his projects (especially that 1st place hackathon winner! 🏆), technical skills, education, or how to get in touch. What would you like to know?"
        };
        
        this.init();
    }

    init() {
        this.toggle.addEventListener('click', () => this.open());
        this.close.addEventListener('click', () => this.closeWindow());
        this.send.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick reply buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply')) {
                const message = e.target.getAttribute('data-message');
                this.sendMessage(message);
            }
        });
    }

    open() {
        this.window.classList.add('active');
        this.input.focus();
    }

    closeWindow() {
        this.window.classList.remove('active');
    }

    addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = isUser ? '👤' : '🤖';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const p = document.createElement('p');
        p.textContent = content;
        messageContent.appendChild(p);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.messages.appendChild(messageDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        
        messageContent.appendChild(typingIndicator);
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(messageContent);
        
        this.messages.appendChild(typingDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    getResponse(message) {
        const msg = message.toLowerCase();
        
        // Projects
        if (msg.includes('best project') || msg.includes('top project')) {
            return this.knowledge.projects.best;
        }
        if (msg.includes('hands-free') || msg.includes('navigator') || msg.includes('hackathon')) {
            return this.knowledge.projects.navigator;
        }
        if (msg.includes('feelink') || msg.includes('mood') || msg.includes('android')) {
            return this.knowledge.projects.feelink;
        }
        if (msg.includes('database') || msg.includes('enterprise')) {
            return this.knowledge.projects.database;
        }
        if (msg.includes('ray tracer') || msg.includes('raytracer') || msg.includes('3d')) {
            return this.knowledge.projects.raytracer;
        }
        if (msg.includes('project')) {
            return "Kathan has some amazing projects! His Hands-Free Web Navigator won 1st place at HackED 2025 🏆, he built Feelink (Android mood-sharing app) 📱, a Database Enterprise System 🗄️, and a Ray Tracer 3D renderer in C! Which one would you like to hear about?";
        }
        
        // Skills
        if (msg.includes('programming language') || msg.includes('languages') || msg.includes('code')) {
            return this.knowledge.skills.languages;
        }
        if (msg.includes('database') && msg.includes('skill')) {
            return this.knowledge.skills.database;
        }
        if (msg.includes('tool') || msg.includes('software')) {
            return this.knowledge.skills.tools;
        }
        if (msg.includes('framework') || msg.includes('library')) {
            return this.knowledge.skills.frameworks;
        }
        if (msg.includes('skill') || msg.includes('tech stack') || msg.includes('technology')) {
            return "Kathan has a solid tech stack! 💻 He knows Python, Java, C, R, SQL, works with SQLite & MongoDB, uses frameworks like Pandas, NumPy, Firebase, and is experienced with Git, VS Code, Android Studio, Google Cloud, and Azure. Want details on anything specific?";
        }
        
        // Education
        if (msg.includes('education') || msg.includes('university') || msg.includes('degree') || msg.includes('studying')) {
            return this.knowledge.education;
        }
        
        // Contact
        if (msg.includes('contact') || msg.includes('email') || msg.includes('reach')) {
            return this.knowledge.contact.email;
        }
        if (msg.includes('linkedin')) {
            return this.knowledge.contact.linkedin;
        }
        if (msg.includes('github')) {
            return this.knowledge.contact.github;
        }
        
        // Experience
        if (msg.includes('experience') || msg.includes('work') || msg.includes('job')) {
            return this.knowledge.experience;
        }
        
        // Greetings
        if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey')) {
            return "Hey there! 👋 I'm here to help you learn about Kathan. Want to know about his award-winning projects, technical skills, or how to get in touch?";
        }
        
        // Thanks
        if (msg.includes('thank') || msg.includes('thanks')) {
            return "You're welcome! 😊 Feel free to ask me anything else about Kathan's work or reach out to him directly at shahkathan1010@gmail.com!";
        }
        
        // Default
        return this.knowledge.general + " Try asking about his projects, skills, education, or contact info!";
    }

    async sendMessage(text = null) {
        const message = text || this.input.value.trim();
        if (!message) return;
        
        this.input.value = '';
        this.addMessage(message, true);
        this.addTypingIndicator();
        
        // Simulate thinking time
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.getResponse(message);
            this.addMessage(response);
        }, 800 + Math.random() * 700); // 800-1500ms delay for realism
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});