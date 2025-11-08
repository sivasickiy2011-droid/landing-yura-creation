import json
import requests
from bs4 import BeautifulSoup
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Парсит актуальные цены с сайта Битрикс24 (тарифы и маркетплейс)
    Args: event - dict с httpMethod
          context - объект с request_id
    Returns: HTTP response с ценами в JSON
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
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    try:
        response = requests.get('https://www.bitrix24.ru/prices/', headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        tariffs = parse_tariffs(soup)
        marketplace = parse_marketplace(soup)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            },
            'body': json.dumps({
                'success': True,
                'tariffs': tariffs,
                'marketplace': marketplace,
                'timestamp': context.request_id
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': str(e),
                'fallback': get_fallback_prices()
            }, ensure_ascii=False),
            'isBase64Encoded': False
        }

def parse_tariffs(soup: BeautifulSoup) -> List[Dict[str, Any]]:
    tariffs = []
    
    tariff_names = ['Бесплатный', 'Базовый', 'Стандартный', 'Профессиональный']
    
    for name in tariff_names:
        tariff_data = {
            'name': name,
            'priceMonth': '0' if name == 'Бесплатный' else extract_price(soup, name, 'month'),
            'priceYear': '0' if name == 'Бесплатный' else extract_price(soup, name, 'year')
        }
        tariffs.append(tariff_data)
    
    return tariffs

def parse_marketplace(soup: BeautifulSoup) -> Dict[str, str]:
    marketplace = {
        'priceMonth': extract_marketplace_price(soup, 'month'),
        'priceYear': extract_marketplace_price(soup, 'year')
    }
    return marketplace

def extract_price(soup: BeautifulSoup, tariff: str, period: str) -> str:
    try:
        price_elements = soup.find_all(class_='price')
        for elem in price_elements:
            text = elem.get_text(strip=True)
            if period == 'month' and 'мес' in text:
                price = ''.join(filter(str.isdigit, text))
                if price:
                    return price
            elif period == 'year' and 'год' in text:
                price = ''.join(filter(str.isdigit, text))
                if price:
                    return price
        return get_default_price(tariff, period)
    except:
        return get_default_price(tariff, period)

def extract_marketplace_price(soup: BeautifulSoup, period: str) -> str:
    try:
        marketplace_section = soup.find(text=lambda t: t and 'Маркетплейс' in t)
        if marketplace_section:
            parent = marketplace_section.find_parent()
            if parent:
                price_elem = parent.find_next(class_='price')
                if price_elem:
                    text = price_elem.get_text(strip=True)
                    price = ''.join(filter(str.isdigit, text))
                    if price:
                        return price
        return '2990' if period == 'month' else '2490'
    except:
        return '2990' if period == 'month' else '2490'

def get_default_price(tariff: str, period: str) -> str:
    defaults = {
        'Бесплатный': {'month': '0', 'year': '0'},
        'Базовый': {'month': '2490', 'year': '1990'},
        'Стандартный': {'month': '6990', 'year': '5990'},
        'Профессиональный': {'month': '13990', 'year': '11990'}
    }
    return defaults.get(tariff, {}).get(period, '0')

def get_fallback_prices() -> Dict[str, Any]:
    return {
        'tariffs': [
            {'name': 'Бесплатный', 'priceMonth': '0', 'priceYear': '0'},
            {'name': 'Базовый', 'priceMonth': '2490', 'priceYear': '1990'},
            {'name': 'Стандартный', 'priceMonth': '6990', 'priceYear': '5990'},
            {'name': 'Профессиональный', 'priceMonth': '13990', 'priceYear': '11990'}
        ],
        'marketplace': {
            'priceMonth': '2990',
            'priceYear': '2490'
        }
    }
