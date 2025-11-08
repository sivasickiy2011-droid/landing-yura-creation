import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Send form submissions and pricing inquiries to Telegram chat
    Args: event - dict with httpMethod, body (name, phone, email, company, message, tariff)
          context - object with request_id attribute
    Returns: HTTP response dict with status
    '''
    method: str = event.get('httpMethod', 'POST')
    
    # Handle CORS OPTIONS request
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Get Telegram credentials from environment
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Telegram credentials not configured'})
        }
    
    # Parse request body
    body_data = json.loads(event.get('body', '{}'))
    
    # Check if this is a cookie consent notification
    request_type = body_data.get('type', '')
    
    if request_type == 'cookie_consent':
        user_id = body_data.get('userId', 'unknown')
        timestamp = body_data.get('timestamp', '')
        user_agent = body_data.get('userAgent', '')
        
        text = f"""🍪 <b>Новое согласие на обработку данных</b>

🆔 <b>ID пользователя:</b> <code>{user_id}</code>
🕐 <b>Время:</b> {timestamp}
🌐 <b>User Agent:</b> {user_agent}"""
    else:
        name = body_data.get('name', '')
        phone = body_data.get('phone', '')
        email = body_data.get('email', '')
        company = body_data.get('company', '')
        message = body_data.get('message', '')
        tariff = body_data.get('tariff', '')
        billing_period = body_data.get('billingPeriod', '')
        
        # Build Telegram message
        if tariff:
            period_info = f" ({billing_period})" if billing_period else ""
            text = f"""🎯 <b>Новая заявка на тариф: {tariff}{period_info}</b>

👤 <b>ФИО:</b> {name}
📞 <b>Телефон:</b> {phone}
📧 <b>Email:</b> {email}
🏢 <b>Организация:</b> {company}
💬 <b>Комментарий:</b> {message if message else 'Не указан'}"""
        else:
            text = f"""📩 <b>Новое обращение с сайта</b>

👤 <b>ФИО:</b> {name}
📞 <b>Телефон:</b> {phone}
📧 <b>Email:</b> {email}
🏢 <b>Организация:</b> {company}
💬 <b>Сообщение:</b> {message if message else 'Не указано'}"""
    
    # Send to Telegram
    telegram_url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    data = {
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }
    
    req = urllib.request.Request(
        telegram_url,
        data=json.dumps(data).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            telegram_response = json.loads(response.read().decode('utf-8'))
            
        if telegram_response.get('ok'):
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True, 'message': 'Заявка отправлена'})
            }
        else:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': False, 'error': 'Telegram API error'})
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': False, 'error': str(e)})
        }