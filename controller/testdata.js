const test_data = require('../models/testdata');

const getTestData = async (req, res) => {

    try{
        const data = await test_data.find({});
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

module.exports = { getTestData };