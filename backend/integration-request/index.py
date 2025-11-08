import json
import os
from typing import Dict, Any
from datetime import datetime
import urllib.request
import urllib.parse

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Process integration request form and send to Bitrix24 and Telegram
    Args: event - dict with httpMethod, body, headers
          context - object with request_id, function_name attributes
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
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
        body_data = json.loads(event.get('body', '{}'))
        
        bitrix_webhook = os.environ.get('BITRIX24_WEBHOOK_URL')
        telegram_bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
        
        company_name = body_data.get('companyName', '')
        contact_person = body_data.get('contactPerson', '')
        phone = body_data.get('phone', '')
        email = body_data.get('email', '')
        telegram_username = body_data.get('telegram', '')
        industry = body_data.get('industry', '')
        company_size = body_data.get('companySize', '')
        current_crm = body_data.get('currentCrm', 'Нет')
        integration_needs = body_data.get('integrationNeeds', [])
        budget = body_data.get('budget', '')
        timeline = body_data.get('timeline', '')
        main_goals = body_data.get('mainGoals', '')
        description = body_data.get('description', '')
        website = body_data.get('website', '')
        calculated_cost = body_data.get('calculatedCost', 0)
        users = body_data.get('users', 0)
        integrations = body_data.get('integrations', 0)
        contact_method = body_data.get('contactMethod', 'email')
        
        if bitrix_webhook:
            bitrix_data = {
                'fields': {
                    'TITLE': f'Заявка на внедрение: {company_name}',
                    'NAME': contact_person,
                    'PHONE': [{'VALUE': phone, 'VALUE_TYPE': 'WORK'}] if phone else [],
                    'EMAIL': [{'VALUE': email, 'VALUE_TYPE': 'WORK'}] if email else [],
                    'COMPANY_TITLE': company_name,
                    'COMMENTS': f'''
Отрасль: {industry}
Размер компании: {company_size}
Текущая CRM: {current_crm}
Сайт: {website if website else 'Нет'}

Интеграции: {', '.join(integration_needs) if integration_needs else 'Не указаны'}
Бюджет: {budget}
Сроки: {timeline}

Основные цели:
{main_goals}

Дополнительная информация:
{description}

Расчет:
Пользователей: {users}
Интеграций: {integrations}
Стоимость: {calculated_cost} ₽

Контакт Telegram: {telegram_username}
Предпочтительный способ связи: {contact_method}
'''.strip(),
                    'SOURCE_ID': 'WEB',
                    'SOURCE_DESCRIPTION': 'Анкета на внедрение с сайта'
                }
            }
            
            bitrix_request = urllib.request.Request(
                bitrix_webhook,
                data=json.dumps(bitrix_data).encode('utf-8'),
                headers={'Content-Type': 'application/json'},
                method='POST'
            )
            
            try:
                with urllib.request.urlopen(bitrix_request, timeout=10) as response:
                    bitrix_result = json.loads(response.read().decode('utf-8'))
            except Exception as e:
                print(f"Bitrix24 error: {str(e)}")
        
        if telegram_bot_token and telegram_chat_id:
            telegram_message = f'''
🔔 <b>Новая заявка на внедрение</b>

<b>Компания:</b> {company_name}
<b>Контактное лицо:</b> {contact_person}
<b>Телефон:</b> {phone if phone else 'Не указан'}
<b>Email:</b> {email if email else 'Не указан'}
<b>Telegram:</b> {telegram_username if telegram_username else 'Не указан'}

<b>О компании:</b>
• Отрасль: {industry}
• Размер: {company_size}
• Текущая CRM: {current_crm}
• Сайт: {website if website else 'Нет'}

<b>Детали внедрения:</b>
• Интеграции: {', '.join(integration_needs) if integration_needs else 'Не указаны'}
• Бюджет: {budget}
• Сроки: {timeline}

<b>Цели:</b>
{main_goals if main_goals else 'Не указаны'}

<b>Расчет:</b>
👥 {users} пользователей
🔗 {integrations} интеграций
💰 {calculated_cost:,} ₽

<b>Способ связи:</b> {contact_method}

<b>Дополнительно:</b>
{description if description else 'Нет'}
'''.strip()
            
            telegram_url = f'https://api.telegram.org/bot{telegram_bot_token}/sendMessage'
            telegram_data = {
                'chat_id': telegram_chat_id,
                'text': telegram_message,
                'parse_mode': 'HTML'
            }
            
            telegram_request = urllib.request.Request(
                telegram_url,
                data=json.dumps(telegram_data).encode('utf-8'),
                headers={'Content-Type': 'application/json'},
                method='POST'
            )
            
            try:
                with urllib.request.urlopen(telegram_request, timeout=10) as response:
                    telegram_result = json.loads(response.read().decode('utf-8'))
            except Exception as e:
                print(f"Telegram error: {str(e)}")
        
        if telegram_username and telegram_bot_token and contact_method == 'telegram':
            try:
                user_chat_id = telegram_username.replace('@', '')
                
                user_message = f'''
✅ <b>Ваша анкета на внедрение получена</b>

Спасибо за обращение! Мы получили вашу заявку и скоро свяжемся с вами.

<b>Краткая информация:</b>
Компания: {company_name}
Расчетная стоимость: {calculated_cost:,} ₽
Количество пользователей: {users}
Интеграции: {integrations}

Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.

С уважением,
Центр автоматизаций и внедрений
'''.strip()
                
                user_telegram_url = f'https://api.telegram.org/bot{telegram_bot_token}/sendMessage'
                user_telegram_data = {
                    'chat_id': user_chat_id,
                    'text': user_message,
                    'parse_mode': 'HTML'
                }
                
                user_telegram_request = urllib.request.Request(
                    user_telegram_url,
                    data=json.dumps(user_telegram_data).encode('utf-8'),
                    headers={'Content-Type': 'application/json'},
                    method='POST'
                )
                
                with urllib.request.urlopen(user_telegram_request, timeout=10) as response:
                    pass
            except Exception as e:
                print(f"User Telegram notification error: {str(e)}")
        
        if email and contact_method == 'email':
            pass
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Анкета успешно отправлена'
            }),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': False,
                'error': 'Ошибка обработки запроса'
            }),
            'isBase64Encoded': False
        }
