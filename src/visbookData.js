const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');


function Book({
    title,
    subtitle,
    author,
    filename,
    description,
    publisher,
    published_date,
    price_cad,
    average_rating,
    number_of_pages,
    rating_count,
    ISBN_13,
    ISBN_10,
    isNewRelease,
    isBestSeller }) {
    this.title = title,
        this.subtitle = subtitle,
        this.author = author,
        this.filename = filename,
        this.description = description,
        this.publisher = publisher,
        this.published_date = published_date,
        this.price_cad = price_cad,
        this.average_rating = average_rating,
        this.number_of_pages = number_of_pages,
        this.rating_count = rating_count,
        this.ISBN_13 = ISBN_13,
        this.ISBN_10 = ISBN_10,
        this.isNewRelease = isNewRelease,
        this.isBestSeller = isBestSeller
}

function initVisBookDataArray() {
    const visbookDataArray = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, './data/visbook.csv'))
            .pipe(csv())
            .on('data', (data) => visbookDataArray.push(data))
            .on('end', () => {
                console.log(`************** Read Complete: ${visbookDataArray.length} ***************`)
                resolve(visbookDataArray);
            })
            .on('error', (err) => {
                reject(err);
            });
    });

}

async function visBookData(strapi) {
    console.log();
    console.log("************ Seeding Books data ************");

    const visBookDataArray = await initVisBookDataArray();

    const datacount = await strapi.documents('api::book.book').count();

    console.log(`data count: ${datacount}`);

    if (visBookDataArray.length <= 0) {
        console.error("************ ERROR WHILE READING VISBOOK DATA ************");
        return;
    } else if (visBookDataArray.length <= datacount) {
        console.log("************ Data already seeded: SKIPPING ************")
        return;
    } else {
        console.log("************ Data successfully read ************")
    }

    const bulkEntryPromise = [];

    for (const entry of visBookDataArray) {
        const values = Object.values(entry);
        const book = new Book({
            title: values[0],
            subtitle: values[1],
            author: values[2],
            filename: values[3],
            description: values[4],
            publisher: values[5],
            published_date: values[6],
            price_cad: values[7],
            average_rating: values[8],
            number_of_pages: values[9],
            rating_count: values[10],
            ISBN_13: values[11],
            ISBN_10: values[12],
            isNewRelease: values[13],
            isBestSeller: values[14]
        });

        /**
         * Checking for duplicate
         */
        const result = await strapi.documents('api::book.book').findFirst({
            locale: null,
            status: 'published',
            filters: {
                title: {
                    $eq: book.title
                }
            }
        }

        )

        /**
         * Add only if no entry is found.
         */
        if (result == null) {
            const entryPromise = strapi.documents('api::book.book').create({
                data: {
                    ...book
                }
            })
            bulkEntryPromise.push(entryPromise);
        }

    }

    console.log(`************ ADDING ${bulkEntryPromise.length} new entries ************`);

    await Promise.all(bulkEntryPromise);

    console.log("************ VisBookData Completed ************");
}

module.exports = visBookData;
