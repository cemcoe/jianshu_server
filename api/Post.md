# 文章相关接口文档
```

baseUrl: https://jian.cemcoe.com/jianshu_api

```

## 目录：

[1、新建文章](#1新建文章)<br/>
[2、获取特定文章](#2获取特定文章)<br/>
[3、更新特定文章](#3更新特定文章)<br/>
[4、获取文章列表](#3更新特定文章)<br/>


TODO 改变文章状态相关接口，是否要和更新特定文章接口合并？
- 将公开文章移到垃圾箱
- 将垃圾箱中文章软删除






## 接口列表：

### 1、新建文章

#### 请求URL:  
```
/posts
```

#### 示例：

#### 请求方式: 
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|title      |Y       |string  |文章标题 |
|content    |Y       |string  |文章内容 |
|status   |Y      |number  |文章状态 |

status 搞成可读的常量可能更加合适

#### 返回示例：

```javascript
{
    "commentcount": 0,
    "viewcount": 0,
    "imgsLink": [],
    "status": 1,
    "_id": "5fbdb24255c2550f78bdf5c5",
    "title": "新建文章测试",
    "content": "文章内容测试",
    "author": "5f6836ac7ce71b1a82ac3b75",
    "abstract": "文章内容测试",
    "wordcount": 6,
    "createdAt": "2020-11-25T01:24:18.216Z",
    "updatedAt": "2020-11-25T01:24:18.216Z",
    "__v": 0
}
```

### 2、获取特定文章

#### 请求URL：
```
/posts/:pid
```

#### 示例：

#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|pid     |Y       |string  |文章id |


#### 返回示例：
```javascript
{
    "status": 200,
    "data": {
        "post": {
            "commentcount": 0,
            "viewcount": 1,
            "imgsLink": [],
            "status": 1,
            "_id": "5fbdb24255c2550f78bdf5c5",
            "title": "新建文章测试",
            "content": "文章内容测试",
            "author": {
                "gender": "male",
                "bio": "企图混进05的阵营",
                "avatar": "/uploads/upload_6e61795682aece42a1661fc444629334.png",
                "_id": "5f6836ac7ce71b1a82ac3b75",
                "name": "cemcoe",
                "createdAt": "2020-09-21T05:14:20.386Z",
                "updatedAt": "2020-11-24T02:33:26.623Z"
            },
            "abstract": "文章内容测试",
            "wordcount": 6,
            "createdAt": "2020-11-25T01:24:18.216Z",
            "updatedAt": "2020-11-25T01:29:18.514Z"
        }
    }
}
```


### 3、更新特定文章

#### 请求URL：
```
/posts/:pid
```

#### 示例：


#### 请求方式：
```
PATCH
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|title      |Y       |string  |文章标题 |
|content    |Y       |string  |文章内容 |

#### 返回示例：
```javascript
{
    "status": 200,
    "data": {
        "post": {
            "commentcount": 0,
            "viewcount": 1,
            "imgsLink": [],
            "status": 1,
            "_id": "5fbdb24255c2550f78bdf5c5",
            "title": "update",
            "author": "5f6836ac7ce71b1a82ac3b75",
            "abstract": "update",
            "wordcount": 6,
            "createdAt": "2020-11-25T01:24:18.216Z",
            "updatedAt": "2020-11-25T01:33:57.127Z"
        }
    }
}
```




### 4、获取文章列表

#### 请求URL:  
```
/posts
```

#### 示例：
/posts?q=cemcoe&per_page=3&page=1

#### 请求方式: 
```
GET
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|per_page      |N    |int  |每页展示数量，默认为10 |
|page      |N       |int  |页数，默认为1 |
|q     |N       |string  |关键词 |

#### 返回示例：

```javascript
{
    "status": 200,
    "data": {
        "post": [
            {
                "commentcount": 0,
                "viewcount": 13,
                "imgsLink": [],
                "status": 1,
                "_id": "5f87d0ac0b8c5b0b606e9317",
                "title": "08 | 前后联调",
                "author": {
                    "gender": "male",
                    "bio": "企图混进05的阵营",
                    "avatar": "/uploads/upload_6e61795682aece42a1661fc444629334.png",
                    "_id": "5f6836ac7ce71b1a82ac3b75",
                    "name": "cemcoe",
                    "createdAt": "2020-09-21T05:14:20.386Z",
                    "updatedAt": "2020-11-24T02:33:26.623Z"
                },
                "abstract": "> 这里是在简书仿简书的第八篇，早睡早起身体好\n\n上篇已经将后端写好了，那么激动人心的联调来了，先来看一看连接上不。\n\n网络请求函数放在network文件夹中，本次注册接口是和用户相关的，那就在该目录",
                "wordcount": 3115,
                "createdAt": "2020-10-15T04:31:40.466Z",
                "updatedAt": "2020-11-22T20:48:34.762Z"
            },
            {
                "commentcount": 0,
                "viewcount": 11,
                "imgsLink": [],
                "status": 1,
                "_id": "5f804fc0e59b6a724976cedc",
                "title": "06 | 设计用户注册接口",
                "abstract": "> 这里是在简书仿简书的第六篇，早睡早起身体好\n\n用户名密码\n\n我想要这样的接口\n\n> POST https://jian.cemcoe.com/jianshu_api/users\n\n请求示例：\n``",
                "author": {
                    "gender": "male",
                    "bio": "企图混进05的阵营",
                    "avatar": "/uploads/upload_6e61795682aece42a1661fc444629334.png",
                    "_id": "5f6836ac7ce71b1a82ac3b75",
                    "name": "cemcoe",
                    "createdAt": "2020-09-21T05:14:20.386Z",
                    "updatedAt": "2020-11-24T02:33:26.623Z"
                },
                "createdAt": "2020-10-09T11:55:44.646Z",
                "updatedAt": "2020-11-07T22:51:42.713Z",
                "wordcount": 1995
            },
            {
                "commentcount": 0,
                "viewcount": 10,
                "imgsLink": [
                    "https://pan.cemcoe.com/picture-bed/jianshu/05/profile.png"
                ],
                "status": 1,
                "_id": "5f7bc59506e453b8db0f13e1",
                "title": "05 | 用户模型model设计",
                "abstract": "> 这里是在简书仿简书的第五篇，早睡早起身体好\n\n来看一下简书的用户，找一找用户身上要有什么字段。\n\n![用户界面](https://pan.cemcoe.com/picture-bed/jiansh",
                "author": {
                    "gender": "male",
                    "bio": "企图混进05的阵营",
                    "avatar": "/uploads/upload_6e61795682aece42a1661fc444629334.png",
                    "_id": "5f6836ac7ce71b1a82ac3b75",
                    "name": "cemcoe",
                    "createdAt": "2020-09-21T05:14:20.386Z",
                    "updatedAt": "2020-11-24T02:33:26.623Z"
                },
                "createdAt": "2020-10-06T01:17:09.836Z",
                "updatedAt": "2020-11-17T00:16:35.537Z",
                "wordcount": 885
            }
        ]
    }
}
```
