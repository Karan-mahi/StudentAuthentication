const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Student = mongoose.model("Student");
router.get("/", (req, res) => {
  let var0 = (var1 = var2 = var3 = var4 = "");
  var invalid = "none";
  switch (req.query.meal) {
    case "B":
      var1 = "selected";
      break;
    case "L":
      var2 = "selected";
      break;
    case "S":
      var3 = "selected";
      break;
    case "D":
      var4 = "selected";
      break;
    default:
      var0 = "selected";
      break;
  }
  console.log(req.query.invalid);
  if(req.query.invalid==1){
    console.log("here");
    invalid = "block";
  }
  console.log(invalid);
  res.render("student/validation", {
    date: req.query.date,
    var0: var0,
    var1: var1,
    var2: var2,
    var3: var3,
    var4: var4,
    invalid: invalid,
  });
});

router.post("/", (req, res) => {
  const currentDate = new Date(req.body.date);
  const currentMeal = req.body.mealType;
  Student.find({ rollNo: req.body.rollNumber }, (err, docs) => {
    if (!err) {
      if (docs.length == 0) {
        res.redirect(`/student?date=${req.body.date}&meal=${req.body.mealType}&invalid=1`);
      } else {
        let lastMealDate = new Date(docs[0].lastMealDate);
        let lastMeal = docs[0].lastMeal;
        if (
          lastMealDate.getTime() < currentDate.getTime() ||
          lastMeal != currentMeal
        ) {
          console.log("dedo....");

          res.render("student/status", {
            list: docs,
            approve: "block",
            disapprove: "none",
            date: req.body.date,
            meal: currentMeal,
          });

          Student.findOneAndUpdate(
            { rollNo: req.body.rollNumber },
            { lastMealDate: req.body.date, lastMeal: currentMeal },
            { new: true },
            (err, doc) => {
              if (err) console.log("Error during record update : " + err);
            }
          );
        } else {
          console.log("mt do...");
          res.render("student/status", {
            list: docs,
            approve: "none",
            disapprove: "block",
            date: req.body.date,
            meal: currentMeal,
          });
        }
      }
    } else {
      console.log("Error in retrieving employee list :" + err);
    }
  });
});
module.exports = router;
