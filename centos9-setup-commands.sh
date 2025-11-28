#!/bin/bash
# Универсальный Backend для CentOS 9 Stream - Скрипт установки
# Сервер: function.centerai.tech
# Использование: bash centos9-setup-commands.sh

set -e

echo "🚀 Начинаем настройку Universal Backend на CentOS 9 Stream"
echo "=========================================================="

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ============================================
# 1. ОБНОВЛЕНИЕ СИСТЕМЫ
# ============================================
echo -e "${YELLOW}[1/10] Обновление системы...${NC}"
sudo dnf update -y
sudo dnf install -y epel-release
sudo dnf install -y curl wget git vim nano tar gzip unzip

echo -e "${GREEN}✓ Система обновлена${NC}"

# ============================================
# 2. УСТАНОВКА NODE.JS 20 LTS
# ============================================
echo -e "${YELLOW}[2/10] Установка Node.js 20 LTS...${NC}"

# Удаление старых версий (если есть)
sudo dnf remove -y nodejs npm || true

# Добавление репозитория NodeSource
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -

# Установка Node.js
sudo dnf install -y nodejs

# Проверка установки
node -v
npm -v

echo -e "${GREEN}✓ Node.js установлен${NC}"

# ============================================
# 3. УСТАНОВКА PYTHON 3.11
# ============================================
echo -e "${YELLOW}[3/10] Установка Python 3.11...${NC}"

# CentOS 9 Stream уже имеет Python 3.9, но установим 3.11
sudo dnf install -y python3.11 python3.11-pip python3.11-devel

# Создание символических ссылок
sudo alternatives --install /usr/bin/python3 python3 /usr/bin/python3.11 1
sudo alternatives --install /usr/bin/pip3 pip3 /usr/bin/pip3.11 1

# Проверка
python3 --version
pip3 --version

echo -e "${GREEN}✓ Python 3.11 установлен${NC}"

# ============================================
# 4. УСТАНОВКА POSTGRESQL 15
# ============================================
echo -e "${YELLOW}[4/10] Установка PostgreSQL 15...${NC}"

# Добавление репозитория PostgreSQL
sudo dnf install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-9-x86_64/pgdg-redhat-repo-latest.noarch.rpm

# Отключение встроенного модуля PostgreSQL
sudo dnf -qy module disable postgresql

# Установка PostgreSQL 15
sudo dnf install -y postgresql15-server postgresql15-contrib

# Инициализация БД
sudo /usr/pgsql-15/bin/postgresql-15-setup initdb

# Запуск и автозапуск
sudo systemctl start postgresql-15
sudo systemctl enable postgresql-15

echo -e "${GREEN}✓ PostgreSQL 15 установлен${NC}"

# ============================================
# 5. НАСТРОЙКА POSTGRESQL
# ============================================
echo -e "${YELLOW}[5/10] Настройка PostgreSQL...${NC}"

# Создание базы данных и пользователя
sudo -u postgres psql << EOF
CREATE DATABASE universal_backend;
CREATE USER backend_user WITH ENCRYPTED PASSWORD 'StrongPassword2024!';
GRANT ALL PRIVILEGES ON DATABASE universal_backend TO backend_user;
\q
EOF

# Разрешение локальных подключений (md5 вместо peer)
sudo sed -i 's/local   all             all                                     peer/local   all             all                                     md5/' /var/lib/pgsql/15/data/pg_hba.conf

# Перезапуск PostgreSQL
sudo systemctl restart postgresql-15

echo -e "${GREEN}✓ PostgreSQL настроен${NC}"
echo "   База: universal_backend"
echo "   Пользователь: backend_user"
echo "   Пароль: StrongPassword2024!"

# ============================================
# 6. УСТАНОВКА REDIS
# ============================================
echo -e "${YELLOW}[6/10] Установка Redis...${NC}"

sudo dnf install -y redis

# Запуск и автозапуск
sudo systemctl start redis
sudo systemctl enable redis

# Проверка
redis-cli ping

echo -e "${GREEN}✓ Redis установлен${NC}"

# ============================================
# 7. УСТАНОВКА NGINX
# ============================================
echo -e "${YELLOW}[7/10] Установка Nginx...${NC}"

sudo dnf install -y nginx

# Запуск и автозапуск
sudo systemctl start nginx
sudo systemctl enable nginx

echo -e "${GREEN}✓ Nginx установлен${NC}"

# ============================================
# 8. НАСТРОЙКА FIREWALL
# ============================================
echo -e "${YELLOW}[8/10] Настройка Firewall...${NC}"

# Открытие портов 80 (HTTP) и 443 (HTTPS)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

echo -e "${GREEN}✓ Firewall настроен${NC}"

# ============================================
# 9. УСТАНОВКА PM2
# ============================================
echo -e "${YELLOW}[9/10] Установка PM2...${NC}"

sudo npm install -g pm2

# Настройка автозапуска
pm2 startup systemd -u $USER --hp $HOME

echo -e "${GREEN}✓ PM2 установлен${NC}"

# ============================================
# 10. СОЗДАНИЕ СТРУКТУРЫ ПРОЕКТА
# ============================================
echo -e "${YELLOW}[10/10] Создание структуры проекта...${NC}"

# Создание директорий
sudo mkdir -p /var/www/universal-backend
sudo chown -R $USER:$USER /var/www/universal-backend

cd /var/www/universal-backend

# Структура проекта
mkdir -p api-gateway/src/{routes,middleware,services,config}
mkdir -p projects/bitrix-landing/handlers
mkdir -p shared/{database,email,telegram,utils}
mkdir -p storage/uploads
mkdir -p logs

echo -e "${GREEN}✓ Структура проекта создана${NC}"

# ============================================
# ЗАВЕРШЕНИЕ
# ============================================
echo ""
echo "=========================================================="
echo -e "${GREEN}✅ Установка завершена успешно!${NC}"
echo "=========================================================="
echo ""
echo "📋 Установленные компоненты:"
echo "   ✓ Node.js $(node -v)"
echo "   ✓ Python $(python3 --version)"
echo "   ✓ PostgreSQL 15"
echo "   ✓ Redis"
echo "   ✓ Nginx"
echo "   ✓ PM2"
echo ""
echo "🔧 Следующие шаги:"
echo "   1. Настроить Nginx конфигурацию"
echo "   2. Создать файлы проекта в /var/www/universal-backend"
echo "   3. Получить SSL сертификат (certbot)"
echo "   4. Запустить backend через PM2"
echo ""
echo "📁 Директория проекта: /var/www/universal-backend"
echo "🗄️  База данных: universal_backend"
echo "👤 БД пользователь: backend_user"
echo "🔑 БД пароль: StrongPassword2024!"
echo ""
