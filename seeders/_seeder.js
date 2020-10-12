// dir _seeds includes all the seeds (dummy data)
// seeds files are in json format depending on the schema fields

require('dotenv').config({ path: "./.env" });
const fs = require('fs');
const Spinner = require('cli-spinner').Spinner;
const chalk = require('chalk');
const mongoose = require('mongoose');
const User = require('../models/user');
const Message = require('../models/message');

// check user options: alternatively create an npm script
if (!process.argv[2]) {
    console.log(chalk.yellow(
        `Please provide options: 
        -i = to Import dummy data to the database 
        -d = to Destroy dummy data from the database`))
    process.exit()
}

console.log(process.env)

// connect to database
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})


// read seeds json files
const Users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));


// function to import/delete to database
const importData = async () => {
    try {
        const spinner = new Spinner('Importing data ... %s');
        spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷");
        spinner.start();

        await User.create(Users);
        console.log(chalk.green('   ✓ Dummy Users imported'));

        spinner.stop(true);
        console.log(chalk.green('✓ Data imported'));
        process.exit();
    }
    catch (error) {
        process.stdout.write('\n');
        console.log(
            chalk.bgRed('Failed Importing'),
            chalk.bgRed(error.message),
            error
        )
        process.exit();
    }
}

const destroyData = async () => {
    try {
        const spinner = new Spinner('Purging data ... %s');
        spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷");
        spinner.start();

        await User.deleteMany();
        console.log(chalk.yellowBright('   ✓ Dummy Users purged'));

        await Message.deleteMany();
        console.log(chalk.yellowBright('   ✓ Dummy Messages purged'));

        spinner.stop(true);
        console.log(chalk.yellowBright('✓ Data purged'));
        process.exit();
    }
    catch (error) {
        process.stdout.write('\n');
        console.log(
            chalk.bgRed('Failed Importing'),
            chalk.bgRed(error.meessage),
            error
        )
        process.exit();
    }
}


// on terminal: node seeder.js <option> 
switch (process.argv[2]) {
    case '-i':
        importData();
        break;

    case '-d':
        destroyData();
        break;

    default:
        return null
}