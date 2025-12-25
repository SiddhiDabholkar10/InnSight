import { useParams } from "react-router-dom";
export default function BookingsPage() { 
    const { booking_id } = useParams();
    return <div>Booking Page {booking_id}</div>;
};