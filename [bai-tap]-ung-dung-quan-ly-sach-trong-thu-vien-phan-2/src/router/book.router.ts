import {Router} from 'express';

const bookRoutes = Router();
import {bookModel} from "../schemas/book.model";
import multer from 'multer';

import {publisherSchema, publisherModel} from "../schemas/publisher.model";
import {categorySchema, categoryModel} from "../schemas/category.model";
import {keywordsSchema, keywordsModel} from "../schemas/keyword.model"


const upload = multer();

bookRoutes.get('/create', (req, res) => {
    res.render("createBook");
});

bookRoutes.post('/create', upload.none(), async (req, res) => {
    try {
        // tạo 1 model publisher mới
        const publisher = new publisherModel({
            name: req.body.publisher
        });

        // tạo 1 model category mới
        const category = new categoryModel({
            type: req.body.category
        });


        // tạo mới một model keyword
        const keyword = new keywordsModel({
            keyword: req.body.keyword
        })

        console.log(keyword)
        const newBook = new bookModel({
            title: req.body.title,
            author: req.body.author,
            category: category._id,
            publisher: publisher._id,
            keywords: [keyword]
        })
        // lưu lần lượt các model
        const p1 = publisher.save();
        const p2 = category.save();
        const p3 = newBook.save();
        // sử dụng Promise.all() để khiến tất cả cùng thực thi, chỉ cần 1 cái lỗi sẽ báo lỗi ngay
        const [publisherReturn, categoryReturn, book] = await Promise.all([p1, p2, p3])
        if (book) {
            res.render("success");
        } else {
            res.render("error");
        }
    } catch (err) {
        console.log(err.message);
        res.render("error");
    }
});

bookRoutes.post('/update/:id', upload.none(), async (req, res) => {
    try {
        const book = await bookModel.findOne({_id: req.body.id});
        book.title = req.body.title;
        book.description = req.body.description;
        // tìm và cập nhật lại author (id của autho chính là giá trị trường book.author)
        const author = await bookModel.findOne({_id: book.author})
        author.name = req.body.author;
        await author.save();
        // sau khi save author xong thì có thể save book
        await book.save();
        if (book) {
            res.render("success");
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});
bookRoutes.get('/list', async (req, res) => {
    try {
        let query = {};
        let keywordFind = req.query.keyword || "";
        let publisherFind = req.query.publisher || "";
        let categoryFind = req.query.category || "";

        let publisherID = await publisherModel.find({name: {$regex: publisherFind, $options: "gim"}}, {"_id": 1})
        // console.log(publisherID)
        query = {"keywords.keyword": {$regex: keywordFind, $options: "gim"}, "publisher": {$in: publisherID}}


        const categories = await categoryModel.find({});
        let categoriesId = categories.map((category) => {
            return {"_id": category["_id"]}
        })

        // kiểm tra xem category có nằm trong danh sách hay không

        for (const category of categoriesId) {
            if (String(category._id) === categoryFind) {
                query["category"] = categoryFind;
                break;
            }
        }

        if (!query["category"]) {

        }
        // if (categoryFind) {
        //
        //     query["category"] = categoryFind;
        //     console.log(categoryFind)
        //     // console.log(query)
        // }


        // console.log(categories)


        const books = await bookModel.find(query).populate([{path: "publisher", select: "name"}, {
            path: "category",
            select: "type"
        }]);
        // dùng populate để join auhtor từ bên collection author, sang bên books, chỉ lấy trường name
        res.render("listBook", {books: books, keywordFind, publisherFind, categories});

    } catch (err) {
        console.log(err.message);
        res.render("error");
    }
});


export default bookRoutes;
