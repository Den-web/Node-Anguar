module.exports.routes = {

  '/': {
    view: 'homepage'
  },

  '/login'    : 'SessionController',
  '/register' : 'UserController',

  '/logout'   : {
      controller: 'session',
      action: 'destroy'
    },

    /**
     * Здесь мы определяем пути, которые
     * мы хотим переопределить на другой
     * адрес чтобы
     * использовать по назначенному нам
     * по умолчанию пути REST, в нашем
     * случае по-умолчанию контроллер
     * пагинации, использует адрес
     * '/post/page/:page' - что не
     * совсем удобно при использовании,
     * поэтому мы создаем новую конфиг.
     * нужного нам пути. И так первым мы
     * указываем вид запроса get или post,
     * наш случай - мы указываем страницу
     * в адресной строке, поэтому get.
     * Далее мы указываем нужный нам адрес
     * после по типу ':параметр' указываем
     * наш параметр req.param('page'), далее
     * указываем контроллер, и действие
     * которое его будет обрабатывать.
     */

    'get /post/:page': {
      controller: 'post', // Контроллер
      action: 'page' // Действие
    },

    /**
     * Задаем пути так, чтобы все запросы
     * были только POST - это часть организации
     * безопасности приложения помимо политики. Это
     * нужно потому что мы отключаем rest blueprints
     * которые по умолчанию включены (в config/controllers.js)
     */

    'post /post/create': {
      controller: 'post',
      action: 'create'
    },

    'get /post/delete/:id': {
      controller: 'post',
      action: 'delete'
    },

    'post /post/update': {
      controller: 'post',
      action: 'update'
    },

    '/register' : 'UserController',

     '/login'    : 'SessionController',
      '/logout'   : {
        controller: 'session',
        action: 'destroy'
      }

};
