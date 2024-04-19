import * as Yup from "yup";

const eventSchema = Yup.object().shape({
  eventTitle: Yup.string()
    .required("Event title is required"),
  eventType: Yup.string()
    .required("Event type is required"),
  eventDate: Yup.date()
    .required("Event date is required"),
  eventTime: Yup.date()
    .required("Event time is required"),
  eventState: Yup.string()
    .required("State is required"),
  venueAddress: Yup.string()
    .required("Venue address is required"),
  file: Yup.mixed()
    .required("File is required"),
});

export default eventSchema;
