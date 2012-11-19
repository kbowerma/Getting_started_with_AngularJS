load('application');

action('create', function () {
        User.findOne({ where: {email: req.query.email, password: req.query.password}},
	       function (err, user) {
	          if (typeof user === 'undefined') {
                 send(401);
              } else {
	             session['user_id'] = user.id;
	             send({
	               user: user
                 });
              }
          }
	);
	
});

action('destroy', function () {
	session['user_id'] = undefined;
});