const express = require('express');
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const passport = require('passport');
const db = require("../models");
const path = require("path");
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require('uuid');
router.get('/', forwardAuthenticated, async (req, res) =>{
    const category = await db.Category.findAll({where:{is_active:'Yes'}})
    const subcategory =await  db.Subcategory.findAll({where:{is_active:'Yes'}})
res.render('index',{category:category,subcategory:subcategory});
});

              
                                
router.get('/login', forwardAuthenticated, async (req, res) =>{
res.render('login');
});
router.get('/government-agency-directories', forwardAuthenticated, async (req, res) =>{
    res.render('government-agency-directories');
    });

    router.get('/viewdetaildirectoryinfo', forwardAuthenticated, async (req, res) =>{
        res.render('directorydetail');
        });
    router.get('/news', forwardAuthenticated, async (req, res) =>{
        res.render('news');
        });
router.get('/searchjob', forwardAuthenticated, async (req, res) =>{
    res.render('searchjob');
    });
    
router.get('/viewdetailjob', forwardAuthenticated, async (req, res) =>{
    res.render('viewdetailjob');
    });
    
// Logout
router.get('/logout', (req, res) => {
req.logout();
req.flash('success_msg', 'You are logged out');
res.redirect('/login')

})

// Post Routers 
router.post('/login', (req, res, next) => {


passport.authenticate('local', {
successRedirect: '/dashboard',
failureRedirect: '/login',
failureFlash: true

})(req, res, next);
});
module.exports = router;