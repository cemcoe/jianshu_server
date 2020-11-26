# 用户相关接口文档
```

baseUrl: https://jian.cemcoe.com/jianshu_api

```

## 目录：

[1、用户注册](#1用户注册)<br/>
[2、用户登录](#2用户登录)<br/>
[3、用户信息更改](#3用户信息更改)<br/>
[4、获取用户列表](#4获取用户列表)<br/>
[5、获取特定用户信息](#5获取特定用户信息)<br/>
[6、获取特定用户文章列表](#5获取特定用户文章列表)<br/>



## 接口列表：

### 1、用户注册

#### 请求URL:  
```
/users
```

#### 示例：

#### 请求方式: 
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|name      |Y       |string  |用户名 |
|password     |Y       |string  |密码 |

#### 返回示例：

```javascript
{
    "status": 200,
    "user": {
        "gender": "male",
        "bio": "该用户没有给自己编写简介",
        "avatar": "/uploads/default_avatar.png",
        "following": [],
        "_id": "5f9a232c75ef0cdd7017decf",
        "name": "233",
        "password": "cemcoe",
        "createdAt": "2020-10-29T02:04:28.599Z",
        "updatedAt": "2020-10-29T02:04:28.599Z",
        "__v": 0
    }
}
```

### 2、用户登录

#### 请求URL：
```
/login
```

#### 示例：

#### 请求方式：
```
POST
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|name      |Y       |string  |用户名 |
|password     |Y       |string  |密码 |

#### 返回示例：
```javascript
{
    "status": 200,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjlhMjMyYzc1ZWYwY2RkNzAxN2RlY2YiLCJuYW1lIjoiMjMzIiwiaWF0IjoxNjAzOTM3MjM2LCJleHAiOjE2MDQwMjM2MzZ9.2FEs4iLPKhOdpXjWswE57tWYIh7QY-LQgAwb18ILwYo",
        "user": {
            "gender": "male",
            "bio": "该用户没有给自己编写简介",
            "avatar": "/uploads/default_avatar.png",
            "_id": "5f9a232c75ef0cdd7017decf",
            "name": "233",
            "createdAt": "2020-10-29T02:04:28.599Z",
            "updatedAt": "2020-10-29T02:04:28.599Z"
        }
    }
}
```


### 3、用户信息更改

#### 请求URL：
```
/users/:uid
```

#### 示例：
https://jian.cemcoe.com/jianshu_api/users/5f9a232c75ef0cdd7017decf

#### 请求方式：
```
PATCH
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|uid      |Y       |string   |用户_id |
|bio     |N      |string  |用户简介 |

#### 返回示例：
```javascript
{
    "status": 200,
    "data": {
        "user": {
            "gender": "male",
            "bio": "我不是随便的人，随便起来不是人。😄",
            "avatar": "/uploads/default_avatar.png",
            "_id": "5f9a232c75ef0cdd7017decf",
            "name": "233",
            "createdAt": "2020-10-29T02:04:28.599Z",
            "updatedAt": "2020-10-29T02:22:10.951Z"
        }
    }
}
```




### 4、获取用户列表

#### 请求URL:  
```
/users
```

#### 示例：
https://jian.cemcoe.com/jianshu_api/users?per_page=1&page=1&q=23

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
[
    {
        "gender": "male",
        "bio": "该用户没有给自己编写简介",
        "avatar": "/uploads/default_avatar.png",
        "_id": "5f9a232c75ef0cdd7017decf",
        "name": "233",
        "createdAt": "2020-10-29T02:04:28.599Z",
        "updatedAt": "2020-10-29T02:04:28.599Z"
    }
]
```

### 5、获取特定用户信息

#### 请求URL：
```
users/:uid
```

#### 示例：
https://jian.cemcoe.com/jianshu_api/users/5f9a232c75ef0cdd7017decf

#### 请求方式：
```
GET
```

#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|uid      |Y       |string   |用户_id |

#### 返回示例：
```javascript
{
    "status": 200,
    "data": {
        "user": {
            "gender": "male",
            "bio": "该用户没有给自己编写简介",
            "avatar": "/uploads/default_avatar.png",
            "_id": "5f9a232c75ef0cdd7017decf",
            "name": "233",
            "createdAt": "2020-10-29T02:04:28.599Z",
            "updatedAt": "2020-10-29T02:04:28.599Z"
        }
    }
}
```

### 6、获取特定用户特定类型文章列表

#### 请求URL：
```
users/:uid/posts
```

#### 示例：


#### 请求方式：
```
GET
```

#### 参数类型：

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|uid      |Y       |string   |用户_id |
|status      |Y       |string   |文章状态，默认为public 可选public private |

#### 返回示例：
```javascript

```
