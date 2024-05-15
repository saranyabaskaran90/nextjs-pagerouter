import {MongoClient} from 'mongodb';

//functiosn for server side code
//POST /api/new-meetup

async function handler(req, res) {
    if(req.method === 'POST') {
        const data = req.body;

        const {title, image, address,description} = data;

        const client = await MongoClient.connect('mongodb+srv://Tanu0102:M2SiBzuQTBVSnG3Y@cluster0.van5k3h.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
        const db = client.db();

        const meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message: 'Meetup inserted!'})
    }
}

export default handler;