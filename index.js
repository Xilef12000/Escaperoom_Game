import mime from 'mime';
import express from 'express'
import * as fs from 'fs';
const app = express();
app.set('view engine', 'ejs');


app.get('*', async (req, res) => {
    try {
        var url = req.originalUrl;
        console.log(url)

        // trim trailing '/'
        var end = url.length;
        while(end > 0 && url[end - 1] === '/')
            --end;
        url = url.substring(0, end);

        if ( url == '') { // set to index if emty
            url = '/index';
        }
        var fileType = mime.getType(url.split('.').at(-1))
        console.log(fileType)
        if (!fileType && fs.existsSync('./views/ejs/' + url + '.ejs')) { // if fileType == Null and .ejs file exists
            res.render('ejs/' + url); //render page
        }
        else if (fs.existsSync('./views/' + url)){ // if file exists as other asset
            if (fileType.split('/')[0] == 'text') { // if file extension of url is text file
                res.contentType(fileType).send( fs.readFileSync('./views/' + url, 'utf8') );
            }
            else { // else asume binary
                res.contentType(fileType).send( fs.readFileSync('./views/' + url) );
            }
        }
        else { // else show 404 error
            res.status(404).render('ejs/404');
            //res.status(200).render('ejs/404');
        }
    }
    catch (e) {
        console.error(e);
        res.status(500);
    };
});

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`))