---
tags: 學習
---

# NodeJS架設Web服務
NodeJS生態倚賴許多NPM中的套件庫，可以用來協助架設各種Web服務，以下是架設過程的紀錄。

[Github](https://github.com/lian0103/NodeAPI)

## 目錄結構
```
│  .env
│  .env.example
│  .gitignore
│  package-lock.json
│  package.json
│  server.js
│  sql.sql
│  
├─config
│      db.js
│      
├─controllers
│      fileController.js
│      postControllers.js
│      
├─helpers
│      httpLogger.js
│      logger.js
│      mail.js
│      
├─logs
│      error.log
│      info.log
│      
├─models
│      Post.js
│      
├─node_modules
│      
├─routes
│      fileRoutes.js
│      postRoutes.js
│      
├─uploadFiles
│      ccc.jpg
│      
└─views
        uploadFile.ejs
```

## 串接MySQL
本地安裝MySQL。在安裝成功後，可以先使用workbench做連線測試，這組資訊記錄下來之後要讓Node做連線使用。

- 連線測試
![](https://i.imgur.com/lC9qWYd.jpg)
![](https://i.imgur.com/XB5c2Bt.jpg)

- 建立Post表的欄位與資料

![](https://i.imgur.com/OrOogrN.jpg)


- config/db.js

[NPM mysql2](https://www.npmjs.com/package/mysql2)

```
()=>{

require("dotenv").config(); //藉此讀取.env的參數
const mysql = require('mysql2'); //連線資料庫所使用的套件

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});
}

module.exports = pool.promise();//支持非同步處理的連線池物件

```

- .env檔
```shell=
# DATABASE CONNECTION ENVIRONMENT VARIABLES
DB_HOST=localhost
DB_USER=root
DB_NAME=blog-app
DB_PASSWORD=root
DB_PORT=3306
```


- models/Post.js
建立一個資料類的Model，並實作資料操作的方法，如CRUD。這同時是透過mysql2的API，來執行sql指令。

```
const db = require('../config/db');
class Post {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }

  save() {
    let date = new Date();
    let created_at = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    
    //新增1筆3個欄位的資料
    let sql = `
            INSERT INTO posts(
                title,
                body,
                created_at
            )
            VALUES(
                '${this.title}',
                '${this.body}',
                '${created_at}'
            )
        
        `;
    return db.execute(sql);//會回傳1個Promise物件
}
```
## 開API
透過NodeJs Express所啟動的Web服務，連線的網域於 http://localhost:3000
並可監聽來訪請求的路徑與HTTP連線方法(GET、POST、UPDATE、DELTE..)對應。

- server.js
```
//...(略)
app.use('/posts', require('./routes/postRoutes'));

```
- routes/postRoutes.js
```
const express = require('express');
const postControllers = require('../controllers/postControllers')
const router = express.Router();

router.route("/").get(postControllers.getAllPosts);

router.route("/").post(postControllers.createNewPost);

router.route("/:id").get(postControllers.getPostById);

module.exports = router;
}
```


- Postman測試連線
GET方法與路徑/posts，則可對應去呼叫控制層的資料操作方法，並透過exprss路由的回傳物件將資料回傳。

```
//postControllers.js
const Post = require('../models/Post');

exports.getAllPosts = async (req, res, next) => {
  try {
    const [posts] = await Post.findAll();

    res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
```


GET  /posts

![](https://i.imgur.com/cjUhayn.jpg)


## 上傳檔案
- 使用套件
[formidable](https://www.npmjs.com/package/formidable)
[mv](https://www.npmjs.com/package/mv)

使用表單物件和POST方法傳送檔案，formidable可做為中間層把檔案的資訊做解析。解析後的結果，再利用mv做搬運。

- fileController.js
```
const formidable = require('formidable');
const mv = require('mv');
const path = require('path');
const fs = require('fs');

exports.uploadFile = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    const uploadPath = path.join(process.cwd(), 'uploadFiles');//自訂的檔案存放路徑

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync('uploadFiles');
    }

    const filename = fields.fileName
      ? `${fields.fileName}.${
          files.filetoupload.originalFilename.split('.')[1]
        }`
      : files.filetoupload.originalFilename;//有輸入自訂檔名欄位時使用自訂檔名
    const oldpath = files.filetoupload.filepath;
    const newpath = path.join(uploadPath, filename);
    
    //這個部分之後再比較把圖片檔File轉base64做法的差異
    mv(oldpath, newpath, function (err) {
      if (err) {
        throw err;
        next();
      }
      res.write(`File uploaded and moved to ${newpath}`);
      res.end();
    });
  });
};


```
## 取得檔案

[Express SendFile API](http://expressjs.com/zh-tw/api.html#res.sendFile)

- fileController.js
```

exports.getFile = async (req, res, next) => {
  const fileName = req.params.fileName;
  const options = {
    root: path.join(process.cwd(), 'uploadFiles'),
  };

  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(new Error('無此檔案'));
    }
  });
};

```

- 取得結果

GET /file/:fileName

![](https://i.imgur.com/0eSrCho.jpg)


## 寄送郵件
- helpers/mail.js

支持SMTP、Gmail發送的套件
[nodemailer](https://www.npmjs.com/package/nodemailer)

```
const logger = require('./logger');
const nodemailer = require('nodemailer');

//透過GMAIL帳號和'應用程式密碼'登入
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.GMAIL_USER,
  to: 'kel0oo0@yahoo.com.tw',
  subject: 'Sending Email using Node.js',
  text: 'That was easy???',
  html: `<h1>HI~~!!</h1><img src="https://miro.medium.com/max/676/1*XEgA1TTwXa5AvAdw40GFow.png">`,
};

const sendEmail = (options = {}) => {
  let mergeOption = {
    ...mailOptions,
    ...options,
  };
  
  //發送
  transporter.sendMail(mergeOption, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      logger.info(mergeOption);
    }
  });
};
```

- 應用程式密碼
![](https://i.imgur.com/SzAGCvv.jpg)

:::warning
從nodemailer文件上可知，Gmail的送信方式比較適合開發時測試，真正產品應用時還要考量其他因素，不建議使用Gmail。
:::

## API請求紀錄
使用套件
[winston](https://www.npmjs.com/package/winston):用來產生log檔案
[morgan](https://www.npmjs.com/package/morgan):產生能擷取HTTP資訊的中間層

- helplers/logger.js
- helplers/httpLogger.js

- 紀錄
![](https://i.imgur.com/dzh1mVF.jpg)


