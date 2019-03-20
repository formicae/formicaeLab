const router = require('express').Router();
const User = require('../schema/users');
// User.find({}).then(result=>{
//     console.log('/user result : ',result)
// });
router.get('/', (req, res, next) => {
    let userData = {};
    User.find({}).then(result =>{
            result.forEach(each => {
                userData[each.username] = {
                    username:each.username,
                    _id : each._id,
                    info : each.info,
                    activated : each.activated,
                    created : each.created
                }
            });
            res.render('../views/user.ejs', {title:"User information", userData:userData});
        });
});

router.post('/', (req, res, next) => {
    const data = req.body;
    console.log(`transferred data to /user : ${req.body}`);
});

module.exports = router;