## Installation

You can install the package via git SSH (recommended) or HTTPS:

```shell
git clone git@github.com:ranigilhare/school-system.git
```
OR
```shell
git clone https://github.com/ranigilhare/school-system.git
```
#### Package install

Run the command: 

- The npm package will automatically register itself, so you can start using it immediately.

```shell
composer install
```

```shell
npm install && npm run dev
```

## Setup environment

cp .env.example .env

php artisan key:generate

## Database
- Create database "school-system" and add in .env file

## Database Migrations & Seeders
- Run the command: 

```shell
php artisan migrate --seed
```

#### Setup complete! That's all.

## Usage

- Run the command on shell : 

```shell
php artisan serve
```

## Testing

- Open the below link in browser

http://127.0.0.1:8000/

## Task 1 

- Login through credentials and test redirection via Navbar

## Admin
    email: admin@example.com
    password: admin123

## Teacher
    email: teacher@example.com
    password: teacher123

## Student
    email: student@example.com
    password: student123

## Task 2 
- Login as admin and Redirect to Roles and User
 
## Task 3 - Test the flow

1. Log in as a user.

2. Go to /checkout, enter product & quantity.

3. On submit:

    -Order is saved.

    -Event is fired.

    -Emails, logs, notifications triggered.

    
## Task 4 - Test the flow

1. Run "php artisan queue:work"

2. Visit /newsletters/create and fill subject/body.

3. Hit "Send Newsletter" — job starts running in background.

4. Monitor logs, mail output, queue table, or debug dashboard.
