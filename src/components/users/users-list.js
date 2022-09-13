import Row from "react-bootstrap/Row";

import UserCard from "./user-card";

import classes from "./users.module.css";

function UsersList(props) {
  return (
    <Row className="d-flex justify-content-around">
      {props.users.map((user) => {
        return (
          <UserCard
            className={classes.UserCard}
            name={user.name}
          />
        );
      })}
    </Row>
  );
}

export default UsersList;
