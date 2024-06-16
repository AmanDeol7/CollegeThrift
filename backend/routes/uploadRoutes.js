import path from "path"
import express from 'express'
import multer from "multer" //used for handling file uploads 


const router = express.Router();

const storage = multer.diskStorage({ //multer configuration
    destination: (req, file, cb)=>{
        cb(null, "uploads/") // where the file should be stored
    },
    filename:(req, file, cb)=>{ // how the file should be named
        const extname = path.extname(file.originalname) //extracting the extension name of the file
        cb(null, `${file.fieldname}-${Date.now()}${extname}`)  //field name is the name of the file input field
    }
})

const fileFilter = (req,file,cb)=>{
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    if(filetypes.test(extname) && mimetypes.test(mimetype)){
         cb(null, true)
        }
        else{

                cb(new Error("Only images are allowed") , false)
        }
}

const upload = multer({
    storage, fileFilter
})

const uploadSingleImage = upload.single("image");



router.post("/", (req,res) => {
    uploadSingleImage(req,res,(err) =>{
        if(err){
            res.status(400).json({message: err.message})

        }
        else if (req.file){
            res.status(200).send({
                message: "Image uploaded successfully",
                image: `/${req.file.path}`,
                
            })
        }
        else{
            res.status(400).json({message: "No image uploaded"});

        }
    })
})

export default router