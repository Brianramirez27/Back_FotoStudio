import * as userService from '../services/userService.js';





function getUser(req, res) {
  const user = userService.getUser();
  res.send(user);
}

export { 
    getUser 
};