import Post from "../DB Models/post-DB.js"
import express from 'express'
const router = express.Router()

//POST a post (Make post)
router.post("/",async (req,res)=> {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({message: error.message});
    }  
})

//GET all posts (See whole feed)
router.get("/", async (req,res) => {
    try {
        const posts = await Post.find().sort({createdAt:-1});//Newest posts first
        res.json(posts);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
})

//DELETE post by id (DYnamic id should be the last route)
router.delete("/:id", async (req,res)=> {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({message: "Post not found"});
        }

        console.log("Successful");
         res.status(200).json({message: "Post deleted successfully"});
    } catch (error){
        res.status(500).json({message:error.message});
    }
    
});

export default router;
