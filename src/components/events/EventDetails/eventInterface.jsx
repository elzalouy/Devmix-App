import { Component } from "react";
import { validateEvent } from "../../../httpServices/event/EventJoiSchemas";
import {
  deleteEvent,
  updateEvent,
  getEventById,
  deleteSession,
  saveEventImage,
  giveFeedback
} from "../../../httpServices/event/event";
import {
  attendEvent,
  getUserAttendee,
  notAttendEvent
} from "../../../httpServices/event/attendees";
import { getUserByName, getUserByToken } from "../../../httpServices/user/user";
import { getToken } from "../../../httpServices/localStorage";
import { authed } from "../../../httpServices/auth/auth";
import isAdmin from "../../../middleware/admin";
import handle from "../../../middleware/errorHandle";
const _ = require("lodash");
class EventComponent extends Component {
  state = {
    status: "view",
    event: {},
    days: [],
    errors: "",
    feedbackError: {},
    session_id: "",
    speakers_search_word: "",
    speakers: [],
    attendee: false,
    feedback: ""
  };
  async componentDidMount() {
    try {
      const state = this.state;
      const id = this.props.match.params.id;
      const response = await getEventById(id);
      if (response.error) {
        alert("Server error says:" + response.error.message);
        window.location = "/events";
      } else {
        state.event = response.data;
      }
      if (authed()) {
        let user = await getUserByToken(getToken());
        if (user) {
          const attendee = await getUserAttendee(id, user._id);
          if (attendee.data) state.attendee = true;
          else state.attendee = false;
        }
      }
      this.setState({ state });
      this.ChangeNumberOfDays();
    } catch (ex) {}
  }
  ChangeNumberOfDays = handle(() => {
    if (!this.state.event) return 0;
    const state = this.state;
    let days = state.event.sessions.map(item => {
      let date = item.date.toString().toLowerCase();
      return date;
    });
    state.days = _.uniq(days);
    this.setState({
      state
    });
  });
  handleUpdateCover = handle(
    isAdmin(async ({ currentTarget: e }) => {
      const state = this.state;
      const cover_photo = e.files[0];
      state.cover_photo = cover_photo;
      this.setState({ state });
    })
  );
  handleDeleteEvent = handle(
    isAdmin(async () => {
      const result = window.confirm(
        "are you sure that you want to delete this event?"
      );
      if (result) {
        const token = getToken();
        if (!token) return 0;
        const result = await deleteEvent(this.state.event._id, token);
        if (result.error) return 0;
        window.location = "/events";
      }
    })
  );

  handleChange = handle(
    isAdmin(({ currentTarget: input }) => {
      const state = this.state;
      state.event[input.name] = input.value;
      this.setState({ state });
    })
  );
  cancelSubmit = handle(async e => {
    const state = this.state;
    if (state.status === "addSession") {
      let index = state.event.sessions.length;
      _.remove(state.event.sessions, state.event.sessions[index - 1]);
    }
    state.status = "view";
    state.errors = "";
    state.session_id = "";
    state.speakers = [];
    state.speakers_search_word = "";
    this.setState({ state });
  });
  handleEdit = handle(
    isAdmin(e => {
      const state = this.state;
      state.status = "editHeader";
      this.setState({ state });
    })
  );
  handleChangeSession = handle(
    isAdmin(({ currentTarget: input }) => {
      const state = this.state;
      const { sessions } = state.event;
      const index = sessions.indexOf(
        sessions.find(s => s._id === state.session_id)
      );
      state.event.sessions[index][input.name] = input.value;
      this.setState({ state });
    })
  );
  handleSearch = handle(
    isAdmin(async ({ currentTarget: input }) => {
      const users = await getUserByName(input.value);
      const state = this.state;
      state.speakers = users.data;
      this.setState({ state });
    })
  );
  handleEditSession = handle(
    isAdmin(({ currentTarget: element }) => {
      const state = this.state;
      state.session_id = element.id;
      state.status = "editSession";
      this.setState({ state });
    })
  );
  handleAddSession = handle(
    isAdmin(() => {
      const state = this.state;
      state.session_id = "new";
      state.status = "addSession";
      const session = {
        _id: "new",
        session_name: "",
        session_number: 0,
        date: "",
        time: "",
        instructor_id: "",
        content_desc: ""
      };
      state.event.sessions.push(session);
      this.setState({ state });
    })
  );
  handleSubmit = handle(
    isAdmin(async e => {
      e.preventDefault();
      const state = this.state;
      const { event } = state;
      const sessions = _.map(event.sessions, element => {
        return _.omit(element, "_id");
      });
      const data = {
        name: event.name,
        cover_photo: event.cover_photo,
        date: event.date,
        sessions: sessions,
        location: event.location,
        twitter_link: event.twitter_link,
        facebook_link: event.facebook_link
      };
      state.errors = validateEvent(data);
      if (!state.errors) {
        const token = getToken();
        const response = await updateEvent(event._id, data, token);
        state.errors = response.error;
        if (!state.errors) {
          if (state.cover_photo) {
            const response = await saveEventImage(
              state.cover_photo,
              event._id,
              token
            );
            if (response.error) state.errors = response.error.message;
          }
          state.status = "view";
        }
        this.setState({ state });
        this.ChangeNumberOfDays();
      } else {
        this.setState({ state });
      }
    })
  );

  handleDeleteSpeaker = handle(
    isAdmin(() => {
      const state = this.state;
      const { sessions } = state.event;
      const index = sessions.indexOf(
        sessions.find(s => s._id === state.session_id)
      );
      state.event.sessions[index]["instructor_id"] = "";
      this.setState({ state });
    })
  );

  handleChooseSpeaker = handle(
    isAdmin(({ currentTarget: element }) => {
      const state = this.state;
      const { sessions } = state.event;
      const index = sessions.indexOf(
        sessions.find(s => s._id === state.session_id)
      );
      state.event.sessions[index]["instructor_id"] = element.id;
      this.setState({ state });
    })
  );
  handleDeleteSession = handle(
    isAdmin(async ({ currentTarget: e }) => {
      const result = window.confirm(
        "are you sure that you want to delete this session?"
      );
      if (result) {
        const result = await deleteSession(
          this.state.event._id,
          e.id,
          getToken()
        );
        if (result.error)
          return alert(
            "error hapenned while deleting the session : " + result.error
          );
        window.location.reload();
      }
    })
  );
  attendEvent = handle(async ({ currentTarget: e }) => {
    const state = this.state;
    const result = await attendEvent(e.id, getToken());
    if (result.error) {
      state.errors = result.error;
      state.attendee = false;
    }
    if (result.data) state.attendee = true;
    this.setState({ state });
  });
  notAttendEvent = handle(async ({ currentTarget: e }) => {
    const state = this.state;
    const result = await notAttendEvent(e.id, getToken());
    if (result.data) state.attendee = false;
    this.setState({ state });
  });
  handleChangeFeedback = ({ currentTarget: e }) => {
    const state = this.state;
    state.feedback = e.value;
    this.setState({ state });
  };
  handleGiveFeedback = async () => {
    const state = this.state;
    let feedback = { event: state.event._id, feedback: state.feedback };
    const result = await giveFeedback(feedback, getToken());
    if (result.error) state.feedbackError = result.error;
    else {
      state.event.feedbacks = result.data;
    }
    this.setState({ state });
  };
}
export default EventComponent;
