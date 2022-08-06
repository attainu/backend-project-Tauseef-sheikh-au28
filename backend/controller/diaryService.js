const diaryDetails = require("../models/diarySchema");

class Diary {
  create = async (req, res) => {
    try {
      const { title, description, user_id, imageUrl } = req.body;

      if (!title) {
        throw { message: "title is required" };
      }
      if (!description) {
        throw { message: "description is required" };
      }

      const response = await diaryDetails.create({
        title,
        description,
        user_id,
        imageUrl,
      });
      return res.status(200).send({
        message: "data saved successfully",
        error: false,
        data: response,
      });
    } catch (error) {
      return res.status(400).send({ message: error.message, error: true });
    }
  };

  getAll = async (req, res) => {
    const diaryPoints = await diaryDetails.find({});

    return res.status(200).send({
      message: "get all data Successfully",
      error: false,
      data: diaryPoints,
    });
  };

  updated = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedata = await diaryDetails.findByIdAndUpdate(id, req.body);

      res.status(200).json({
        message: "Updated data Successfully",
        error: false,
        updated: updatedata,
      });
    } catch (error) {
      return res.status(400).send({ message: error.message, error: true });
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const deleteData = await diaryDetails.findByIdAndDelete(id);
      res.status(200).json({
        message: "delete data Successfully",
        error: false,
        deletedData: deleteData,
      });
    } catch (error) {
      return res.status(400).send({ message: error.message, error: true });
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;

      const getData = await diaryDetails.findById(id);
      console.log(getData);
      res.status(200).json({
        message: "get the data successfully",
        error: false,
        data: getData,
      });
    } catch (error) {
      return res.status(400).send({ message: error.massage, error: true });
    }
  };

  getByUserId = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);

      const getData = await diaryDetails.find({ user_id: id });
      console.log(getData);
      res.status(200).json({
        message: "get the data successfully",
        error: false,
        data: getData,
      });
    } catch (error) {
      return res.status(400).send({ message: error.massage, error: true });
    }
  };
}

module.exports = new Diary();
