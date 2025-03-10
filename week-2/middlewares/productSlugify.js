
import slugify from 'slugify';

function productSlugify(req,res){
    const {name} = req.body;
    if(name) req.body.slug = slugify(name, {lower: true});
    next();
}

export default productSlugify;