
const { body, validationResult, buildCheckFunction } = require('express-validator');

const   validateRegistrationBody = () => {
    return [
      body('fullName')
      .exists()
      .withMessage('name field is required')
      .isLength({min:3})
      .withMessage('name must be greater than 3 letters'),
      body('email').exists()
      .withMessage('email field is required')
      .isEmail()
      .withMessage('Email is invalid'),
      body('password')
      .exists()
      .withMessage('password field is required')
      .isLength({min : 8,max: 12})
      .withMessage('password must be in between 8 to 12 characters long')
    ]
  }
  const   validateLoginBody = () => {
    return [
      body('email').exists()
      .withMessage('email field is required')
      .isEmail()
      .withMessage('Email is invalid'),
      body('password')
      .exists()
      .withMessage('password field is required')
      .isLength({min : 8,max: 12})
      .withMessage('password must be in between 8 to 12 characters long')
    ]
  }
  
  const validate = (req, res, next) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    error.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      error: extractedErrors,
    })
  }

 
  
  

module.exports = {
    validateRegistrationBody,
    validateLoginBody,
     validate
}