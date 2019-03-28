# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|integer|null: false|
|email|integer|null: false, add_index :users, :email, unique: true|
|password|integer|null: false|
|group_id|references|null: false, foreign_key: true|
|created_at|timestamps||
|updated_at|timestamps||

### Association
- has_many :messages
- has_many :users, through: :groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|integer|null: false|
|user_id|references|null: false, foreign_key: true|
|created_at|timestamps||
|updated_at|timestamps||

### Association
- has_many :messages
- has_many :groups, through: :groups_users


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
