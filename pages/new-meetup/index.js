import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

export default function NewMeetupPage() {
    const router = useRouter();

    async function addMeetupUrlHandler (enteredMeetupData) {
    const response = await fetch('/api/new-meetup', {
        method: 'POST',
        body: JSON.stringify(enteredMeetupData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
    router.push('/')
    }
    return (<><Head> 
        <title>New Meetups</title>
        <meta name="description" content="sample new meetups" />
    </Head><NewMeetupForm onAddMeetup={addMeetupUrlHandler}/></>)
}