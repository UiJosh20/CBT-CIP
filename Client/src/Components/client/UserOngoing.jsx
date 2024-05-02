import axios from 'axios';
import React, { useEffect, useState } from 'react'

const UserOngoing = () => {
  const [events, setEvents] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false)

  const handleDeleteEvent = (eventId) => {
    axios
      .delete(`http://localhost:3000/deleteEvent/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        })
      .then((res) => {
        if (res.status === 200) {
          setEvents(events.filter((event) => event._id !== eventId));
          console.log("Event deleted successfully");
        } else {
          console.log("Failed to delete event");
        }
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };


  useEffect(() => {
    const getAllEvents = () => {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/getAllEvents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.events) {
            setEvents(res.data.events);
          } else {
            console.log("No events found");
          }
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    };
    getAllEvents();
  }, []);


  return (
    <>
       {events.length > 0 ? (
          <main className="mt-10">
            <h6 className="text-center poppins-medium-sm">EVENT HISTORY</h6>
            <section className="flex  lg:px-4 lg:pb-10 mt-2 justify-center items-center flex-wrap gap-5 py-5  mx-auto minHeight">
              {events.map((event) => (
                <div key={event._id} className="flex flex-wrap">
                  <div class="card">
                    <p class="card-title">{event.eventTitle}</p>
                    <p class="small-desc">{event.venueAddress},</p>
                    <p class="small-desc">
                      {new Date(event.eventDate).toLocaleDateString()}
                    </p>
                    <p class="small-desc">{event.eventTime}</p>

                    <div class="go-corner">
                      <div class="go-arrow">
                        <span class="material-symbols-outlined">
                          arrow_forward
                        </span>
                        
                      </div>
                      
                    </div>
                    <div className="go-corner1">
                      <div className="go-arrow1" onClick={() => handleDeleteEvent(event._id)}>
                    <span class="material-symbols-outlined">delete</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </main>
        ) : (
          <main className="mt-10">
            <h6 className="text-center poppins-medium-sm">EVENT HISTORY</h6>
            <section className="flex  px-4 mt-2 justify-center items-center flex-wrap gap-5 py-5 border-t-2 border-gray-100 w96 mx-auto">
              <h4 className="noEvents poppins-medium mt-10">No events yet</h4>
            </section>
          </main>
        )}
    
    </>
  )
}

export default UserOngoing