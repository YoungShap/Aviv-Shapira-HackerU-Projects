import Joi from 'joi';

export const RoleTypes = {
    none: 0,
    user: 1,
    business: 2,
    admin: 3,
  }
  
  export  const checkPermissions = (permissions, userRoleType) => {
    return permissions.includes(userRoleType);
  }
  
  export const pages = [
    { route: '/', title: 'Home' },
    { route: '/About', title: 'About' },
    { route: '/cards/favorite', title: 'Favorite Cards', permissions: [RoleTypes.user, RoleTypes.admin, RoleTypes.business] },
    { route: '/business/cards', title: 'My Cards', permissions: [RoleTypes.business, RoleTypes.admin] },
    { route: '/admin/clients', title: 'Clinet Management', permissions: [RoleTypes.admin] },
    { route: "/login", title: 'Login', permissions: [RoleTypes.none] },
    { route: "/signup", title: 'Signup', permissions: [RoleTypes.none] },
  ];
  export const settings = [
    { route: '/account', title: 'My Account', permissions: [RoleTypes.user, RoleTypes.business] },
  ];

  export const structure = [
    { name: 'middleName', type: 'text', label: 'Middle Name', required: true, block: true },
    { name: 'lastName', type: 'text', label: 'Last Name', required: true, block: true },
    { name: 'phone', type: 'number', label: 'phone', required: true, block: true },
    { name: 'email', type: 'email', label: 'email', required: true, block: true },
    { name: 'password', type: 'password', label: 'password', required: true, block: true },
    { name: 'imgUrl', type: 'text', label: 'imgUrl', required: false, block: false },
    { name: 'imgAlt', type: 'text', label: 'imgAlt', required: false, block: false },
    { name: 'state', type: 'text', label: 'state', required: false, block: true },
    { name: 'country', type: 'text', label: 'country', required: true, block: true },
    { name: 'city', type: 'text', label: 'city', required: true, block: true },
    { name: 'street', type: 'text', label: 'street', required: true, block: true },
    { name: 'houseNumber', type: 'number', label: 'houseNumber', required: true, block: true },
    { name: 'zip', type: 'number', label: 'zip', required: false, block: true },
  ]

  export const signupSchema = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    middleName: Joi.string().min(0).max(10).empty(),
    lastName: Joi.string().min(3).max(10).required(),
    phone: Joi.string().regex(/^[0-9]{10,15}$/).messages({ 'string.pattern.base': `Phone number must have between 10-15 digits.` }).required(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/)
      .message('user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*'),
    imgUrl: Joi.string().min(0).max(50),
    imgAlt: Joi.string().min(0).max(20),
    state: Joi.string().min(0).max(20),
    country: Joi.string().min(1).required(),
    city: Joi.string().min(1).required(),
    street: Joi.string().min(1).required(),
    houseNumber: Joi.number().min(1).required(),
    zip: Joi.string().min(0),
    business: Joi.boolean().default(false),
  });

  export  const editSchema = Joi.object({
    firstName: Joi.string().min(3).max(10).required(),
    middleName: Joi.string().min(0).max(10).empty(),
    lastName: Joi.string().min(3).max(10).required(),
    phone: Joi.string().regex(/^[0-9]{10,15}$/).messages({ 'string.pattern.base': `Phone number must have between 10-15 digits.` }).required(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{9,30}$/)
        .message('user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, 4 numbers and one of the following characters !@#$%^&*'),
    imgUrl: Joi.string().min(0).max(500),
    imgAlt: Joi.string().min(0).max(20),
    state: Joi.string().min(0).max(20),
    country: Joi.string().min(1).required(),
    city: Joi.string().min(1).required(),
    street: Joi.string().min(1).required(),
    houseNumber: Joi.number().min(1).required(),
    zip: Joi.number().min(0),
    business: Joi.boolean().default(false),
});

export const cardSchema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    subtitle: Joi.string().min(0).max(25),
    description: Joi.string().min(3).max(550).required(),
    phone: Joi.string().regex(/^[0-9]{9,15}$/).messages({ 'string.pattern.base': `Phone number must have between 9-15 digits.` }).required(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    web: Joi.string().min(0).max(300),
    imgUrl: Joi.string().min(0).max(500),
    imgAlt: Joi.string().min(0).max(20),
    state: Joi.string().min(0).max(20),
    country: Joi.string().min(1).max(20).required(),
    city: Joi.string().min(1).max(20).required(),
    street: Joi.string().min(1).max(20).required(),
    houseNumber: Joi.string().min(1).max(10).required(),
    zip: Joi.string().min(0),
    id: Joi.any(),
    clientId: Joi.any(),
    createdTime: Joi.any()
  });



