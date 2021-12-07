require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://shadz:clinkod@cluster0.jg58m.mongodb.net/test");

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

var myOnePerson = new Person({
  name: "Grace",
  age: 23,
  favoriteFoods: ["Pizza", "HotDog", "Fries"],
});

var arrayOfPeople = [
  { name: "John", age: 27, favoriteFoods: ["Ugali"] },
  { name: "Salim", age: 17, favoriteFoods: ["Biriani"] },
];

const createAndSavePerson = async function (done) {
  await myOnePerson.save(function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const createManyPeople = async (arrayOfPeople, done) => {
  await Person.create(arrayOfPeople, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
    // .clone()
    // .catch(function (err) {
    //   console.log(err);
    // });
};

const findPeopleByName = async (personName, done) => {
  var personName = "Sepy Bear";
  await Person.find({ "name": personName }, function (err, personFound) {
    if (err) return done(null, personFound);
    // console.log(personFound);
  }).clone(); 
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  }).clone();
};

// Find by Id

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  }).clone();
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);

    data.favoriteFoods.push(foodToAdd);

    data.save(function (err, data) {
      if (err) console.log(err);
      done(null, data);
    });
  });
};

const findAndUpdate = function (personName, done) {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { $set: { age: ageToSet } },
    function (err, data) {
      if (err) done(err);
      console.log(data);
      console.log(done);
      done(null, data);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId , function (err, removeDoc) {
    if (err) console.log(err);
    console.log("Successful Deletion")
    done(null, removeDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, function (error, data) {
    error ? done(error) : done(error, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
