const errorhandler = (err, req, res, next) => {
 
  switch (err.name) {
    case 'SequelizeValidationError':
      const error = err.errors[0].message
      res.status(400).json({ message: error })
      break;
    case 'SequelizeUniqueConstraintError':
      const unique = err.errors[0].message
      res.status(400).json({ message: unique })
      break;
    case 'NotFound':
      res.status(401).json({ message: 'Invalid email or password' })
      break;
    case 'invalidToken':
      res.status(401).json({ message: 'invalid access token' })
      break;
    case 'unauth':
      res.status(403).json({ message: 'You have no permission' })
      break;
    case 'alreadyVoted':
      res.status(403).json({ message: 'You already voted' })
      break;
    case 'IdNull':
      res.status(404).json({ message: 'Id not found' })
      break;
    case 'notfound':
      res.status(404).json({ message: 'Data not found' })
      break;
    case 'noemail':
      res.status(400).json({ message: 'Email is required' })
      break;
    case 'nopassword':
      res.status(400).json({ message: 'Password is required' })
      break;

    default:
      res.status(500).json({ message: 'Internal Server Error' })
      break;
  }
}

module.exports = errorhandler