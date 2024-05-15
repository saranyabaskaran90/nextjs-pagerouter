import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
    console.log(props)
    return(<>
    <Head> 
        <title>Meetup Details {props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}/>
    </Head> 
    <MeetupDetail image={props.meetupData.image}
    title={props.meetupData.title}
    description={props.meetupData.description}
    address={props.meetupData.address} />
    </>)
}
export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb+srv://Tanu0102:M2SiBzuQTBVSnG3Y@cluster0.van5k3h.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find({}, {_id:1}).toArray();
    client.close();
    return {
        fallback: 'blocking', // dynamic genertaion if true
        paths: meetups.map((meetup)=>({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    }
}
export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://Tanu0102:M2SiBzuQTBVSnG3Y@cluster0.van5k3h.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db();

    const meetupCollection = db.collection('meetups');
    const selectedMeetup = await meetupCollection.findOne({_id: new ObjectId(meetupId)},)
    client.close();


    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                description: selectedMeetup.description,
                address: selectedMeetup.address,
                image: selectedMeetup.image
            }
        }
    }
}
export default MeetupDetails;