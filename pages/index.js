


import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {

    return <MeetupList meetups={props.meetups}/>
}
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
// //fetch data from API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
    
// }
// }
export async function getStaticProps() {
//fetch data from API
const client = await MongoClient.connect('mongodb+srv://Tanu0102:M2SiBzuQTBVSnG3Y@cluster0.van5k3h.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
const db = client.db();

const meetupCollection = db.collection('meetups');
const meetups = await meetupCollection.find().toArray();
client.close();
    return {
        props: {
            meetups:  meetups.map((meetup)=>({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(), 
            }))
        },
        revalidate: 1
    }
}
export default HomePage;