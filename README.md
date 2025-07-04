# Visbook - Responsive Online Visual Graphics Bookstore Documentation

## 1. Brief Description
Visbook is a modern, responsive online bookstore developed to showcase and sell visual graphics books. The application is designed to deliver a seamless user experience for browsing, searching, and purchasing books related to visual arts, design, and graphics. The platform integrates with STRAPI Cloud for content management and Firebase for authentication and order management, following best practices for modern web development.

## 2. Technologies Used
- **Strapi** (Node.js Headless CMS)
- **PostgreSQL** (Cloud database, managed by Strapi Cloud)
- **JavaScript** (Backend logic, data seeding scripts)
- **CSV** (Book data import)
- **npm** (Package management and scripts)
- **Cloud Storage** (for media uploads via Strapi Media Library)

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop

```
### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start

```
### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build

```

## 3. Environment Setup
This project is configured to use **PostgreSQL** as its database, and is compatible with Strapi Cloud. The following environment variables should be set (for example, in a `.env` file at the root of the project):

```
DATABASE_HOST=your-db-host.strapi.cloud
DATABASE_PORT=5432
DATABASE_NAME=your_db_name
DATABASE_USERNAME=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_SSL=true
JWT_SECRET=your_jwt_secret
ADMIN_JWT_SECRET=your_admin_jwt_secret
API_TOKEN_SALT=your_api_token_salt
TRANSFER_TOKEN_SALT=your_transfer_token_salt
```
Replace the values above with those provided by Strapi Cloud for your PostgreSQL database. For local development, you may use the default values as shown previously.

## 4. Data Seeding
To populate the database with initial book data, CSV files should be placed in the appropriate folders (such as `src/data/visbook.csv`). Once the files are in place, the Strapi bootstrap process can be started in development mode:

```
npm run develop

```

The seeding scripts will automatically import book data from the CSV files during this process.

## 5. Development User

When the application is running in development mode, a development user is created automatically to simplify login. The credentials for this user are displayed in the console output. The default credentials can be changed by editing `src/index.js`.

## 6. Deployment

Strapi offers a variety of deployment options, including [Strapi Cloud](https://cloud.strapi.io). For more information and to determine the best deployment solution, refer to the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment).

---

## 7. STRAPI Cloud Setup & Book Data Management

### STRAPI Cloud Project Setup

To set up the STRAPI Cloud backend, the developer should:

1. Sign up or log in at https://cloud.strapi.io/.
2. Create a new project and select the appropriate plan (free or paid).
3. Use PostgreSQL as the database (provided by STRAPI Cloud).
4. Deploy backend code from the `backend-postgresql-strapi` GitHub repository to cloud.strapi.io/projects.
5. Wait for provisioning and note the unique STRAPI Cloud URL (e.g., https://your-project-name.cloud.strapi.io).

### Configure Book Collection Type

In the STRAPI admin panel, navigate to **Content-Type Builder** and create a new collection type named `Book`.

- Add fields such as Title, Subtitle, Cover Image, Price, Published Date, Description, Author, and any additional fields required (e.g., ISBN, category, tags).
- Save and apply changes; STRAPI will update the database schema automatically.

### Add Book Data

In the Content Manager, add book entries manually or use the provided `visbookData.js` script (from the backend codebase) to bulk import data from `visbook.csv`.
- Upload book cover images to the STRAPI Media Library.
- For each book, ensure the filename in the Content Manager matches the Media Library filename, and update the book entry with the correct image URL.
- Save each entry. Repeat as needed for all books.

### Set API Permissions

In **Settings** > **Roles** > **Public**, enable `find` and `findOne` permissions for the Book collection to allow frontend access.
- Save the updated permissions.

## 8. Attributions

Strapi. (n.d.). Strapi Documentation. https://docs.strapi.io/
Strapi. (n.d.). Strapi GitHub Repository. https://github.com/strapi/strapi
Strapi. (n.d.). Resource Center. https://strapi.io/resource-center
