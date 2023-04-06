const { Pool } = require('pg');
const userInput = [`%${process.argv[2]}%`, process.argv[3] || 5]

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id, students.name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, userInput)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort} cohort`);
  })
})
.catch(err => console.log(err));