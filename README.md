Эта API разрабатывается для будющего интернет-магазина "Vyatsh". Ниже преведены уже функционирующие endpoint'ы:

1. http://localhost:8080/api/customer/registration -- Регистация клиента.
Принимает json следующего вида:
    {
        "login": "...",
        "pass": "..."
    }

2. http://localhost:8080/api/customer/login -- Авторизация пользователя
Принимает json следующего вида:
    {
        "login": "...",
        "pass": "..."
    }

3. http://localhost:8080/api/customer/getAll -- Показать всех клиентов
Отправляет json c информацией о всех зарегистрированных клиентах. Запрос выполнится только если авторизированный пользователь, отправляющий его, является сотрудником (имеет в токине role: employee).

4. http://localhost:8080/api/customer/update -- Обновить данные о пользователе
Принемает json следующего типа:
{
  "address": {
        "country": "", 
        "region": "", 
        "disrict": "", 
        "city": "", 
        "street": "", 
        "house": "", 
        "postcode": ""
    }, 
    "personData": {
        "first_name": "", 
        "last_name": "", 
        "patronymic": "", 
        "gender": "", 
        "email": "", 
        "phone": ""
    }
}