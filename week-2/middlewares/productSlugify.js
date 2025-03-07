
import slugify from 'slugify';

function productSlugify(req,res){
    const {name} = req.body;
    req.body.slug = slugify(name, {lower: true});
    next();
}

export default productSlugify;