# 家庭記帳本
使用 Node.js + Express 打造的家庭記帳本，方便使用者管理個人日常支出。能夠登入系統，確保個人隱私。可以對自己建立的支出紀錄進行瀏覽、新增、修改、刪除，也可以分類來查看收支狀況。

## 產品功能
### 紀錄系統
1. **使用者可以在首頁看到總收支狀況：**
    - 支出日期、名稱、日期、分類、金額、總金額
2. **使用者點擊編輯來修改個別支出資料**

3. **使用者點擊刪除來刪除個別支出**

4. **使用者可以查看個別類別的資料和總金額**

### 使用者認證系統
1. **使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼**

2. **使用者的密碼經加密存入資料庫**

3. **使用者必須登入才能使用家庭記帳本**

5. **使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息**

## 環境建置與需求
*   Node.js、MongoDB

## 安裝與執行步驟 (installation and execution)
1. 打開你的 terminal，Clone 此專案至本機電腦
`git clone https://github.com/dream184/A12_expense_tracker`
2. 開啟終端機(Terminal)，進入存放此專案的資料夾
`cd expense_tracker`
3. 安裝 npm 套件
`在 Terminal 輸入 npm install 指令`
4. 安裝 nodemon 套件
`在 Terminal 輸入 npm install nodemon 指令`
5. 設定環境變數
`將根目錄的.env.example改成.env`
6. 建立種子資料
`npm run seed`
7. 啟動伺服器，執行 app.js 檔案
`在 Terminal 輸入 nodemon app.js 指令`
8. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結
`Express is listening on http://localhost:3000`
9. 輸入 SEED_USER 帳號密碼即可登入
    email: 'example@example'
    password: '12345678'

## Contributor - 專案開發人員
* [李仕堡](https://github.com/dream184)
