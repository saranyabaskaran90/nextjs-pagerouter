import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails() {
    return(<>
    <MeetupDetail image="https://upload.wikimedia.org/wikipedia/commons/f/f2/Ligi_Ndogo_Grounds.jpg" 
    title="First meetup"
    description="desc"
    address="some street 5, some city"/>
    </>)
}
export async function getStaticPaths() {
    return {
        fallback: false, // dynamic genertaion if true
        paths: [
            { params: {
                meetupId: 'm1'
            }},
            { params: {
                meetupId: 'm2'
            }}
        ]
    }
}
export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    return {
        props: {
            meetupData: {
                image:"https://upload.wikimedia.org/wikipedia/commons/f/f2/Ligi_Ndogo_Grounds.jpg", 
                id: meetupId,
                title:"First meetup",
                description:"desc",
                address:"some street 5, some city"
            }
        }
    }
}
export default MeetupDetails;