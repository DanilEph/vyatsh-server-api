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

4. http://localhost:8080/api/customer/update -- Обновить данные пользователя (только для customer и employee)
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

5. http://localhost:8080/api/customer/get -- Получить всю информацию одного пользователя (только для customer и employee)

6. http://localhost:8080/api/customer/get -- Удаление всей информации пользователей (только для customer)

7.http://localhost:8080/api/supplier (get) -- Добавление нового поставщика

{
	"supplier": {
    	"company_name": "",
      	"company_status": ""
    },
  	"address": {
    	"country": "",
      	"region": "",
      	"district": "",
      	"city": "",
      	"street": "",
      	"house": "",
      	"postcode": ""
    }
}

8. http://localhost:8080/api/category (post)
{
	"categoryName": "",
  	"description": "",
  	"features": "",
  	"parentCategory": ""
}

9. http://localhost:8080/api/product (post)
{ 	"supplierId": "",
 	"categoryId": "", 
 	"measureUnitId": "",
 	"productName": "",
 	"available": "",
 	"description": "",
 	"storageConditions": "",
 	"altPhotoText": "",
    "img": <файл в формате png>
}