const express = require('express');
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const passport = require('passport');
const db = require("../models");
const path = require("path");
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require('uuid');
router.get('/', forwardAuthenticated, async (req, res) => {
   
    const category = await db.Category.findAll({ where: { is_active: 'Yes' } });
    const joblist = await db.JobList.findAll({});
    const subcategory = await db.Subcategory.findAll({ where: { is_active: 'Yes' } });
    const categorycount = await db.Category.findAll({ where: { is_active: 'Yes' } });
    const itemsPerPage = 10; // Number of items per page
    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    
    // Calculate the slice of joblist to display for the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const jobsForPage = joblist.slice(startIndex, endIndex);

    res.render('index', {
        category: category,categorycount:categorycount,
        subcategory: subcategory,
        joblist: jobsForPage, // Pass the sliced joblist to the view
        currentPage: currentPage,
        totalPages: Math.ceil(joblist.length / itemsPerPage)
    });
});

    
router.get('/viewdetailjob/(:jobid)', forwardAuthenticated, async (req, res) =>{

    const itemsPerPage = 10; // Number of items per page
    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
   

    const joblist = await db.JobList.findOne({where:{jobid:req.params.jobid}});
     const subjobcat = await db.Subcategory.findAll({});
     const simmilarjobs = await db.JobList.findAll({where:{subcategory:joblist.subcategory}})
     const jobsForPage = simmilarjobs.slice(startIndex, endIndex);


    const [subcatjoblist,metascjl] = await db.sequelize.query('Select * from subcategories');
    const [regionjoblist,metregionjl] = await db.sequelize.query('Select * from joblists');
    const [jobtypejoblist,joblistmetajtype] = await db.sequelize.query('Select * from joblists');
    const [jobtimejoblist,joblistmetajt] = await db.sequelize.query('Select * from joblists');
    res.render('viewdetailjob',{joblist:joblist,
       
        subjobcat:subjobcat,
        simillarjobs: jobsForPage, // Pass the sliced joblist to the view
        currentPage: currentPage,
        totalPages: Math.ceil(simmilarjobs.length / itemsPerPage),
        jobtimejoblist:jobtimejoblist,jobtypejoblist:jobtypejoblist,regionjoblist:regionjoblist,subcatjoblist:subcatjoblist});
    });

router.get('/aboutus', forwardAuthenticated, async (req, res) =>{
    res.render('aboutus');
    });
              
                                
router.get('/login', forwardAuthenticated, async (req, res) =>{
res.render('login');
});
router.get('/signup', forwardAuthenticated, async (req, res) =>{
    const subjobcat = await db.Subcategory.findAll({})
    res.render('signup',{subjobcat:subjobcat});
    });
router.get('/government-agency-directories', forwardAuthenticated, async (req, res) =>{
    const itemsPerPage = 10; // Number of items per page
    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    const govdirectory = await db.BusinessDirectory.findAll({where:{directorycategory:'govt'}})
   
    // Calculate the slice of joblist to display for the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dirforpage = govdirectory.slice(startIndex, endIndex);

    res.render('government-agency-directories',{tag:'Govt Offices Directory',
    directory:dirforpage,
    currentPage: currentPage,
    totalPages: Math.ceil(govdirectory.length / itemsPerPage),});
    });
    router.get('/ngo-agency-directories', forwardAuthenticated, async (req, res) =>{
        const itemsPerPage = 10; // Number of items per page
        const currentPage = req.query.page ? parseInt(req.query.page) : 0;
        const govdirectory = await db.BusinessDirectory.findAll({where:{directorycategory:'nongovt'}})
       
        // Calculate the slice of joblist to display for the current page
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const dirforpage = govdirectory.slice(startIndex, endIndex);
    
        res.render('government-agency-directories',{tag:'NOGs Offices Directory',
        directory:dirforpage,
        currentPage: currentPage,
        totalPages: Math.ceil(govdirectory.length / itemsPerPage),});
        });
        router.get('/tvet-center-directories', forwardAuthenticated, async (req, res) =>{
            const itemsPerPage = 10; // Number of items per page
            const currentPage = req.query.page ? parseInt(req.query.page) : 0;
            const govdirectory = await db.BusinessDirectory.findAll({where:{directorycategory:'tvet'}})
           
            // Calculate the slice of joblist to display for the current page
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const dirforpage = govdirectory.slice(startIndex, endIndex);
        
            res.render('tvet-centers-directories',{tag:'TVET CENTERs Directory ',
            directory:dirforpage,searchbykm:0,
            currentPage: currentPage,
            totalPages: Math.ceil(govdirectory.length / itemsPerPage),});
            });
            router.post('/searchtvetcenterbylocation', forwardAuthenticated, async (req, res) =>{
                const {location,lon,lat} =req.body; 
                const itemsPerPage = 10; // Number of items per page
                const currentPage = req.query.page ? parseInt(req.query.page) : 0;
                const govdirectory = await db.BusinessDirectory.findAll({where:{directorycategory:'tvet'}})
               
                // Calculate the slice of joblist to display for the current page
                const startIndex = currentPage * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const dirforpage = govdirectory.slice(startIndex, endIndex);
            
                res.render('tvet-centers-directories',{tag:'TVET CENTERs Directory ',
                directory:dirforpage,searchbykm:50,
                currentPage: currentPage,
                totalPages: Math.ceil(govdirectory.length / itemsPerPage),});
                });
    router.get('/viewdetaildirectoryinfo/(:bdid)', forwardAuthenticated, async (req, res) =>{
        const govdirectory = await db.BusinessDirectory.findOne({where:{bdid:req.params.bdid}})
          console.log(govdirectory)
        res.render('directorydetail',{directory:govdirectory});
        });
    router.get('/news', forwardAuthenticated, async (req, res) =>{
        const category = await db.Category.findAll({ where: { is_active: 'Yes' } });
        const newsandprograms = await db.NewsAndPrograms.findAll({});
        const subcategory = await db.Subcategory.findAll({ where: { is_active: 'Yes' } });
        const categorycount = await db.Category.findAll({ where: { is_active: 'Yes' } });
        const itemsPerPage = 10; // Number of items per page
        const currentPage = req.query.page ? parseInt(req.query.page) : 0;
        
        // Calculate the slice of joblist to display for the current page
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newsproForPage = newsandprograms.slice(startIndex, endIndex);
    
        res.render('news', {
            category: category,categorycount:categorycount,
            subcategory: subcategory,
            newsprolist: newsproForPage, // Pass the sliced joblist to the view
            currentPage: currentPage,
            totalPages: Math.ceil(newsandprograms.length / itemsPerPage)
        });
        });
        router.get('/newsdetail/(:npid)', forwardAuthenticated, async (req, res) =>{
            const category = await db.Category.findAll({ where: { is_active: 'Yes' } });
            const currentnp = await db.NewsAndPrograms.findOne({where:{npid:req.params.npid}});
            const newsandprograms = await db.NewsAndPrograms.findAll({});
            const subcategory = await db.Subcategory.findAll({ where: { is_active: 'Yes' } });
            const categorycount = await db.Category.findAll({ where: { is_active: 'Yes' } });
            const itemsPerPage = 10; // Number of items per page
            const currentPage = req.query.page ? parseInt(req.query.page) : 0;
            
            // Calculate the slice of joblist to display for the current page
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const newsproForPage = newsandprograms.slice(startIndex, endIndex);
        
            res.render('newsdetail', {
                category: category,categorycount:categorycount,
                subcategory: subcategory,currentnp:currentnp,
                newsprolist: newsproForPage, // Pass the sliced joblist to the view
                currentPage: currentPage,
                totalPages: Math.ceil(newsandprograms.length / itemsPerPage)
            });
            });
        router.get('/blog', forwardAuthenticated, async (req, res) =>{
            const category = await db.Category.findAll({ where: { is_active: 'Yes' } });
            const bloglist = await db.BLOG.findAll({});
            const subcategory = await db.Subcategory.findAll({ where: { is_active: 'Yes' } });
            const categorycount = await db.Category.findAll({ where: { is_active: 'Yes' } });
            const itemsPerPage = 10; // Number of items per page
            const currentPage = req.query.page ? parseInt(req.query.page) : 0;
            
            // Calculate the slice of joblist to display for the current page
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const blogproForPage = bloglist.slice(startIndex, endIndex);
        
            res.render('blog', {
                category: category,categorycount:categorycount,
                subcategory: subcategory,
                mybloglist: blogproForPage, // Pass the sliced joblist to the view
                currentPage: currentPage,
                totalPages: Math.ceil(bloglist.length / itemsPerPage)
            });
            });
            router.get('/blogdetail/(:adsid)', forwardAuthenticated, async (req, res) =>{
                const category = await db.Category.findAll({ where: { is_active: 'Yes' } });
                const currentblog = await db.BLOG.findOne({where:{adsid:req.params.adsid}});
                const mybloglist = await db.BLOG.findAll({});
                const subcategory = await db.Subcategory.findAll({ where: { is_active: 'Yes' } });
                const categorycount = await db.Category.findAll({ where: { is_active: 'Yes' } });
                const itemsPerPage = 10; // Number of items per page
                const currentPage = req.query.page ? parseInt(req.query.page) : 0;
                
                // Calculate the slice of joblist to display for the current page
                const startIndex = currentPage * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const blogforpage = mybloglist.slice(startIndex, endIndex);
            
                res.render('blogdetail', {
                    category: category,categorycount:categorycount,
                    subcategory: subcategory,currentblog:currentblog,
                    mybloglist: blogforpage, // Pass the sliced joblist to the view
                    currentPage: currentPage,
                    totalPages: Math.ceil(mybloglist.length / itemsPerPage)
                });
                });
router.get('/searchjob', forwardAuthenticated, async (req, res) =>{
    const noofjobslastsevendaya = await db.JobList.count({});
    const subjobcat = await db.Subcategory.findAll({});
    const [subcatjoblist,metascjl] = await db.sequelize.query('Select * from joblists');
    const [regionjoblist,metregionjl] = await db.sequelize.query('Select * from joblists');
    const [jobtypejoblist,joblistmetajtype] = await db.sequelize.query('Select * from joblists');
    const [jobtimejoblist,joblistmetajt] = await db.sequelize.query('Select * from joblists');
  
    const [joblist,joblistmeta] = await db.sequelize.query('Select * from joblists');
    const itemsPerPage = 10; // Number of items per page
    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const jobsForPage = joblist.slice(startIndex, endIndex);

res.render('searchjob',{joblist:joblist,noofjobslastsevendaya:noofjobslastsevendaya,subjobcat:subjobcat,
jobtimejoblist:jobtimejoblist,jobtypejoblist:jobtypejoblist,regionjoblist:regionjoblist,subcatjoblist:subcatjoblist,
currentPage: currentPage,
totalPages: Math.ceil(joblist.length / itemsPerPage),

});
});

router.post('/searchjob', forwardAuthenticated, async (req, res) =>{
    const{skill,location} =req.body;
    const noofjobslastsevendaya = await db.JobList.count({});
    const subjobcat = await db.Subcategory.findAll({});
    const [subcatjoblist,metascjl] = await db.sequelize.query('Select * from joblists');
    const [regionjoblist,metregionjl] = await db.sequelize.query('Select * from joblists');
    const [jobtypejoblist,joblistmetajtype] = await db.sequelize.query('Select * from joblists');
    const [jobtimejoblist,joblistmetajt] = await db.sequelize.query('Select * from joblists');
  
    const [joblist,joblistmeta] = await db.sequelize.query('Select * from joblists');
    const itemsPerPage = 10; // Number of items per page
    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const jobsForPage = joblist.slice(startIndex, endIndex);

res.render('searchjob',{joblist:joblist,noofjobslastsevendaya:noofjobslastsevendaya,subjobcat:subjobcat,
jobtimejoblist:jobtimejoblist,jobtypejoblist:jobtypejoblist,regionjoblist:regionjoblist,subcatjoblist:subcatjoblist,
currentPage: currentPage,
totalPages: Math.ceil(joblist.length / itemsPerPage),

});
});

router.get('/searchjobbycategory/(:catid)', forwardAuthenticated, async (req, res) =>{
    const{skill,location} =req.body;
    const noofjobslastsevendaya = await db.JobList.count({});
    const subjobcat = await db.Subcategory.findAll({});
    const [subcatjoblist,metascjl] = await db.sequelize.query('Select * from joblists');
    const [regionjoblist,metregionjl] = await db.sequelize.query('Select * from joblists');
    const [jobtypejoblist,joblistmetajtype] = await db.sequelize.query('Select * from joblists');
    const [jobtimejoblist,joblistmetajt] = await db.sequelize.query('Select * from joblists');
  
    const [joblist,joblistmeta] = await db.sequelize.query('Select * from joblists');
    const itemsPerPage = 10; // Number of items per page
    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const jobsForPage = joblist.slice(startIndex, endIndex);

res.render('searchjob',{joblist:joblist,noofjobslastsevendaya:noofjobslastsevendaya,subjobcat:subjobcat,
jobtimejoblist:jobtimejoblist,jobtypejoblist:jobtypejoblist,regionjoblist:regionjoblist,subcatjoblist:subcatjoblist,
currentPage: currentPage,
totalPages: Math.ceil(joblist.length / itemsPerPage),

});
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