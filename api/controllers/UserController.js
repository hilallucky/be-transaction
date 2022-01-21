const User = require('../models/User');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const UserController = () => {
  const register = async (req, res) => {
    const { body } = req;

    if (body.password === body.password2) {
      try {
        const user = await User.create({
          username: body.username,
          password: body.password,
          notes: body.notes,
        });
        const token = authService().issue({ id: user.id });
        await User.update(
           {token: token},
           {
            where: {
                      id : user.id
                   }                                                 
         });


        return res.status(200).json({ token, user });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
  };

  const login = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      try {
        const data = await User
          .findOne({
            attributes: ['username', 'notes', 'password'],
            where: {
              username,
            },
          });

        if (!data) {
          return res.status(400).json({ message: 'Bad Request: User not found' });
        }


        if (bcryptService().comparePassword(password, data.password)) {
          const token = authService().issue({ id: data.id });

          return res.status(200).json({ token, data });
        }

        return res.status(401).json({message: 'Unauthorized' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Internal server error' });
      }
    }

    return res.status(400).json({ message: 'Bad Request: Email or password is wrong' });
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  const getAll = async (req, res) => {
    try {
      const users = await User.findAll();

      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    register,
    login,
    validate,
    getAll,
  };
};

module.exports = UserController;
