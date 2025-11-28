#!/bin/bash
# Деплой Universal Backend на function.centerai.tech
# Выполняйте ПОСЛЕ установки основных компонентов (centos9-setup-commands.sh)

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Деплой Universal Backend${NC}"
echo "=========================================="

PROJECT_DIR="/var/www/universal-backend"

# ============================================
# 1. СОЗДАНИЕ PACKAGE.JSON
# ============================================
echo -e "${YELLOW}[1/8] Создание package.json...${NC}"

cd $PROJECT_DIR/api-gateway

cat > package.json << 'EOF'
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
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.4",
    "@types/cors": "^2.8.17",
    "@types/nodemailer": "^6.4.14",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3"
  }
}
EOF

echo -e "${GREEN}✓ package.json создан${NC}"

# ============================================
# 2. СОЗДАНИЕ TSCONFIG.JSON
# ============================================
echo -e "${YELLOW}[2/8] Создание tsconfig.json...${NC}"

cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

echo -e "${GREEN}✓ tsconfig.json создан${NC}"

# ============================================
# 3. СОЗДАНИЕ .ENV
# ============================================
echo -e "${YELLOW}[3/8] Создание .env файла...${NC}"

cat > .env << 'EOF'
# Server Configuration
NODE_ENV=production
PORT=3000
ALLOWED_ORIGINS=*

# Database
DATABASE_URL=postgresql://backend_user:StrongPassword2024!@localhost:5432/universal_backend

# Redis
REDIS_URL=redis://localhost:6379

# Email (настройте своими данными)
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=your@email.ru
SMTP_PASS=your_password
SMTP_FROM="Universal Backend" <your@email.ru>

# Admin
ADMIN_EMAIL=admin@centerai.tech

# Telegram (опционально)
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

# Security
JWT_SECRET=change_this_to_random_string_min_32_chars
EOF

echo -e "${GREEN}✓ .env создан${NC}"
echo -e "${YELLOW}⚠️  Не забудьте изменить настройки в .env!${NC}"

# ============================================
# 4. СОЗДАНИЕ ОСНОВНЫХ ФАЙЛОВ
# ============================================
echo -e "${YELLOW}[4/8] Создание исходного кода...${NC}"

# src/index.ts
cat > src/index.ts << 'EOF'
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

app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Слишком много запросов с этого IP'
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/health', healthRouter);
app.use('/api', projectRouter);

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
  console.log(`🌍 CORS: ${process.env.ALLOWED_ORIGINS || '*'}`);
});
EOF

# src/routes/health.ts
cat > src/routes/health.ts << 'EOF'
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
      timestamp: new Date().toISOString(),
      server: 'function.centerai.tech'
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      message: 'Database connection failed'
    });
  }
});

export default router;
EOF

# src/routes/projects.ts
cat > src/routes/projects.ts << 'EOF'
import { Router } from 'express';
import bitrixRouter from '../../projects/bitrix-landing/routes.js';

const router = Router();

router.use('/bitrix-landing', bitrixRouter);

export default router;
EOF

echo -e "${GREEN}✓ Исходный код создан${NC}"

# ============================================
# 5. СОЗДАНИЕ ПРОЕКТА BITRIX LANDING
# ============================================
echo -e "${YELLOW}[5/8] Создание проекта Bitrix Landing...${NC}"

cd $PROJECT_DIR

# projects/bitrix-landing/routes.ts
cat > projects/bitrix-landing/routes.ts << 'EOF'
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { submitContactForm } from './handlers/contact.js';

const router = Router();

router.post('/contact',
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
      console.error('Contact form error:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }
  }
);

export default router;
EOF

# projects/bitrix-landing/handlers/contact.ts
cat > projects/bitrix-landing/handlers/contact.ts << 'EOF'
import { Pool } from 'pg';

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

  const result = await pool.query(
    `INSERT INTO bitrix_landing_leads 
     (name, email, phone, message, created_at) 
     VALUES ($1, $2, $3, $4, NOW()) 
     RETURNING id`,
    [name, email, phone, message]
  );

  const leadId = result.rows[0].id;

  console.log(`✅ Новая заявка #${leadId} от ${name}`);

  return { 
    leadId, 
    status: 'success',
    message: 'Заявка успешно отправлена' 
  };
}
EOF

echo -e "${GREEN}✓ Проект Bitrix Landing создан${NC}"

# ============================================
# 6. СОЗДАНИЕ ТАБЛИЦЫ В БД
# ============================================
echo -e "${YELLOW}[6/8] Создание таблицы в БД...${NC}"

PGPASSWORD="StrongPassword2024!" psql -U backend_user -d universal_backend -h localhost << 'EOF'
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

CREATE INDEX IF NOT EXISTS idx_created_at ON bitrix_landing_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_status ON bitrix_landing_leads(status);
EOF

echo -e "${GREEN}✓ Таблица создана${NC}"

# ============================================
# 7. УСТАНОВКА ЗАВИСИМОСТЕЙ И СБОРКА
# ============================================
echo -e "${YELLOW}[7/8] Установка зависимостей...${NC}"

cd $PROJECT_DIR/api-gateway
npm install

echo -e "${YELLOW}[7/8] Сборка TypeScript...${NC}"
npm run build

echo -e "${GREEN}✓ Сборка завершена${NC}"

# ============================================
# 8. ЗАПУСК ЧЕРЕЗ PM2
# ============================================
echo -e "${YELLOW}[8/8] Запуск через PM2...${NC}"

pm2 delete universal-backend 2>/dev/null || true

pm2 start dist/index.js \
  --name "universal-backend" \
  --max-memory-restart 500M \
  --env production

pm2 save

echo -e "${GREEN}✓ Backend запущен через PM2${NC}"

# ============================================
# НАСТРОЙКА NGINX
# ============================================
echo -e "${YELLOW}Настройка Nginx...${NC}"

# Копирование конфигурации
sudo cp $PROJECT_DIR/../nginx-config-centos.conf /etc/nginx/conf.d/universal-backend.conf

# Проверка конфигурации
sudo nginx -t

# Перезагрузка Nginx
sudo systemctl reload nginx

echo -e "${GREEN}✓ Nginx настроен${NC}"

# ============================================
# ЗАВЕРШЕНИЕ
# ============================================
echo ""
echo "=========================================="
echo -e "${GREEN}✅ Деплой успешно завершен!${NC}"
echo "=========================================="
echo ""
echo "🌍 API доступен по адресу:"
echo "   http://function.centerai.tech"
echo ""
echo "🔍 Проверка работы:"
echo "   curl http://function.centerai.tech/health"
echo ""
echo "📊 Управление PM2:"
echo "   pm2 status"
echo "   pm2 logs universal-backend"
echo "   pm2 restart universal-backend"
echo ""
echo "🔐 Следующий шаг - получение SSL:"
echo "   sudo dnf install -y certbot python3-certbot-nginx"
echo "   sudo certbot --nginx -d function.centerai.tech"
echo ""
echo "📝 Не забудьте отредактировать .env:"
echo "   nano $PROJECT_DIR/api-gateway/.env"
echo ""
