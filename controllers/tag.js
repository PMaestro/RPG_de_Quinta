const mongoose = require('mongoose');

const Tag = require('../models/tag');
/* const Tag = mongoose.model('Tag'); */

module.exports = {
    async listAll(req, res) {
        const tag = await Tag.find();
        return res.json(tag);
    },
    async tagCreate(req, res) {
        const tagToBeCreated = {
            name: req.body.name,
            description: req.body.description
        }

        try {
            const tagExist = await Tag.find({ name: tagToBeCreated.name });
            if (tagExist.length == 0) {
                const tag = await Tag.create(req.body);
                return res.json({ message: 'Tag cadastrada', tag });
            } else {
                return res.json({ message: 'Tag já cadastrada', tagExist });
            }
        } catch (error) {
            console.log(error);
        }
    },
    async findTag(req, res) {
        const tag = await Tag.findById(req.params.id);
        return res.json(tag);
    },
    async updateTag(req, res) {
        const tag = await Tag.findById(req.params.id);
        tag.name = req.body.name;
        tag.description = req.body.description;
        const updatedTag = tag.save();
        return res.json(updatedTag);

    },
    async deleteTag(req, res) {
        const tag = await Tag.findByIdAndDelete(req.body.id);
        return res.json(`Usuario ${tag.name} deletado`);
    },
    async listPostWithTag(req, res) {
        try {
            const posts = await Tag.find().populate('postsId');
            return res.json({ message: 'The post with this tag are: ' }, posts);
        } catch (error) {
            console.log(error);
            return res.json({message: 'erro during fetch posts!'})
        }

    }
};