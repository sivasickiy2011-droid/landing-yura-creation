# Универсальный Backend Сервер - Инструкция по развертыванию

## Архитектура решения

Создадим мультитенантный (многопроектный) backend сервер, который сможет обслуживать множество ваших сайтов через единый API gateway.

---

## 1. Подготовка сервера

### Обновление системы
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install curl wget git build-essential -y
```

### Установка Node.js 20 LTS
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
node -v  # Проверка версии
npm -v
```

### Установка Python 3.11
```bash
sudo apt install python3.11 python3.11-venv python3-pip -y
python3.11 --version
```

### Установка PostgreSQL 15
```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Создание базы данных
sudo -u postgres psql
```

В PostgreSQL консоли:
```sql
CREATE DATABASE universal_backend;
CREATE USER backend_user WITH ENCRYPTED PASSWORD 'your_strong_password';
GRANT ALL PRIVILEGES ON DATABASE universal_backend TO backend_user;
\q
```

### Установка Redis (для кэширования и очередей)
```bash
sudo apt install redis-server -y
sudo systemctl start redis
sudo systemctl enable redis
```

### Установка Nginx
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Установка PM2 (Process Manager)
```bash
sudo npm install -g pm2
pm2 startup systemd
```

---

## 2. Структура проекта

```
/var/www/universal-backend/
├── api-gateway/              # Главный API Gateway (Node.js + Express)
│   ├── src/
│   │   ├── index.ts         # Точка входа
│   │   ├── routes/          # Маршруты API
│   │   ├── middleware/      # CORS, Auth, Rate Limiting
│   │   ├── services/        # Бизнес-логика
│   │   └── config/          # Конфигурация
│   ├── package.json
│   └── tsconfig.json
│
├── projects/                 # Изолированные проекты
│   ├── bitrix-landing/      # Ваш текущий проект
│   │   ├── handlers/        # API handlers
│   │   └── config.json      # Настройки проекта
│   ├── project-2/
│   └── project-3/
│
├── shared/                   # Общие модули
│   ├── database/            # Database connectors
│   ├── email/               # Email service
│   ├── telegram/            # Telegram bot
│   └── utils/               # Утилиты
│
├── storage/                  # Хранилище файлов
│   └── uploads/
│
└── logs/                     # Логи
```

---

## 3. Создание API Gateway

### package.json
```json
{
  "name": "universal-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.3.1",
    "pg": "^8.11.3",
    "redis": "^4.6.10",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1",
    "nodemailer": "^6.9.7",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.4",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3"
  }
}
```

### src/index.ts (Главный файл)
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import projectRouter from './routes/projects.js';
import healthRouter from './routes/health.js';

config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // 100 запросов
  message: 'Слишком много запросов с этого IP'
});
app.use(limiter);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/health', healthRouter);
app.use('/api', projectRouter);

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Внутренняя ошибка сервера',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Universal Backend запущен на порту ${PORT}`);
  console.log(`📊 Окружение: ${process.env.NODE_ENV || 'development'}`);
});
```

### src/routes/projects.ts (Роутер проектов)
```typescript
import { Router } from 'express';
import bitrixLandingRouter from '../../projects/bitrix-landing/routes.js';

const router = Router();

// Подключение роутов проектов
router.use('/bitrix-landing', bitrixLandingRouter);

// Здесь будут подключаться другие проекты:
// router.use('/project-2', project2Router);
// router.use('/project-3', project3Router);

export default router;
```

### src/routes/health.ts (Health check)
```typescript
import { Router } from 'express';
import { Pool } from 'pg';

const router = Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

router.get('/', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Database connection failed'
    });
  }
});

export default router;
```

---

## 4. Проект Bitrix Landing

### projects/bitrix-landing/routes.ts
```typescript
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { submitContactForm } from './handlers/contact.js';

const router = Router();

// POST /api/bitrix-landing/contact
router.post('/contact',
  // Валидация
  body('name').trim().isLength({ min: 2, max: 100 }),
  body('email').isEmail().normalizeEmail(),
  body('phone').matches(/^[\d\s\+\-\(\)]+$/),
  body('message').trim().isLength({ min: 10, max: 1000 }),
  
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const result = await submitContactForm(req.body);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
);

export default router;
```

### projects/bitrix-landing/handlers/contact.ts
```typescript
import { Pool } from 'pg';
import { sendEmail } from '../../../shared/email/sender.js';
import { sendTelegram } from '../../../shared/telegram/bot.js';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  const { name, email, phone, message } = data;

  // Сохранение в БД
  const result = await pool.query(
    `INSERT INTO bitrix_landing_leads 
     (name, email, phone, message, created_at) 
     VALUES ($1, $2, $3, $4, NOW()) 
     RETURNING id`,
    [name, email, phone, message]
  );

  const leadId = result.rows[0].id;

  // Отправка уведомления на email
  await sendEmail({
    to: process.env.ADMIN_EMAIL!,
    subject: `Новая заявка #${leadId} с сайта Битрикс24`,
    html: `
      <h2>Новая заявка с лендинга</h2>
      <p><strong>Имя:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Сообщение:</strong> ${message}</p>
    `
  });

  // Уведомление в Telegram
  await sendTelegram(
    `🔔 Новая заявка #${leadId}\n\n` +
    `👤 ${name}\n` +
    `📧 ${email}\n` +
    `📱 ${phone}\n` +
    `💬 ${message}`
  );

  return { leadId, status: 'success' };
}
```

### projects/bitrix-landing/schema.sql
```sql
CREATE TABLE IF NOT EXISTS bitrix_landing_leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_created_at ON bitrix_landing_leads(created_at DESC);
CREATE INDEX idx_status ON bitrix_landing_leads(status);
```

---

## 5. Общие модули

### shared/email/sender.ts
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  return await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html
  });
}
```

### shared/telegram/bot.ts
```typescript
import axios from 'axios';

export async function sendTelegram(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) return;

  await axios.post(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    }
  );
}
```

---

## 6. Файл .env

```env
# Server
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=https://yourdomain.com,https://site2.com

# Database
DATABASE_URL=postgresql://backend_user:your_strong_password@localhost:5432/universal_backend

# Redis
REDIS_URL=redis://localhost:6379

# Email (например, через Yandex)
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=your@email.ru
SMTP_PASS=your_password
SMTP_FROM="Битрикс24" <your@email.ru>

# Admin
ADMIN_EMAIL=admin@yourdomain.com

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Security
JWT_SECRET=your_super_secret_key_change_this
```

---

## 7. Nginx конфигурация

### /etc/nginx/sites-available/universal-backend

```nginx
# API Backend
server {
    listen 80;
    server_name api.yourdomain.com;

    # SSL (после получения сертификата)
    # listen 443 ssl http2;
    # ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Logs
    access_log /var/log/nginx/backend_access.log;
    error_log /var/log/nginx/backend_error.log;
}
```

Активация конфигурации:
```bash
sudo ln -s /etc/nginx/sites-available/universal-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 8. Развертывание

### Создание директорий
```bash
sudo mkdir -p /var/www/universal-backend
sudo chown -R $USER:$USER /var/www/universal-backend
cd /var/www/universal-backend
```

### Инициализация проекта
```bash
# Создание структуры
mkdir -p api-gateway/src/{routes,middleware,services,config}
mkdir -p projects/bitrix-landing/handlers
mkdir -p shared/{database,email,telegram,utils}
mkdir -p storage/uploads
mkdir -p logs

# Копирование файлов (создайте файлы выше)
# ...

# Установка зависимостей
cd api-gateway
npm install
npm run build
```

### Создание таблиц в БД
```bash
psql -U backend_user -d universal_backend -f projects/bitrix-landing/schema.sql
```

### Запуск через PM2
```bash
cd /var/www/universal-backend/api-gateway

pm2 start dist/index.js --name "universal-backend" --max-memory-restart 500M
pm2 save
pm2 startup
```

### Получение SSL сертификата
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.yourdomain.com
```

---

## 9. Обновление standalone-index.html

Замените форму в вашем HTML на:

```html
<form id="contact-form" class="max-w-2xl mx-auto space-y-6">
    <div class="grid md:grid-cols-2 gap-6">
        <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Имя</label>
            <input type="text" name="name" required placeholder="Ваше имя" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors">
        </div>
        <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Телефон</label>
            <input type="tel" name="phone" required placeholder="+7 (___) ___-__-__" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors">
        </div>
    </div>
    <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
        <input type="email" name="email" required placeholder="your@email.com" class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors">
    </div>
    <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Сообщение</label>
        <textarea name="message" rows="4" required placeholder="Расскажите о вашем проекте..." class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"></textarea>
    </div>
    <button type="submit" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all">
        ОТПРАВИТЬ ЗАЯВКУ
    </button>
    <p class="text-center text-sm text-gray-500">
        Нажимая кнопку, вы соглашаетесь с <a href="#" class="text-blue-600 hover:underline">политикой конфиденциальности</a>
    </p>
</form>

<script>
// Обработка формы
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch('https://api.yourdomain.com/api/bitrix-landing/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Спасибо! Ваша заявка отправлена.');
            e.target.reset();
        } else {
            alert('Ошибка отправки. Попробуйте позже.');
        }
    } catch (error) {
        console.error(error);
        alert('Ошибка соединения с сервером.');
    }
});
</script>
```

---

## 10. Мониторинг

### Просмотр логов PM2
```bash
pm2 logs universal-backend
pm2 monit
```

### Автоматический перезапуск при ошибках
```bash
pm2 restart universal-backend
pm2 reload universal-backend  # Zero-downtime reload
```

---

## 11. Добавление новых проектов

Для каждого нового сайта:

1. Создайте директорию в `projects/your-project-name/`
2. Добавьте `routes.ts` и `handlers/`
3. Создайте таблицы в БД (если нужны)
4. Подключите роутер в `api-gateway/src/routes/projects.ts`
5. Перезапустите PM2: `pm2 reload universal-backend`

---

## Преимущества такой архитектуры:

✅ **Масштабируемость** - легко добавлять новые проекты
✅ **Централизация** - единая точка управления всеми backend'ами
✅ **Переиспользование кода** - общие модули для email, telegram, БД
✅ **Безопасность** - rate limiting, валидация, CORS
✅ **Мониторинг** - все логи в одном месте
✅ **Экономия ресурсов** - один сервер для всех проектов

---

## Производительность на вашем сервере (4 CPU, 8 GB RAM):

- **~1000-2000 req/sec** при оптимизации
- **10-50 одновременных проектов** в зависимости от нагрузки
- **PostgreSQL** может обработать миллионы записей
- **Redis кэширование** ускорит повторяющиеся запросы

---

Нужна помощь с конкретным шагом развертывания?
