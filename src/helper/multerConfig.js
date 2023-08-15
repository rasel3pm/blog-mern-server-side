const multer = require("multer")

const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,file.fieldname, +'_'+ uniqueSuffix)
    }
})
    //file filtering option
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else {
        cb({ message: "Unsupported file format" }, false);
    }
}
const upload = multer({
    storage:storage,
    limits:{fileSize : 1024 * 1024},
    fileFilter:fileFilter
})
module.exports=upload