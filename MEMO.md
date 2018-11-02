# 個人メモ
Cognitoによる認証フローを作るために必要な知識をまとめていく

## Cognito
### 3種類のアクセストークンの用途
|トークン名	| 種類 | 想定用途|
| --- | --- | --- |
| IDトークン | JWT | Cognito User Pools の ユーザー属性（例えばメールアドレスなど）も含めたトークン。認可時、ユーザーに関する情報をフルで取得したい場合はこちらを使う。API Gateway はこちらを採用。 |
| アクセストークン | JWT | Cognito User Pools の 最低限のユーザー情報を含めたトークン。認可時、必要なのがユーザー名程度であればこちらを採用する。 |
| リフレッシュトークン | 文字列 |	IDトークンおよびアクセストークンを更新するために利用する。Cognito User Pools のクライアントSDKを利用している場合は、自動で更新されるため、特にこのトークンをアプリケーションから意識して使うことはない。 |

## Cognitoによる認証フローまとめ
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

## JavaScriptによる実装手順
### AWS Amplifyをインストール
[公式ドキュメント](https://aws-amplify.github.io/docs/js/start)に従って導入。
AWS AmplifyとAWS SDKがあるけどAPIの違いだけでできることは同じ。
AWS AmplifyはAWS SDKのAPIをよりわかりやすくしたもの（宣言的なAPI）だそう。

## 参考にした資料・サイト
[AWS Black Belt Online Seminar 2017 AWSにおけるアプリ認証パターンのご紹介](https://www.slideshare.net/AmazonWebServicesJapan/aws-black-belt-online-seminar-2017-aws-80642202)
[Amazon Cognito と仲良くなるために歴史と機能を整理したし、 Cognito User Pools と API Gateway の連携も試した](https://dev.classmethod.jp/server-side/serverless/amazon-cognito-api-gateway-idtoken/)
