const express = require('express');
const router = express.Router();
const Link = require('../models/link');
const shortid = require('shortid');

//Sending the original (long) link
router.post('/short', async (req, res) => {
    const {link} = req.body;
    
    try {
        //check in db
        let url = await Link.findOne({link});
        //if yes - return existing link
        if (url) {
            return res.json(url);
        } else {
            //if no - generate new link
            const code = shortid.generate();
            const shortUrl = `localhost:3000/links/${code}`;
            url = new Link({
                code,
                source: link,
                short: shortUrl
            });
            //save in db and return
            await url.save();
            return res.json(url);
        }
    } catch (err) {
        return res.status(500).json({ status: 500, message: JSON.stringify(err) });
    };
});

router.get('/:code', async (req, res) => {    
    const {code} = req.params;    
    // Find code in db
    const link = await Link.findOne({code});
    //  if exists - redirect using link
    if (link) {
        return res.redirect(link.source);
    }
    //if no - return 404
    return res.status(404).json({ status: 404, message: 'Link not found' });

});

module.exports = router;