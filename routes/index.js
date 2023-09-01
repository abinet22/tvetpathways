const express = require('express');
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const passport = require('passport');
const db = require("../models");
const fs = require('fs');
const path = require("path");
const Op = db.Sequelize.Op;
const Newsphoto = require('../middleware/totphoto');
const { v4: uuidv4 } = require('uuid');

router.get('/contactus', forwardAuthenticated, async (req, res) => {
    res.render('contactus',{})
})
router.get('/', forwardAuthenticated, async (req, res) => {
   
    const category = await db.Category.findAll({ where: { is_active: 'Yes' } });
    const joblist = await db.JobList.findAll({});
    const subcategory = await db.Subcategory.findAll({ where: { is_active: 'Yes' } });
    const [categorycount,metacc] = await db.sequelize.query(`
    select categories.catname,categories.catid,count(catid) as count from joblists
    inner join categories on joblists.category = categories.catid
    group by categories.catid ,categories.catname
    `);
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

     const [subcatjoblist,metascjl] = await db.sequelize.query(`
     select subcatname,count(jobid) as count from joblists inner join
 subcategories on joblists.subcategory = subcategories.subcatid
 group by subcatname
     `);
     const [regionjoblist,metregionjl] = await db.sequelize.query(`
     select region,count(jobid) as count from joblists 
     group by region`);
     const [jobtypejoblist,joblistmetajtype] = await db.sequelize.query(
         `
         select jobtype,count(jobid) as count from joblists 
 group by jobtype`
     );
     const [jobtimejoblist,joblistmetajt] = await db.sequelize.query(`
     select jobtime,count(jobid) as count from joblists 
 group by jobtime`);
   
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
router.get('/governmental-tvetcenter-directories', forwardAuthenticated, async (req, res) =>{
const itemsPerPage = 10; // Number of items per page
const currentPage = req.query.page ? parseInt(req.query.page) : 0;
const govdirectory = await db.BusinessDirectory.findAll({where:{directorycategory:'Public_TVET_College'}})

// Calculate the slice of joblist to display for the current page
const startIndex = currentPage * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const dirforpage = govdirectory.slice(startIndex, endIndex);

res.render('government-agency-directories',{tag:'Govt Offices Directory',
directory:dirforpage,
currentPage: currentPage,
totalPages: Math.ceil(govdirectory.length / itemsPerPage),});
});
router.get('/private-tvetcenter-directories', forwardAuthenticated, async (req, res) =>{
const itemsPerPage = 10; // Number of items per page
const currentPage = req.query.page ? parseInt(req.query.page) : 0;
const govdirectory = await db.BusinessDirectory.findAll({where:{directorycategory:'Private_TVET_College'}})

// Calculate the slice of joblist to display for the current page
const startIndex = currentPage * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const dirforpage = govdirectory.slice(startIndex, endIndex);

res.render('government-agency-directories',{tag:'NOGs Offices Directory',
directory:dirforpage,
currentPage: currentPage,
totalPages: Math.ceil(govdirectory.length / itemsPerPage),});
});
router.get('/formal-tvetcenter-directories', forwardAuthenticated, async (req, res) =>{
const itemsPerPage = 10; // Number of items per page
const currentPage = req.query.page ? parseInt(req.query.page) : 0;
const govdirectory = await db.BusinessDirectory.findAll({where:{directorycategory:'Formal_TVET_College'}})

// Calculate the slice of joblist to display for the current page
const startIndex = currentPage * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const dirforpage = govdirectory.slice(startIndex, endIndex);
const subcategory = await db.Subcategory.findAll({})
res.render('tvet-centers-directories',{tag:'TVET CENTERs Directory ',
directory:dirforpage,searchbykm:0,long2:0,lati2:0,
currentPage: currentPage,subcategory:subcategory,
totalPages: Math.ceil(govdirectory.length / itemsPerPage),});
});
router.get('/nonformal-tvetcenter-directories', forwardAuthenticated, async (req, res) =>{
const itemsPerPage = 10; // Number of items per page
const currentPage = req.query.page ? parseInt(req.query.page) : 0;
const govdirectory = await db.BusinessDirectory.findAll({where:{directorycategory:'InFormal_TVET_College'}})

// Calculate the slice of joblist to display for the current page
const startIndex = currentPage * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const dirforpage = govdirectory.slice(startIndex, endIndex);
const subcategory = await db.Subcategory.findAll({})
res.render('tvet-centers-directories',{tag:'TVET CENTERs Directory ',
directory:dirforpage,searchbykm:0,long2:0,lati2:0,
currentPage: currentPage,subcategory:subcategory,
totalPages: Math.ceil(govdirectory.length / itemsPerPage),});
});
router.get('/shortterm-tvetcenter-directories', forwardAuthenticated, async (req, res) =>{
const itemsPerPage = 10; // Number of items per page
const currentPage = req.query.page ? parseInt(req.query.page) : 0;
const govdirectory = await db.BusinessDirectory.findAll({where:{directorycategory:'ShortTerm_TVET_College'}})


// Calculate the slice of joblist to display for the current page
const startIndex = currentPage * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const dirforpage = govdirectory.slice(startIndex, endIndex);
const subcategory = await db.Subcategory.findAll({})
res.render('tvet-centers-directories',{tag:'TVET CENTERs Directory ',
directory:dirforpage,searchbykm:0,long2:0,lati2:0,
currentPage: currentPage,subcategory:subcategory,
totalPages: Math.ceil(govdirectory.length / itemsPerPage),});
});
router.get('/ngos-tvetcenter-directories', forwardAuthenticated, async (req, res) =>{
const itemsPerPage = 10; // Number of items per page
const currentPage = req.query.page ? parseInt(req.query.page) : 0;
const govdirectory = await db.BusinessDirectory.findAll({where:{directorycategory:'NGO_TVET_College'}})

// Calculate the slice of joblist to display for the current page
const startIndex = currentPage * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const dirforpage = govdirectory.slice(startIndex, endIndex);
const subcategory = await db.Subcategory.findAll({})
res.render('tvet-centers-directories',{tag:'TVET CENTERs Directory ',
directory:dirforpage,searchbykm:0,long2:0,lati2:0,
currentPage: currentPage,subcategory:subcategory,
totalPages: Math.ceil(govdirectory.length / itemsPerPage),});
});


router.post('/searchtvetcenterbylocation', forwardAuthenticated, async (req, res) =>{
    const {topoccupations,lon,lat} =req.body; 
    const itemsPerPage = 10; // Number of items per page
    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    const govdirectory = await db.sequelize.query(`
    SELECT *
    FROM businessdirectories
    WHERE 
        topoccupations IN (?) AND
        ST_Distance_Sphere(
            POINT(lon, lat),
            POINT(?, ?)
        ) <= 15000
`, {
    replacements: [topoccupations, lon, lat],
    type: db.sequelize.QueryTypes.SELECT
});
console.log(govdirectory)
console.log(topoccupations)
console.log(lon)
console.log(lat)
    const subcategory = await db.Subcategory.findAll({})
    // Calculate the slice of joblist to display for the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dirforpage = govdirectory.slice(startIndex, endIndex);

    res.render('tvet-centers-directories',{tag:'TVET CENTERs Directory ',
    directory:dirforpage,searchbykm:50,subcategory:subcategory,
    currentPage: currentPage,long2:lon,lati2:lat,
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
        const trainingads = await db.ADs.findAll({});
        const subcategory = await db.Subcategory.findAll({ where: { is_active: 'Yes' } });
        const categorycount = await db.Category.findAll({ where: { is_active: 'Yes' } });
        const itemsPerPage = 10; // Number of items per page
        const currentPage = req.query.page ? parseInt(req.query.page) : 0;
        const newscat = await db.NewsCategory.findAll({});
        // Calculate the slice of joblist to display for the current page
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newsproForPage = newsandprograms.slice(startIndex, endIndex);
    
        res.render('news', {
            category: category,categorycount:categorycount,
            subcategory: subcategory,newscat:newscat,
            trainingads:trainingads,
            newsprolist: newsproForPage, // Pass the sliced joblist to the view
            currentPage: currentPage,
            totalPages: Math.ceil(newsandprograms.length / itemsPerPage)
        });
        });
        router.get('/newsdetail/(:npid)', forwardAuthenticated, async (req, res) =>{
            const category = await db.Category.findAll({ where: { is_active: 'Yes' } });
            const currentnp = await db.NewsAndPrograms.findOne({where:{npid:req.params.npid}});
            const newsandprograms = await db.NewsAndPrograms.findAll({});
            const newscat = await db.NewsCategory.findAll({});
            const subcategory = await db.Subcategory.findAll({ where: { is_active: 'Yes' } });
            const categorycount = await db.Category.findAll({ where: { is_active: 'Yes' } });
            const itemsPerPage = 10; // Number of items per page
            const currentPage = req.query.page ? parseInt(req.query.page) : 0;
            const [newtrainingprogram,nadm] = await db.sequelize.query(`
            SELECT * FROM ads
            order by createdAt desc limit 10`);
            const [topnewsbyview,mtpn] = await db.sequelize.query(`
            SELECT * FROM newsandprograms
            order by npcount desc limit 10`);
            // Calculate the slice of joblist to display for the current page
            const startIndex = currentPage * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const newsproForPage = newsandprograms.slice(startIndex, endIndex);
        
            db.NewsAndPrograms.update({npcount:parseInt(currentnp.npcount) +1},{where:{npid:req.params.npid}}).then(ads =>{
                res.render('newsdetail', {
                    newtrainingprogram:newtrainingprogram,newscat:newscat,
                    topnewsbyview:topnewsbyview,
                    category: category,categorycount:categorycount,
                    subcategory: subcategory,currentnp:currentnp,
                    newsprolist: newsproForPage, // Pass the sliced joblist to the view
                    currentPage: currentPage,
                    totalPages: Math.ceil(newsandprograms.length / itemsPerPage)
                });
            }).catch(err =>{
                res.render('newsdetail', {
                    newtrainingprogram:newtrainingprogram,newscat:newscat,
                    topnewsbyview:topnewsbyview,
                    category: category,categorycount:categorycount,
                    subcategory: subcategory,currentnp:currentnp,
                    newsprolist: newsproForPage, // Pass the sliced joblist to the view
                    currentPage: currentPage,
                    totalPages: Math.ceil(newsandprograms.length / itemsPerPage)
                });
            })
          
            });
            router.get('/adsdetail/(:adsid)', forwardAuthenticated, async (req, res) =>{
                const category = await db.Category.findAll({ where: { is_active: 'Yes' } });
                const currentnp = await db.ADs.findOne({where:{adsid:req.params.adsid}});
                const newsandprograms = await db.ADs.findAll({});
                const subcategory = await db.Subcategory.findAll({ where: { is_active: 'Yes' } });
                const categorycount = await db.Category.findAll({ where: { is_active: 'Yes' } });
                const itemsPerPage = 10; // Number of items per page
                const currentPage = req.query.page ? parseInt(req.query.page) : 0;
                const [newtrainingprogram,nadm] = await db.sequelize.query(`
                SELECT * FROM ads
                order by createdAt desc limit 10`);
                const [popularbyview,mtpn] = await db.sequelize.query(`
                SELECT * FROM ads
                order by adscount desc limit 10`);
                // Calculate the slice of joblist to display for the current page
                const startIndex = currentPage * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const newsproForPage = newsandprograms.slice(startIndex, endIndex);
            
                db.ADs.update({adscount:parseInt(currentnp.adscount) +1},{where:{adsid:req.params.adsid}}).then(ads =>{
                    res.render('adsdetail', {
                        popularbyview:popularbyview,
                        newtrainingprogram:newtrainingprogram,
                        category: category,categorycount:categorycount,
                        subcategory: subcategory,currentnp:currentnp,
                        newsprolist: newsproForPage, // Pass the sliced joblist to the view
                        currentPage: currentPage,
                        totalPages: Math.ceil(newsandprograms.length / itemsPerPage)
                    });
                }).catch(err =>{
                    res.render('adsdetail', {
                        popularbyview:popularbyview,
                        newtrainingprogram:newtrainingprogram,
                        category: category,categorycount:categorycount,
                        subcategory: subcategory,currentnp:currentnp,
                        newsprolist: newsproForPage, // Pass the sliced joblist to the view
                        currentPage: currentPage,
                        totalPages: Math.ceil(newsandprograms.length / itemsPerPage)
                    });
                })
              
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const noofjobslastsevendaya = await db.JobList.count({where: {
        deadline: {
            [Op.greaterThan]: today
        }
    }});
    const subjobcat = await db.Subcategory.findAll({});
    const [subcatjoblist,metascjl] = await db.sequelize.query(`
    select subcatname,count(jobid) as count from joblists inner join
 subcategories on joblists.subcategory = subcategories.subcatid
 group by subcatname
    `);
    const [regionjoblist,metregionjl] = await db.sequelize.query(`
    select region,count(jobid) as count from joblists 
    group by region`);
    const [jobtypejoblist,joblistmetajtype] = await db.sequelize.query(
        `
        select jobtype,count(jobid) as count from joblists 
group by jobtype`
    );
    const [jobtimejoblist,joblistmetajt] = await db.sequelize.query(`
    select jobtime,count(jobid) as count from joblists 
group by jobtime`);
  
    const [joblist,joblistmeta] = await db.sequelize.query('Select * from joblists');
    const itemsPerPage = 10; // Number of items per page
    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const jobsForPage = joblist.slice(startIndex, endIndex);

res.render('searchjob',{joblist:jobsForPage,noofjobslastsevendaya:noofjobslastsevendaya,subjobcat:subjobcat,
jobtimejoblist:jobtimejoblist,jobtypejoblist:jobtypejoblist,regionjoblist:regionjoblist,subcatjoblist:subcatjoblist,
currentPage: currentPage,
totalPages: Math.ceil(joblist.length / itemsPerPage),

});
});

router.post('/searchjob', forwardAuthenticated, async (req, res) =>{
    
    const{subcategory,lat,lon} =req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const noofjobslastsevendaya = await db.JobList.count({where: {
        deadline: {
            [Op.greaterThan]: today
        }
    }});
    const subjobcat = await db.Subcategory.findAll({});
    const [subcatjoblist,metascjl] = await db.sequelize.query(`
    select subcatname,count(jobid) as count from joblists inner join
    subcategories on joblists.subcategory = subcategories.subcatid
    group by subcatname`);
    const [regionjoblist,metregionjl] = await db.sequelize.query(`
    select region,count(jobid) as count from joblists 
    group by region`);
    const [jobtypejoblist,joblistmetajtype] = await db.sequelize.query(
        `
        select jobtype,count(jobid) as count from joblists 
group by jobtype`
    );
    const [jobtimejoblist,joblistmetajt] = await db.sequelize.query(`
    select jobtime,count(jobid) as count from joblists 
group by jobtime`);



    
if(!subcategory ||!lon || !lat){
    const [joblist, joblistmeta] = await db.sequelize.query(`
    SELECT *
    FROM joblists
   
   `);
    // Continue with your code
    console.log(lon); // Check if joblist has data
    console.log(lat);
    console.log(joblistmeta);
    const itemsPerPage = 10;
    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    
    let jobsForPage;
    let totalPages;
    const jobsArray = Array.isArray(joblist) ? joblist : [joblist];
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    jobsForPage = jobsArray.slice(startIndex, endIndex);
    totalPages = Math.ceil(jobsArray.length / itemsPerPage);
    console.log(jobsArray.length);

    res.render('searchjob',{ error_msg:'Please all required fields to search',joblist:jobsForPage,noofjobslastsevendaya:noofjobslastsevendaya,subjobcat:subjobcat,
        jobtimejoblist:jobtimejoblist,jobtypejoblist:jobtypejoblist,regionjoblist:regionjoblist,subcatjoblist:subcatjoblist,
        currentPage: currentPage,
        totalPages: Math.ceil(jobsArray.length / itemsPerPage),
        
        });
}else{
    const long = parseFloat(lon);
    const lati = parseFloat(lat);
    
    const [joblist, joblistmeta] = await db.sequelize.query(`
    SELECT *
    FROM joblists
    WHERE 
        subcategory = :subcategory AND
        ST_Distance_Sphere(
            POINT(lat, lon),
            POINT(:lati, :long)
        ) <= 50000
    `, {
    replacements: { subcategory, long, lati }
    });
    // Continue with your code
    console.log(lon); // Check if joblist has data
    console.log(lat);
    console.log(joblistmeta);
    const itemsPerPage = 10;
    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    
    let jobsForPage;
    let totalPages;
    const jobsArray = Array.isArray(joblist) ? joblist : [joblist];
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    jobsForPage = jobsArray.slice(startIndex, endIndex);
    totalPages = Math.ceil(jobsArray.length / itemsPerPage);
    console.log(jobsArray.length);

    res.render('searchjob',{joblist:jobsForPage,noofjobslastsevendaya:noofjobslastsevendaya,subjobcat:subjobcat,
        jobtimejoblist:jobtimejoblist,jobtypejoblist:jobtypejoblist,regionjoblist:regionjoblist,subcatjoblist:subcatjoblist,
        currentPage: currentPage,
        totalPages: Math.ceil(jobsArray.length / itemsPerPage),
        
        });
}



});

router.get('/searchjobbycategory/(:catid)', forwardAuthenticated, async (req, res) =>{
    const{skill,location} =req.body;
    const noofjobslastsevendaya = await db.JobList.count({});
    const subjobcat = await db.Subcategory.findAll({});
    const [subcatjoblist,metascjl] = await db.sequelize.query(`
    select subcategory,count(jobid) as count from joblists 
group by subcategory`);
    const [regionjoblist,metregionjl] = await db.sequelize.query(`
    select region,count(jobid) as count from joblists 
    group by region`);
    const [jobtypejoblist,joblistmetajtype] = await db.sequelize.query(
        `
        select jobtype,count(jobid) as count from joblists 
group by jobtype`
    );
    const [jobtimejoblist,joblistmetajt] = await db.sequelize.query(`
    select jobtime,count(jobid) as count from joblists 
group by jobtime`);
  
    const [joblist,joblistmeta] = await db.JobList.findAll({where:{category:req.params.catid}});
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
//
router.post('/sendmemessagejobsnotification',async function(req,res){
    const{profession,phonenumber,location,lat,lon} =req.body;
    const noofjobslastsevendaya = await db.JobList.count({});
    const subjobcat = await db.Subcategory.findAll({});
    const [subcatjoblist,metascjl] = await db.sequelize.query(`
    select subcategory,count(jobid) as count from joblists 
group by subcategory`);
    const [regionjoblist,metregionjl] = await db.sequelize.query(`
    select region,count(jobid) as count from joblists 
    group by region`);
    const [jobtypejoblist,joblistmetajtype] = await db.sequelize.query(
        `
        select jobtype,count(jobid) as count from joblists 
group by jobtype`
    );
    const [jobtimejoblist,joblistmetajt] = await db.sequelize.query(`
    select jobtime,count(jobid) as count from joblists 
group by jobtime`);
  
    const [joblist,joblistmeta] = await db.sequelize.query('Select * from joblists');
    const itemsPerPage = 10; // Number of items per page
    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const jobsForPage = joblist.slice(startIndex, endIndex);
    const smsnote ={
        subcatname:profession,
        location:location,
        lat:lat,
        lon:lon,
        phonenumber:phonenumber
    }
   db.SendSMSMessage.create(smsnote).then(smsnotes =>{
    res.render('searchjob',{joblist:joblist,noofjobslastsevendaya:noofjobslastsevendaya,subjobcat:subjobcat,
        jobtimejoblist:jobtimejoblist,jobtypejoblist:jobtypejoblist,regionjoblist:regionjoblist,subcatjoblist:subcatjoblist,
        currentPage: currentPage,
        totalPages: Math.ceil(joblist.length / itemsPerPage),
        
        });
   }).catch(err =>{
    res.render('searchjob',{joblist:joblist,noofjobslastsevendaya:noofjobslastsevendaya,subjobcat:subjobcat,
        jobtimejoblist:jobtimejoblist,jobtypejoblist:jobtypejoblist,regionjoblist:regionjoblist,subcatjoblist:subcatjoblist,
        currentPage: currentPage,
        totalPages: Math.ceil(joblist.length / itemsPerPage),
        
        });
   })

})
router.post('/sendcontactmsg', forwardAuthenticated, async (req, res) => {
    const{phonenumber,message,fullname,email} =req.body
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
     const contatus ={
        message:message,
        phonenumber:phonenumber,
        fullname:fullname,
        email:email
     }
     if(!message || !phonenumber || !fullname){
        res.render('index', {
            category: category,categorycount:categorycount,
            subcategory: subcategory,
            joblist: jobsForPage, // Pass the sliced joblist to the view
            currentPage: currentPage,
            totalPages: Math.ceil(joblist.length / itemsPerPage)
        });
     }else{
        db.ContactUs.create(contatus).then(cus =>{
            res.render('index', {
                category: category,categorycount:categorycount,
                subcategory: subcategory,
                joblist: jobsForPage, // Pass the sliced joblist to the view
                currentPage: currentPage,
                totalPages: Math.ceil(joblist.length / itemsPerPage)
            });
         }).catch(err =>{
            res.render('index', {
                category: category,categorycount:categorycount,
                subcategory: subcategory,
                joblist: jobsForPage, // Pass the sliced joblist to the view
                currentPage: currentPage,
                totalPages: Math.ceil(joblist.length / itemsPerPage)
            });
         })
     }

  
});
router.post('/applyforthejob/(:jobid)',Newsphoto.single('cvupload'),async function(req,res){

    const {lat,lon,aboutyou,subcategory,name,phonenumber} = req.body
    
    const itemsPerPage = 10; // Number of items per page
    const currentPage = req.query.page ? parseInt(req.query.page) : 0;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
   
    const joblist = await db.JobList.findOne({where:{jobid:req.params.jobid}});
     const subjobcat = await db.Subcategory.findAll({});
     const simmilarjobs = await db.JobList.findAll({where:{subcategory:joblist.subcategory}})
     const jobsForPage = simmilarjobs.slice(startIndex, endIndex);

     const [subcatjoblist,metascjl] = await db.sequelize.query(`
     select subcatname,count(jobid) as count from joblists inner join
 subcategories on joblists.subcategory = subcategories.subcatid
 group by subcatname
     `);
     const [regionjoblist,metregionjl] = await db.sequelize.query(`
     select region,count(jobid) as count from joblists 
     group by region`);
     const [jobtypejoblist,joblistmetajtype] = await db.sequelize.query(
         `
         select jobtype,count(jobid) as count from joblists 
 group by jobtype`
     );
     const [jobtimejoblist,joblistmetajt] = await db.sequelize.query(`
     select jobtime,count(jobid) as count from joblists 
 group by jobtime`);
  let errors =[];

  if(!req.file){
    errors.push({msg:'Please add your CV file '}) 
  }
  if(!lon || !lat || !phonenumber || !name || !subcategory || !aboutyou){
    errors.push({msg:'Please enter all required fields '}) 
  }
  if(errors.length >0){
    console.log(errors);
    res.render('viewdetailjob',{joblist:joblist,
        subjobcat:subjobcat,
        simillarjobs: jobsForPage, // Pass the sliced joblist to the view
        currentPage: currentPage,
        totalPages: Math.ceil(simmilarjobs.length / itemsPerPage),
        jobtimejoblist:jobtimejoblist,jobtypejoblist:jobtypejoblist,regionjoblist:regionjoblist,subcatjoblist:subcatjoblist});

  }else{
    db.JobList.findOne({where:{jobid:req.params.jobid}}).then(job =>{
        if(job){
            const application ={
                appid:uuidv4(),
                lat:lat,
                lon:lon,
                aboutyou:aboutyou,
                subcategory:subcategory,
                name:name,
                phonenumber:phonenumber,
                jobapplyied:job.jobtitle,
                jobid:req.params.jobid,
                applicantcv: fs.readFileSync(
                    path.join(__dirname,'../public/uploads/') + req.file.filename
                  ),
            }
            console.log(application);
            db.JobApplications.create(application).then(appn =>{
                res.render('viewdetailjob',{joblist:joblist,
               
                    subjobcat:subjobcat,
                    simillarjobs: jobsForPage, // Pass the sliced joblist to the view
                    currentPage: currentPage,
                    totalPages: Math.ceil(simmilarjobs.length / itemsPerPage),
                    jobtimejoblist:jobtimejoblist,jobtypejoblist:jobtypejoblist,regionjoblist:regionjoblist,subcatjoblist:subcatjoblist});
       
            }).catch(err =>{
                res.render('viewdetailjob',{joblist:joblist,
               
                    subjobcat:subjobcat,
                    simillarjobs: jobsForPage, // Pass the sliced joblist to the view
                    currentPage: currentPage,
                    totalPages: Math.ceil(simmilarjobs.length / itemsPerPage),
                    jobtimejoblist:jobtimejoblist,jobtypejoblist:jobtypejoblist,regionjoblist:regionjoblist,subcatjoblist:subcatjoblist});
       
            })
                       
        }else{
            res.render('viewdetailjob',{joblist:joblist,
               
                subjobcat:subjobcat,
                simillarjobs: jobsForPage, // Pass the sliced joblist to the view
                currentPage: currentPage,
                totalPages: Math.ceil(simmilarjobs.length / itemsPerPage),
                jobtimejoblist:jobtimejoblist,jobtypejoblist:jobtypejoblist,regionjoblist:regionjoblist,subcatjoblist:subcatjoblist});
                
        }
        }).catch(err =>{
            res.render('viewdetailjob',{joblist:joblist,
               
                subjobcat:subjobcat,
                simillarjobs: jobsForPage, // Pass the sliced joblist to the view
                currentPage: currentPage,
                totalPages: Math.ceil(simmilarjobs.length / itemsPerPage),
                jobtimejoblist:jobtimejoblist,jobtypejoblist:jobtypejoblist,regionjoblist:regionjoblist,subcatjoblist:subcatjoblist});
                
        })
  }

});
module.exports = router; 