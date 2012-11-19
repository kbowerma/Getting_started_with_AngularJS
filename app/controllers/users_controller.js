load('application');

before(loadUser, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New user';
    this.user = new User;
    render();
});

action(function create() {
	
    User.create({name: req.body.name, email: req.body.email, password: req.body.password}, function (err, user) {
         if (err) {
             send({
                 user: user,
                 error: 'User can not be created'
             });
         } else {
             console.log('returning ' + JSON.stringify(user));
             send(
            {
             user: user
            }
          );
         }
     });
});

action(function index() {
    User.all(function (err, users) {
        send({
            users: users
        });
    });
});

action(function show() {
    console.log('returning ' + JSON.stringify(this.user));
    send(
		{
		   user: this.user
		}
		);
});

action(function edit() {
	send({error: 'no edit available'});
 });

action(function update() {
    console.log("sushitype:" + req.body.toString());
	this.user.updateAttributes({sushitype: req.body.sushitype, state: req.body.state, zipcode: req.body.zipcode}, function (err) {
        if (!err) {
            send(
				{
				   user: this.user
				}
				);
        } else {
            send({
                 user: this.user,
                 error: 'Unable to update user'
             });
        }
    }.bind(this));
 });

action(function destroy() {
	send({error: 'no destroy available'});
 });

function loadUser() {
    User.find(params.id, function (err, post) {
        if (err || !post) {
            //redirect(path_to.posts());
        } else {
            this.user = post;
            next();
        }
    }.bind(this));

}
