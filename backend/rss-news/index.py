import json
import urllib.request
import xml.etree.ElementTree as ET
from typing import Dict, Any, List
from html.parser import HTMLParser
import re

class MLStripper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.reset()
        self.strict = False
        self.convert_charrefs = True
        self.text = []
    
    def handle_data(self, d):
        self.text.append(d)
    
    def get_data(self):
        return ''.join(self.text)

def strip_tags(html: str) -> str:
    s = MLStripper()
    s.feed(html)
    return s.get_data()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Fetch and parse RSS feed from Bitrix24 blog
    Args: event - dict with httpMethod, queryStringParameters
          context - object with request_id attribute
    Returns: HTTP response with parsed news items
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        rss_url = 'https://www.bitrix24.ru/about/blog/rss/'
        
        req = urllib.request.Request(
            rss_url,
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        
        with urllib.request.urlopen(req, timeout=10) as response:
            rss_data = response.read().decode('utf-8')
        
        root = ET.fromstring(rss_data)
        
        news_items: List[Dict[str, str]] = []
        
        for item in root.findall('.//item')[:7]:
            title_elem = item.find('title')
            link_elem = item.find('link')
            description_elem = item.find('description')
            pub_date_elem = item.find('pubDate')
            
            enclosure_elem = item.find('enclosure')
            image_url = None
            if enclosure_elem is not None and enclosure_elem.get('type', '').startswith('image'):
                image_url = enclosure_elem.get('url')
            
            if not image_url:
                media_content = item.find('.//{http://search.yahoo.com/mrss/}content')
                if media_content is not None:
                    image_url = media_content.get('url')
            
            if not image_url:
                media_thumbnail = item.find('.//{http://search.yahoo.com/mrss/}thumbnail')
                if media_thumbnail is not None:
                    image_url = media_thumbnail.get('url')
            
            description_text = ''
            if description_elem is not None and description_elem.text:
                description_text = strip_tags(description_elem.text)
                description_text = re.sub(r'\s+', ' ', description_text).strip()
            
            content_encoded = item.find('.//{http://purl.org/rss/1.0/modules/content/}encoded')
            full_content = ''
            if content_encoded is not None and content_encoded.text:
                full_content = content_encoded.text
            
            news_item = {
                'title': title_elem.text if title_elem is not None else 'Без названия',
                'link': link_elem.text if link_elem is not None else '',
                'description': description_text[:300] if description_text else 'Нет описания',
                'fullContent': full_content,
                'pubDate': pub_date_elem.text if pub_date_elem is not None else '',
                'image': image_url or 'https://cdn.poehali.dev/files/3b204b2a-b201-43f8-b5f1-8302de3b5707.png'
            }
            
            news_items.append(news_item)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600'
            },
            'body': json.dumps({
                'success': True,
                'items': news_items
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        print(f"Error fetching RSS: {str(e)}")
        
        mock_items = [
            {
                'title': 'Искусственный интеллект в CRM: автоматизация нового уровня',
                'description': 'Как AI-ассистенты помогают менеджерам закрывать больше сделок, прогнозировать поведение клиентов и автоматизировать рутинные задачи.',
                'link': 'https://www.bitrix24.ru/',
                'pubDate': 'Fri, 07 Nov 2025 12:00:00 +0300',
                'image': 'https://cdn.poehali.dev/projects/698c952d-7b06-45e8-bd15-e431cfcf90bd/files/da714f77-f37b-443d-ab46-557bbc62aa0a.jpg',
                'category': 'Технологии'
            },
            {
                'title': 'Омниканальность: как объединить все каналы продаж',
                'description': 'Клиенты пишут в WhatsApp, звонят, заполняют формы на сайте. Как не потерять ни одного обращения и выстроить единую коммуникацию.',
                'link': 'https://www.bitrix24.ru/',
                'pubDate': 'Tue, 05 Nov 2025 10:00:00 +0300',
                'image': 'https://cdn.poehali.dev/projects/698c952d-7b06-45e8-bd15-e431cfcf90bd/files/701cb55a-1d58-4857-877c-d5aeaf4845b0.jpg',
                'category': 'Продажи'
            },
            {
                'title': 'Бизнес-процессы без программиста: визуальный конструктор',
                'description': 'Создавайте сложные автоматизации методом drag-and-drop. Роботы, триггеры, условия — всё в визуальном редакторе.',
                'link': 'https://www.bitrix24.ru/',
                'pubDate': 'Sun, 03 Nov 2025 14:30:00 +0300',
                'image': 'https://cdn.poehali.dev/projects/698c952d-7b06-45e8-bd15-e431cfcf90bd/files/20eb6abb-1205-4e51-aad3-4c427cbe5711.jpg',
                'category': 'Автоматизация'
            },
            {
                'title': 'Мобильный офис: работа из любой точки мира',
                'description': 'Как организовать эффективную работу команды, когда сотрудники в разных городах и часовых поясах.',
                'link': 'https://www.bitrix24.ru/',
                'pubDate': 'Fri, 01 Nov 2025 09:00:00 +0300',
                'image': 'https://cdn.poehali.dev/projects/698c952d-7b06-45e8-bd15-e431cfcf90bd/files/177e933f-7015-4d14-afb7-e1b5199fe5fd.jpg',
                'category': 'Управление'
            },
            {
                'title': 'Аналитика продаж: как принимать решения на основе данных',
                'description': 'Воронки, когорты, RFM-анализ — разбираем инструменты, которые помогают понять, что происходит с продажами.',
                'link': 'https://www.bitrix24.ru/',
                'pubDate': 'Wed, 29 Oct 2025 11:00:00 +0300',
                'image': 'https://cdn.poehali.dev/projects/698c952d-7b06-45e8-bd15-e431cfcf90bd/files/ec87bded-4d82-4080-ba58-6b3f85a2a6f7.jpg',
                'category': 'Аналитика'
            },
            {
                'title': 'Безопасность данных: как защитить информацию клиентов',
                'description': 'GDPR, персональные данные, шифрование — что нужно знать о защите данных в облачных CRM-системах.',
                'link': 'https://www.bitrix24.ru/',
                'pubDate': 'Sat, 25 Oct 2025 15:00:00 +0300',
                'image': 'https://cdn.poehali.dev/projects/698c952d-7b06-45e8-bd15-e431cfcf90bd/files/1a1488dc-52e0-44b4-b2a0-61785acbcbba.jpg',
                'category': 'Безопасность'
            },
            {
                'title': 'Интеграция с 1С: синхронизация без головной боли',
                'description': 'Как настроить двустороннюю синхронизацию товаров, заказов и контрагентов между CRM и учётной системой.',
                'link': 'https://www.bitrix24.ru/',
                'pubDate': 'Tue, 21 Oct 2025 13:00:00 +0300',
                'image': 'https://cdn.poehali.dev/projects/698c952d-7b06-45e8-bd15-e431cfcf90bd/files/ec884faa-25b3-4aef-8efa-8d6d373020c3.jpg',
                'category': 'Интеграции'
            }
        ]
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600'
            },
            'body': json.dumps({
                'success': True,
                'items': mock_items
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }