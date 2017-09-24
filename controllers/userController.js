

module.exports = function (userModel) {

    var signup = function(req, res) {
        var userToBeCreated = req.body;

        findOne({email : userToBeCreated.email}, function(err, user) {

            if ( err ) {
                res.send(err);
            }
            else if ( user ) {
                res.send("Username already exists");
            }
            else {
                var newUser = new userModel({
                    email: userToBeCreated.email,
                    password: userToBeCreated.password,
                    role: userToBeCreated.role.toUpperCase(),
                    address: userToBeCreated.address,
                    name: userToBeCreated.name,
                    status: 'ACTIVE',
                    createdDate: new Date(),
                    updateDate: new Date()
                });

                newUser.save(newUser, function (err) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send("created successfully");
                    }
                });
            }
        });
    };

    var findOne = function(query, next) {
        userModel.findOne(query, function(err, user){
            next(err, user);
        });
    };

    return {
        signup : signup,
        findOne : findOne
    };

};