# 個人メモ
Cognitoによる認証フローを作るために必要な知識をまとめていく

## Cognitoによる認証フロー
### SPA ⇄ APIサーバの構成の場合
#### 初回アクセス
1. SPAはCognitoにユーザID・パスワードを使ってID/Password認証を行う（InitiateAuth API）。この時認証フローとして「USER_SRP_AUTH」（★1）を指定
2. Cognitoはチャレンジを返す。チャレンジの種類として「PASSWORD_VERIFIER」（★2）を返してパスワードの検証を求める
3. SPAはRespondToAuthChallenge APIを呼び出す。パスワードを使って生成したチャレンジレスポンスを送る
4. Cognitoは3種類のトークン（★3）を返す（IDトークン・アクセストークン・更新トークン）

#### 2回目以降（独自のAPIサーバにリクエストする場合）
1. SPAはAPIサーバのAPIを呼び出す。その際Cognitoから受け取ったトークン（★4）をリクエストに含める
2. APIサーバはCognitoからトークンセット（JWTセット）をダウンロードする
3. APIサーバはトークンを検証する
4. APIサーバはトークンの検証に成功した場合のみコンテンツを返却する

※ API Gatewayを使うとトークン検証部分をやってくれるらしい。API Gatewayの裏はEC2でもLambdaでもいい

#### 2回目以降（他のAWSリソースをSPAから呼び出す場合）
1. SPAはGetCredencialForIdentity APIを呼び出す。Cognito User Poolから受け取ったトークンをCognito Federated Identityに渡す
2. CognitoはAWS認証情報（一時的なアクセスキー、シークレットアクセスキー、トークン）を返す
3. SPAはAWS認証情報を使ってAWSリソースにアクセスする
4. AWSリソースは結果を返す

## 疑問リスト
1. Cognitoの認証フローの種類とその違いは？
2. チャレンジの種類とその違いは？
3. 3種類のトークンの用途の違いは？
4. API呼び出し時に送るトークンは3種類のうちどれ？

## 参考にした資料・サイト
[AWS Black Belt Online Seminar 2017 AWSにおけるアプリ認証パターンのご紹介](https://www.slideshare.net/AmazonWebServicesJapan/aws-black-belt-online-seminar-2017-aws-80642202)
