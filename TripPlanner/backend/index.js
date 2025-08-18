var express = require("express");
var app = express();
var bodyparser = require("body-parser");
app.use(bodyparser.json());
var cors = require("cors");
app.use(cors());
const bcrypt = require("bcrypt");
const axios = require("axios");

var port = 4000;
require("./src/Models/Connection");
var user = require("./src/Models/user");
var category = require("./src/Models/Category");
var faq = require("./src/Models/Faq");
var ContactUs = require("./src/Models/contact");
var Expense = require("./src/Models/Expense");
var Notification = require("./src/Models/Notifiction");
var trip = require("./src/Models/Trip");
var destination = require("./src/Models/Destination");
var favouritedestination = require("./src/Models/favouriteDes");
var Conversion = require("./src/Models/Conversion");
var multer = require("multer");
const path = require("path");

const { runInNewContext } = require("vm");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "D:/ADSE/contestAzamFinal/contest Azam/contest Azam/TripPlanner/clientSide/public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// for user added
app.post("/add_user", upload.single("profile_picture"), async (req, res) => {
  try {
    // Check if email exists
    const emailExists = await user.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).send("Email is already registered!");
    }

    let profile_picture = null;
    if (req.file) {
      profile_picture = req.file.filename;
    }

    const hashedPassword = await bcrypt.hash(req.body.password_hash, 10);
    await user.create({
      ...req.body,
      profile_picture: profile_picture,
      password_hash: hashedPassword,
    });

    res.status(200).send("user added successfully!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
});

// logined User

app.post("/logined", async (req, res) => {
  try {
    const { email, password_hash } = req.body;

    const users = await user.findOne({ email });
    if (!users) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 2. Compare passwords
    const isPasswordValid = await bcrypt.compare(
      password_hash,
      users.password_hash
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3. Remove password from response
    const userData = users.toObject();
    delete userData.password_hash;

    // 4. Successful login response
    res.status(200).send({
      userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
// for update the user
app.put("/updateuser/:id",
  upload.single("profile_picture"),
  async (req, res) => {
    const userId = req.params.id;
    const { email, first_name, last_name, status, is_admin } = req.body;

    let updateFields = {
      email,
      first_name,
      last_name,
      status,
      is_admin,
    };

    // Handle profile picture update
    if (req.file) {
      updateFields.profile_picture = req.file.filename;
    }

    try {
      const updatedUser = await user.findByIdAndUpdate(userId, updateFields, {
        new: true,
      });
      if (updatedUser) {
        res.send("User updated successfully");
      } else {
        res.send("User not found");
      }
    } catch (err) {
      console.error(err);
      res.send("Error updating user");
    }
  }
);
app.put("/forgetPassword", async (req, res) => {
  try {
    const { email, password_hash } = req.body;

    const userData = await user.findOne({ email });
    if (!userData) {
      return res.status(400).send("email is  not found");
    }

    const hashedPassword = await bcrypt.hash(password_hash, 10);
    userData.password_hash = hashedPassword;
    await userData.save();

    res.send("Password updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/userFetch/:id", (req, res) => {
  user.findById(req.params.id).then((resp) => {
    res.send(resp);
  });
});
// for admin panel
// api to fetch the user
app.get("/fetch_user", (req, res) => {
  user.find({ is_admin: 0 }).then((rerp) => {
    res.send(rerp);
  });
});
app.put("/statususer/:id", async (req, res) => {
  var find_id = await user.findById(req.params.id);
  find_id.status = find_id.status == 1 ? 0 : 1;
  find_id.save();
});

app.get("/search_user/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await user.find({
    email: { $regex: query, $options: "i" },
  });
  res.send(items);
});
app.delete("/deluser/:id", (req, res) => {
  user.findByIdAndDelete(req.params.id).then(() => {
    res.send("delete !");
  });
});
// for the user
app.post("/add_category", async (req, res) => {
  try {
    const { user_id, category_name } = req.body;

    if (!user_id || !category_name) {
      return res
        .status(400)
        .send({ message: "User ID and category name are required" });
    }

    const existingCategory = await category.findOne({
      user_id,
      category_name,
    });

    if (existingCategory) {
      return res.status(400).send("The category name is already added");
    }

    await category.create(req.body);
    await Notification.create({
      user_id,
      type: "Category",
      message: `You added a new Category: ${category_name}`,
    });

    res.status(201).send({ message: "The category is added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error adding category" });
  }
});

app.get("/usercategories/:user_id", async (req, res) => {
  const userId = req.params.user_id;

  try {
    const userCategories = await category.find({ user_id: userId });
    res.send(userCategories);
  } catch (err) {
    console.error(err);
    res.send("Error fetching categories");
  }
});
app.get("/find_categories/:id", async (req, res) => {
  try {
    const userCategories = await category.findById(req.params.id);
    res.send(userCategories);
  } catch (err) {
    console.error(err);
    res.send("Error fetching categories");
  }
});
app.put("/updatecategory/:id", async (req, res) => {
  const categoryId = req.params.id;
  const { category_name, status } = req.body;

  try {
    const updatedCategory = await category.findByIdAndUpdate(categoryId, {
      category_name,
      status,
    });

    if (updatedCategory) {
      res.send("Category updated successfully");
    } else {
      res.send("Category not found");
    }
  } catch (err) {
    console.error(err);
    res.send("Error updating category");
  }
});
app.get("/fetchcatebyuser/:user_id", (req, res) => {
  category.find({ user_id: req.params.user_id, status: 1 }).then((resp) => {
    res.send(resp);
  });
});

app.delete("/delcategory/:id", (req, res) => {
  category.findByIdAndDelete(req.params.id).then(() => {
    res.send("delete !");
  });
});
app.put("/statuscate/:id", async (req, res) => {
  var find_id = await category.findById(req.params.id);
  find_id.status = find_id.status == 1 ? 0 : 1;
  find_id.save();
});
app.get("/search_cate/:user_id/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await category.find({
    user_id: req.params.user_id,
    category_name: { $regex: query, $options: "i" },
  });
  res.send(items);
});

app.post("/addcontact", async (req, res) => {
  const { name, email, contact_number, message } = req.body;

  try {
    await ContactUs.create({
      name,
      email,
      contact_number: contact_number,
      message,
    });
    res.status(200).send("Contact message added successfully");
  } catch (err) {
    console.error(err);
    res.send("Error adding contact message");
  }
});

// Get all contact messages
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await ContactUs.find();
    res.send(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching contacts");
  }
});
app.delete("/delcon/:id", (req, res) => {
  ContactUs.findByIdAndDelete(req.params.id).then(() => {
    res.send("delete !");
  });
});
app.get("/search_contact/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await ContactUs.find({
    email: { $regex: query, $options: "i" },
    name: { $regex: query, $options: "i" },
  });
  res.send(items);
});

app.post("/add_faq", async (req, res) => {
  var user_id = req.body.user_id;
  var subject = req.body.subject;
  faq.create(req.body).then(() => {
    res.send("faq created");
  });

  await Notification.create({
    user_id,
    type: "Faq",
    message: `You added a new faq with subject : ${subject}`,
  });
});
app.get("/faq_fetch", (req, res) => {
  faq.find().then((resp) => {
    res.send(resp);
  });
});
app.get("/faq_find/:id", (req, res) => {
  faq.findById(req.params.id).then((resp) => {
    res.send(resp);
  });
});
app.put("/faq_edit/:id", (req, res) => {
  faq.findByIdAndUpdate(req.params.id, req.body).then((resp) => {
    res.send("the faq is updated now");
  });
});
app.delete("/faq_del/:id", (req, res) => {
  faq.findByIdAndDelete(req.params.id).then((resp) => {
    res.send("the faq is deleted now");
  });
});
app.get("/faq_search/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await faq.find({
    subject: { $regex: query, $options: "i" },
  });
  res.send(items);
});

app.post("/addexpense", async (req, res) => {
  const { user_id, trip_name, category_name, amount, expense_date, notes } =
    req.body;

  if (
    !user_id ||
    !trip_name ||
    !category_name ||
    !amount ||
    !expense_date ||
    !notes
  ) {
    return res.status(400).send({ message: "All fields are required" });
  }

  try {
    const existingTrip = await trip.findOne({ user_id, trip_name });

    if (existingTrip) {
      // Check if the category exists in the trip budget
      if (existingTrip[category_name] !== undefined) {
        if (existingTrip[category_name] >= amount) {
          existingTrip[category_name] -= amount;

          existingTrip.budget =
            existingTrip.accommodation +
            existingTrip.transport +
            existingTrip.food;

          await existingTrip.save();

          // Continue with expense creation
          const newExpense = await Expense.create({
            user_id,
            trip_name,
            amount,
            category_name,
            expense_date,
            notes,
          });

          const message = `New expense of ₹ ${amount} added to trip "${trip_name}" in category "${category_name}".`;
          await Notification.create({
            user_id,
            message,
            status: "unread",
          });

          return res.send({
            message: "Expense and notification added successfully",
            expense: newExpense,
          });
        } else {
          return res
            .status(400)
            .send(`Insufficient budget for ${category_name}`);
        }
      } else {
        return res.status(400).send(`Invalid category: ${category_name}`);
      }
    } else {
      return res.status(404).send("Trip not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});
app.get("/fetch_expenses/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const expenses = await Expense.find({ user_id });

    res.send(expenses);
  } catch (err) {
    console.error(err);
    res.send("Error fetching expenses.");
  }
});

// Fetch expense by ID
app.get("/expense_find/:id", async (req, res) => {
  const expense_id = req.params.id;

  try {
    const expense = await Expense.findById(expense_id);

    if (!expense) {
      return res.status(404).send("Expense not found");
    }

    res.send(expense);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching expense by ID");
  }
});
app.get("/search_expense/:user_id/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await Expense.find({
    user_id: req.params.user_id,
    trip_name: { $regex: query, $options: "i" },
  });
  res.send(items);
});
// Update an expense by ID
app.put("/expenseUpdate/:id", async (req, res) => {
  const expense_id = req.params.id;
  const { trip_name, category_name, amount, expense_date, notes, user_id } =
    req.body;

  try {
    const oldExpense = await Expense.findById(expense_id);
    if (!oldExpense) {
      return res.status(404).send("Expense not found");
    }

    const existingTrip = await trip.findOne({ user_id, trip_name });
    if (!existingTrip) {
      return res.status(404).send("Trip not found");
    }

    if (existingTrip[category_name] === undefined) {
      return res.status(400).send(`Invalid category: ${category_name}`);
    }

    const amountDifference = amount - oldExpense.amount;

    if (
      amountDifference > 0 &&
      existingTrip[category_name] < amountDifference
    ) {
      return res.status(400).send(`Insufficient budget for ${category_name}`);
    }

    existingTrip[category_name] -= amountDifference;

    existingTrip.budget =
      existingTrip.accommodation + existingTrip.transport + existingTrip.food;

    const updatedExpense = await Expense.findByIdAndUpdate(
      expense_id,
      {
        trip_name,
        category_name,
        amount,
        expense_date,
        notes,
      },
      { new: true }
    );

    await existingTrip.save();

    const message = `Expense updated: ₹${amount} in trip "${trip_name}" under category "${category_name}".`;
    await Notification.create({
      user_id: user_id,
      message,
      status: "unread",
    });

    res.status(200).send({
      message: "Expense updated successfully and budget adjusted",
      expense: updatedExpense,
      trip: {
        budget: existingTrip.budget,
        [category_name]: existingTrip[category_name],
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating expense");
  }
});
// Delete an expense by ID
app.delete("/expense_del/:id", async (req, res) => {
  const expense_id = req.params.id;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(expense_id);

    if (!deletedExpense) {
      return res.send("Expense not found");
    }

    res.send({
      message: "Expense deleted successfully",
      expense: deletedExpense,
    });
  } catch (err) {
    console.error(err);
    res.send("Error deleting expense");
  }
});
app.get("/lowestTohighAmountExpense/:user_id", (req, res) => {
  Expense.find({user_id:req.params.user_id})
    .sort({ amount: 1 })
    .then((resp) => {
      res.send(resp);
    });
});
app.get("/highTolowestAmountExpense/:user_id", (req, res) => {
  Expense.find({user_id:req.params.user_id})
    .sort({ amount: -1 })
    .then((resp) => {
      res.send(resp);
    });
});

// Add trip
app.post("/addtrip", async (req, res) => {
  const user_id = req.body.user_id;
  const destination = req.body.destination;
  const trip_name = req.body.trip_name;
  const {
    accommodation,
    food,
    transport,
    start_date,
    end_date,
    budget,
    status,
    categories_budget,
    category_id,
  } = req.body;

  try {
    var destinationExsiting = await trip.findOne({ user_id, destination });
    if (destinationExsiting) {
      return res.status(400).send("The destination  is already added");
    }
    var tripNameExsiting = await trip.findOne({ user_id, trip_name });
    if (tripNameExsiting) {
      return res.status(400).send("The trip name   is already added");
    }
    // Create trip
    const newTrip = await trip.create({
      user_id,
      trip_name,
      start_date,
      end_date,
      destination,
      budget,
      categories_budget,
      category_id,
      status,
      accommodation,
      food,
      transport,
    });

    // Create notification
    const message = `New trip "${trip_name}" has been added successfully.`;
    await Notification.create({
      user_id,
      message,
      status: "unread",
    });

    res.send("Trip and notification added successfully");
  } catch (err) {
    console.error(err);
    res.send("Error adding trip or notification");
  }
});

// Get all trips
app.get("/alltrips/:user_id", async (req, res) => {
  try {
    const allTrips = await trip.find({ user_id: req.params.user_id });
    res.send(allTrips);
  } catch (err) {
    console.error(err);
    res.send("Error fetching trips");
  }
});

// Get trip by ID
app.get("/tripFind/:trip_id", async (req, res) => {
  const trip_id = req.params.trip_id;

  try {
    const tripData = await trip.findById(trip_id);
    if (!tripData) {
      return res.send("Trip not found");
    }
    res.send(tripData);
  } catch (err) {
    console.error(err);
    res.send("Error fetching trip");
  }
});

// Update Trip by ID
app.put("/updatetrip/:id", async (req, res) => {
  const tripId = req.params.id;
  const {
    trip_name,
    start_date,
    end_date,
    destination,
    budget,
    categories_budget,
    category_id,
    status,
    accommodation,
    food,
    transport,
  } = req.body;

  const updateFields = {
    trip_name,
    start_date,
    end_date,
    destination,
    budget,
    categories_budget,
    category_id,
    status,
    accommodation,
    food,
    transport,
  };

  try {
    const updatedTrip = await trip.findByIdAndUpdate(tripId, updateFields);

    if (updatedTrip) {
      res.send("Trip updated successfully");
    } else {
      res.send("Trip not found");
    }
  } catch (err) {
    console.error(err);
    res.send("Error updating trip");
  }
});

//  Delete Trip by ID
app.delete("/deletetrip/:id", async (req, res) => {
  const tripId = req.params.id;

  try {
    const deletedTrip = await trip.findByIdAndDelete(tripId);
    if (deletedTrip) {
      res.send("Trip deleted successfully");
    } else {
      res.send("Trip not found");
    }
  } catch (err) {
    console.error(err);
    res.send("Error deleting trip");
  }
});

app.put("/trip_Status/:id", async (req, res) => {
  try {
    const updatedTrip = await trip.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });

    res.send(updatedTrip);
  } catch (error) {
    console.error("Error updating trip status:", error);
    res.status(500).send({ message: "Error updating trip status" });
  }
});

app.get("/lowestTohighAmountbudget/:user_id", (req, res) => {
  trip
    .find({user_id:req.params.user_id})
    .sort({ budget: 1 })
    .then((resp) => {
      res.send(resp);
    });
});
app.get("/highTolowestAmountbudget/:user_id", (req, res) => {
  trip
    .find({user_id:req.params.user_id})
    .sort({ budget: -1 })
    .then((resp) => {
      res.send(resp);
    });
});

// Add destination
const destinationStorage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null,"D:/ADSE/contestAzamFinal/contest Azam/contest Azam/TripPlanner/clientSide/public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // keep file extension
  },
});

const destinationUpload = multer({ storage: destinationStorage });

app.post(
  "/adddestination",
  destinationUpload.single("image"),
  async (req, res) => {
    try {
      const { name, description, latitude, longitude, status, user_id } =
        req.body;

      const existingDestination = await destination.findOne({ name });
      if (existingDestination) {
        return res
          .status(400)
          .send("The name of destination is already added!");
      }

      const image_url = req.file ? req.file.filename : null;
      await destination.create({
        name,
        description,
        image_url,
        latitude,
        longitude,
        status,
      });
      const message = `New Destination "${name}" has been added successfully.`;
      await Notification.create({
        user_id,
        message,
        status: "unread",
      });

      res.send("Destination added successfully");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding destination");
    }
  }
);
// Get all destinations
app.get("/destinations", async (req, res) => {
  try {
    const destinations = await destination.find();
    res.send(destinations);
  } catch (err) {
    console.error(err);
    res.send("Error fetching destinations");
  }
});
app.get("/destinationsfetch", async (req, res) => {
  try {
    const destinations = await destination.find({ status: 1 });
    res.send(destinations);
  } catch (err) {
    console.error(err);
    res.send("Error fetching destinations");
  }
});
app.put("/statusDestination/:id", async (req, res) => {
  var find_id = await destination.findById(req.params.id);
  find_id.status = find_id.status == 1 ? 0 : 1;
  find_id.save();
});

// Fetch destination by ID
app.get("/destinationfind/:id", async (req, res) => {
  const destination_id = req.params.id;

  try {
    const destinationData = await destination.findById(destination_id);
    if (!destinationData) {
      return res.send("Destination not found");
    }
    res.send(destinationData);
  } catch (err) {
    console.error(err);
    res.send("Error dfetching destination");
  }
});
app.get("/search_des/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await destination.find({
    name: { $regex: query, $options: "i" },
  });
  res.send(items);
});

// Update destination by ID with optional image upload
app.put(
  "/updatedestination/:id",
  destinationUpload.single("image"),
  async (req, res) => {
    const destinationId = req.params.id;
    const { name, description, image_url, latitude, longitude, status } =
      req.body;

    let updateFields = {
      name,
      description,
      image_url,
      latitude,
      longitude,
      status,
    };

    // If new image uploaded, update image_url
    if (req.file) {
      updateFields.image_url = req.file.filename;
    }

    try {
      const updatedDestination = await destination.findByIdAndUpdate(
        destinationId,
        updateFields
      );
      if (updatedDestination) {
        res.send("Destination updated successfully");
      } else {
        res.send("Destination not found");
      }
    } catch (err) {
      console.error(err);
      res.send("Error updating destination");
    }
  }
);

// Delete destination by ID
app.delete("/deletedestination/:id", async (req, res) => {
  const destinationId = req.params.id;

  try {
    const deletedDestination = await destination.findByIdAndDelete(
      destinationId
    );
    if (deletedDestination) {
      res.send("Destination deleted successfully");
    } else {
      res.send("Destination not found");
    }
  } catch (err) {
    console.error(err);
    res.send("Error deleting destination");
  }
});

app.get("/getNotification/:user_id", async (req, res) => {
  try {
    const noti = await Notification.find({ user_id: req.params.user_id });
    res.send(noti);
  } catch (err) {
    console.error(err);
    res.send("Error fetching trips");
  }
});
app.delete("/NotifiDel/:id", (req, res) => {
  Notification.findByIdAndDelete(req.params.id).then((resp) => {
    res.send("deleted");
  });
});
app.put("/notifications/:id/read", async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update notification");
  }
});
app.post("/addfavDes", async (req, res) => {
  const { user_id, name } = req.body;

  try {
    const existingfavorite = await favouritedestination.findOne({
      user_id,
      name,
    });
    if (existingfavorite) {
      return res
        .status(400)
        .send("This Destination  is already added in your Favourites");
    }

    const newFavourite = await favouritedestination.create({
      user_id,
      name,
    });

    const message = `New destination is added to trip "${name}".`;
    await Notification.create({
      user_id,
      message,
      status: "unread",
    });

    res.send({
      message: " added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});
app.get("/allFavdestination/:user_id", async (req, res) => {
  try {
    const allfavDes = await favouritedestination.find({
      user_id: req.params.user_id,
    });
    res.send(allfavDes);
  } catch (err) {
    console.error(err);
    res.send("Error fetching trips");
  }
});
app.delete("/favDesDel/:id", (req, res) => {
  favouritedestination.findByIdAndDelete(req.params.id).then((resp) => {
    res.send("deleted");
  });
});
app.get("/search_favdes/:user_id/search", async (req, res) => {
  var query = req.query.q || "";
  var items = await favouritedestination.find({
    user_id: req.params.user_id,
    name: { $regex: query, $options: "i" },
  });
  res.send(items);
});

// Get currency list
app.get("/api/currencies", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const currencies = Object.keys(response.data.rates);
    res.json(currencies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch currency list" });
  }
});

// Convert currency
app.get("/api/convert", async (req, res) => {
  const { from, to, amount, userId } = req.query;

  try {
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/${from}`
    );
    const rate = response.data.rates[to];
    if (!rate) return res.status(400).json({ error: "Invalid currency" });

    const convertedAmount = (parseFloat(amount) * rate).toFixed(2);

    // Save to DB with logged-in user ID from frontend
    const history = new Conversion({
      userId,
      fromCurrency: from,
      toCurrency: to,
      amount,
      convertedAmount,
      rate,
    });
    await history.save();

    res.json({ from, to, amount, rate, convertedAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Conversion failed" });
  }
});

// Get conversion history for the logged-in user
app.get("/api/history", async (req, res) => {
  try {
    const { userId } = req.query;
    const history = await Conversion.find({ userId }).sort({ date: -1 });
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

console.log(`the application is running now ${port}`);
app.listen(port);
