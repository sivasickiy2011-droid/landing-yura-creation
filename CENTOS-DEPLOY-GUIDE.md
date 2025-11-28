# 🚀 Пошаговая инструкция по развертыванию на function.centerai.tech

## CentOS 9 Stream - Universal Backend

---

## Шаг 1: Подключение к серверу

```bash
ssh root@function.centerai.tech
# или
ssh ваш_пользователь@function.centerai.tech
```

---

## Шаг 2: Загрузка файлов на сервер

Есть 3 способа:

### Способ 1: Прямое копирование файлов (с вашего компьютера)
```bash
# На вашем локальном компьютере выполните:
scp centos9-setup-commands.sh root@function.centerai.tech:/root/
scp deploy-backend-centos.sh root@function.centerai.tech:/root/
scp nginx-config-centos.conf root@function.centerai.tech:/root/
```

### Способ 2: Создание файлов напрямую на сервере
```bash
# Подключитесь к серверу и создайте файлы вручную
nano ~/centos9-setup-commands.sh
# Скопируйте содержимое из файла centos9-setup-commands.sh

nano ~/deploy-backend-centos.sh
# Скопируйте содержимое из файла deploy-backend-centos.sh

nano ~/nginx-config-centos.conf
# Скопируйте содержимое из файла nginx-config-centos.conf
```

### Способ 3: Через Git (если у вас есть репозиторий)
```bash
git clone ваш_репозиторий
cd ваш_репозиторий
```

---

## Шаг 3: Установка основных компонентов

```bash
# Дать права на выполнение скрипта
chmod +x ~/centos9-setup-commands.sh

# Запустить установку (займет 5-10 минут)
bash ~/centos9-setup-commands.sh
```

**Что установится:**
- ✅ Node.js 20 LTS
- ✅ Python 3.11
- ✅ PostgreSQL 15
- ✅ Redis
- ✅ Nginx
- ✅ PM2
- ✅ Структура проекта

---

## Шаг 4: Деплой Backend приложения

```bash
# Дать права на выполнение
chmod +x ~/deploy-backend-centos.sh

# Копируем конфигурацию Nginx
sudo mkdir -p /var/www
sudo cp ~/nginx-config-centos.conf /var/www/

# Запустить деплой
bash ~/deploy-backend-centos.sh
```

**Что произойдет:**
- ✅ Создастся структура проекта
- ✅ Установятся npm зависимости
- ✅ Скомпилируется TypeScript код
- ✅ Создастся таблица в PostgreSQL
- ✅ Запустится через PM2
- ✅ Настроится Nginx

---

## Шаг 5: Проверка работы

```bash
# Проверка статуса PM2
pm2 status

# Проверка логов
pm2 logs universal-backend

# Проверка API
curl http://function.centerai.tech/health

# Должен вернуть:
# {"status":"ok","uptime":123,"timestamp":"2024-...","server":"function.centerai.tech"}
```

---

## Шаг 6: Настройка .env (ВАЖНО!)

```bash
# Отредактируйте .env файл
nano /var/www/universal-backend/api-gateway/.env
```

**Обязательно измените:**
```env
# Email настройки (если нужна отправка писем)
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_USER=your@email.ru          # ← ВАШ EMAIL
SMTP_PASS=your_password          # ← ВАШ ПАРОЛЬ
SMTP_FROM="Universal Backend" <your@email.ru>

# Admin email для уведомлений
ADMIN_EMAIL=admin@centerai.tech  # ← ВАШ EMAIL

# Безопасность
JWT_SECRET=sOMeRanDomStRing32ChArS...  # ← СГЕНЕРИРУЙТЕ СЛУЧАЙНУЮ СТРОКУ
```

После изменения перезапустите:
```bash
pm2 restart universal-backend
```

---

## Шаг 7: Получение SSL сертификата (HTTPS)

```bash
# Установка Certbot
sudo dnf install -y certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d function.centerai.tech

# Следуйте инструкциям Certbot:
# 1. Введите email
# 2. Согласитесь с условиями (Y)
# 3. Certbot автоматически настроит Nginx
```

После получения SSL:
```bash
# Проверка HTTPS
curl https://function.centerai.tech/health

# Перезагрузка Nginx
sudo systemctl reload nginx
```

**Автообновление сертификата:**
```bash
# Certbot автоматически добавляет задачу в cron
# Проверить можно так:
sudo certbot renew --dry-run
```

---

## Шаг 8: Тестирование API Bitrix Landing

### Тест через curl:
```bash
curl -X POST https://function.centerai.tech/api/bitrix-landing/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Иван Петров",
    "email": "ivan@example.com",
    "phone": "+7 999 123-45-67",
    "message": "Тестовая заявка с сервера"
  }'
```

**Ожидаемый ответ:**
```json
{
  "success": true,
  "data": {
    "leadId": 1,
    "status": "success",
    "message": "Заявка успешно отправлена"
  }
}
```

### Проверка данных в БД:
```bash
PGPASSWORD="StrongPassword2024!" psql -U backend_user -d universal_backend -h localhost -c "SELECT * FROM bitrix_landing_leads;"
```

---

## Шаг 9: Обновление HTML формы на вашем сайте

В файле `standalone-index.html` найдите форму и обновите JavaScript:

```html
<script>
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const button = e.target.querySelector('button[type="submit"]');
    
    // Блокируем кнопку
    button.disabled = true;
    button.textContent = 'ОТПРАВКА...';
    
    try {
        const response = await fetch('https://function.centerai.tech/api/bitrix-landing/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('✅ Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
            e.target.reset();
        } else {
            alert('❌ Ошибка отправки. Попробуйте позже.');
        }
    } catch (error) {
        console.error(error);
        alert('❌ Ошибка соединения с сервером.');
    } finally {
        // Разблокируем кнопку
        button.disabled = false;
        button.textContent = 'ОТПРАВИТЬ ЗАЯВКУ';
    }
});
</script>
```

---

## Полезные команды для управления

### PM2 (управление процессом)
```bash
pm2 status                    # Статус всех процессов
pm2 logs universal-backend    # Просмотр логов
pm2 restart universal-backend # Перезапуск
pm2 stop universal-backend    # Остановка
pm2 delete universal-backend  # Удаление процесса
pm2 monit                     # Мониторинг в реальном времени
```

### Nginx
```bash
sudo systemctl status nginx   # Статус
sudo systemctl restart nginx  # Перезапуск
sudo systemctl reload nginx   # Перезагрузка конфигурации
sudo nginx -t                 # Проверка конфигурации
```

### PostgreSQL
```bash
sudo systemctl status postgresql-15  # Статус
sudo systemctl restart postgresql-15 # Перезапуск

# Подключение к БД
PGPASSWORD="StrongPassword2024!" psql -U backend_user -d universal_backend -h localhost

# SQL команды внутри psql:
\dt                           # Список таблиц
SELECT * FROM bitrix_landing_leads;  # Просмотр заявок
\q                            # Выход
```

### Логи
```bash
# PM2 логи
pm2 logs --lines 100

# Nginx логи
sudo tail -f /var/log/nginx/backend_access.log
sudo tail -f /var/log/nginx/backend_error.log

# Системные логи
sudo journalctl -u nginx -f
sudo journalctl -u postgresql-15 -f
```

---

## Добавление новых проектов

Когда появится новый сайт:

### 1. Создайте директорию проекта
```bash
cd /var/www/universal-backend/projects
mkdir my-new-site
cd my-new-site
```

### 2. Создайте routes.ts
```typescript
import { Router } from 'express';
const router = Router();

router.post('/contact', async (req, res) => {
  res.json({ success: true, message: 'Проект my-new-site работает!' });
});

export default router;
```

### 3. Создайте таблицу в БД
```sql
CREATE TABLE my_new_site_leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Подключите роутер
Отредактируйте `/var/www/universal-backend/api-gateway/src/routes/projects.ts`:
```typescript
import myNewSiteRouter from '../../projects/my-new-site/routes.js';

router.use('/my-new-site', myNewSiteRouter);
```

### 5. Пересоберите и перезапустите
```bash
cd /var/www/universal-backend/api-gateway
npm run build
pm2 restart universal-backend
```

### 6. Тест
```bash
curl https://function.centerai.tech/api/my-new-site/contact
```

---

## Мониторинг производительности

### Использование ресурсов
```bash
# CPU и RAM
htop

# Дисковое пространство
df -h

# PM2 мониторинг
pm2 monit
```

### Производительность PostgreSQL
```bash
PGPASSWORD="StrongPassword2024!" psql -U backend_user -d universal_backend -h localhost

# Количество подключений
SELECT count(*) FROM pg_stat_activity;

# Размер базы данных
SELECT pg_size_pretty(pg_database_size('universal_backend'));
```

---

## Резервное копирование

### Backup PostgreSQL
```bash
# Создание бэкапа
PGPASSWORD="StrongPassword2024!" pg_dump -U backend_user -h localhost universal_backend > backup_$(date +%Y%m%d).sql

# Восстановление
PGPASSWORD="StrongPassword2024!" psql -U backend_user -h localhost universal_backend < backup_20241128.sql
```

### Автоматический бэкап через cron
```bash
# Открыть crontab
crontab -e

# Добавить задачу (каждый день в 3:00)
0 3 * * * PGPASSWORD="StrongPassword2024!" pg_dump -U backend_user -h localhost universal_backend > /var/backups/db_$(date +\%Y\%m\%d).sql
```

---

## Безопасность

### Изменение пароля PostgreSQL
```bash
sudo -u postgres psql
ALTER USER backend_user WITH PASSWORD 'новый_супер_сложный_пароль';
\q

# Обновите .env файл
nano /var/www/universal-backend/api-gateway/.env
# Измените DATABASE_URL

# Перезапустите
pm2 restart universal-backend
```

### Firewall правила
```bash
# Просмотр открытых портов
sudo firewall-cmd --list-all

# Закрыть прямой доступ к PostgreSQL извне (рекомендуется)
sudo firewall-cmd --permanent --remove-service=postgresql
sudo firewall-cmd --reload
```

---

## Решение проблем

### Backend не запускается
```bash
# Проверить логи
pm2 logs universal-backend --lines 50

# Проверить порт 3000
sudo lsof -i :3000
sudo netstat -tulpn | grep 3000

# Убить процесс на порту 3000 (если нужно)
sudo kill -9 $(sudo lsof -t -i:3000)

# Перезапустить
pm2 restart universal-backend
```

### Nginx не работает
```bash
# Проверить конфигурацию
sudo nginx -t

# Проверить логи
sudo tail -f /var/log/nginx/error.log

# Перезапустить
sudo systemctl restart nginx
```

### PostgreSQL не подключается
```bash
# Проверить статус
sudo systemctl status postgresql-15

# Проверить доступность
PGPASSWORD="StrongPassword2024!" psql -U backend_user -d universal_backend -h localhost -c "SELECT 1"

# Перезапустить
sudo systemctl restart postgresql-15
```

---

## 🎉 Готово!

Ваш Universal Backend запущен на **https://function.centerai.tech**

**API Endpoints:**
- `GET /health` - проверка работоспособности
- `POST /api/bitrix-landing/contact` - форма обратной связи для Битрикс лендинга

**Следующие проекты:**
Добавляйте новые сайты в `/var/www/universal-backend/projects/` и подключайте роутеры!

---

**Нужна помощь?** Проверьте логи: `pm2 logs universal-backend`
