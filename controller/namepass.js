const name_pass = require('../models/namepass');

//Get Data
const getData = async (req,res) => {

    try{
        const data = await name_pass.find({});
        if(data.length === 0){
            return res.status(204).json({ message: 'No data in Database' });
        }
        else{
            res.status(200).json({data :data,message:'Data fetched successfully'});
        }

    } catch(error){
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Server error' });
    }

}

//Get Data by user
const getDataByUser = async (req, res) => {

    try{
        const data = await name_pass.findOne({ name: req.body.name , password: req.body.password });
        if(!data){
            return res.status(404).json({ message: 'Data not found' });
        }
        else{
            res.status(200).json({data :data , message :'Data fetched successfully'});
        }

    } catch(error){
        console.error('Error fetching data by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }

}

//Add Data
const addData = async (req, res) => {
    try{
        const { name, password } = req.body;
        if(!name || !password){
            return res.status(400).json({ message: 'Name and Password are required' });
        }
        const existingData = await name_pass.findOne({ name });
        if(existingData){
            return res.status(409).json({ message: 'Name already exists' });
        }
        const newData =await name_pass.create({ name, password });
        res.status(201).json({data: newData , message: 'Data added successfully' });

    } catch(error){
        console.error('Error adding data:', error);
        res.status(500).json({ message: 'Server error' });
    }

}

//Update Data
const updateData = async (req, res) => {
    try{
        const { name, password } = req.body;
        const data = await name_pass.findOne({ _id: req.params.id });
        if(!data){
            return res.status(404).json({ message: 'profile not found' });
        }
        data.name = name || data.name;
        data.password = password || data.password;
        const updatedData = await data.save();
        res.status(200).json({data: updatedData , message: 'Profile updated successfully' });

    } catch(error){
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

//Delete Data
const deleteData = async (req, res) => {
    try{
        const data  = await name_pass.findOne({_id : req.params.id})
        if(!data) {
            return res.status(404).json({ message: 'Data not found' });
        }
        await name_pass.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Data deleted successfully' });

    } catch(error){
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Server error' });
    }

}


module.exports = {
    getData,
    getDataByUser,
    addData,
    updateData,
    deleteData
}