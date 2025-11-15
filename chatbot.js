// AI Chatbot - ChatGPT Integration
class Chatbot {
    constructor() {
        this.container = document.getElementById('chatbot-container');
        this.toggle = document.getElementById('chatbot-toggle');
        this.window = document.getElementById('chatbot-window');
        this.close = document.getElementById('chatbot-close');
        this.input = document.getElementById('chatbot-input');
        this.send = document.getElementById('chatbot-send');
        this.messages = document.getElementById('chatbot-messages');
        
        // IMPORTANT: Replace this with your actual OpenAI API key
        // Get your API key from: https://platform.openai.com/api-keys
        this.apiKey = 'YOUR_OPENAI_API_KEY_HERE'; // REPLACE THIS!
        
        // System prompt to give ChatGPT context about Kathan
        this.systemPrompt = `You are an AI assistant for Kathan Shah's portfolio website. Here's information about Kathan:

EDUCATION:
- University of Alberta, Computing Science (Honors), Sept 2023 - April 2027
- Courses: Data Structures, Algorithms, Databases, Software Engineering

EXPERIENCE:
- External Events Executive at TEDxUAlberta (Sept 2024 - Present)
- Academic Tutor at University of Alberta (Jan 2024 - Present) - Teaching Calculus, Programming, and Database courses

PROJECTS:
1. Hands-Free Web Navigator (🏆 1st Place HackED 2025)
   - Chrome extension with head tracking for cursor control
   - Sub-100ms response time
   - 35% improvement in navigation success
   - Tech: JavaScript, face-api.js, Chrome Extension API

2. Feelink: Mood Sharing Platform
   - Android app for location-based mood sharing
   - 500+ geotagged locations using Google Maps API
   - Firebase real-time database with sub-1 second latency
   - Tech: Java, Firebase, Android, Google Cloud

3. Database Enterprise System
   - Authentication and data management system
   - 60% reduction in hashtag query time
   - Dual-database architecture (SQLite + MongoDB)
   - Tech: Python, SQLite, MongoDB

4. Ray Tracer 3D Renderer
   - Photorealistic 3D renderer built in C
   - 640x480 images with Phong lighting
   - Shadow casting and 9-sample anti-aliasing
   - 90%+ shading accuracy

SKILLS:
- Languages: Python, Java, C, R, SQL
- Databases: SQLite, MongoDB
- Frameworks: Pandas, NumPy, Scikit-learn, Firebase
- Tools: Git, GitHub, GitLab, VS Code, Android Studio, Linux, Google Cloud, Azure
- Practices: Agile, SDLC, CRUD, MVC, RESTful APIs

SEEKING: Summer 2025 internship opportunities in software development

CONTACT: shahkathan1010@gmail.com

Your role is to answer questions about Kathan in a friendly, enthusiastic way. Be conversational and helpful. If asked about internships, emphasize his skills, hackathon win, and eagerness to learn.`;
        
        this.conversationHistory = [];
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

    async getChatGPTResponse(userMessage) {
        // Check if API key is set
        if (this.apiKey === 'YOUR_OPENAI_API_KEY_HERE' || !this.apiKey) {
            return "⚠️ OpenAI API key not configured. Please add your API key to the chatbot.js file. Get one at https://platform.openai.com/api-keys";
        }

        try {
            // Build conversation with system prompt
            const messages = [
                { role: "system", content: this.systemPrompt },
                ...this.conversationHistory,
                { role: "user", content: userMessage }
            ];

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo', // You can use 'gpt-4' for better quality
                    messages: messages,
                    max_tokens: 500,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            const assistantMessage = data.choices[0].message.content;

            // Add to conversation history (keep last 10 messages for context)
            this.conversationHistory.push(
                { role: "user", content: userMessage },
                { role: "assistant", content: assistantMessage }
            );

            // Limit conversation history to last 10 messages to manage token usage
            if (this.conversationHistory.length > 10) {
                this.conversationHistory = this.conversationHistory.slice(-10);
            }

            return assistantMessage;

        } catch (error) {
            console.error('ChatGPT API Error:', error);
            return "I'm having trouble connecting right now. Please try again in a moment, or contact Kathan directly at shahkathan1010@gmail.com! 📧";
        }
    }

    async sendMessage(text = null) {
        const message = text || this.input.value.trim();
        if (!message) return;
        
        this.input.value = '';
        this.addMessage(message, true);
        this.addTypingIndicator();
        
        // Get response from ChatGPT
        const response = await this.getChatGPTResponse(message);
        
        this.removeTypingIndicator();
        this.addMessage(response);
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});