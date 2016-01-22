/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //@API - создание пользователя

  /**
   * Создание нового пользователя,
   * в качестве параметров передаем
   * имя пользователя, пароль, и булевое
   * значение админ. После создания
   * пользователя он аутентифицируется
   * в сессии. После создания пользователя
   * администратора мы установим политику
   * admin (api/policies/admin.js) чтобы к
   * этой функции больше не могли обращаться
   * не привелегированные пользователи
   */

  create: function (req, res) {
    var elem = {
      username : req.param('username'),
      password : req.param('password'),
      admin    : req.param('admin')
    };

    User.create(elem).exec(function (err, user) {
      if (err) return res.send(500);
      req.session.auth = true;
      res.redirect('/');
    });
  },

  // @MAIN
  index: function (req, res) {
    res.view();
  }

};

var passwordHash = require('password-hash');

module.exports = {


  // @API основные функции сессии

  create: function (req, res) {
    /**
     * Задаем переменные запрашиваемых
     * параметров, в нашем случае логин
     * и пароль
     */
    var username = req.param('username'),
      password = req.param('password');

    /**
     * Если нет логина или пароля в запросе
     * вывести ошибку, и перенаправить обратно
     * (прим. здесь лучше сделать подробную
     * обработку ошибок, например с flash)
     */

    if (!username || !password) {
      return res.redirect('/session');
    };

    /**
     * Найти пользователя из запроса логина
     * (username - req.param('username'))
     * когда пользователь найден производиться
     * сравнение зашифрованного пароля с паролем
     * который был отправлен запросом, если он
     * валиден, то создается внешний статус -
     * авторизован или нет, и дается доступ к
     * данным через внешний доступ сессии. Это
     * позволит нам в дальнейшем создать политику
     * для ограничивания доступа к определенным
     * разделам нашего блога (используя сессии)
     */
    User.findOneByUsername(username).exec(function (err, user) {
      if (!user || err) return res.send(500);
      if (passwordHash.verify(password, user.encryptPassword)) {
        // Авторизовать пользователя в сессии
                                // Дать доступ к данным авторизованного
                                // пользователя из сессии
        req.session.auth = true;
        req.session.User = user;

        if (req.session.User.admin) {
          return res.redirect('/admin');
        };
      };
    });
  },
  /**
   * Создаем выход из сессии который
   * просматривает есть ли пользователь
   * в онлайне, и уничтожает сессию
   */
  destroy: function (req, res) {
    User.findOne(req.session.User.id).exec(function (err, user) {
      if (user) {
        req.session.destroy();
        res.redirect('/');
      } else { res.redirect('/login'); };
    });
  },

  // @MAIN

  index: function (req, res) {
    res.view();
  }
};
